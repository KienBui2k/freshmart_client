import "./thanks.scss"
import { useNavigate } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
export default function Thanks() {
    const navigate = useNavigate();

    return (
        <div className="untree_co-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center pt-5">
                        <span className="display-3 thankyou-icon text-primary">
                            <BsCartCheck />
                        </span>
                        <h2 className="display-3 text-black">Thank you!</h2>
                        <p className="lead mb-5">You order was successfuly completed.</p>
                        <p className="btn_thanks_page">
                            <span onClick={() => {
                                navigate("/")
                            }} className="btn_backHome">
                                Back to home
                            </span>
                            <span
                                onClick={() => {
                                    navigate("/receipts")
                                }}
                                className="btn_checkOder">
                                Check your order
                            </span>
                        </p>
                    </div>
                </div>
            </div>


        </div>

    )
}
