import * as z from 'zod';
import zSupplierBase from './zSupplierBase';


const zFactory = zSupplierBase.extend({
    employees: z.object({
        women: z.string().default("0"),
        men: z.string().default("0"),
        total: z.string().default("0"),
    }),
    productTypes: z.array(z.string({required_error: 'Requerido'})).min(1, 'Requerido'),
    planet: z.array(z.union([z.object({
        check: z.boolean().optional(),
        date: z.date().optional(),
        scope: z.boolean().optional(),
    }), z.undefined(), z.null()])).optional(),
    people: z.array(z.union([z.object({
        check: z.boolean().optional(),
        date: z.date().optional(),
        scope: z.boolean().optional(),
    }), z.undefined(), z.null()])).optional(),
    process: z.array(z.union([z.boolean().optional(), z.null().optional()])).optional(),
})

export default zFactory;