import Offcanvas from "react-bootstrap/Offcanvas";
import { BiSearchAlt2 } from "react-icons/bi";
import "./Searchh.scss";
import React, { useEffect, useState } from "react";
import apis from "../../../services/Apis";
import { Spin } from "antd";
import { Product } from "@/interfaces/Interface";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Define a union type for the allowed placement values
type OffcanvasPlacement = "top" | "bottom" | "start" | "end";

interface OffCanvasExampleProps {
    name: string;
    placement: OffcanvasPlacement | undefined;
}

function OffCanvasExample({ name, placement }: OffCanvasExampleProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false), setSearchData([]), setMaxPage ([])};
    const handleShow = () => setShow(true);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState<Product[]>([]);
    const [takeItem, setTakeItem] = useState(4);
    const [skipItem, setSkipItem] = useState(0);
    const [maxPage, setMaxPage] = useState<any[]>([]);
    const currentPage = Math.ceil(skipItem / takeItem)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    let timeOut: any;
    function search(e: any) {
        clearTimeout(timeOut);
        if (e.target.value == "") {
            setSearchData([]);
            return;
        }
        timeOut = setTimeout(async () => {
            setSearchStatus(true);
            try {
                if (searchStatus) {
                    return;
                }
                setSearchValue(e.target.value)
                let result = await apis.productApi.search(
                    e.target.value,
                    takeItem,
                    skipItem
                );
                if (result.status == 200) {
                    let maxPageArr: any[] = [];
                    setTimeout(() => {
                        for (let i = 0; i < result.data.maxPage; i++) {
                            maxPageArr.push({
                                number: Number(i) + 1,
                                skip: result.data.data.length * Number(i)
                            })
                        }
                        setSearchStatus(false);
                        setSearchData(result.data.data);
                        setMaxPage(maxPageArr);
                    }, 1500);
                } else {

                }
            } catch (err) {
                console.log("loi call api search");
            }
        }, 600);


    }
    function changePage(pageItemObj: any) {
        apis.productApi.search(searchValue, takeItem, pageItemObj.skip)
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
                    setSkipItem(pageItemObj.skip)
                    setSearchData(res.data.data)
                }
            })
    }
    // console.log("searchData", searchData);
    // console.log("searchValue", searchValue);
    return (
        <>
            <div onClick={handleShow} className="nav_search_btn">
                <BiSearchAlt2 />
            </div>
            <Offcanvas
                className="seach_main"
                show={show}
                onHide={handleClose}
                placement={placement}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="search_top">
                        <div className="search_input">
                            <i
                                style={{ padding: "0 15px 0 0" }}
                                className="fa-solid fa-magnifying-glass"
                            ></i>
                            <input
                                className="inputSearch"
                                type="text"
                                placeholder="what do you need ?"
                                onChange={(e) => {
                                    search(e);
                                }}
                            />
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="search_body">
                    <div className="container_search_main">
                        {searchStatus ? (
                            <div className="loading">
                                <Spin indicator="https://png.pngtree.com/png-vector/20200224/ourmid/pngtree-colorful-loading-icon-png-image_2152960.jpg" />
                            </div>
                        ) : (
                            <>
                                <div className="container_search">
                                    {searchData?.length > 0 ? (
                                        searchData.map((item) => (
                                            <div key={item.id} className="search_item col-sm-3"
                                                onClick={() => {
                                                    navigate(`/product/${item.id}`)
                                                }} >
                                                <div className="img_item_search">
                                                    <img
                                                        src={item.avatar}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="name_item_search">
                                                    {item.name}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="container_search">
                                            <span>kHÔNG có sản phẩm nào </span>
                                        </div>
                                    )}
                                    <div className="product_footer col-sm-12">
                                        {maxPage.length > 0 ? <> <FaAngleLeft />
                                            {
                                                maxPage.map(item => {
                                                    return (
                                                        <span key={Date.now() * Math.random()}
                                                            className={`item_page ${currentPage + 1 == item.number ? `active` : ``}`} onClick={() => {
                                                                changePage(item)
                                                            }}
                                                        >{item.number}</span>
                                                    )
                                                })
                                            }
                                            <FaAngleRight /></> : (
                                            <></>
                                        )}

                                    </div>
                                </div>

                            </>
                        )}
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
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
