import "./cartdetai.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { PiMinusCircleBold, PiPlusCircleDuotone } from "react-icons/pi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { message, Popconfirm } from 'antd';
import { Receipt, ReceiptDetail } from "@/stores/slices/user.slices";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { Product } from "@/interfaces/Interface";

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';

// const confirm = () => {
//     message.info('Clicked on Yes.');
// };
type Props = {
    item: any
}

export default function CartDetail(props: Props) {
    const [quantity, setQuantity] = useState(props.item.quantity)
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    function handleChangeQuantity(quantity: number) {
        let cart = userStore.cart?.detail;
        if (cart) {
            if (userStore.socket) {
                userStore.socket.emit("addToCart", {
                    receiptId: userStore.cart?.id,
                    optionId: props.item.optionId,
                    quantity
                })
            }
        }
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    const totalCartDetail = props.item.quantity * props.item.option.price;
    const hadleDeleteItem = () => {
        if (userStore.socket) {
            userStore.socket.emit("deleteItemFromCart", {
                receiptId: userStore.cart?.id,
                optionId: props.item.optionId, 
            })
        }
    }
 
    return (
        <div className="cart_item">
            <div className="Product_img itemPro">
                <img src={props.item.option.product.avatar} alt="" />
            </div>
            <div className="Product_name itemPro"><span>{props.item.option.product.name}</span> </div>
            <div className="Product_price itemPro"><span>{formatter.format(Number(props.item.option.price))}</span> </div>
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
                        hadleDeleteItem()
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
