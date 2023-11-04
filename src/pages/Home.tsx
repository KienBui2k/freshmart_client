import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./footer/Footer"
import "./home.scss"
import Navbar from "./Navbar/Navbar"
import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "@/stores"
import { Receipt, User, userAction } from "@/stores/slices/user.slices"
import { Modal } from "antd"
import { guestCartActions } from "@/stores/slices/guestCart.slice"

export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    const productStore = useSelector((store: StoreType) => {
        return store.productStore
    })
    // const [subTotal, setTotal] = useState(0)
    // const subTotal = userStore.cart?.detail?.reduce((total: number, item: any) => {
    //     return total += item.quantity * item.option.price
    // }, 0)
    useEffect(() => {
        dispatch(guestCartActions.setCart(JSON.parse(localStorage.getItem("cart") || "[]")))
    }, [])
    useEffect(() => {
        let total = userStore.cart?.detail?.reduce((total: number, item: any) => {
            return total += item.quantity * item.option.price
        }, 0)
        console.log("total", total)
        // setTotal(
        //     total ?? 0
        // )
    }, [userStore.cart])

    useEffect(() => {
        if (!userStore.data) {
            let token = localStorage.getItem("token");
            if (token) {    
                let socket: Socket = io("http://localhost:3001", {
                    query: {
                        token
                    }
                })
                socket.on("connectStatus", (data: { status: boolean, message: string }) => {
                    if (data.status) {
                        console.log("data.message", data.message);
                    } else {
                        localStorage.removeItem("token")
                    }
                })
                socket.on("disconnect", () => {
                    dispatch(userAction.setData(null))
                })
                socket.on("receiveUserData", (user: User) => {
                    dispatch(userAction.setData(user))
                })
                socket.on("receiveReceipt", (receipts: Receipt[]) => {
                    dispatch(userAction.setReceipt(receipts))
                })
                socket.on("receiveCart", (cart: Receipt) => {
                    dispatch(userAction.setCart(cart))
                })

                socket.on("cash-status", (status: boolean) => {
                    if (status) {
                        Modal.success({
                            title: "Đã thanh toán thành công",
                            content: "Cảm ơn bạn đã mua hàng",
                            onOk: () => {
                                navigate("/thanks")
                            }
                        })
                    }

                })

                socket.on("payQr", (url: string | null) => {
                    dispatch(userAction.setCartPayQr(url))
                    console.log("url", url);

                    if (!url) {
                        Modal.confirm({
                            title: "Thanh toán thất bại",
                            content: "Bạn có muốn thanh toán lại không?",
                            onOk: () => {
                                console.log("đã vào 1");

                                socket.emit("payZalo", {
                                    receiptId: userStore.cart?.id,
                                    userId: userStore.data?.id,
                                })
                            }
                        })
                    }
                })

                dispatch(userAction.setSocket(socket))
            }
        }
    }, [userStore.reload])
    useEffect(() => {
        console.log("userStoreCart", userStore.cart);
    }, [userStore.cart])
    useEffect(() => {
        console.log("userStoreReceipt", userStore.receipts);
    }, [userStore.receipts])
    useEffect(() => {
        userStore.socket?.on("connectStatus", (message: any) => {
            console.log("message", message);
        })
    }, [userStore.socket])
    useEffect(() => {
        console.log("productStore", productStore.data);
    }, [productStore.data])
    useEffect(() => {
        console.log("userStore", userStore.data);
    }, [userStore.data])
    return (
        <div className="home_page_section">
            <Navbar />

            <div className="home_page_content">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}


