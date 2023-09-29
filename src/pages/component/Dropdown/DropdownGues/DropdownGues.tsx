import { useEffect, useState } from "react";
import "./dropdown.scss";
import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { CiUser } from "react-icons/ci";
// import { StoreType } from "@/stores";
// import { useSelector } from "react-redux";
import { BiUser } from "react-icons/bi";
export default function DropdownLogout() {
    //const { t } = useTranslation();
    const navigate = useNavigate();
    // const store = useSelector((store) => store) as StoreType;
    const [isAdmin, setIsAdmin] = useState(false);
    const handleLogout = () => {
        if (window.confirm("Log_out_confirm")) {
            localStorage.removeItem("token");
            navigate("/");
        }
    };
    // const checkAdmin = () => {
    //     if (store.useStore.data?.isAdmin) {
    //         setIsAdmin(!isAdmin);
    //     }
    // };
    // useEffect(() => {
    //     checkAdmin();
    // }, [store]);
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
                {/* <li>
                    <Link className="dropdown-item" to="profile">
                        Profile
                    </Link>
                </li> */}
                <li>
                    <Link className="dropdown-item" to="/checkOrder">
                        My order
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/login_v2">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    );
}
