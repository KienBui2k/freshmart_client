import { useDispatch, useSelector, useStore } from 'react-redux'
import RouterSetup from './routers/Router'
import { StoreType, store } from './stores'
import apis from './services/Apis'
import { useEffect, useState } from 'react'
import { Receipt, User, userAction } from './stores/slices/user.slices'
import axios from 'axios'
import ChatBox from "./pages/component/Chatbox/Chatbox"
import "./main.scss"
import { Modal } from 'antd'
import { categoryAction } from './stores/slices/category.slices'
import { productAction } from './stores/slices/product.slice'


function App() {
  const dispatch = useDispatch()
  const [openChat, setOpenChat] = useState(false);
  useEffect(() => {
    apis.categoryApi.findMany()
      .then(res => {
        console.log("res", res);
        if (res.status == 200) {
          dispatch(categoryAction.setCategoryData(res.data.data))
        }
      })
      .catch(err => console.log("err", err)
      )
  }, [])
  useEffect(() => {
    apis.productApi.get()
      .then(res => {
        if (res.status == 200) {
          dispatch(productAction.setProductData(res.data.data))
        }
      })
      .catch(err => console.log("err", err)
      )
  }, [])

  return (
    <>
      <RouterSetup />
      {
        openChat == false
          ? <button onClick={() => {
            Modal.confirm({
              content: "Mở khung chat với tài khoản của bạn?",
              onOk: () => {
                setOpenChat(true)
              }
            })
          }} style={{ position: "fixed", right: "50px", bottom: "50px" }}>Open Chat</button>
          : <div style={{ width: "400px", position: "fixed", right: 0, bottom: 0 }}>
            <ChatBox open={openChat} />
          </div>
      }
    </>
  )
}

export default App
