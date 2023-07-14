import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { setErrors } from "@/state/features/product";
import React, { ReactNode, useEffect } from "react";
import {
    useForm,
    SubmitHandler,
    FieldValues,
    Path,
    // Resolver,
    FormProvider,
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: ReactNode;
    // resolver: Resolver<TFormValues>;
    id?: string;
    defaultValues?: unknown;
    methods: any;
};

const Form = <
    TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
    onSubmit,
    children,
    // resolver,
    id,
    methods,
}: FormProps<TFormValues>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dispatch = useAppDispatch();
    const { reduxErrors } = useAppSelector((state) => state.product);

    const submit = async (data) => {
        console.log({
            lengthError: !Object.keys(reduxErrors).length,
            reduxErrors,
        });

        try {
            if (!Object.keys(reduxErrors).length) {
                await onSubmit(data);
            }
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
            dispatch(setErrors({ ...methods.formState.errors }));
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
