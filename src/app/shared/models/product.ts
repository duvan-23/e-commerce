import { Features } from "./features";

export interface Product{
    id:number;
    name:string;
    price:number;
    features: Features;
    id_category:number;
}
