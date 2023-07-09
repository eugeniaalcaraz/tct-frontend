import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { StyledTableRow } from "./TableStyles";
import { Pages } from "@/types";
import { getProductById } from "@/services/ProductRequests";
import { getSeasonById, urlFormat } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setUpdateProduct } from "@/state/features/product";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "@components/common";
import dayjs from "dayjs";
import { StatusLabel } from "@/pages/updateProduct/stateLabel";

const Row = (props: { row }) => {
    const { row } = props;
    const { allSeasons } = useAppSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpen = async (e) => {
        e.stopPropagation();
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleClick = async () => {
        setIsLoading(true);
        dispatch(setUpdateProduct(await getProductById(row.idProduct)));
        navigate(`${urlFormat(Pages.UpdateProduct)}/${row.idProduct}`);
        setIsLoading(false);
    };

    function convertImage() {
        // const picture = new ArrayBuffer(row.pic);
        // const blob = new Blob([picture]);
        // const url = URL.createObjectURL(blob);
        // return url ?? "hola";
    }

    return (
        <React.Fragment>
            <StyledTableRow
                sx={{ cursor: "pointer", "& > *": { borderBottom: "unset" } }}
                onClick={handleClick}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={handleOpen}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    <img
                        style={{ width: 50, height: 50 }}
                        src={row?.pic}
                        alt=""
                    />
                </TableCell>
                <TableCell>
                    {row?.idMerchantBrand}
                    {row?.idSeason}
                    {row?.year}
                    {row?.idProduct}
                </TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>
                    {getSeasonById(row?.idSeason, allSeasons)} {row?.year}
                </TableCell>
                <TableCell>{row?.supplier}</TableCell>
                <TableCell>
                    {dayjs(row?.shippingDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{row?.concept}</TableCell>
                <TableCell>{row?.line}</TableCell>
                <TableCell>{row?.managmentUnit}</TableCell>
                <TableCell>{row?.industry}</TableCell>
                <TableCell>{row?.tipology}</TableCell>
                <TableCell>{row?.bodyFit}</TableCell>
                <TableCell>{row?.fabricData[0]?.Description}</TableCell>
                <TableCell>{row?.quantity}</TableCell>
                <TableCell>Margen</TableCell>
                <TableCell>{row?.cost}</TableCell>
                <TableCell>{row?.costInStore}</TableCell>
                <TableCell>Venta $</TableCell>
                <TableCell>
                    {dayjs(row?.warehouseEntryDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                    {dayjs(row?.entryDate).format("YYYY-MM-DD")}
                </TableCell>
            </StyledTableRow>

            <TableRow
                style={{
                    marginTop: 0,
                    position: "relative",
                    top: "-1rem",
                    borderRadius: "0 0 4px 4px",
                }}
            >
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2.5 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Aprobaciones
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Fecha</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Muestra
                                        </TableCell>
                                        <TableCell>
                                            <StatusLabel
                                                status={row?.statusSample.toLowerCase()}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row?.statusSampleDate
                                                ? dayjs(
                                                      row?.statusSampleDate
                                                  ).format("YYYY-MM-DD")
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Calidad
                                        </TableCell>
                                        <TableCell>
                                            <StatusLabel
                                                status={row?.statusFabric.toLowerCase()}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row?.statusFabricDate
                                                ? dayjs(
                                                      row.statusFabricDate
                                                  ).format("YYYY-MM-DD")
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow key={uuid()}>
                                        <TableCell component="th" scope="row">
                                            Avios
                                        </TableCell>
                                        <TableCell>
                                            <StatusLabel
                                                status={row?.statusAvio.toLowerCase()}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row?.statusAvioDate
                                                ? dayjs(
                                                      row.statusAvioDate
                                                  ).format("YYYY-MM-DD")
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Modelaje
                                        </TableCell>
                                        <TableCell>
                                            <StatusLabel
                                                status={row?.statusModeling.toLowerCase()}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row?.statusModelingDate
                                                ? dayjs(
                                                      row.statusModelingDate
                                                  ).format("YYYY-MM-DD")
                                                : "-"}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {isLoading && <ScreenLoader loading={true} />}
        </React.Fragment>
    );
};

export { Row };
