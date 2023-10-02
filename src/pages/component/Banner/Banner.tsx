import { Carousel } from "antd";
import "./banner.scss";
import { useEffect, useRef, useState } from "react";
import NewProduct from "./NewProducts/NewProduct";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Banner() {
    useEffect(() => {
        AOS.init();
    }, []);
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const navigate = useNavigate();
    const slider = useRef(null);
    const [banners, setBanners] = useState([
        {
            id: 1,
            url: "https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/bg_slideshow-1_1920x.jpg?v=1614305454",
            img: "https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/is1_300x.png?v=1637120882",
            des: "Shop and grow vegetable seeds and plants perfect for your home garden. Prize winning  tomatoes, peppers, beans and heirloom vegetables from FreshMart",
        },
        {
            id: 2,
            url: "https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/2_clear_1920x.jpg?v=1614305454",
            img: "https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/is2_300x.png?v=1637121696",
            des: "Shop and grow vegetable seeds and plants perfect for your home garden. Prize winning  tomatoes, peppers, beans and heirloom vegetables from FreshMart",
        },
        {
            id: 3,
            url: "https://freshmart-vinovatheme.myshopify.com/cdn/shop/files/3_clear_1920x.jpg?v=1614305454",
            title: "Powerhouse Vegetables You Should Be Eating",
            des: "Shop and grow vegetable seeds and plants perfect for your home garden. Prize winning  tomatoes, peppers, beans and heirloom vegetables from FreshMart",
        },
    ]);
    return (
        <div className="home_main">
            <Carousel
                ref={slider}
                // autoplay
                autoplaySpeed={2000}
                effect={"fade"}
                dots={true}
                dotPosition={"bottom"}
                waitForAnimate={true}
                infinite
                draggable
            >
                {banners.map((banner, index) => (
                    <div
                        className="items"
                        style={{
                            width: "100%",
                            height: "0px",
                            display: "inline-block",
                        }}
                        key={banner.id + index}
                    >
                        <img
                            style={{
                                width: "100%",
                                // height: "740px",
                                // maxHeight: "100%",
                                display: "inline-block",
                            }}
                            className="items-img"
                            src={banner.url}
                        />

                        <div className="info_banner">
                            {banner.title ? (
                                <div className="title">
                                    <h3 data-aos="fade-right"
                                        data-aos-offset="300"
                                        data-aos-easing="ease-in-sine">
                                        {banner.title}</h3>
                                </div>
                            ) : (
                                <div className="img">
                                    {banner.id == 1 ? (
                                        <div>
                                            < img src={banner.img} />
                                        </div>
                                    ) : (
                                        <div >
                                            <img src={banner.img} />
                                        </div>
                                    )}
                                </div>
                            )}
                            {banner.des && (
                                <div className="des">
                                    {banner.id == 3 ? (
                                        <span data-aos="fade-left"
                                            data-aos-anchor="#example-anchor"
                                            data-aos-offset="600"
                                            data-aos-duration="500"
                                        >{banner.des}</span>
                                    ) : (
                                        <span>{banner.des}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Carousel>


            <div className="main_category">
                <div className="titel_category">
                    <h2>Categories</h2>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quibusdam consectetur dolorem voluptates aspernatur quasi sit quia, quas temporibus. Tempora.</span>
                </div>
                <div className="container_category">
                    <div className="list_category">
                        {
                            categoryStore.data?.map((category: any) => (
                                <div key={category.id} className="itmem_category" 
                                    data-aos="fade-left"
                                    data-aos-anchor="#example-anchor"
                                    data-aos-offset="600"
                                    data-aos-duration="500"
                                    >
                                    <div
                                        className="avatar_category">
                                        <img src={category.avatar} alt="" />
                                    </div>
                                    <div
                                        className="item_titel_category">
                                        <span>{category.title}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <NewProduct />
            <div className="whyChooseUs">

            </div>
        </div>
    );
}
