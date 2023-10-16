import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './listGuesReceipts.scss';
import apis from '@/services/Apis';
import { Modal, message } from 'antd';
import { Receipt } from '@/stores/slices/user.slices';
import moment from 'moment';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Order {
    id: string,
    email: string,
    phoneNumber: string,
    address: string,
    state: string,
    createAt: Date
}

export default function Order() {
    const state = ["PENDING", "ACCEPTED", "SHIPPING", "DONE"];
    const [orders, setOrders] = useState<Receipt[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [maxItemPage, setMaxItemPage] = useState(10);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const navigate = useNavigate();
    const currentPage = Math.ceil(skipItem / maxItemPage)
    useEffect(() => {
        setIsLoading(true);
        apis.receiptApi.findAll(maxItemPage, skipItem)
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
                    setSkipItem(res.data.data.length);
                    setOrders(res.data.data);
                    console.log("oder", orders);

                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => {

            })
            .finally(() => {
                setIsLoading(false); // Kết thúc loading
                // setProductVisible(false);
            });
    }, [])

    function changePage(pageItemObj: any) {
        apis.receiptApi.findAll(maxItemPage, pageItemObj.skip)
            .then(res => {
                if (res.status == 200) {
                    console.log("res.data", res.data)
                    let maxPageArr: any[] = [];
                    for (let i = 0; i < res.data.maxPage; i++) {
                        maxPageArr.push({
                            number: Number(i) + 1,
                            skip: res.data.data.length * Number(i)
                        })
                    }
                    setMaxPage(maxPageArr);
                    setSkipItem(res.data.data.length)
                    setOrders(res.data.data);
                }
            })
    }

    return (
        <div className='orders-wrapper'>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Receipt ID</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created</th>

                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? <div className="d-flex justify-content-center loading-wrapper">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : orders?.map((order, index) => (
                        <tr key={Math.random() * Date.now()} className='order'>
                            <td>{order.id}</td>
                            <td>{order.user.userName}</td>
                            <td>{order.total}</td>
                            <td className='optionState' onClick={(e) => {
                                if (order.status == "DONE") return
                                let curStateIndex = state.indexOf(order.status);
                            }}>
                                <select className='optionState' disabled defaultValue={order.status}>
                                    <option value="PENDING">Pending</option>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="SHIPPING">Shipping</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </td>
                            <td className='date'>{moment(new Date(Number(order.createAt))).format('DD/MM/YYYY')}</td>
                            <td>
                                <span className="material-symbols-outlined" onClick={() => {
                                    navigate(`${order.id}`)
                                }}>
                                    detail
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='page_box'>
                <FaAngleLeft />
                {
                    maxPage.map(item => {
                        return (
                            <span key={Date.now() * Math.random()} className={`item_page ${currentPage + 1 == item.number ? `active` : ``}`} onClick={() => {
                                changePage(item)
                            }}>{item.number}</span>
                        )
                    })
                }
                <FaAngleRight />
            </div>

        </div>
    )
}