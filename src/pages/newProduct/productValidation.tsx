import * as yup from "yup";

const required = "Requerido";

export const productValidation = yup
    .object()
    .shape({
        temporada: yup.string().required(required),
        tipologia: yup.string().required(required),
        existingQuality: yup.boolean(),
        localizacion: yup.string().required(required),
        calidad: yup.string().when("existingQuality", {
            is: true,
            then: yup.string().required(required),
        }),

        description: yup.string().when("existingQuality", {
            is: true,
            then: yup.string(),
            otherwise: yup.string().required(required),
        }),

        fabricDescription: yup.string().when("existingQuality", {
            is: true,
            then: yup.string(),
            otherwise: yup.string().required(required),
        }),
        peso: yup.string().when("existingQuality", {
            is: true,
            then: yup.string(),
            otherwise: yup.string().required(required),
        }),

        ["composicion-0"]: yup.string().when("existingQuality", {
            is: true,
            then: yup.string(),
            otherwise: yup.string().required(required),
        }),

        ["porcentaje-0"]: yup.string().when("existingQuality", {
            is: true,
            then: yup.string(),
            otherwise: yup.string().required(required),
        }),

        descripcion: yup
            .string()
            .max(
                1500,
                "Mmm parece que tu descripción es muy larga, prueba con menos caracteres"
            ),
        nombreDelProducto: yup
            .string()
            .max(
                50,
                "Mmm parece que tu nombre es muy largo, prueba con menos caracteres"
            )
            .required(required),
        anio: yup
            .string()
            .max(2, "maximo 2 numeros")
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
        costo: yup.string().matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
        precioVenta: yup.string().matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
        cantidadEmbarque: yup
            .string()
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
        cantidad: yup.string().matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
    })
    .required(required);

/*
    .shape({
    showEmail: yup.boolean(),
    email: yup
      .string()
      .email()
      .when("showEmail", {
        is: true,
        then: yup.string().required("Must enter email address")
      })
  })
}
    
     */

const valueOfExistingQuality = yup.lazy((value) => {
    switch (value) {
        case true:
            return yup.string().required(required);
        case false:
            return yup.string().strict();
        default:
            throw new yup.ValidationError(
                "Value must be a string or `undefined`"
            );
    }
});
