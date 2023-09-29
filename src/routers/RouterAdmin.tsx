import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyLoad from "../pages/utils/lazies/Lazy";
import ListProduct from "@/pages/admin/component/listProduct/ListProduct";
export default

    <Route path="/admin" element={LazyLoad(() => import("../pages/admin/Admin"))()}>
        <Route index element={<ListProduct></ListProduct>} />
        <Route path="list_category" element={LazyLoad(() => import("../pages/admin/component/listCategory/ListCategory"))()} />
        <Route path="add_product" element={LazyLoad(() => import("../pages/admin/component/addProduct/AddProduct"))()} />
        <Route path="add_category" element={LazyLoad(() => import("../pages/admin/component/addCategory/AddCategory"))()} />
    </Route>

