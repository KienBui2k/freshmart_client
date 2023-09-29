import "./editProduct.scss";
import { StoreType } from "@/stores";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Product } from "@/interfaces/Interface";


export default function EditProduct(props: { id: string }) {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const dispatch = useDispatch();
    const productStore = useSelector((store: StoreType) => store.productSrore);

    useEffect(() => {
        // Tìm sản phẩm trong store với id tương ứng và cập nhật state
        const foundProduct = productStore.find(item => item.id === props.id);
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [props.id, productStore]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Product</h1>
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            {/* Hiển thị các trường sản phẩm khác ở đây */}
        </div>
    );
}
