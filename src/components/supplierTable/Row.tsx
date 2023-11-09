import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import {
    Avatar,
    Box,
    Button,
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
import { Pages, SupplierHeadersArray } from "@/types";
import { getProductById } from "@/services/ProductRequests";
import { getCodeById, getCodeByName, getSeasonById, urlFormat } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setUpdateProduct } from "@/state/features/product";
import { useNavigate } from "react-router-dom";
import { ScreenLoader } from "@components/common";
import dayjs from "dayjs";
import { StatusLabel } from "@/pages/updateProduct/stateLabel";
import defaultImage from "@assets/images/defaultImage.jpeg";
import { Edit } from "@mui/icons-material";

const Row = (props: { row }) => {
    const { row } = props;
    const { idMerchant } = useAppSelector((state) => state.user);
    const { allSeasons, seasons, brands, tipologies } = useAppSelector(
        (state) => state.product
    );
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
        // setIsLoading(true);
        // dispatch(
        //     setUpdateProduct(
        //         await getProductById({
        //             productNumber: row?.productNumber,
        //             idSeason: row?.idSeason,
        //             idMerchant,
        //         })
        //     )
        // );
        // navigate(
        //     `${urlFormat(Pages.UpdateProduct)}/${row?.productNumber}/${
        //         row?.idSeason
        //     }`
        // );
        // setIsLoading(false);
    };


    const styleCell = {
        display: "flex",
        justifyContent: "center",
        width: '100px',
        minWidth: '100px',
        maxWidth: '100px',
        overflow: "hidden"
    };

    const certificationsList = useMemo(() => {
        return [...row?.peopleCertifications, ...row?.planetCertifications]
    }, [row?.peopleCertifications, row?.planetCertifications])

    return (
        <React.Fragment>
            <StyledTableRow
                sx={{ 
                    cursor: "pointer", 
                    "& > *": { borderBottom: "unset" }, 
                    display: 'flex',
                    flexDirection: 'row',
                }}
                onClick={handleClick}
            >
                <TableCell
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
                >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        sx={{width: '40px'}}
                        onClick={handleOpen}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <AvatarCalification calification={row.performance} />
                {SupplierHeadersArray.filter(({title}) => title != "").map(({code, title, width}) => (
                    <TableCell 
                    key={code}
                    sx={{
                        minWidth: width,
                        maxWidth: width,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: 'center',
                    } }
                    >{row[code]}</TableCell>
                ))}
                
            </StyledTableRow>

            <TableRow
                style={{
                    marginTop: 0,
                    marginLeft: 0,


                    position: "relative",
                    borderRadius: "0 0 4px 4px",
                }}
            >
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{display: 'flex', flexDirection: 'row', height: '100%'}}>
                            <Box sx={{ backgroundColor: generateColorFromCalification(row?.performance).bg, width: '20px', height: '100%', marginTop: 0  }}>
                           
                            </Box>
                            <Box sx={{ margin: 2, display: 'grid', gridTemplateColumns: '50% 50%' }}>
                                <Box>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 600,}}>PERSONAS</Typography>
                                    
                                    <span style={{marginLeft: '10px', fontSize: '14px',fontWeight: 300,fontStyle: 'italic'}}>{row?.totalEmployees} trabajadores</span>
                                    {!!row.womenEmployees && row.womenEmployees > 0 && <span style={{marginLeft: '10px', fontSize: '14px',fontWeight: 400,fontStyle: 'italic'}}>{row.womenEmployees} Mujeres</span>}
                                    {!!row.menEmployees && row.menEmployees > 0 && <span style={{marginLeft: '10px', fontSize: '14px',fontWeight: 400,fontStyle: 'italic'}}>{row.menEmployees} Hombres</span>}
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', mt: '8px', width: '100%'}}>
                                    {row?.peopleCertifications.map((certification) => (
                                        <ShowCertification key={JSON.stringify(certification)} certification={certification} />
                                    ))}
                                    <ShowCertificationsComments certifications={certificationsList} name="commentGenericPeople" />
                                    {row.countryInHighRisk && <Box sx={{fontSize: '14px', fontWeight: 300}}>País con alto riesgo de incumplimiento de legislación minima.</Box>}
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', mt: '30px', width: '100%'}}>
                                    <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 600,}}>Planeta</Typography>
                                    {row?.planetCertifications.map((certification) => (
                                        <ShowCertification key={JSON.stringify(certification)}  certification={certification} />
                                    ))}
                                    <ShowCertificationsComments certifications={certificationsList} name="commentGenericPlanet" />
                                </Box>

                                <Box sx={{display: 'flex', flexDirection: 'column', mt: '30px', width: '100%'}}>
                                    <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 600,}}>Químicos</Typography>
                                    <ShowCertificationsComments certifications={certificationsList} name="commentGenericQuimicals" />
                                    {/* <Box sx={{fontSize: '14px', fontWeight: 300}}>OEKO TEX - Esta verificación alcanza únicamente a la materia prima certifcada. / Vence el 12/05/2024</Box> */}
                                </Box>
                                
                                <Box sx={{display: 'flex', flexDirection: 'column', mt: '30px', width: '100%'}}>
                                    <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 600,}}>Materias primas</Typography>
                                    <ShowCertificationsComments certifications={certificationsList} name="commentGenericMaterials" />
                                    
                                    {/* <Box sx={{fontSize: '14px', fontWeight: 300}}>RCS - Esta verificación alcanza únicamente a la materia prima certifcada. / Vence el 12/05/2024</Box> */}
                                </Box>
                                </Box>
                                <Box>
                                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                        <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 600,}}>Producto & Alcance</Typography>
                                    </Box>
                                    <Box sx={{mt: '8px'}}>
                                        <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 500}}>Productos</Typography>
                                        {row?.productTypes?.map((product) => (
                                        <Box key={product.description} sx={{fontSize: '14px',fontWeight: 300,fontStyle: 'italic'}}>{product.description}</Box>
                                        ))}
                                        
                                    </Box>
                                    <Box sx={{mt: '8px', display: 'grid', gridTemplateColumns: '50% 50%' }}>
                                        <Box>
                                            <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 500}}>Actividades internas</Typography>
                                            {row?.processCertifications?.filter(process => (process.type == 'Dentro de las instalaciones')).map((process) => (
                                                <Box key={process.description} sx={{fontSize: '14px',fontWeight: 300,fontStyle: 'italic'}}>{process.description}</Box>
                                            ))}
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 400}}>Actividades tercerizadas</Typography>
                                            {row?.processCertifications?.filter(process => (process.type == 'Tercerizados Directamente o Subcontratados')).map((process) => (
                                                <Box key={process.description} sx={{fontSize: '14px',fontWeight: 300,fontStyle: 'italic'}}>{process.description}</Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{mt: '28px'}}>
                                        <Typography variant="h5" sx={{fontSize: '14px', fontWeight: 500}}>RELACIÓN</Typography>
                                    </Box>

                                    <Box sx={{mt: '8px', display: 'grid', gridTemplateColumns: '50% 50%' }}>
                                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Box sx={{fontSize: '14px',fontWeight: 400}}>Tipo de proveedor</Box>
                                            <Box sx={{fontSize: '14px',fontWeight: 300,fontStyle: 'italic', ml: '12px'}}>{row?.relationshipType}</Box>
                                        </Box>
                                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                            <Box sx={{fontSize: '14px',fontWeight: 400}}>Estado</Box>
                                            <Box sx={{fontSize: '14px',fontWeight: 300,fontStyle: 'italic', ml: '12px'}}>{row?.commercialRelationship}</Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{mt: "28px"}}>
                                        <Button startIcon={<Edit sx={{ width: 14}}/>} variant="contained" >
                                            Editar
                                        </Button>
                                    </Box>
                                </Box>
                                
                                {/* <Box sx={{mt: 20}}>
                                {JSON.stringify(row)}
                                </Box> */}
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {isLoading && <ScreenLoader loading={true} />}
        </React.Fragment>
    );
};

