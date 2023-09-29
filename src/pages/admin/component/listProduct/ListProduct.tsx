import { useEffect, useState } from "react";
import "./listproduct.scss"
// import AddProduct from "../AddProduct/AddProduct";
import apis from "@/services/Apis";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import EditProduct from "../EditProduct/EditProduct";

interface Product {
    stt: number;
    id: string;
    name: string;
    avatar: string;
    des: string;
    status: boolean;
}

export default function ListProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [takeItem, setTakeItem] = useState(2);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const currentPage = Math.ceil(skipItem / takeItem)
    const navigate = useNavigate()
    useEffect(() => {
        // const [skipItem, setSkipItem] = useState(0);
        apis.productApi.getAll(takeItem, skipItem)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    // setSkipItem(res.data.data.length)
                    setProducts(res.data.data)
                }
            })
    }, [])
    // statusPro[0], isProductUpdated[0]

    console.log("products", products);


    function changePage(pageItemObj: any) {
        apis.productApi.getAll(takeItem, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(pageItemObj.skip)
                    setProducts(res.data.data)
                }
            })
    }
    return (
        <div className="List_product_section">
            <div className="navbar_pro">
                <div className="title_pro_pages">
                    <h2>List Product</h2>
                </div>
                <div className="search_product_admin">
                    <span className="btn_addNew_product">
                        <button onClick={() => {
                            navigate("/admin/add_product")
                        }}>Add New</button>
                    </span>
                </div>
            </div>
            <div className="show_list_product">
                <div className="header_list_product">
                    <div className="product_stt item_header_admin">
                        <span>STT</span>
                    </div>
                    <div className="product_avatar item_header_admin">
                        <span>Avatar</span>
                    </div>
                    <div className="product_name item_header_admin">
                        <span>Name</span>
                    </div>

                    <div className="product_des item_header_admin">
                        <span>Des</span>
                    </div>

                    <div className="product_active item_header_admin">
                        <span>Active</span>
                    </div>
                    <div className="option_show item_header_admin">
                        <span>Option</span>
                    </div>
                    <div className="product_option item_header_admin">
                        <span>Edit</span>
                    </div>
                </div>

                <div className="content_list_product">
                    {products.map((product, index) => (
                        <div className="product_item_admin">
                            <div className="product_stt item_header_admin">
                                <span>{index + 1 + skipItem}</span>
                            </div>
                            <div className="product_avatar item_header_admin">
                                <img
                                    src={product.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="product_name item_header_admin">
                                <span>{product.name}</span>
                            </div>

                            <div className="product_des item_header_admin">
                                <span>{product.des}</span>
                            </div>

                            <div className="product_active item_header_admin">
                                <span
                                    className={`active-button ${product.status ? "active" : ""}`}
                                >{product.status ? "ON" : "OFF"}
                                </span>
                            </div>
                            <div className="option_show item_header_admin">
                                <span>Show</span>
                            </div>
                            <div className="product_option item_header_admin">
                                <span className="edit_btn">
                                    Edit
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='page_box'>
                    <FaAngleLeft />
                    {
                        maxPage.map(item => {
                            return (
                                <span key={Date.now() * Math.random()} className={`item_page ${currentPage + 1 == item.number ? `active` : ``}`} onClick={() => {
                                    changePage(item)
                                }}>{item.number}</span>
                            )
                        })
                    }
                    <FaAngleRight />
                </div>
            </div>
        </div>
    )
}

