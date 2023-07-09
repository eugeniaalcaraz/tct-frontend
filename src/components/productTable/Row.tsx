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
import dayjs from "dayjs";
import { StatusLabel } from "@/pages/updateProduct/stateLabel";

const Row = (props: { row }) => {
    const { row } = props;
    const { allSeasons } = useAppSelector((state) => state.product);
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

    /*
   "idProduct": 185,
        "idSeason": 1,
        "supplier": "Jane Doe",
        "name": "nombre remera",
        "line": "Line 1",
        "managmentUnit": "ManagmentUnit 1",
        "industry": "Rubro 1",
        "tipology": "Remera",
        "bodyFit": "Body Fit 1",
        "statusProduct": "Aprobado",
        "statusFabric": "Aprobado",
        "statusFabricDate": null,
        "statusAvio": "Aprobado",
        "statusAvioDate": null,
        "statusModeling": "Aprobado",
        "statusModelingDate": "2023-12-12T00:00:00.000Z",
        "statusSample": "Aprobado",
        "statusSampleDate": "2023-07-28T00:00:00.000Z",
        "concept": "Concept 1",
        "shippingType": "Avión",
        "shippingDate": "2023-07-29T00:00:00.000Z",
        "entryDate": "2023-07-28T00:00:00.000Z",
        "warehouseEntryDate": "2023-07-16T00:00:00.000Z",
        "brand": "Brand 1",
        "year": 23,
        "cost": "20",
        "costInStore": "40",
        "quantity": 50,
        "idFabric": 12,
        "pic": "data:image/png;base64,REFUQTpJTUFHRS9QTkc7QkFTRTY0LElWQk9SVzBLR0dPQUFBQU5TVUhFVUdBQUFPRUFBQURIQ0FNQUFBQUpCU0pJQUFBQU1WQk1WRVgvLy85WFBDTFZPU0hMTE1aUk5DSE9NTURKS0NaUE1TRFBVODc0OS8xSUtNWlZYTTlRTThETUxTRFRPTUlGRFRYVTYvTExUUzdNWEUzVVovQkZJU1hSNkZJNVNFQURLRDIwUStYRDJGT1NPVUpEUk1WNytWN1o4RlZNNC9CUlpPK1dJRFQ3QURQRFZPUUpFVEVSRzlNS01EK0FCOVIxWVRIQTFGSldXOUM0U09aSVNTWE9VUzYvVU9KSDNWU0FKVFlQTlVFL0Y4UTZDOE5FSlRVVkFBQVYzS0xFUVZSNE5PMURBWkVRUExNMVRKRU9RSUdUNE9YWlQzUUUvLy9KQkdVTkhMUUNESy8yVldVWFA1M1RTUVJJVVVPVTBHSlVRRkdKUk8wQU5XUlVRRkdKUk8wQU5XUlVRRkdKUk8wQU5XUlVRRkdKUk8xVFIvTUxNQjQrTFU4RUtBTjlJVEpJMC9MS1NURUlDWDhIR0lHTzkyTDU4TEk1Uk5VM0ZHVk5KVEpGTjVZTko2TkwzRjhBNk1JUjhZVDVGSEVNNDRQREIrVENSM0hQTzZEUDA2UlhaSkJOWEFXS05aVVU5TTlFQUVUTFA4MDFRVDFVTzBGQVdMTlZJMU1JVFlBSE4vWlpSSytJWE0yRkVKT0hSRlZYVktYQ05MOTFRTlI1RTZHM1lRNEg3UzMrTFJON0tZUlcxVlVFQTEyTjdWSkg4QURJQ0kyR1ZENDVPSlZIS09PS0YrVERFT1k2Q1RGRVlHQ0gvV1pXUVRCQ0Q3SElESlg5WEpDM0lCSEhYL1lRSERNOUZVNFdDWlJNQUlPSkZMSk04U05UQzhSWjJESEdLOEFOQktGWVU1K1JTR1VSOUlKK0w3M1UrQlkxTERPWkZUTThTL1ZHWVlaMS9QM1BTQ0FENFE0SzMvK01ITENZRVZQVlNaV1lFOUJSRUFVWVlWQldBOExLTlBNN1dEVVZWMlFBRThTVitaU0VZTU5TWk5IWTZaRzREQVU5R0srUUFZQkpMQ0VGQkpUVTAyQjRSR0xGK0U5OVNNS0RSWlhIOUxBK05ZNUlZREpSRi9UVEszQTJDRllXRldLTURSNVpZUkVQQVdGOFBaNEs0VUlOWkxSVzkwTlFDSVdUVFFYRTJXVFJXMlUrNkErRFpUTlIrRCtDVklDTUtWQVVaRC82S0lTRVEzUUs0R043V0NQS0pNSzZKU1dZWkVMR0VYWk1SSUtETEI2R1NZUFdBVitQRDBONDdXVDJZUUFYOVdHL1BRWkNDMEFOKzlHM1pHSjI5L0ExWEVOOVNNSUhVRlFPRFBXSDVSQkRNTFpEQk9CVU1BREgzWVdFNFQvNktJUko4RVNEU0kxSktZMU9WVVpHOVZITERVQVdFWUpQSEJFTEg1TFdSSUVVSDFGR0tETUk4QzhISFE4S1hKMlYySUhTM0U5NFYwTjJIWCtTQ05RTVBJWVNXNElCRVQzRkZFRkdHVEhKMzJXSFNER1k3TllERy83NDZDREpZUkovL0lFSkkzSlM5NjBaMlU0MUpUUFc4NUEyOUVDWExPQkczT1dWN1kvQU9BQVVNWTRFMlhJV1BNTlYwWUNLM0JJRVBUWEZRSDNFMzYxNVRINFBUL1hCL1dBRFJJVFo4WTVaRkhaVS9EN1RQRjhJQVNWQ0hLR1BTQkhaSUZBVThOWkVHRCtaTS9NRFcxL0JYVU1UTktEVFBVWlcvSDBSSEpCWjRKVE9HTVZIRjY3TU5SSFhYR0Y5U01MVjJXMForUERNV0RHRk5YMFFRR0ZIS0ZDWTlJTEhPRExUVFBIREZYL0NQNlZMWEdBVlM0SUwwT1VTVlNVTkxONEc0REhWTk9UU1M5TEwxWEUvTjNZQVFHNlJaQzA3WkRaME5GRkcxWUJMUE82VVZZQ1lTREtFWjhIRFhFREFCS01CVFNRMFFKSVRHTVpCQ0sxN1JQU1ArM09GUERZMTBOVFRQT1RQMFNGUDBZM1UwNERYNVBJTzVCRTJYVk9VUEFZL0ZQRStIU1ZNVVlCVkNBRjFWNUFMTUtIMllOSlIvSFo4UldaSk9LOFVVODNEMy8rMVBINUVEM0E5N0VSU01JVDdCWVkwTFFFRDRPNkFMUjNMUEJFRUtORlNERUk2UFNHTDFBWkRJT1FXTjc2QlpJTVZDRzNUMFlIVllSQkRaMUpVU1RBV1k3RUhLMTM3T0o5SEovN0lHNjM0SDdMRzg0S0JaMitTRzZKTk0rNzRFTVBGRjlNUUo2TEQwVFlHRVJXT1kvRUFXUytFK1FJTVFQMFlTUzFGTUpES0ZLOUtZSEJJWldSVitCNEVYU0pPTU1MWUZBUTdKOE1OVUlHV0o2WU5LTkZTV0FYUEpKVVBWSFNFK1dRU1hYRk5IUUYvVDQvRE1DQVgxQkNFWkIxU01JMUxVT09XWUIrU1BITUFITkJMMlFON0VUTzVKSFZaTDY2SlczRkVOSEhOWUNIQ09SSzdFR0xHSlZYQ1FXTk9VS0xVQ0FMQjBORkdWVVVXM0RJTFhMTDBDVVBDR0gySkNQK1VML1dZWCtESVlQNlNYU1IyVkpKV0FEQkswS05CVk5JVFJQS1dDV0dZMDZRRVNaSjI5QlNFTUpHQkNRUlNOSVFOQ1FJUUpFSEZHRFRBU0NJTFNOSjJYQVZVVzVRU0pOT0RIOVVVUFhGREdHWExKWVI1WFBPV1RCNk9XTlhIWloxRlhRT0s0UUYyWlJBQUVCNlFKRVFHTUlWVzBNVVNHVEJQV1ZKTFVVTlY5TUFUU0UwK0xLNEtJVzZKMDdJQVpTTERWQTFSNU1FRUVWTFRDL0YzNU9RNUNSWk02QlBWS1BDTjJPTzRXNk5JRU9MRkVONFBLWEIrM1lYVFIrUjBIVURGMEtaV1dWV1NDSTJOMkxJWU1ZVlNCUk1QVDZJU05HQkVJRUJWQllLTklLQVVYT0tWSlpSSERHOVNJME5ZUUtSTVVJUU5VV0tJVklaK0JPRlJITFhPS0tLT0o4UkYySlFTWlBZQksxRlNEVUdLQk9DRkdWQkhKU1RXUUVDSFo4QlJTVUtFV1NMU1dJOE9ZQ0NHVlVKVlVHTkROS1VTVTdOM05JSVpSRUVWSkNFRVhPWFE0WkVORUowSEFHTEYzUTFVV1NZTUlRVVlBTlIxSUNIWEZZVEpFRFhJVkpTU043T1FIQ01ZVFFRRzVSS0MvR1FQT1dUVk43SVlONktLWVlRU1FZWUNZTk9JTFFNRkhJMUFKKzUrNkdQWVBWQkpXUDFCVE1LWElZTTVWSUZUQTVXRUpSWkVZQkJWTUJLRFA1UUVFOUpLQkI0MkdDSENNVFovQUZQTlNHTFREVFcxSlVMWUFJMktFSEJKRkEzQVNLTTArQlNOWExYTU82Qzg3TUozWFVXT09QS0VaMk5WOU9LTVQ1TVJYNjEwVjBGQ1VaR0NEUjRLM1Y4VVNFTEtTMElLM0lJSFBBSE1ZSk5RQ0QvUCtVMUQ3QVJPUkdKTVZXN1k1RVhKQkE2VUgvSUFUS0hMVFVLQkhMOEZTWkgyV0RWQ0NCSlhRMEFFRUNNMEtKQTFDQkJXRUJPQlhWSDdEWUxFQTRETlNUUkpHQVpDUVVPVSs4U1lOVFlERzROWUM3NEFQRVhXR0xBQVhWL1FBRVJGVVlKS1FZOUlQREhGVVRHNjRGV0QrS080RksvSUdKRk1JNk9JUkxNTUJMVlk2UFpaUERJRk5NVkE3L1BMVTJDUkIxSkNGQUJYRjZQTVFaVkFSVFpNM0IxSjNZSEdIQkhGTU43VVZVVkRHVU9FMk1ZWDA0RUxPT01LVVlSU1hMQTAvQlRXQjNFRFNOQlVLUjNCSisyTDhCTTVNQUdJNEY0REdZVENKSU02RUNVWEFUWFcxMEZTVlVONE1HNUVHOS8yUzA2RlRTRVdLQTFQTllKSVZWTDlCWEVQTCs4T1hCMjVNTFZBTUNVQlUxSEZIQ1VMVEhXSEpDK0NEWlhFUzVWQVhUMElJRTcwUVIwSUhIVTNLVVBIL1VINUg4UENFTkxSWEpFUE1INk1NT1VMLzhITU9OWDU4S09XVENRN0pSWE9NV1JKR1ZUSFM4T01WRVJESFBJV0JDVEVSVlUrL1BDQVJGR1RVU05GWUtPU0FBUUZaL0RLRFFRMDdIR0pXS0FPRy9CSlNOVEREOFdNSkZJVkhOU1RWU1NJVUFKOVNEWFRJS0tZQ0NVWkNNRVg2TVRTOS9GQUJBUFhGR0hQQkJJQ09ZMVZISUtKVUdXUlkwVE9NRVZMWVYwRDNLSUtTWkgzWFVLUktCUUFDU0xLTE5PWU5RTDZBQkNIVVZOWUZXVkdBL0tVVkRLU1FYRTlSWVBUUU1XVDBKRlU0TE9YU0VPVU1ORjVIVUtSVFRJUFExR1lMQVdQUUU4Vkg1WTJIUFVUQ1RNQllWU1BPSllLTVpNWUdLVUk2U1FPSVhSMVlBVThSV0xRQS9ZWUdCUFZGUS9LTkpDVkVXVVJJQllWUUlOR05TVVRPNk40T0M3TlRHV0JSUEpLVVlJUU1LVzVSVTNTRVFPSkJYWE5SU0pLMDFLVFBOQlkxTFdTUDVBUUlGWFBCMkFaVUdHT0hYOFZESkYwNEhUL0xLRVBaMFpXMENPVlFPTExCRU1BNlBSWUgwVUlITlBQVThNU1VaQVJZTUw2WU5YOFRYTElJRktESUZBNzlRQ1VTTFNSUUpLUEZZU0hNTEE1VzlBWjlNL1RPQlRaTzlSSkc3K1ZDQzVQUkIxWUgvTUxQS1BNV1VRVCtYOFRPU0lSQkFPL09aWkNRK0hWUUZSWS8xUENWUVlLVDNZVEpaWkFROUZLSVc0U1ZRSE5CWVhLTkMvSlRUTFkvSitSSUMvU0ROV0VZRlJDMzBSSUkyR1M3R0ZCOC9NM1dIUk1IRlhLOFc4TFhFU1RVVlpaWjlFV0tPQlNMM1IrVktLU0tIMEhQWDNLUFZVVlFTWlE1WEwrVlNKQTZJRlZXSUhKUkJORk1MWlZLRVVVVzZRS1dOSUlTNTVKS0NJNzZZVEQ5Q1UyVkQxSFdUQjNJS0pVRU1XWEQ0TUdENlFPUFBIUVFGSU5HQ1BDQVpYMVlDT0pTTlBST0M0WEZCUlpHWlpUU0JHREJYWjVCMllJTU9MTlhTT0dQMEEzU0FMT0pWTkI4VEtCR0VFTDUxTFpZOE4yRUdMVUFaVFJCMUlIRERXVEdMTk82RTZZRk1IUEREQUxEUDFXSlNBRUtVNURLS1lKNlhBSEVKQVpZQkZKWFFCWFhFWkJZTVQ0ME1YWDk4Qk8yUlpHWVFQSlIxNkJLVVFQTEdKRDlFUEFRUFVDWUtVVCs3SVlDOFg3VzMvTllLMUZBRFlFV1JHSVBKUkdPMU1LSDNLUllHTDhMQkFXRjQ2T0krVE5JQlFMU0NIWC9HOUdVNUpFMUJTUjJPUE9LU01WSVBMLy9XWVpTU0NBTDhaQUFDRUZXS1ZLOU85UlhPUE5MSlpaRFVBVkNRQUM3S0JCOE1GL0pCL0NVUldHOCtISzhLTzRMWUhYTzNET0FCUFU4ME1ERk9ZS0xDTloySUhDK0dPQUNDWUJKNzZYVTVMNC9PTk8xU0VRUzVUTFFaQzhVVFpNNldIVUpQVDlKSkZNT1FMQTIwRUJUSVZTT01IS0tIWU9JSkY2RzNFMkFKVUtVR09GWEpDRFhZUzBRUVBNMVkwTjY4Q1ZRWExJRzZaS0pLMlhZU0xZVkcwREFSRFBUUllRL1lHNkhNTlVZTlJJQ0tXWTlMMDBHNFVYVEdISUhXOUxMR09ZQkJRT0hIQ0ZJNlZKVFUxL1Y0R1VJVVdSU042QlhUMzVRTENJSzlUS1dJNEtFNkJORTJQSElOTElTWE4zUVpFVEtDRkpGQlZPMjlLMjgxWkZWUkFLL0dFRUVUSEpPWU1IQllWSUpRQjlaVEVUTE9RRjZHRjVYOUhXR0ROUDlTQzc3RTZIKzAwRkI1R0pTWVBZU0lSVVNIQjRSWVFIWFBCSktBU0U0Q0xGRzc4RUU5TVkrVEsvT01MRjIvRjZDQkdNQlJOWkRaQy85TkZKMEVQTU1FNlk4RUYrN1lNWUxKOFdZNFEySDhPRElKT01QR0dJTC9BMkc2TUVLM0gwNUNEWU1BNC9IK1lKWTROL1pQTlRUUEErU0lXWFVVUUcvQkNUSVNFUjRUNkI4TE9JVldRSjA1QVdGVEFDUklQT09IWDVPWVZYVlNBWU1FVkpSN01EOVZNM1hKRElTWk9YUkRZS1NKSkpEM1pTSlROOEZKRk1CWk5JMFFKSEJIRFBMV0Q5VzJRK1E3Qy82SERMNjBRR01PM0lNWUU4WENSWkVFU1NGRzJLOEdaOUlYRFhWQkJQR0tGUUhaLzE4UTRQWlZNQ1JVV0xGK0xQUFIySUhCUlc2SEFMNlJOUkkyTTIzRE9XK0JXRlMxWUdQSVZQL1ZEQlM3TEpRS1FIVzVRTjlRNVhXTUpCOFZWQlBFWUdGMDdJODNXRFRWTEdUT1hQQUQxTS9VSllKVFU5U0hBWEVRRENDMkFOK0VZOEpHSlRZSVpDMkJaSTJJREc1Q0JOK1I3NUtFUkdUQ05LUjFNR1ZaU0ZPVDRaTC9YVThIQy9KVzdWNDVKTjQ1VUVOMjNSVTdWUkRYODdNVFNFRStQTjFPRkY1T0Y1UE5RQ1hHM0xFS1lVWVpHUENRS05SSFZOUlIwUFlOV0pTQk5RRUdCR1lIRVJYNFpaQ0JGQ0JRRTE1WTM2TlJDRUJSRlJSSk1OTFQ1MUdGMExaL1BMT0ZQUys5SkgvTVNJTlpRUFNHSVlPRzcvVkY3T0JUNjJDL1pKKzA3VlJWOUVBVUwyTkxMVDBYMVpWWFhNTk5VRUhLSUE2UklPWVFEQ1Y4RDhQUUU1Tk5OVVhCV1lFRiswSkZBOVFVWkpSOEJTUVVHTVpYMTBHWTVFVzArVVpNRTBXQlRHTEtJVklVSEpRT0lDQkdGMUpZVTJPS1hEN01ZRzIvVk5KWlhaSUdHSUFRRFVXUkRKWTJRUVZPQ05VVC85UUhDV0JaODdQQ1JHUkRMRktMWEE0QUVaWUJMS0FDT1VLNEpGUVdVRUJSUVRFUEhHTkMrTEtPMzlOS1RWQ0JJSERRTFdHUUFRQlhXVkxWTjFMQzBNWVNRK1NSSFlIRFZZQ0RQWUhIUEZJQk80SUREVTVMRkpZRUVPSlBLOFo0OTZVSkVJRkFCVjBTVlU4MkVIWk9DRkpJRllPSDVCRk1WMFZLMUhKQ0NGQlBFWE4ySE5IMTFQMlY0T1BMV0ZUWUNXNlQwVElKNlVYQVVRNlBVWUFMWEFLS1QyNTlMMDRSWkFBWVVNVUdNUUs4QTRYV1ZVUVlUS01NSTIrQS9UWVlGTFo5NlVYNk5OSFRDSVhWTFM5UzdGUU5UTkNJVzdUVU9aWi83N1IyWlMrNUFTSCtWU1dKSkdQSUtKUTJZS0xQSFRUUDdIQ0tSTlA2RVhMVk5WTkNRSFFRUzVVU0lON09HWFpEU0lCK1EzWlJPTVBKWkNWVis3TlVTWEVaS1dFU0xSVERYOUMyOVdMUzc0QzFEU0dYNEpSSlRSTkhSTUxLTkdUOFEzQVM5WUNPQk1TWk9UWVFZWS9TSjM5T1gwOUlDSVhKQktVQjFSQVNQQTFDTFBIKzJaWS9EL0VFV0w2RVpTSVYyWE9UUlgrR0lPRUVFT0owRzYxVEJOWlI0UExIVDc0L1hBWjI3VUlDQUU1QUxJT1RLUE5NV0pRR1VYNUROR0tNT1dUTFZQTUhWUzZPTVRQL0pWWDNBVTRYK1pIVFgwRUo2UkpXWU04VUlKRTFFUjZFVFdYS0RaQkMxVVMwQk1SSlFPWlNJWFZQNlI0VVdVMFlVTDFYWVREV1RZTUFPUkRQWlBSQzRNUlYyMkZDUllDSkpVWVRYUDJFRE5MSjFVL0xDWUlSN0ZUSEhKMVlJSFZTVUlYWldWVzlHWDk3T0M4OVQyS1E1VDRLWUdCTjhTMlNISkxMQ0VCWVNSV1NSWkpFOEpNSVRFU05UQ1VWUTA1WEVXWkQ5UDFMMk1QWlRPQlFZREJKU1hZNy9FWlpaN0REQ1o4VVREUEwrUUhVSENRVkwzK0o2QU5RSkJVTlpOVVRaUEwzNUpTWlBXTTNQQkNVSUNaQ1BVUDJCMVhPREFRSEdaQ0VHVFBOQ0xHUExUTzZSQllaRE5RUE0wQUVBWkhRWUdKR0tNN1Y5OFEzUlFNUlU0U0NPR1dQUkFEU1JOWVlJQzVHSU0rRDNIM0tTUFBUVktRVDhCRVpZTERDMlFVSVpOTEZXQ1BTWUk4MldRQkNENEFGTkpRWUpIT1ZOVFpQNStUT0NTUkk1NFlHQlA0MVdNQlg2M09DNUVFTEdISEFZVkFWSU5UVEk4K0VGOUNCMlhWL1dUWStaVDc5UkoxSFRXVFJKUjUxWldKQzNJUkpRNkcvV0NRUVZOU05RWVpFQ1IzQktTVjFPUTRKSktQSlBUWlNMTDBRNTNJTS81V0xOTU9TQjEwTVRDVEpNMktIUFU0NjZPWU1ITS9OWUpQMExQT1NIM1NNWjVLSkpKMEtCT0NZS05MWkxSOENKWVEyVU1LTUdCRlhJUEIyOVE4R0FaOFFFUFkrS0tGQVJPTUxKOU1USkdPK0VPSEJQUUtYN05SQUJKTVhOS0dTVkNVWkhOQVlVN0JJTFpFK0s4QUtLRFpXSzVJR1kxMFpXL1EvRVhDMisxT1ZKSlRHREJKU0hPUkpFU0hFU01KVkxCRVVXUUZUUkc3TVVUVURIWUNKMkJaRU9MSTJEVk4vSURPT0YwM0hSRUtYTUNMSVgxSlFTM09UMVNLMUFHSjFQT1hFU0pJOEFSSlVYUUxJRUwzRjlCRUtSRkNIWjMrWUtZN1o0T1M2WUZMWURORFFWQ1daWkhVVlIxS0daQkhNNFNISldWUldZSlU5V0NMU0dUTVlLU0tZRE5IUlo4RS9aUTdFMktISy9CVEVaSExMV1c5WjVOQjBSSUJMREZCRlpHNFlBMlpaRlYrODc1WUNKRzNVUFRKUEY0TC9TNjZMQUdVQU41QlpRUURVSU9LTjhDRlQ5WkJGWjlRVEhaVzBBWUtYM1VJVU84STdZNUFFWlBNNk5XT1JSRUxYSVE4WkZJVVpWS0NXMFpDQ1pYWlJTRTJUVk1CWFhDVEgzUERFV1FGTEdDK1JXNEFIREUrUkYzQkdJVE1YT01QWFpaQ0ZHTFZEK0VMRlNGT1MwRENWOUNNVitaNTAwSUhTNFM3VFpWQ05PVEpJWFlVV0pZUjJJWU1NNVZBSkRMNUcvVCsxRElWMUFCNVZQS0hNMUROQS9PSlJNTVcvWjRUQU1NRUovWDJNS1ZHUklFTlEwTlhFQjY3VDZTQTUyTCtaV0k4WC9RODdKRkVQQ0xQQk1NUzVIQkhHUTRMTitMOVRMVEJJU1JCQ0NLTVpHTytOU1pZQVlEVlgyMVFMTDNCVzNOWEpNSVNXMktXVERCMllQOExVVEJURlUxK05WKy9GMVlBN1VPME80VytLTC9OUlpZTldXNjdNUlhVWTRYSFFWTVdSQUJVU0FJRUUvTFZBVThRT0dPQVg4WlVDVEYySElaTldZWEJaTDFORkhMVUZJVEJSRUNBWUlPV0VHN1FYMllRRVJLOU5YWDFPOUM1SUpaMjhVUTlRWUxEUzNINUtYUi9LV0JPVk45Ly81K1VaQ0tMUFdETUI3RFFBWEZZNUJEMjlaQ0YxTTZWNUsvK1hEQVk0Q1FDR0VQQkpSTzUrV0dVMEpZRUVXSFRTUktISExIOExDNEhKTlFJV1MvTTYvSlJPTUhaQVNLRlBFNUlYVkNHS1JHUVJFQTkyVExYK0FLRDIvSlgzUjBSTklNVFVLV0s5TElONUlFMSsrVkQ3QlVIQUdTMUQ2MzdUL1QvRU0yVVUvMEhPVlVKU09CMEpSSjRBU0gwQVNVUVNWMzlST0NCUjVTK0ZNSDhBRVE2NVRUVjJURlZOVVJVWkNWWkIxTytaQzhYRCtSRU5ERUdXUlgxMzJKTFNURzVUQjVZN1VYVlFWK01CU09YREE1VjFTTjhCLzk2SC9PWklKRkdIRDhPR1dYT1hGMDVROVArL0dGWEhYN0hVS1pESkhJRlZXUElFUC9BV0JFTFFKWi9PT01NSE8xQVRTT1VBTkdKUk8xQVRTT1VBTkdKUk8xQVRTT0NDRi9BUUlKTVJUK1EvS1pBQUFBQUVMRlRLU1VRTUND",
        "fabricData": [
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            },
            {
                "Description": "Fiber1",
                "Percentage": "100"
            }
        ]
    },
    
    
    */

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
                <TableCell>Codigo</TableCell>
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
