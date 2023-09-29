import { useNavigate, useParams } from "react-router-dom";
import "./product_detail.scss"
import { Product } from "@/interfaces/Interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";

export default function ProductDetail() {
    const [product, setProduct] = useState<Product>()
    const { productId } = useParams();
    // const [id, setProductId] = useState(productId);
    const navigate = useNavigate();
    const productSrore = useSelector((store: StoreType) => store.productSrore)
    useEffect(() => {
        const foundProduct = productSrore.data.find((item: Product) => item.id === productId);
        if (foundProduct) {
            console.log("đã có product");
            
            setProduct(foundProduct);
        }
    }, [productId, productSrore]);
    console.log("product", product);

    return (
        <>
            <div>ProductDetail</div>
            <h2>{product?.name}</h2>
            <p>{product?.id}</p>
        </>
    )
}
