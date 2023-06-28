import * as yup from "yup";

const required = "Requerido";

export const productValidation = yup
    .object()
    .shape({
        //--------PRODUCT CARD---------------
        idBrand: yup.string().required(required),
        idTipology: yup.string().required(required),
        idMerchantBrand: yup.string().required(required),
        idSeason: yup.string().required(required),
        year: yup.string().required(required),
        idDepartment: yup.string().required(required),
        idIndustry: yup.string().required(required),
        idConcept: yup.string().required(required),
        idLine: yup.string().required(required),
        idBodyFit: yup.string().required(required),
        idRise: yup.string().required(required),
        // calidad: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string().required(required),
        // }),

        // description: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string(),
        //     otherwise: yup.string().required(required),
        // }),

        // fabricDescription: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string(),
        //     otherwise: yup.string().required(required),
        // }),
        // peso: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string(),
        //     otherwise: yup.string().required(required),
        // }),

        // ["composicion-0"]: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string(),
        //     otherwise: yup.string().required(required),
        // }),

        // ["porcentaje-0"]: yup.string().when("existingQuality", {
        //     is: true,
        //     then: yup.string(),
        //     otherwise: yup.string().required(required),
        // }),

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
        // anio: yup
        //     .string()
        //     .max(2, "maximo 2 numeros")
        //     .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!"),
        //------TRADING CARD-------
        cost: yup
            .string()
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!")
            .required(required),
        margin: yup
            .string()
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!")
            .required(required),
        precioVenta: yup
            .string()
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!")
            .required(required),
        //--------SHIPMENT CARD-------------------
        idCountry: yup.string().required(required),
        idSupplier: yup.string().required(required),
        fabricCode: yup.string().required(required),
        quantity: yup
            .string()
            .matches(/^[0-9.,\b]+$/, "Solo numeros aqui!")
            .required(required),
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
