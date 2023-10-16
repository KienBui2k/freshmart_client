import { useNavigate, useParams } from "react-router-dom";
import "./editCategory.scss"
import { useSelector, useStore } from "react-redux";
import { StoreType, store } from "@/stores";
import { useEffect, useState } from "react";
import apis from "@/services/Apis";
import { message } from "antd";
interface Category {
    id: string,
    title: string,
    status: boolean,
    avatar: string,
}
export default function editCategory() {
    const { categoryId } = useParams();
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const navigate = useNavigate()
    const [isDirty, setIsDirty] = useState(false);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [data, setData] = useState({});
    console.log("category", category);
    
    useEffect(() => {
        // Tìm sản phẩm trong store với id tương ứng và cập nhật state
        const foundProduct = categoryStore.data.find((item: Category) => item.id === categoryId);
        if (foundProduct) {
            setCategory(foundProduct);
        }
    }, [categoryId, categoryStore]);
    if (!category) {
        return <div>Loading...</div>;
    }
    console.log("category", category);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setIsDirty(true);
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    console.log("Saving data:", data);
    const handleSaveClick = async () => {
        console.log("Saving data:", data);
        await apis.categoryApi.update(category.id, data)
            .then(res => {
                
                message.success(res.data.message)
                 navigate("/admin")
               
            })
            .catch(err => console.log("err", err))
    }
    return (
        <div className="edit_category_section">
            <div className="category_page_header">
                <h2>Edit Category</h2>
            </div>
            <div className="category">
                <div className="avatar_category">
                    <img src={category.avatar} alt="" />
                </div>
                <div className="info_category">
                    <div className="row1">
                        <span>Product info</span>

                    </div>
                    <div className="row2">
                        <span>Status :</span>
                        <select name="status" defaultValue={category.status ? "true" : "false"} onChange={handleInputChange} >
                            <option value="false">OFF</option>
                            <option value="true">ON</option>
                        </select>
                    </div>
                    <div className="row3">
                        <div className="category_name">
                            <span>Category Name :</span>
                            <input type="text" name="name" defaultValue={category.title} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row4">
                        {isDirty && <span onClick={handleSaveClick}>Save</span>}
                        {/* <span>Save</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
