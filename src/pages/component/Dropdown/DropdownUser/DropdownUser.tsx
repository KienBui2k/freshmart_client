import { useEffect, useState } from "react";
import "./dropdown.scss";
import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { CiUser } from "react-icons/ci";
// import { useSelector } from "react-redux";
// import { StoreType } from "@/stores";
import { BiUser } from "react-icons/bi";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "@/stores";
import { userAction } from "@/stores/slices/user.slices";


export default function DropdownLogout() {
    //const { t } = useTranslation();
    const navigate = useNavigate();
    const userStore = useSelector((store: StoreType) => store.userStore)
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch()
    const handleLogout = () => {
        if (window.confirm("Log_out_confirm")) {
            localStorage.removeItem("token");
            userStore.socket?.disconnect()
            dispatch(userAction.setCart(null))
            dispatch(userAction.setReceipt(null))
            dispatch(userAction.setData(null))
            dispatch(userAction.setSocket(null))
            navigate("/");
        }

    };
    const checkAdmin = () => {
        if (userStore.data?.role == "ADMIN") {
            setIsAdmin(!isAdmin);
        }
    };

    useEffect(() => {
        checkAdmin();
    }, [userStore.data]);

    return (
        <div className="dropdown_user">
            <button
                className="btn dropdown-toggle account-btn"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                <BiUser></BiUser>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <Link className="dropdown-item" to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    {isAdmin ? (
                        <Link
                            className="dropdown-item" to="/admin">
                            Admin Page
                        </Link>
                    ) : (
                        <Link className="dropdown-item" to="/receipts">
                            My order
                        </Link>

                    )}
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}
