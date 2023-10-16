
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './newProduct..scss';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Product } from "@/interfaces/Interface";
import apis from "@/services/Apis";
// interface Product {
//     stt: number;
//     id: string;
//     name: string;
//     avatar: string;
//     price: GLfloat;
//     des: string;
//     active: boolean;
// }
export default function NewProduct() {
    const navigate = useNavigate()
    const { t } = useTranslation();
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
    const [takeItem, setTakeItem] = useState(6);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        apis.productApi.newProduct(takeItem)
            .then(res => setProducts(res.data.data)
            )
            .catch(err => {
                console.log("err", err);
            })
    }, [])
    return (
        <div className='multicarousel-container'>
            <div className="list_new_title">
                <h2>{t("newProduct")}</h2>
            </div>

            <Carousel
                autoPlay={true}
                // autoPlaySpeed={1000}
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
                        items: 5,
                        partialVisibilityGutter: 50
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
                    <div className='product'>
                        <img onClick={() => {
                            navigate(`/product/${item.id}`)
                        }} src={item.avatar} alt="" />
                        <p onClick={() => {
                            navigate(`/product/${item.id}`)
                        }}>{item.name}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
