import {createContext} from 'react'

interface SupplierType {
    id: number;
    description: string;
  }
  
  interface SupplierProductType {
    id: number;
    description: string;
  }
  
  interface Country {
    Id: number;
    Name: string;
  }
  
  export interface Certifiaction {
    id: number;
    description: string;
    type: 'Certificación' | 'Documento';
    subCat: string;
    commentGenericPlanet: string;
    commentGenericQuimicals: string;
    commentGenericMaterials: string;
    commentGenericPeople: string;
    isCheckbox: number;
    category: "people" | "planet";
  }

  export interface ProcessCertification {
    id: number;
    description: string;
    type: 'Dentro de las instalaciones' | 'Tercerizados Directamente o Subcontratados';
  }
  
  export interface MainModel {
    supplierTypes: SupplierType[];
    supplierProductTypes: SupplierProductType[];
    countries: Country[];
    peopleCertifications: Certifiaction[];
    planetCertifications: Certifiaction[];
    productCertifications: Certifiaction[];
    processCertifications: ProcessCertification[];
  }

export const FormStructureContext = createContext<MainModel | undefined>(undefined)