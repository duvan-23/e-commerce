import { Features } from "./features";

export interface Product{
    id:number;
    name:string;
    price:string;
    features: Features;
    id_category:number;
}
