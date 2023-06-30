import React, { useState, Fragment, useEffect } from "react";
import FilePreview from "@/assets/images/filePreview.png";
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
import { ApprovalElements, Approvals, Pages, Product } from "@/types";
import {
    getApprovalsOfProduct,
    getProductById,
} from "@/services/ProductRequests";
import { getApprovalName, getSeasonById, urlFormat } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setUpdateProduct } from "@/state/features/product";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ScreenLoader } from "@components/common";

const Row = (props: { row }) => {
    const { row } = props;
    const {
        allSeasons,
        supplier,
        managementUnit,
        tipology,
        fabrics,
        brands,
        industries,
        concepts,
        lines,
        bodyFit,
    } = useAppSelector((state) => state.product);
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState(convertImage);
    const [approval, setApproval] = useState<Approvals[] | null>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync } = useMutation(getApprovalsOfProduct);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpen = async (e) => {
        e.stopPropagation();
        if (!open) {
            setApproval(await mutateAsync(row.idProduct));
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleClick = async () => {
        setIsLoading(true);
        dispatch(setUpdateProduct(await getProductById(row.idProduct)));
        navigate(urlFormat(Pages.UpdateProduct));
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
                    {/* <img style={{ width: 50, height: 50 }} src={photo} alt="" /> */}
                    Foto
                </TableCell>
                <TableCell>Codigo</TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>
                    {getSeasonById(row?.idSeason, allSeasons)} {row?.year}
                </TableCell>
                <TableCell>{row?.supplier}</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>{row.concept}</TableCell>
                <TableCell>{row.line}</TableCell>
                <TableCell>{row.managmentUnit}</TableCell>
                <TableCell>{row.industry}</TableCell>
                <TableCell>{row.tipology}</TableCell>
                <TableCell>{row.bodyFit}</TableCell>
                <TableCell>Composicion</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Margen</TableCell>
                <TableCell>Compra USD</TableCell>
                <TableCell>Venta USD</TableCell>
                <TableCell>Venta $</TableCell>
                <TableCell>Fecha deposito</TableCell>
                <TableCell>Fecha Tienda</TableCell>
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
                                        <TableCell align="right">
                                            Fecha
                                        </TableCell>
                                        <TableCell align="right">
                                            Responsable
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {approval &&
                                        approval.length > 0 &&
                                        approval.map((approvalRow) => (
                                            <Fragment key={uuid()}>
                                                <TableRow key={uuid()}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {getApprovalName(
                                                            approvalRow?.Tipo
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {approvalRow?.Estado}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {approvalRow?.Fecha}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {
                                                            approvalRow?.Responsable
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            </Fragment>
                                        ))}
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
