import { z } from "zod"
import { zSupplier } from "."
import dayjs from "dayjs"



const supplierFormToQuery = (data: z.infer<typeof zSupplier>, formContext: any ) => {

    let certifications:any = []
    
    if(data.planet) {
        Object.keys(data.planet).map((index) => {
            if(!data.planet) return
            let certification = data.planet[index]
            if(!certification || !certification.check) return
            certifications.push({
                "id": index,
                "category": 'planet',
                "subCat": formContext.planetCertifications.find((c:any) => c.id == index)?.subCat,
                "date": certification.date ? dayjs(certification.date).format("YYYY-MM-DD") : undefined,
                "scope": certification.scope ?? false
            })
        })
    }


    if(data.people) {
        Object.keys(data.people).map((index) => {
            if(!data.people) return
            let certification = data.people[index]
            if(!certification || !certification.check) return
            certifications.push({
                "id": index,
                "category": 'people',
                "subCat": formContext.peopleCertifications.find((c:any) => c.id == index)?.subCat,
                "date": certification.date ? dayjs(certification.date).format("YYYY-MM-DD") : undefined,
                "scope": certification.scope ?? false
            })
        })
    }

    return {
        "idMerchant": data.idMerchant,
        "supplierTypeId": data.supplierTypeId,
        "alias": data.alias,
        "vatNumber": data.vatNumber,
        "idCountry": parseInt(data.country),
        "commercialName": data.comercialName,
        "address": data.address,
        "contactPerson": data.contactPerson,
        "email": data.email,
        "commercialRelationDate": data.commercialRelationDate ? dayjs(data.commercialRelationDate).format("YYYY-MM-DD") : undefined,
        "estimatedAnualOrder": data.estimatedAnualOrder.length > 0 ? parseInt(data.estimatedAnualOrder) : undefined,
        "anualContract": data.anualContract,
        "employees":{
            "women": parseInt(data.employees.men),
            "men": parseInt(data.employees.women),
            "total": parseInt(data.employees.total)
        },
        "productTypes": data.productTypes.map((p) => parseInt(p)),
        "certifications": certifications
    }
}

export {supplierFormToQuery} 