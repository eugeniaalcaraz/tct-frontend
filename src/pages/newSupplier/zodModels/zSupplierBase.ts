
import * as z from 'zod';




const zSupplierBase = z.object({
    idMerchant: z.number(),
    supplierTypeId: z.number().optional(),
    alias: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    comercialName: z.string().optional(),
    vatNumber: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    country: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    address: z.string({required_error: 'Requerido'}).min(1, 'Requerido'),
    contactPerson: z.string().optional(),
    email: z.string().optional().refine(value => {
        if (!value || value.length === 0) return true; // allow empty string
        return z.string().email().safeParse(value).success;
      }, { message: "Email invalido" }),
    commercialRelationDate: z.date(),
    estimatedAnualOrder: z.string().default("0"),
    anualContract: z.boolean().default(false),
    })

export default zSupplierBase;

