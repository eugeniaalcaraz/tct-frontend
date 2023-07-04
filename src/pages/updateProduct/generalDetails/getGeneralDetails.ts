import { OptionsType } from "@/types";
import { getNameById, getSeasonById } from "@/utils";
import dayjs from "dayjs";

export const getGeneralDetails = (data, allSeasons, managementUnit,
    tipology,
    industries,
    concepts,
    lines,
    bodyFit,
    rises) => {
    return[
        [
            { label: "Nombre", data: data['name'], name: "name" },
            {
                label: "Temporada",
                data: getSeasonById(data['idSeason'], allSeasons),
                select: true,
                options: allSeasons?.map(
                    ({ IdSeason, SeasonName }): OptionsType => ({
                        Id: String(IdSeason),
                        Description: SeasonName,
                    })
                ),
                name: "idSeason",
            },
            { label: "Año", data: data['year'], name: "year" },
        ],
        [
            {
                label: "Fecha de embarque",
                data: dayjs(data['shippingDate']).format("YYYY-MM-DD"),
                name: "shippingDate",
                date:true
            },
            {
                label: "Fecha depósito",
                data: dayjs(data['warehouseEntryDate']).format("YYYY-MM-DD"),
                name: "warehouseEntryDate",
                date:true
            },
            { label: "", data: "", name:"", },
        ],
        [{ label: "", data: "", name:"" }],
        [
            {
                label: "Unidad de gestión",
                data: getNameById(data['idDepartment'], managementUnit),
                select: true,
                options: managementUnit,
                name: "idDepartment",
            },
            {
                label: "Rubro",
                data: getNameById(data['idIndustry'], industries),
                select: true,
                options: industries,
                name: "idIndustry",
            },
            { label: "", data: "", name:"" },
        ],
        [
            {
                label: "Tipología",
                data: getNameById(data['idTipology'], tipology),
                select: true,
                options: tipology,
                name: "idTipology",
            },
            { label: "Peso", data: data['weight'], name: "weight" },
            { label: "", data: "", name:"" },
        ],
        [
            {
                label: "Concepto",
                data: getNameById(data['idConcept'], concepts),
                select: true,
                options: concepts,
                name: "idConcept",
            },
            {
                label: "Línea",
                data: getNameById(data['idLine'], lines),
                select: true,
                options: lines,
                name: "idLine",
            },
            { label: "", data: "", name:"" },
        ],
        [
            {
                label: "Body Fit",
                data: getNameById(data['idBodyFit'], bodyFit),
                select: true,
                options: bodyFit,
                name: "idBodyFit",
            },
            {
                label: "Tiro",
                data: getNameById(data['idRise'], rises),
                select: true,
                options: rises,
                name: "idRise",
            },
            { label: "", data: "", name:"" },
        ],
    ];

}

export const getBottomRows = (data) => {
    return   [
        { label: "Descripción", data: data['detail'], name: "detail" },
        {
            label: "Proyecta",
            data: data['proyecta'] ? "Si" : "No",
            name: "proyecta",
        },
    ];
}