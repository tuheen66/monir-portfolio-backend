export type TMedicine = {
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  manufacturerName:string;
  manufacturerDetails: string;
  prescriptionRequired: "yes" | "no";
  expiryDate: string;
  inStock: boolean;
};
