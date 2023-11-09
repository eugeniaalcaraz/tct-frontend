import { getErrorMessage } from "@/utils";
import { getJsonRequest, postJsonRequest } from "./BaseRequests";

const SUPPLIER_BASE_URL = '/supplier';

export const saveSupplier = async (supplierData) => {
  const path = `${SUPPLIER_BASE_URL}/saveSupplier`;
  console.log(path, supplierData)
  try {
    return await postJsonRequest(path, supplierData);
  } catch (error:any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getSupplierFormData = async () => {
  const path = `${SUPPLIER_BASE_URL}/getSupplierFormData`;
  try {
    return await getJsonRequest(path);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};


export const getSuppliersListAutocomplete = async (idMerchant) => {
  const path = `${SUPPLIER_BASE_URL}/getSupplierAutocomplete?idMerchant=${idMerchant}`;
  try {
    return await getJsonRequest(path);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getSupplierList = async (merchantId:string) => {
  const path = `${SUPPLIER_BASE_URL}/getSuppliersForMerchant/${merchantId}`
  try {
    return await getJsonRequest(path);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export const getSupplierListByMerchantFiltred = async (merchantId:string, filters: {[name:string]: (string | string[]) }) => {
  let path = `${SUPPLIER_BASE_URL}/getSuppliersForMerchant/${merchantId}?`
  let filterPath: string[] = []
  if(filters){
    Object.keys(filters).forEach((key) => {
      if(!filters[key] || filters[key].length == 0) return ''
      console.log(filters[key])
      let value = filters[key]
      filterPath.push(`${key}=${typeof value === 'string' ? value : value.join(',')}`)
    })
  }
  path += filterPath.join('&')

  try {
    return await getJsonRequest(path);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export const getSupplier = async (id) => {
  const path = `${SUPPLIER_BASE_URL}/getSupplier/${id}`;
  try {
    return await getJsonRequest(path);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateSupplier = async (updateData) => {
  const path = `${SUPPLIER_BASE_URL}/updateSupplier`;
  try {
    return await postJsonRequest(path, updateData);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
