import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./receiptDetail.scss";
import { Link } from 'react-router-dom';
import apis from '@/services/Apis';
import { ReceiptDetail, User } from '@/stores/slices/user.slices';

interface Product {
    name: string,
    avatar: string,
    price: number,
    des: string,
    categoryId: number,
    categoryName: string,
    updateAt: Date
}

interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface OrderItemDetail extends OrderItem {
    productDetail: Product
}

interface GuestInformation {
    email: string
}

export default function OrderDetail() {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ReceiptDetail[]>([]);
    const navigate = useNavigate()
    const [productVisible, setProductVisible] = useState(false);

    useEffect(() => {
        if (orderId) {
            setIsLoading(true);
            apis.receiptApi.findById(orderId)
                .then(res => {
                    if (res.status === 200) {
                        setProducts(res.data.data)
                        // setGuestReceiptDetail(res.data.data.guestReceiptDetail);
                        console.log("res", res);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [orderId]);


    return (
        <div className='orderDetail-wrapper'>
            <nav>
                <h3>Receipt Detail</h3>
            </nav>
            <table>
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Product</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : products?.map((product, index) => (
                        <tr key={index} className='orderProductDetail'>
                            <td>{index + 1}</td>
                            <td><img src={product?.option.product.avatar} alt="noImage" className={`${productVisible ? 'show' : ''}`} /></td>
                            <td className='orderProductDetail-name'>{product.option.product.name}</td>
                            <td className='orderProductDetail-name'>{product.quantity}</td>
                            <td>${product.option.price}</td>
                            <td>${product.quantity * product.option.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}