import { useSelector } from "react-redux"
import "./checkout.scss"
import { StoreType } from "@/stores"
import { useNavigate } from "react-router-dom"
import { QRCode, message } from "antd"
import { useEffect } from "react"

export default function Checkout() {
  const useStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  const cart = useStore.cart?.detail;
  const subTotal = cart?.reduce((total: number, item: any) => {
    return total += item.quantity * item.option.price
  }, 0)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const navigate = useNavigate()

  function checkout(e: React.FormEvent) {
    e.preventDefault()
    if (cart!.length < 1) {
        message.warning("Bạn chưa mua hàng, Không thể checkOut!")
    } else {
      let payMode = (e.target as any).payMode.value;
      // useStore.socket?.emit("payCash", {
      //   receiptId: useStore.cart?.id,
      //   userId: useStore.data?.id
      // })
      if (payMode == "CASH") {
        useStore.socket?.emit("payCash", {
          receiptId: useStore.cart?.id,
          total: subTotal,
          userId: useStore.data?.id
        })
      }
      if (payMode == "ZALO") {
        useStore.socket?.emit("payZalo", {
          receiptId: useStore.cart?.id,
          total: subTotal,
          userId: useStore.data?.id
        })
      }
    }

  }

  return (
    <div className="checkout_section">
      <div className="header_checkOut_section ">

        <h2>Check Out</h2>

      </div>
      {
        useStore.cartPayQr && <QRCode value={useStore.cartPayQr} icon='https://cafebiz.cafebizcdn.vn/thumb_w/600/162123310254002176/2022/7/9/photo1657324993775-1657324993859181735127.jpg' />
      }
      <div className="checkout_body">
        <form
          onSubmit={(e) => {
            checkout(e)
          }}
          className="checkout_content">
          <div className="bill_detail_checkout col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2>Billing Detail</h2>
            <div className="bill_detail_content">

              <div className="form-group row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <label htmlFor="c_fname" className="text-black">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control form-control_sub" id="c_fname" name="firstName" />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <label htmlFor="c_lname" className="text-black">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control form-control_sub" id="c_lname" name="lastName" />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <label htmlFor="c_address" className="text-black">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control_sub"
                    id="c_address"
                    name="address"
                    placeholder="Street address"

                  />
                </div>
              </div>

              <div className="form-group row mb-12">
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <label htmlFor="c_email_address" className="text-black">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control_sub"
                    id="c_email_address"
                    name="email"

                  />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <label htmlFor="c_phone" className="text-black">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control_sub"
                    id="c_phone"
                    name="phone"
                    placeholder="Phone Number"

                  />
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="c_order_notes" className="text-black">
                  Order Notes
                </label>
                <textarea
                  name="c_order_notes"
                  id="c_order_notes"
                  cols={30}
                  rows={5}
                  className="form-control"
                  placeholder="Write your notes here..."
                  defaultValue={""}
                  style={{ resize: "none" }}
                />
              </div>

            </div>

          </div>
          <div className="your_order_checkout col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2>Your Order</h2>
            <div className="your_order_content">
              <table className="table site-block-order-table mb-5">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {cart.map((item : any) => (
                    <tr key={Date.now() * Math.random()}>
                      <td>{item.productDetail.name} <strong className="mx-2">x</strong> {item.quantity}</td>
                      <td>{item.productDetail.price * item.quantity}</td>
                    </tr>
                  ))} */}
                  {
                    useStore.cart?.detail?.map(item => (
                      <tr key={Date.now() * Math.random()}>
                        <td>{`${item.option.product.name} ${" : "} [${item.option.optionName}]`} <strong className="mx-2">x</strong> {item.quantity}</td>
                        <td>{item.option.price * item.quantity}</td>
                      </tr>
                    ))
                  }
                  <tr>
                    <td className="text-black font-weight-bold">
                      <strong>Cart Subtotal</strong>
                    </td>
                    <td className="text-black">{formatter.format(Number(subTotal))}</td>
                  </tr>
                  <tr>
                    <td className="text-black font-weight-bold">
                      <strong>Order Total</strong>
                    </td>
                    <td className="text-black font-weight-bold">
                      <strong>{formatter.format(Number(subTotal))}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-3 mb-3">

                <div className="shipping_detail">

                  <div className="shipping_method">
                    <p>Payment methods</p>
                    <div
                      className="payMod"

                    >
                      <div className="option_paymod">
                        <span>Cash</span>
                        <input name='payMode' type="radio" value={"CASH"} defaultChecked />
                      </div>

                      <div className="option_paymod">
                        <span>Zalo</span>
                        <input name='payMode' type="radio" value={"ZALO"} />
                      </div>

                      <button className="payment_btn" type='submit'>Place Order</button>
                      <button onClick={() => {
                        navigate("/cart")
                      }} className="payment_btn1" type='button'>Back To Your Cart</button>
                    </div>
                  </div>
                  <div className="shippingDetails_img">
                    <img src="https://firebasestorage.googleapis.com/v0/b/bhk-img.appspot.com/o/images%2Fservices%2Fpayment.jpg?alt=media&token=50103395-2900-488d-8630-499dfc4ec009" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
