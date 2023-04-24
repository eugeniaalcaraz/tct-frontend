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

const Shipments = () => {
    dayjs.locale(es);
    const { idMerchant } = useAppSelector((state) => state.user);
    const { embarques } = useAppSelector((state) => state.dashboard);
    const requestAbortController = useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
    const [value, setValue] = useState<Dayjs | null>(dayjs());
    const [orderNumbers, setOrderNumbers] = useState<number[]>([]);

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
        const upcomingShipments = embarques.map(({ ShippingDate }) =>
            dayjs(ShippingDate).date()
        );
        setHighlightedDays(upcomingShipments);
    };

    const getShipmentsOfDay = (day, viewMore = false) => {
        if (viewMore) {
            if (orderNumbers.length > 3) {
                return (
                    <span className="seeMore">
                        + {orderNumbers.length - 3} Ver más
                    </span>
                );
            } else {
                return <></>;
            }
        }

        embarques.map(({ ShippingDate, OrderNumber }) => {
            if (
                dayjs(ShippingDate).date() === Number(day.date()) &&
                dayjs(ShippingDate).month() === Number(day.month())
            ) {
                setOrderNumbers((prevState) => [...prevState, OrderNumber]);
            }
        });
    };

    useEffect(() => {
        embarques.length > 0 && loadHighlightedDays();
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
                        getShipmentsOfDay(newValue);
                    }}
                    onMonthChange={handleMonthChange}
                    renderInput={(params) => <TextField {...params} />}
                    renderLoading={() => <CalendarPickerSkeleton />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.date()) >= 0;

                        return (
                            <Badge key={day.toString()} overlap="circular">
                                <PickersDay
                                    style={{
                                        background: isSelected ? "#BB855E" : "",
                                    }}
                                    {...DayComponentProps}
                                />
                            </Badge>
                        );
                    }}
                />
            </LocalizationProvider>
            <DayContainer>
                <span>{value?.format(" D,MMM")}</span>
                {highlightedDays.includes(Number(value?.date())) ? (
                    <>
                        <span>
                            {orderNumbers.map((order) => (
                                <p key={uuid()}>{order}</p>
                            ))}
                        </span>

                        <span>{getShipmentsOfDay(value, true)}</span>
                    </>
                ) : (
                    <span> No hay embarques en el dia seleccionado</span>
                )}
            </DayContainer>
        </Container>
    );
};

export { Shipments };
