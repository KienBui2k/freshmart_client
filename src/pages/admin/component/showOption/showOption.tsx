import { useParams } from "react-router-dom";
import "./showOption.scss";
import { useEffect, useState } from "react";
// import { Product } from "@/interfaces/Interface";
import { useDispatch, useSelector, useStore } from "react-redux";
import { StoreType } from "@/stores";
import apis from "@/services/Apis";
import { message } from "antd";
import { productAction } from "@/stores/slices/product.slice";
import { userAction } from "@/stores/slices/user.slices";
interface ProductOption {
    price: number;
    optionName: string;
    id: string;
    status: boolean
}
interface Picture {
    image: string;
    url: string;
}
interface Product {
    stt: number;
    id: string;
    name: string;
    avatar: string;
    des: string;
    categoryId: string;
    status: boolean;
    option: ProductOption[];
    picture: Picture[];
}
export default function EditOption() {
    const dispatch = useDispatch()
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const productStore = useSelector((store: StoreType) => store.productStore);
    const [isDirty, setIsDirty] = useState(false);
    const [data, setData] = useState({});
    console.log("product", product);
    const [optionsData, setOptionsData] = useState<ProductOption[]>([]);
    useEffect(() => {
        // Tìm sản phẩm trong store với id tương ứng và cập nhật state
        const foundProduct = productStore.data.find(
            (item: Product) => item.id === productId
        );
        if (foundProduct) {
            setProduct(foundProduct);
            setOptionsData(foundProduct.option)
        }
    }, [productId, productStore]);
    if (!product) {
        return <div>Loading...</div>;
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, optionId: string) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        if (inputName === 'status' && (inputValue === 'true' || inputValue === 'false')) {
            const newStatus = inputValue === 'true';
            const updatedOptionsData = optionsData.map((option) => {
                if (option.id === optionId) {
                    return {
                        ...option,
                        [inputName]: newStatus,
                    };
                }
                return option;
            });
            setOptionsData(updatedOptionsData);
        } else {
            const updatedOptionsData = optionsData.map((option) => {
                if (option.id === optionId) {
                    return {
                        ...option,
                        [e.target.name]: e.target.value,
                    };
                }
                return option;
            });

            setOptionsData(updatedOptionsData);
        }
    }

    const handleSaveClick = async (optionId: string) => {
        // Lấy ra option cụ thể dựa vào optionId từ optionsData
        const selectedOption = optionsData.find((option) => option.id === optionId);
        if (selectedOption) {
            const newProduct = {
                ...product,
                option: optionsData.map((option) =>
                    option.id === optionId ? selectedOption : option
                ),
            };

            console.log("Saving data for option:", selectedOption);
            await apis.productApi.updateOption(selectedOption.id, selectedOption)
                .then(res => {
                    message.success(res.data.message)
                    dispatch(productAction.setNewProduct(newProduct))
                    // dispatch(userAction.reload())
                })
                .catch(err => console.log("err", err))

            // Tiếp theo, bạn có thể xử lý lưu thông tin của option tại đây
        }
    }
    
    return (
        <div className="edit_page_section">
            <div className="page_header">
                <h2>Option Of {product.name}</h2>
            </div>
            <div className="product">
                <div className="avatar_product">
                    {product.picture.map(item => (
                        <div key={Date.now() * Math.random()} className="item_picture">
                            <img src={item.image} alt="" />
                        </div>
                    ))}
                </div>
                <div className="info_option">
                    <div className="row1">
                        <span>Product info</span>
                    </div>
                    {product.option.map(item => (
                        <div key={item.id} className="row2">
                            <div className="col1">
                                <div className="option_status">
                                    <span>Status:</span>
                                    <select name="status" defaultValue={item.status ? "true" : "false"}
                                        onChange={(e) => handleInputChange(e, item.id)}
                                    >
                                        <option value="false">OFF</option>
                                        <option value="true">ON</option>
                                    </select>
                                </div>
                                <div className="option_name">
                                    <span>Option Name :</span>
                                    <input type="text" name="name" defaultValue={item.optionName}
                                        onChange={(e) => handleInputChange(e, item.id)} />
                                </div>
                            </div>
                            <div className="col2">
                                <span onClick={() => handleSaveClick(item.id)}>Save</span>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
}
