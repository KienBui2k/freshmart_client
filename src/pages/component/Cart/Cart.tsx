import "./cart.scss"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"
import { StoreType } from "@/stores"
import CartDetail from "./cartDetail/CartDetail"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import RelativeProduct from "./relativeProduct/RelativeProduct"
import CartOff from "./cartDetail/cartOff"

export default function Cart() {
    const useStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })
    interface newGuestReceipt {
        email: string;
        phoneNumber: string;
        total: number;
        payMode: string;
    }
    const text = 'Are you sure to delete this task?';
    const description = 'Delete the task';
    const cart = useStore.cart?.detail;
    const guestCart = guestCartStore.cart
    const [subTotal, setSubTotal] = useState(0)
    const listId: any = []
    cart?.map(item => (
        listId.push(item.option.product.categoryId)
    ))
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const navigate = useNavigate()

    useEffect(() => {
        if (useStore.socket) {
            const Total = cart?.reduce((total: number, item: any) => {
                return total += item.quantity * item.option.price
            }, 0)
            setSubTotal(Total || 0);
        } else {
            const Total = guestCart?.reduce((total: number, item: any) => {
                return total += item.quantity * item.option.price
            }, 0)
            setSubTotal(Total || 0);
        }
    }, [cart, guestCart, useStore.socket]);
    return (

        <div className="cart_section">
            <div className="header_cart_section ">
                <h2>Your Cart</h2>
            </div>

            <div className="cart_content">
                {cart?.length > 0 || guestCart?.length > 0 ?
                    <>
                        <div className="content_header">
                            <div className="Product_img itemPro"><span>Image</span> </div>
                            <div className="Product_name itemPro"><span>Name</span> </div>
                            <div className="Product_price itemPro"><span>Price</span> </div>
                            <div className="Product_quantity itemPro"><span>Quantity</span> </div>
                            <div className="Product_total itemPro"><span>Total</span> </div>
                            <div className="Product_delete itemPro"><span>Delete</span> </div>
                        </div>
                        <div className="content_body">

                            {
                                useStore.socket ? (cart?.map(item => (
                                    <CartDetail key={Date.now() * Math.random()} item={item} />
                                ))) : (guestCart?.map(item => (
                                    <CartOff key={Date.now() * Math.random()} guestItem={item} />
                                )))
                            }

                        </div>
                    </> :

                    <div className="cart_null">Giỏ hàng của bạn đang trống!</div>}

            </div>

            <div className="cart_footer">
                <div className="cart_total col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="cart_total_r1 col-md-12 col-sm-12 col-xs-12">
                        <h3>CART TOTALS</h3>
                    </div>
                    <div className="cart_total_r2">
                        <div className="cart_total_r2_cl1 col-md-6">
                            <span>Subtotal :</span>
                        </div>
                        <div className="cart_total_r2_cl2 col-md-6">
                            <span> <strong>{formatter.format(Number(subTotal))}</strong></span>
                        </div>
                    </div>
                    <div className="cart_total_r3">
                        <div className="cart_total_r3_cl1 col-md-6">
                            <span>Total</span>
                        </div>
                        <div className="cart_total_r3_cl2 col-md-6">
                            <span><strong>{formatter.format(Number(subTotal))}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="cart_btn col-lg- col-md-6 col-sm-12 col-xs-12">
                    <div className="cart_btn_checkout col-md-12 col-sm-6 col-xs-6">
                        <span
                            onClick={() => {
                                navigate("/checkout")
                            }}
                        >
                            Proceed To Checkout
                        </span>
                    </div>
                </div>
            </div>
            <RelativeProduct />

            {/* {
                useStore.cart?.detail?.map((item, index) => {
                    return <div key={Date.now() * Math.random()}>
                        <span>stt: {index + 1}</span>
                        <h4>Name {item.option.product.name}</h4>
                        <p>Trọng lượng{item.option.optionName}</p>
                        Quantity :<input type="number" defaultValue={item.quantity} onChange={(e) => {
                            useStore.socket?.emit("addToCart", {
                                receiptId: item.receiptId,
                                optionId: item.optionId,
                                quantity: Number(e.target.value)
                            })
                        }} />
                        <p>Gía tiền{item.option.price}</p>
                        <h5>Total :{item.quantity * item.option.price}</h5>
                    </div>
                })
            }
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                let payMode = (e.target as any).payMode.value;
                console.log("payMode", payMode)
                useStore.socket?.emit("payCash", {
                    receiptId: useStore.cart?.id,
                    userId: useStore.data?.id
                })
            }}>
                <input name='payMode' type="radio" value={"CASH"} defaultChecked />Cash
                <input name='payMode' type="radio" value={"ZALO"} />Zalo
                <button type='submit'>Thanh Toán</button>
            </form> */}

        </div>
    )
}
