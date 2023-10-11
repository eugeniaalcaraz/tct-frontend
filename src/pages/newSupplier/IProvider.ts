type Certification = {
  id: number;
  category: 'people';  // 'people' is the only category shown, can be extended
  subCat: 'PSB' | 'QA' | 'SB';  // Define the known sub-categories
};

type Employees = {
  women: number | string | null;
  men: number | string | null;
  total: number | string;
};

export interface IProvider {
  idMerchant: number;
  supplierTypeId: number;
  alias: string;
  vatNumber: string;
  idCountry: number;
  commercialName: string;
  address: string;
  contactPerson: string;
  email: string;
  commercialRelationDate: string;  // Consider using `Date` if date manipulation is required
  estimatedAnualOrder: number;
  anualContract: boolean;
  employees: Employees;
  productTypes: number[];
  certifications: Certification[];
  planet: {
    check: boolean;
    date: Date;
    scope: boolean;
  }[]
}
