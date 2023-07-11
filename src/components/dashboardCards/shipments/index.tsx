import React, { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuid } from "uuid";
import es from "dayjs/locale/es";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers/CalendarPickerSkeleton";
import { Container, DayContainer } from "./ShipmentStyles";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { handleDashboardData } from "@/state/features";
import { getCalendarValue } from "@/services";
import { pluralize } from "@/utils";

const Shipments = () => {
    dayjs.locale(es);
    const { idMerchant } = useAppSelector((state) => state.user);
    const { embarques } = useAppSelector((state) => state.dashboard);
    const requestAbortController = useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState<
        { shipment: number; wharehouse: number; entry: number }[]
    >([]);
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [orderNumbers, setOrderNumbers] = useState<number[]>([]);
    const [whareouseOrders, setWhareouseOrders] = useState<number[]>([]);
    const [storeOrders, setStoreOrders] = useState<number[]>([]);

    const dispatch = useAppDispatch();

    const handleMonthChange = async (date: Dayjs) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }

        setIsLoading(true);

        dispatch(
            handleDashboardData({
                name: "embarques",
                value: await getCalendarValue(
                    idMerchant,
                    1,
                    date.month() + 1,
                    date.year()
                ),
            })
        );
        setHighlightedDays([]);
        setIsLoading(false);
    };

    const loadHighlightedDays = () => {
        const upcomingShipments = embarques?.map(
            ({ ShippingDate, WarehouseDate, EntryDate }) => ({
                shipment: ShippingDate && dayjs(ShippingDate).date(),
                wharehouse: WarehouseDate && dayjs(WarehouseDate).date(),
                entry: EntryDate && dayjs(EntryDate).date(),
            })
        );
        setHighlightedDays(upcomingShipments);
    };

    const getShipmentsOfDay = (day, viewMore = false, type = "shipment") => {
        const orders =
            type === "shipment"
                ? orderNumbers
                : type === "wharehouse"
                ? whareouseOrders
                : type === "store"
                ? storeOrders
                : [];
        if (viewMore) {
            if (orders?.length > 3) {
                return (
                    <span className="seeMore">
                        +{orders?.length - 3}{" "}
                        {pluralize(orders?.length - 3, "producto")}
                    </span>
                );
            } else {
                return <></>;
            }
        }

        embarques?.map(
            ({ ShippingDate, ProductNumber, WarehouseDate, EntryDate }) => {
                if (
                    dayjs(ShippingDate).date() === Number(day.date()) &&
                    dayjs(ShippingDate).month() === Number(day.month())
                ) {
                    setOrderNumbers((prevState) => [
                        ...prevState,
                        ProductNumber,
                    ]);
                } else if (
                    dayjs(WarehouseDate).date() === Number(day.date()) &&
                    dayjs(WarehouseDate).month() === Number(day.month())
                ) {
                    setWhareouseOrders((prevState) => [
                        ...prevState,
                        ProductNumber,
                    ]);
                } else if (
                    dayjs(EntryDate).date() === Number(day.date()) &&
                    dayjs(EntryDate).month() === Number(day.month())
                ) {
                    setStoreOrders((prevState) => [
                        ...prevState,
                        ProductNumber,
                    ]);
                }
            }
        );
    };

    useEffect(() => {
        embarques?.length > 0 && loadHighlightedDays();
        return () => requestAbortController.current?.abort();
    }, [embarques]);

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={value}
                    loading={isLoading}
                    onChange={(newValue) => {
                        setValue(newValue);
                        setOrderNumbers([]);
                        setWhareouseOrders([]);
                        setStoreOrders([]);
                        getShipmentsOfDay(newValue);
                    }}
                    onMonthChange={handleMonthChange}
                    renderInput={(params) => <TextField {...params} />}
                    renderLoading={() => <CalendarPickerSkeleton />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const shipmentDates = highlightedDays.map(
                            ({ shipment }) => shipment
                        );
                        const whareHouseDates = highlightedDays.map(
                            ({ wharehouse }) => wharehouse
                        );
                        const storeDates = highlightedDays.map(
                            ({ entry }) => entry
                        );

                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            shipmentDates.indexOf(day.date()) >= 0;

                        const wharehouseSelection =
                            !DayComponentProps.outsideCurrentMonth &&
                            whareHouseDates.indexOf(day.date()) >= 0;

                        const storeSelection =
                            !DayComponentProps.outsideCurrentMonth &&
                            storeDates.indexOf(day.date()) >= 0;

                        return (
                            <Badge key={day.toString()} overlap="circular">
                                <PickersDay
                                    style={{
                                        background: isSelected
                                            ? "#DFB6D2"
                                            : wharehouseSelection
                                            ? "#CFD779"
                                            : storeSelection
                                            ? "#919ECC"
                                            : "",
                                    }}
                                    {...DayComponentProps}
                                />
                            </Badge>
                        );
                    }}
                />
            </LocalizationProvider>
            <DayContainer>
                {highlightedDays
                    .map(({ shipment }) => shipment)
                    .includes(Number(value?.date())) ? (
                    <>
                        <span>
                            <span>{value?.format(" D,MMM")}</span>
                            <span>Embarques</span>{" "}
                        </span>
                        <span>
                            {orderNumbers.map((order) => (
                                <p key={uuid()}>{order}</p>
                            ))}
                        </span>

                        <span>
                            {getShipmentsOfDay(value, true, "shipment")}
                        </span>
                    </>
                ) : highlightedDays
                      .map(({ wharehouse }) => wharehouse)
                      .includes(Number(value?.date())) ? (
                    <>
                        <span>
                            <span>{value?.format(" D,MMM")}</span>
                            <span>Depósito</span>{" "}
                        </span>
                        <span>
                            {whareouseOrders.map((order) => (
                                <p key={uuid()}>{order}</p>
                            ))}
                        </span>

                        <span>
                            {getShipmentsOfDay(value, true, "wharehouse")}
                        </span>
                    </>
                ) : highlightedDays
                      .map(({ entry }) => entry)
                      .includes(Number(value?.date())) ? (
                    <>
                        <span>
                            <span>{value?.format(" D,MMM")}</span>
                            <span>Tienda</span>{" "}
                        </span>
                        <span>
                            {storeOrders.map((order) => (
                                <p key={uuid()}>{order}</p>
                            ))}
                        </span>

                        <span>{getShipmentsOfDay(value, true, "store")}</span>
                    </>
                ) : (
                    <>
                        <span>
                            <span>{value?.format(" D,MMM")}</span>
                            {/* <span>Embarques</span>{" "} */}
                        </span>
                        <span> No hay embarques en el dia seleccionado</span>
                    </>
                )}
            </DayContainer>
        </Container>
    );
};

export { Shipments };
