

export interface ProductOption {
    price: number;
    optionName: string;
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
    status: boolean;
    option: ProductOption[];
    Picture:Picture[];
}