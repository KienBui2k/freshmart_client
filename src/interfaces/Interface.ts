

export interface ProductOption {
    price: number;
    optionName: string;
    id:number;
    status:boolean
}
export interface Picture {
    image: File;
    url: string;
}
export interface Product {
    stt: number;
    id: string;
    name: string;
    avatar: string;
    des: string;
    categoryId: string;
    status: boolean;
    option: ProductOption[];
    picture:Picture[];
}