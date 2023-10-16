import { useState } from "react";
import "./admin.scss";
import { IoIosHome } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { BsListColumnsReverse } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { AiOutlineAppstoreAdd, AiOutlineCodeSandbox, AiOutlineCluster } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
    const [isSidebarExpanded, setSidebarExpanded] = useState(false);

    const toggleSidebar = () => {
        setSidebarExpanded(!isSidebarExpanded);
    };

    return (

        <div className="admin_section">
            <div className={`sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
                <div className="logo">
                    <img src="../logo/web_logo.avif" alt="logo" />
                    <h2>Admin Pages</h2>
                </div>
                <ul className="links">
                    <h4>Category </h4>
                    <li
                        onClick={() => {
                            navigate("/admin/list_category");
                        }}
                    >
                        <span className=""><BiCategoryAlt /></span>
                        <p>List Category</p>
                    </li>
                    <h4>Product </h4>
                    <li
                        onClick={() => {
                            navigate("/admin");
                        }}>
                        <span className=""><AiOutlineCluster /></span>
                        <p>List Product</p>
                    </li>
                    <h4>Receipt </h4>
                    <li
                        onClick={() => {
                            navigate("/admin/list_guest_recript");
                        }}>
                        <span className=""><BsListColumnsReverse /></span>
                        <p>List Receipt </p>
                    </li>
                    {/* <li
                        onClick={() => {
                            navigate("/admin/list_receipt_user");
                        }}>
                        <span className=""><BsListColumnsReverse /></span>
                        <p>List Receipt User</p>
                    </li> */}
                    <h4>User manage</h4>
                    <li onClick={() => {
                        navigate("/admin/list_user");
                    }}>
                        <span className=""><FaUsers /></span>
                        <p>List User</p>
                    </li>
                    <hr />

                    <li onClick={() => {
                        navigate("/")
                    }}>
                        <span><IoIosHome /></span>
                        <p>Home</p>
                    </li>
                </ul>
            </div>
            <div className="content_admin">
                <div className="body_content">
                    <Outlet />
                </div>
            </div>
        </div>

    );
};

export default Sidebar;
