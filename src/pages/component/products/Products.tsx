import { useNavigate, useParams } from "react-router-dom";
import "./product.scss"
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/Interface";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { BsArrowRight, BsCartPlus } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import apis from "@/services/Apis";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default function Products() {
    const [productsList, setProducts] = useState<Product[]>([]);
    const { ctId } = useParams();
    const [id, setCategoryId] = useState(ctId);
    const navigate = useNavigate();
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const [takeItem, setTakeItem] = useState(6);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const currentPage = Math.ceil(skipItem / takeItem)
    useEffect(() => {
        setCategoryId(ctId);
    }, [ctId]);
    useEffect(() => {
        apis.productApi.findByCategory(id!, takeItem, skipItem)
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
                    setProducts(res.data.data)
                }
            })
    }, [id])
    // console.log("productsList", productsList);
    function changePage(pageItemObj: any) {
        apis.productApi.findByCategory(id!, takeItem, pageItemObj.skip)
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
        <div className="product_section">
            <div className="header_products_section ">
                <h2>Products</h2>
            </div>
            <div className="body_products_section">
                <div className="about_shop col-sm-3">
                    <h2>About shop</h2>
                    <div className="img_about_shop">
                        <img src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/img-vegetables_540x.png?v=1614305453" alt="" />
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid hic ea quo, in amet minus voluptatibus, iste facere nulla sequi laboriosam commodi nam! Sit, vel.</p>
                    <div className="link_category">
                        <h3>Categories</h3>
                        {/* {categoryStore.data?.map((category: any) => (
                            category.active ? (
                                <div
                                    onClick={() => {
                                        // setGetProduct(!getProduct)
                                        handleRenderProducts(category.id)
                                    }}
                                    key={category.id} className="link_category_item">
                                    <span>{category.title}</span> <BsArrowRight />
                                </div>
                            ) : null
                        ))} */}
                        <div className="overflow">
                            {
                                categoryStore.data
                                    ?.filter((category: any) => category.status === true)
                                    .map((category: any) => (
                                        <div
                                            onClick={() => {
                                                navigate(
                                                    `/products/${category.id}`
                                                );
                                            }}
                                            key={category.id}
                                            className="link_category_item">
                                            <span>{category.title}</span><BsArrowRight />
                                        </div>
                                    ))
                            }
                        </div>

                    </div>
                </div>
                <div className="product_shop col-sm-9">
                    {productsList?.map((product: Product) => (
                        <div key={product.id} className="product_shop_item col-sm-4">
                            <div className="product_content">
                                <div className="product_img">
                                    <img onClick={() => {
                                        navigate(`/product/${product.id}`)
                                    }} src={product.avatar} alt="" />
                                    <div className="overlay">
                                        {/* <span onClick={() => {
                                        // handleAddToCart(product.id)
                                    }}><BsCartPlus /></span>  */}
                                        <span onClick={() => {
                                            navigate(`/product/${product.id}`)
                                        }}><TbListDetails /></span></div>
                                </div>
                                <div className="product_info">
                                    <span onClick={() => {
                                        navigate(`/product/${product.id}`)
                                    }}>{product.name}</span>
                                </div>
                            </div>
                        </div>

                    ))}
                    <div className="product_footer col-sm-12">
                        <FaAngleLeft />
                        {
                            maxPage.map(item => {
                                return (
                                    <span key={Date.now() * Math.random()}
                                        className={`item_page ${currentPage + 1 == item.number ? `active` : ``}`} onClick={() => {
                                            changePage(item)
                                        }}
                                    >{item.number}</span>
                                )
                            })
                        }
                        <FaAngleRight />
                    </div>
                </div>
            </div>


        </div>
    )
}

