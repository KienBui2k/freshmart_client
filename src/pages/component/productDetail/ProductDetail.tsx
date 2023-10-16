import { useNavigate, useParams } from "react-router-dom";
import "./product_detail.scss"
import { Product } from "@/interfaces/Interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { ReceiptDetail } from "@/stores/slices/user.slices";
import { message } from "antd";
import { guestCartActions } from "@/stores/slices/guestCart.slice";

export default function ProductDetail() {
    const [product, setProduct] = useState<Product>()
    const { productId } = useParams();
    // const [id, setProductId] = useState(productId);
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(0);
    const productStore = useSelector((store: StoreType) => store.productStore)
    const userStore = useSelector((store: StoreType) => store.userStore)
    const [selectedImage, setSelectedImage] = useState("");
    const [productAvatar, setProductAvatar] = useState("");
    const dispatch = useDispatch()
    const handleImageClick = (smallImgSrc: string) => {
        setSelectedImage(smallImgSrc);
    };
    useEffect(() => {
        const foundProduct = productStore.data.find((item: Product) => item.id === productId);
        if (foundProduct) {
            setProductAvatar(foundProduct.avatar)
            setSelectedImage(foundProduct.avatar)
            setProduct(foundProduct)
        }
    }, [productId, productStore]);
    console.log("product", product);
    const handleSelectOption = (index: number) => {
        setSelectedOption(index);
    }

    // const addToCart = () => {
    //     const cart = userStore.cart?.detail;
    //     if (cart) {           
    //         const foundItem = cart.find((item: any) => (item.optionId == product?.option[selectedOption].id))
    //         if (foundItem) {               
    //             const totalQuantity = foundItem.quantity + quantity
    //             if (userStore.socket) {
    //                 userStore.socket.emit('addToCart', {
    //                     receiptId: userStore.cart?.id,
    //                     optionId: product?.option[selectedOption].id,
    //                     quantity: totalQuantity
    //                 })
    //             }
    //             message.success("Add To Cart Successfully!");
    //         } else {
    //             if (userStore.socket) {
    //                 userStore.socket.emit('addToCart', {
    //                     receiptId: userStore.cart?.id,
    //                     optionId: product?.option[selectedOption].id,
    //                     quantity: quantity,
    //                 })
    //             }
    //             message.success("Add To Cart Successfully!");
    //         }
    //     }
    // }
    const addToCart = () => {

            const foundItem = userStore.cart?.detail.find((item: any) => (item.optionId == product?.option[selectedOption].id))
         
                if (userStore.socket) {
                    userStore.socket.emit('addToCart', {
                        receiptId: userStore.cart?.id,
                        optionId: product?.option[selectedOption].id,
                        quantity: foundItem ? foundItem.quantity + quantity : quantity
                    })
                    message.success("Add To Cart Successfully!");
                }else{
                    let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
                    let findResult = cart.find((item: any) => item.option.id === product?.option[selectedOption].id)
                    if (findResult) {
                        findResult.quantity += quantity
                        localStorage.setItem("cart", JSON.stringify(cart))
                    } else {
                        cart.push({
                            option: {
                                ...product?.option[selectedOption],
                                product: {
                                    name: product?.name,
                                    price: product?.option[selectedOption]?.price
                                }
                            },
                            quantity: quantity,
                        })
                        localStorage.setItem("cart", JSON.stringify(cart))
                        console.log("cart",cart);
                        
                    }
                    dispatch(guestCartActions.setCart(cart))
                }
                
            //  else {
            //     if (userStore.socket) {
            //         userStore.socket.emit('addToCart', {
            //             receiptId: userStore.cart?.id,
            //             optionId: product?.option[selectedOption].id,
            //             quantity: quantity,
            //         })
            //     }
            //     message.success("Add To Cart Successfully!");
            // }
        
    }
    return (
        <div className="productDetail_section">
            <div className="header_productDetail_section">
                <h2>Product Detail</h2>
            </div>
            <div className="body_productDetail_section">
                <div className="product_img col-sm-8">
                    <div className="product_picture col-sm-2">
                        <div className="overfloww">
                            <div className="item_picture">
                                <img src={productAvatar} onClick={() => handleImageClick(productAvatar)} alt="" />
                            </div>
                            {product?.picture.map((item: any) => (
                                <div key={Date.now() * Math.random()} className="item_picture">
                                    <img src={item.image} onClick={() => handleImageClick(item.image)} alt="" />
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="product_avatar col-sm-10">
                        <div className="avatar">
                            <img src={selectedImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className="product_info col-sm-4">
                    <h3>{product?.name}</h3>
                    <div className="productDetail_price">{product?.option[selectedOption].price}</div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptates quidem quae explicabo repellat quibusdam, eius dolorum perferendis id dolorem eaque earum a facilis accusamus?</p>
                    <div className="List_option">
                        {product?.option.map((item, index) => (
                            <span
                                key={item.id}
                                className={`option_item ${selectedOption === index ? 'selected' : ''}`}
                                onClick={() => {
                                    handleSelectOption(index)
                                    setQuantity(1)
                                }}
                            >{item.optionName}</span>
                        ))}
                    </div>
                    <div className="add_to_cart">
                        <div className="set_quantity">
                            <span
                                onClick={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1)
                                    }
                                }}
                            >-</span>
                            <p>{quantity}</p>
                            <span
                                onClick={() => {
                                    setQuantity(quantity + 1)
                                }}
                            >+</span>
                        </div>
                        <div className="btn_add_to_cart">
                            <span
                                onClick={(addToCart)}
                            >Add to cart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
