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
import { getApprovalName } from "@/utils";

const Row = (props: { row: Product }) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState("");
    const [approval, setApproval] = useState<Approvals[] | null>([]);

    const handleOpen = async () => {
        if (!open) {
            setApproval(await getApprovalsOfProduct(row.IdProduct));
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

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
                {/* <TableCell component="th" scope="row" align="center">
                    <img src={FilePreview} alt="" />
                </TableCell> */}
                <TableCell>{row.IdProduct}</TableCell>
                <TableCell>{row.ProductoNombre}</TableCell>
                <TableCell>{row.Proveedor}</TableCell>
                <TableCell>{row.Cantidad} pcs</TableCell>
                <TableCell>{row.Departamento}</TableCell>
                <TableCell>{row.Tipo}</TableCell>
                <TableCell>
                    {row.Calidad}{" "}
                    {row.CalidadesAdicionales &&
                        `(+${row.CalidadesAdicionales})`}
                </TableCell>
                <TableCell>{row.Peso} gr</TableCell>
                <TableCell>$ {row.Costo}</TableCell>
                <TableCell>$ {row.Precio}</TableCell>
                <TableCell>{row.Margin} %</TableCell>
                <TableCell>{row.Estado}</TableCell>
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
