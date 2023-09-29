import { useDispatch, useSelector, useStore } from 'react-redux'
import RouterSetup from './routers/Router'
import { StoreType, store } from './stores'
import apis from './services/Apis'
import { useEffect, useState } from 'react'
import { Receipt, User, userAction } from './stores/slices/user.slices'
import axios from 'axios'
import ChatBox from "./pages/component/Chatbox/Chatbox"
import "./main.scss"
import { Modal, message } from 'antd'
import { categoryAction } from './stores/slices/category.slices'
import { productAction } from './stores/slices/product.slice'
import { Socket, io } from 'socket.io-client'

function App() {
  const dispatch = useDispatch()
  const [openChat, setOpenChat] = useState(false);
  const [takeItem, setTakeItem] = useState(8);
  const [skipItem, setSkipItem] = useState(0);
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  const categoryStore = useSelector((store: StoreType) => {
    return store.categoryStore
  })
  const productSrore = useSelector((store: StoreType) => {
    return store.productSrore
  })
  console.log("productSrore", productSrore);

  // // check token
  // useEffect(() => {
  //   apis.userApi.authentication(
  //     { token: localStorage.getItem("token") }
  //   )
  //     .then(res => {
  //       if (res.status == 200) {
  //         dispatch(userAction.setData(res.data.data))
  //       }
  //       else {
  //         localStorage.removeItem("token")
  //       }
  //     })
  // }, [])
  useEffect(() => {
    if (!userStore.data) {
      let token = localStorage.getItem("token");
      if (token) {
        let socket: Socket = io("http://localhost:3001", {
          query: {
            token
          }
        })
        socket.on("connectStatus", (data: { status: boolean, message: string }) => {


          if (data.status) {
            console.log("data.message", data.message);
          } else {
            console.log("data.message", data.message);
          }
        })
        socket.on("disconnect", () => {
          dispatch(userAction.setData(null))
          console.log("đã out");
        })
        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setData(user))
        })
        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          dispatch(userAction.setReceipt(receipts))
        })
        socket.on("receiveCart", (cart: Receipt) => {
          dispatch(userAction.setCart(cart))
        })
        dispatch(userAction.setSocket(socket))
      }
    }
  }, [userStore.reload])

  useEffect(() => {
    console.log("userStore", userStore.data);
  }, [userStore.data])

  useEffect(() => {
    console.log("userStoreCart", userStore.cart);
  }, [userStore.cart])
  // useEffect(() => {
  //   userStore.socket?.on("connectStatus",(message:any) => {
  //     window.alert(message)      
  //   })
  // },[userStore.socket])
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


  // useEffect(() => {
  //   console.log("userStore", userStore)
  // }, [userStore])


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
