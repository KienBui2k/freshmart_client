import "./RelativeProduct.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Product } from "@/interfaces/Interface";
import apis from "@/services/Apis"
export default function RelativeProduct() {
    const navigate = useNavigate()
    // const { t } = useTranslation();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    const [takeItem, setTakeItem] = useState(2);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        apis.productApi.newProduct(takeItem)
            .then(res => setProducts(res.data.data)
            )
            .catch(err => {
                console.log("err", err);
            })
    }, [])
    console.log("products", products);
    return (
        <div className='multicarousel-container'>
            <div className="list_new_title">
                <h2>Sản phẩm liên quan</h2>
            </div>

            <Carousel
                autoPlay={true}
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={1500}
                centerMode={false}
                className="list_new_product"
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 6,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {products?.map((item) => (
                    <div key={item.id} className='product'>
                        <img onClick={() => {
                            navigate(`/product/${item.id}`)
                        }} src={item.avatar} alt="" />
                        <p onClick={() => {
                            navigate(`/product/${item.id}`)
                        }}>{item.name}</p>
                    </div>
                ))}
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
                <div className='product'>
                    <img onClick={() => {
                        navigate(`/product/1`)
                    }} src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/43_1120x.jpg?v=1586053712" alt="" />
                    <p onClick={() => {
                        navigate(`/product/1`)
                    }}>Name Product</p>
                </div>
            </Carousel>
        </div>
    )
}
