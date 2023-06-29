import React, { useState, Fragment } from "react";
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
import { ApprovalElements, Approvals, Product } from "@/types";
import { getApprovalsOfProduct } from "@/services/ProductRequests";
import { getApprovalName, getSeasonById } from "@/utils";
import { useAppSelector } from "@/state/app/hooks";

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

    const handleOpen = async () => {
        if (!open) {
            setApproval(await getApprovalsOfProduct(row.IdProduct));
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    function convertImage() {
        // const picture = new ArrayBuffer(row.pic);
        // const blob = new Blob([picture]);
        // const url = URL.createObjectURL(blob);
        // return url ?? "hola";
    }

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
        </React.Fragment>
    );
};

export { Row };
