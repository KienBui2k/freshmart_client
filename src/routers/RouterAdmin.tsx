import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyLoad from "../pages/utils/lazies/Lazy";
import ListProduct from "@/pages/admin/component/listProduct/ListProduct";
export default

    <Route path="/admin" element={LazyLoad(() => import("../pages/admin/Admin"))()}>
        <Route index element={<ListProduct></ListProduct>} />
        <Route path="list_category" element={LazyLoad(() => import("../pages/admin/component/listCategory/ListCategory"))()} />
        <Route path="add_product" element={LazyLoad(() => import("../pages/admin/component/addProduct/AddProduct"))()} />
        <Route path="add_category" element={LazyLoad(() => import("../pages/admin/component/addCategory/AddCategory"))()} />
        <Route path="edit_product/:productId" element={LazyLoad(() => import("../pages/admin/component/editProduct/EditProduct"))()} />
        <Route path="show_option/:productId" element={LazyLoad(() => import("../pages/admin/component/showOption/showOption"))()} />
        <Route path="edit_category/:categoryId" element={LazyLoad(() => import("../pages/admin/component/editCategory/editCategory"))()} />
        <Route path="list_guest_recript" element={LazyLoad(() => import("../pages/admin/component/listGuesReceipts/listGuesReceipts"))()} />
        <Route path="/admin/list_guest_recript/:orderId" element={LazyLoad(() => import("../pages/admin/component/listGuesReceipts/receiptDetail/receiptDetail"))()}></Route>
    </Route>

