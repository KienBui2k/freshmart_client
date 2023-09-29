import { Outlet } from "react-router-dom"
import Footer from "./footer/Footer"
import "./home.scss"
import Navbar from "./Navbar/Navbar"

export default function Home() {
    return (
        <div className="home_page_section">
            <Navbar />

            <div className="home_page_content">
                <Outlet />
            </div>
            
            <Footer />
        </div>
    )
}
