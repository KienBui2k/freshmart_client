import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSearchAlt2 } from "react-icons/bi";
import "./Searchh.scss"
import { useEffect, useState } from 'react';
import apis from '../../../services/Apis';
import { Spin } from 'antd';

interface Product {
    id: string;
    name: string;
    avatar: string;
    active: boolean;
}

// Define a union type for the allowed placement values
type OffcanvasPlacement = 'top' | 'bottom' | 'start' | 'end';

interface OffCanvasExampleProps {
    name: string;
    placement: OffcanvasPlacement | undefined; // Use the defined union type
}

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Product[]>([]);

    // let timeOut: any;
    // function search(e: any) {
    //     clearTimeout(timeOut);
    //     if (e.target.value == "") {
    //         setSearchData([])
    //         return;
    //     };
    //     timeOut = setTimeout(async () => {
    //         //  call api
    //         setSearchStatus(true)
    //         try {
    //             if (searchStatus) {
    //                 return
    //             }
    //             let result = await apis.productApi.search(e.target.value);
    //             if (result.status == 200) {
    //                 setTimeout(() => {
    //                     setSearchStatus(false);
    //                     setSearchData(result.data.data);

    //                 }, 1500)

    //             } else {
    //                 // failed
    //             }

    //         } catch (err) {
    //             console.log("loi call api search");
    //         }
    //     }, 600)

    // }
    return (
        <>
            <div onClick={handleShow} className="nav_search_btn"><BiSearchAlt2 /></div>
            <Offcanvas className="seach_main" show={show} onHide={handleClose} placement={placement}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='search_top'>
                        <div className='search_input'>
                            <i style={{ padding: "0 15px 0 0" }} className="fa-solid fa-magnifying-glass"></i>
                            <input className='inputSearch' type="text" placeholder='what do you need ?' />
                        </div> </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='search_body'>
                    <div className='container_search'>

                        {/* <div className="loading">
                            <Spin indicator="https://png.pngtree.com/png-vector/20200224/ourmid/pngtree-colorful-loading-icon-png-image_2152960.jpg" />
                        </div> */}

                        <div className='container_search'>
                            <div className='search_item col-sm-3'>
                                <div className="img_item_search">
                                    <img src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/57_360x.jpg?v=1586053672" alt="" />
                                </div>
                                <div className='name_item_search'>Name product</div>
                            </div>
                            <div className='search_item col-sm-3'>
                                <div className="img_item_search">
                                    <img src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/57_360x.jpg?v=1586053672" alt="" />
                                </div>
                                <div className='name_item_search'>Name product</div>
                            </div>
                            <div className='search_item col-sm-3'>
                                <div className="img_item_search">
                                    <img src="https://freshmart-vinovatheme.myshopify.com/cdn/shop/products/57_360x.jpg?v=1586053672" alt="" />
                                </div>
                                <div className='name_item_search'>Name product</div>
                            </div>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas >
        </>
    );
}

function Search() {
    return (
        <>
            <OffCanvasExample placement="top" name="top" />
        </>
    );
}

export default Search;