const AvatarCalification = ({calification}: {calification:string}) => {

    const color = useMemo(() => {
        return generateColorFromCalification(calification)
    }, [calification])

    return <TableCell 
    sx={{
        display: "flex",
        justifyContent: "center",
    }}
>
    <Avatar sx={{backgroundColor: color.bg, color: color.color, fontWeight: '600', fontSize: '16px', p: 0, width: '40px', height: '40px'}}>
         {color.code}  
    </Avatar>
</TableCell>
}

const ShowCertificationsComments = ({certifications, name}: {certifications: any[], name: string}) => {

    return <>
    {certifications?.length == 0 && <Box sx={{fontSize: '14px', fontWeight: 300}}>No cuenta con ninguna verificacion externa.</Box>}
    {certifications?.filter((cert) => cert[name] && cert[name] !== "").map((cert) => (
        <Box key={cert.description} sx={{fontSize: '14px', fontWeight: 300}}>{cert[name]}</Box>
    ))}
    </>
}

const ShowCertification = ({certification}:any) => (
    <Box sx={{fontSize: '14px', fontWeight: 300}}><b style={{fontWeight: 500}}>{certification.description}</b> - Esta verificación alcanza únicamente a la materia prima certifcada. / <b style={{fontWeight: 500}}>Vence el (falta campo fecha)</b></Box>
)
// const ShowCertification = ({certification}: any) => (
//     <Box key={JSON.stringify(certification)}>{JSON.stringify(certification)}</Box>
// )

const generateColorFromCalification = (calification) => {
    switch (calification) {
        case "A":
            return {code: "A", bg: "#31654B", color: "#000000"};
        case "B":
            return {code: "B", bg: "#CFD779", color: "#233906"};
        case "C":
            return {code: "C", bg: "#DFB6D2", color: "#233906"};
        case "D":
            return {code: "D", bg: "#E28B4A", color: "#233906"};
        case "E":
            return {code: "E", bg: "#BC392B", color: "#000000"};
        default:
            return {code: "!", bg: "#B6B3B3", color: "#fff"};
    }
}

export const CalificationsSupplier = [
    {
        name: "A",
        color: "#31654B",
        colorText: "#000000",
    },
    {
        name: "B",
        color: "#CFD779",
        colorText: "#233906",
    },
    {
        name: "C",
        color: "#DFB6D2",
        colorText: "#233906",
    },
    {
        name: "D",
        color: "#E28B4A",
        colorText: "#233906",
    },
    {
        name: "E",
        color: "#BC392B",
        colorText: "#000000",
    },
    {
        name: "!",
        color: "#B6B3B3",
        colorText: "#fff",
    }
]

export { Row };
