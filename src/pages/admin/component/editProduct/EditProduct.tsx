import "./editProduct.scss";
import { StoreType } from "@/stores";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Product } from "@/interfaces/Interface";
import { useNavigate, useParams } from "react-router-dom";
import apis from "@/services/Apis";
import { message } from "antd";


export default function EditProduct() {
    const navigate =  useNavigate()
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const productStore = useSelector((store: StoreType) => store.productStore);
    const [isDirty, setIsDirty] = useState(false);
    console.log("product", product);
    const [data, setData] = useState({});
    useEffect(() => {
        // Tìm sản phẩm trong store với id tương ứng và cập nhật state
        const foundProduct = productStore.data.find((item: Product) => item.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [productId, productStore]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIsDirty(true);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    const handleSaveClick = async () => {

        console.log("Saving data:", data);
        await apis.productApi.updateProduct(product.id, data)
            .then(res => {
                message.success(res.data.message)
                navigate("/admin")
            })
            .catch(err => console.log("err", err))
    }
    return (
        <div className="edit_page_section">
            <div className="page_header">
                <h2>Edit Product</h2>
            </div>
            <div className="product">
                <div className="avatar_product">
                    <img src={product.avatar} alt="" />
                </div>
                <div className="info_product">
                    <div className="row1">
                        <span>Product info</span>

                    </div>
                    <div className="row2">
                        <span>Status :</span>
                        <select name="status" defaultValue={product.status ? "true" : "false"} onChange={handleInputChange} >
                            <option value="false">OFF</option>
                            <option value="true">ON</option>
                        </select>
                    </div>
                    <div className="row3">
                        <div className="product_name">
                            <span>Product Name :</span>
                            <input type="text" name="name" defaultValue={product.name} onChange={handleInputChange} />
                        </div>
                        <div className="product_des">
                            <span>Product Des :</span>
                            <input type="text" name="des" defaultValue={product.des} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row4">
                        {isDirty && <span onClick={handleSaveClick}>Save</span>}
                    </div>
                </div>
            </div>

        </div>
    );
}
