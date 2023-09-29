import { useNavigate, useParams } from "react-router-dom";
import "./product.scss"
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Interface";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
export default function Products() {
    const [productsList, setProducts] = useState<Product[]>([]);
    const { ctId } = useParams();
    const [id, setCategoryId] = useState(ctId);
    const navigate = useNavigate();
    console.log("id", id);

    const productSrore = useSelector((store: StoreType) => store.productSrore)
    useEffect(() => {
        setCategoryId(ctId);
    }, [ctId]);
    useEffect(() => {
        const filteredProducts = productSrore.data.filter((item: any) => item.categoryId === id);
        setProducts(filteredProducts);
    }, [id, productSrore.data]);
    console.log("1111", productsList[0]);
    return (
        <div>
            <h1>Products</h1>

            {productsList.map((product: Product) => (
                <div key={product.id}
                    onClick={() => {
                        navigate(`/product/${product.id}`)
                    }}
                >
                    <div >{product.name}</div>
                    <div style={{ height: "200px" }}>
                        <img style={{ height: "200px" }} src={product.avatar} />
                    </div>
                </div>
            ))}

        </div>
    )
}
