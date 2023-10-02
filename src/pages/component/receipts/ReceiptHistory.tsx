import { useSelector } from "react-redux"
import "./ReceiptHistory.scss"
import { StoreType } from "@/stores"

export default function ReceiptHistory() {
    const userStore = useSelector((store: StoreType) => {
        return store.userStore
    })
    console.log("1111",userStore.receipts);
    
  return (
    <div>ReceiptHistory</div>
  )
}
