import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LazyLoad from "../pages/utils/lazies/Lazy";
import Banner from "../pages/component/Banner/Banner";
import RouterAdmin from "./RouterAdmin";
export default function RouterSetup() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Banner />} />
                    <Route path="/contact" element={LazyLoad(() => import("../pages/component/Contact/Contact"))()} />
                    {/* <Route path="/chatbox" element={LazyLoad(() => import("../pages/component/Chatbox/Chatbox"))()} /> */}
                    <Route path="/about" element={LazyLoad(() => import("../pages/component/Abouts/About"))()} />
                    <Route path="/test" element={LazyLoad(() => import("../pages/test/Test"))()} />
                    <Route path="/blog" element={LazyLoad(() => import("../pages/component/Blogs/Blog"))()} />
                    <Route path="/login_v2" element={LazyLoad(() => import("../pages/users/Login_v2/Login_v2"))()}></Route>
                    <Route path="/profile" element={LazyLoad(() => import("../pages/users/Profiles/Profile"))()}></Route>
                    <Route path="/cart" element={LazyLoad(() => import("../pages/component/Cart/Cart"))()}></Route>
                    <Route path="/products/:ctId" element={LazyLoad(() => import("../pages/component/products/Products"))()}></Route>
                    <Route path="/product/:productId" element={LazyLoad(() => import("../pages/component/productDetail/ProductDetail"))()}></Route>
                    <Route path="/checkout" element={LazyLoad(() => import("../pages/CheckOut/Checkout"))()}></Route>
                    <Route path="/receipts" element={LazyLoad(() => import("../pages/component/receipts/ReceiptHistory"))()}></Route>
                    <Route path="/thanks" element={LazyLoad(() => import("../pages/component/thanks/Thanks"))()}></Route>
                </Route>
                {RouterAdmin}
            </Routes>
        </BrowserRouter>
    );
}
