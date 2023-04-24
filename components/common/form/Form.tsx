import { useAppDispatch } from "@/state/app/hooks";
import { setErrors } from "@/state/features/product";
import React, { ReactNode, useEffect } from "react";
import {
    useForm,
    SubmitHandler,
    FieldValues,
    Path,
    Resolver,
    FormProvider,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: ReactNode;
    resolver: Resolver<TFormValues>;
    id?: string;
    defaultValues?: unknown;
};

const Form = <
    TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
    onSubmit,
    children,
    resolver,
    id,

    defaultValues = {
        temporada: "",
        tipologia: "",
        departamento: "",
        ["diseñador"]: "",
        origen: "",
        proveedor: "",
        embarque: "",
        destino: "",
        calidad: "",
        fabricDescription: "",
        peso: "",
        ["composicion-0"]: "",
        ["porcentaje-0"]: "",
        localizacion: "",
        selectedSizes: ["XS", "S", "M", "L", "XL"],
        existingQuality: true,
    },
}: FormProps<TFormValues>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const methods = useForm<TFormValues>({ resolver, defaultValues });
    const dispatch = useAppDispatch();

    const submit = async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            Object.keys(data).map((field) =>
                methods.setError(field as Path<TFormValues>, {
                    type: "server",
                    message: (error as Error).message,
                })
            );
        }
    };

    useEffect(() => {
        if (methods.formState.errors) {
            dispatch(setErrors(methods.formState.errors));
        }
    }, [methods.formState.errors, methods.formState.touchedFields]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)} id={id}>
                {children}
            </form>
        </FormProvider>
    );
};

export { Form };
