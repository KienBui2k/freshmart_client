import "./navbar.scss";
import { TiShoppingCart } from "react-icons/ti";
import { useState } from "react";
import Search from "../component/Search/Search";
import DropdownUser from "../component/Dropdown/DropdownUser/DropdownUser";
import DropdownGues from "../component/Dropdown/DropdownGues/DropdownGues"
import { Dropdown, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { useTranslation } from "react-i18next";

export default function Navbar() {

    const navigate = useNavigate();
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const userStore = useSelector((store: StoreType) => store.userStore)
    // const isLogin = localStorage.getItem("token") || null;
    /* Language setup */
    let LG_local = localStorage.getItem("locales");
    const [selectedLanguage, setSelectedLanguage] = useState(
        LG_local == "en" ? "en" : "vi"
    );
    function setLanguage(language: string) {
        localStorage.setItem("locales", language);
        window.location.reload();
    }
    const [iconLG, setIconLg] = useState([
        {
            id: 1,
            url: "../icon/vn_icon.png",
            language: "vi",
        },
        {
            id: 2,
            url: "../icon/usa_icon.png",
            language: "en",
        },
    ]);
    
    const guestCartStore = useSelector((store: StoreType) => {
        return store.guestCartStore
    })
    const { t } = useTranslation();
    return (
        <div className="navbar_section">
            <div className="nav_content">
                <div className="nav_logo">
                    <img src="../logo/logo.png" alt="" />
                </div>
                <div className="nav_center">
                    <div
                        onClick={() => {
                            navigate("/")
                        }}
                        className="nav_item">
                        <span>{t("home")}</span>
                    </div>
                    <div className="nav_item">
                        <Dropdown>
                            <Dropdown.Toggle
                                id="product-dropdown"
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    fontWeight: "500",
                                    color: "black",
                                    boxShadow: "none",

                                }}
                            >
                                SHOP
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {categoryStore.data
                                    ?.filter((item: any) => item.status === true)
                                    .map((item: any) => (
                                        <Dropdown.Item
                                            key={item.id}
                                            onClick={() => {
                                                navigate(`/products/${item.id}`);
                                            }}
                                        >
                                            {item.title}
                                        </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/contact")
                        }}
                        className="nav_item">
                        <span>{t("contacts")}</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/about")
                        }} className="nav_item">
                        <span>{t("about")}</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/blog")
                        }} className="nav_item">
                        <span>{t("blog")}</span>
                    </div>
                </div>
                <div className="nav_right">
                    <div className="one_nav_right">
                        <div className="language">
                            <div className="language_icon">
                                <div className="lg_icon">
                                    <img
                                        src={
                                            iconLG.find(
                                                (icon) =>
                                                    icon.language ===
                                                    selectedLanguage
                                            )?.url
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="language_type">
                                <select
                                    name=""
                                    id=""
                                    value={selectedLanguage}
                                    onChange={(e) =>
                                        setLanguage(e.target.value)
                                    }
                                >
                                    <option value="vi">VI</option>
                                    <option value="en">EN</option>
                                </select>
                            </div>
                        </div>
                        <div className="nav_hello">
                            <span>
                                {userStore.data ?
                                    (userStore.data.firstName ? (`hello ${userStore.data?.firstName} ${userStore.data?.lastName}`) : (`hello ${userStore.data?.email}`)
                                    ) : ("hello!")}
                            </span>
                        </div>
                    </div>
                    <div className="tow_nav_right">
                        <Search />
                        <div className="nav_user_btn">
                            {userStore.data ? (
                                <DropdownUser />
                            ) : (
                                <DropdownGues />
                            )}
                        </div>
                        <div className="nav_cart_btn"
                            onClick={() => {
                                navigate("/cart")
                            }}>
                            <TiShoppingCart />



                            {/* <span>{userStore.cart?.detail.reduce((value,cur) => {
                                return value += cur.quantity
                            },0)}

                            </span> */}
                            {
                                userStore.socket ? <span>{userStore.cart?.detail.reduce((value, cur) => {
                                    return value += cur.quantity
                                }, 0)}</span>
                                    : <span>{guestCartStore.cart?.reduce((value, cur) => {
                                        return value + cur.quantity
                                    }, 0)}</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}  