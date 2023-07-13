import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button, Box } from "@mui/material";
import { Container } from "./AttachmentsStyles";
import { pluralize } from "@/utils";
import filePreview from "@/assets/images/filePreview.png";
import { useAppSelector } from "@/state/app/hooks";

const Attachments = () => {
    const { mutationSuccess } = useAppSelector((state) => state.product);
    const [filesURLs, setFilesURLs] = useState<string[]>([]);
    const [mmtPreview, setMMtPreview] = useState<string[]>([]);
    const { register } = useFormContext();
    const imagesField = register("fotos");
    const measurementsField = register("medidas");
    const totalLength = filesURLs.length + mmtPreview.length;
    const MAX_PIC_AMOUNT = 7;

    const handlePreview = (e, mmt = false) => {
        e.preventDefault();
        imagesField.onChange(e);

        let attachments: DataTransfer = new DataTransfer();

        if (e.dataTransfer) {
            attachments = e.dataTransfer.files;
        } else if (e.target) {
            attachments = e.target.files;
        }
        const filesSelected = [];
        for (let i = 0; i < Object.keys(attachments).length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            filesSelected.push(URL.createObjectURL(attachments[i]));
        }
        if (filesSelected.length > 0) {
            mmt ? setMMtPreview(filesSelected) : setFilesURLs(filesSelected);
        }
    };

    useEffect(() => {
        if (mutationSuccess) {
            setFilesURLs([]);
            setMMtPreview([]);
        }
    }, [mutationSuccess]);

    return (
        <Container>
            <Button variant="outlined" component="label" className="files">
                Fotos +
                <input
                    type="file"
                    hidden
                    {...imagesField}
                    onChange={handlePreview}
                    accept="image/*"
                    //multiple
                />
            </Button>
            <Button variant="outlined" component="label" className="files">
                Tabla de Medidas +
                <input
                    type="file"
                    hidden
                    {...measurementsField}
                    onChange={(e) => handlePreview(e, true)}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    multiple
                />
            </Button>
            <Box className="preview">
                {filesURLs.length > 0 || mmtPreview.length > 0
                    ? `${totalLength} ${pluralize(
                          totalLength,
                          "archivo"
                      )}  ${pluralize(totalLength, "seleccionado")}`
                    : "No hay archivos seleccionados"}
            </Box>

            <Box
                className={`previewImages ${
                    (filesURLs.length > 0 || mmtPreview.length > 0) && "grow"
                }`}
            >
                {filesURLs.length > 0 &&
                    filesURLs.map((file) => (
                        <img key={file} src={file} alt="Selected file" />
                    ))}
                {mmtPreview.length > 0 &&
                    mmtPreview.map((file) => (
                        <img key={file} src={filePreview} />
                    ))}
            </Box>

            <span
                className={`more ${totalLength > MAX_PIC_AMOUNT && "growMore"}`}
            >
                + {totalLength - MAX_PIC_AMOUNT}{" "}
                {pluralize(totalLength - MAX_PIC_AMOUNT, "archivo")}
            </span>
        </Container>
    );
};

export { Attachments };
