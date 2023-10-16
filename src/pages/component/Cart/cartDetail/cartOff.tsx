import "./cartdetai.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { PiMinusCircleBold, PiPlusCircleDuotone } from "react-icons/pi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { message, Popconfirm } from 'antd';
import { Receipt, ReceiptDetail } from "@/stores/slices/user.slices";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { Product } from "@/interfaces/Interface";
import { guestCartActions } from "@/stores/slices/guestCart.slice";
import { CartItemType } from "@/stores/slices/guestCart.slice";
const text = 'Are you sure to delete this task?';
const description = 'Delete the task';

// const confirm = () => {
//     message.info('Clicked on Yes.');
// };
type Props = {
    guestItem: CartItemType
}

export default function CartOff(props: Props) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(props.guestItem.quantity)
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    function handleChangeQuantity(quantity: number) {
        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        let findResult = cart.find((item: any) => props.guestItem.option.id === item.option.id)
        if (findResult) {
            findResult.quantity = quantity
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch(guestCartActions.setCart(cart))
        }
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const totalCartDetail = props.guestItem.quantity * props.guestItem.option.price


    function handleDelete(itemId: string) {
        console.log("itemi", itemId);

        let cart = JSON.parse(localStorage.getItem("cart") ?? "[]")
        let findResult = cart.find((itemFind: any) => itemFind.option.id === itemId)
        if (findResult) {
            cart = cart.filter((itemFind: any) => itemFind.option.id !== itemId)
            localStorage.setItem("cart", JSON.stringify(cart))
            dispatch(guestCartActions.setCart(cart))
        }
    }

    return (
        <div className="cart_item">
            <div className="Product_img itemPro">
                <img src={props.guestItem.option.product.avatar} alt="" />
            </div>
            <div className="Product_name itemPro"><span>{props.guestItem.option.product.name}</span> </div>
            <div className="Product_price itemPro"><span>{formatter.format(Number(props.guestItem.option.price))}</span> </div>
            <div className="Product_quantity itemPro">
                <div className="set_quantity">
                    <span onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                        handleChangeQuantity(quantity - 1)
                    }} className="minus_btn"><PiMinusCircleBold /></span>
                    <div className="quantity_btn">{quantity}</div>
                    <span onClick={() => {
                        setQuantity(quantity + 1)
                        handleChangeQuantity(quantity + 1)
                    }} className="plus_btn"><AiOutlinePlusCircle /></span>
                </div>
            </div>
            <div className="Product_total itemPro"><span>{formatter.format(Number(totalCartDetail))}</span></div>
            <div className="Product_delete itemPro"><span >
                <Popconfirm
                    placement="top"
                    title={text}
                    description={description}
                    onConfirm={() => {
                        handleDelete(props.guestItem.option.id)
                    }}
                    okText={<span className="custom-ok-button">Yes</span>}
                    cancelText="No"
                >
                    <BsFillTrashFill />
                </Popconfirm>

            </span></div>
        </div>
    )
}
