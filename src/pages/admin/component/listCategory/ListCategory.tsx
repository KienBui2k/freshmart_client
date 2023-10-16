import { useState, useEffect } from "react";
import "./listCategory.scss";
import { StoreType } from "@/stores";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
interface Category {
    stt: number;
    id: string;
    title: string;
    active: boolean;
    avatar: string;
}

export default function ListCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const dispatch = useDispatch();
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const status = useState(false)
    const navigate = useNavigate()
    return (
        <div className="List_category_section">
            <div className="navbar_lc">
                <div className="title_lc_pages">
                    <h2>List Category</h2>
                </div>
                <div className="search_category">
                    {/* <input type="text" placeholder="Search category by name" />
          <span className="btn_search_category"><span>Search</span></span> */}
                    <span className="btn_addNew_category">
                        <button onClick={() => {
                            navigate("/admin/add_category")
                        }}>Add New</button>
                    </span>
                </div>
            </div>

            <div className="show_list_category">
                <div className="header_list_category">
                    <div className="category_stt item_header_admin">
                        <span>STT</span>
                    </div>
                    <div className="category_img item_header_admin">
                        <span>Images</span>
                    </div>
                    <div className="category_title item_header_admin">
                        <span>Title</span>
                    </div>
                    <div className="category_active item_header_admin">
                        <span>Active</span>
                    </div>
                    <div className="category_option item_header_admin">
                        <span>Option</span>
                    </div>
                </div>
                <div className="content_list_category">
                    {categoryStore.data?.map((category: any, index: number) => (
                        <div className="item_category_admin" key={category.id}>
                            <div className="category_stt item_header_admin">
                                <span>{index + 1}</span>
                            </div>
                            <div className="category_img item_header_admin">
                                <img
                                    src={category.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="category_title item_header_admin">
                                <span>{category.title}</span>
                            </div>
                            <div className="category_active item_header_admin">
                                <button
                                    // onClick={() => toggleActiveState(category.id)}
                                    className={`active-button ${category.status ? "active" : ""}`}
                                >
                                    {category.status ? "ON" : "OFF"}
                                </button>
                            </div>
                            <div className="category_option item_header_admin">
                                <span
                                    onClick={() => {
                                        navigate(`/admin/edit_category/${category.id}`)
                                    }}
                                >Edit</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
