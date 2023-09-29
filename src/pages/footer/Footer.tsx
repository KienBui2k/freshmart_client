import "./footer.scss"
import { AiOutlineCopyrightCircle, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { SlSocialPintarest } from "react-icons/sl";
import { BiLogoFacebook, BiMap } from "react-icons/bi";
import { BsTelephoneInbound } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
export default function Footer() {
    return (
        <div className="footer_section">
            <div className="footer_main">
                <div className="footer_left col-lg-3">
                    <div className="footer_logo">
                        <img className="img_top_footer" src="../logo/logo-foo.webp" alt="" />
                        <div className="text_content">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ad blanditiis quod et libero incidunt?
                                <br />
                                <br />
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, est!
                            </p>
                        </div>
                        <div className="block_social">
                            <span><BiLogoFacebook /></span>
                            <span><SlSocialPintarest /></span>
                            <span><AiOutlineInstagram /></span>
                            <span><AiOutlineTwitter /></span>
                        </div>
                        <img className="img_bottom_footer" src="../logo/ck_370x.webp" alt="" />
                    </div>
                </div>
                <div className="footer_right col-lg-9">
                    <div className="footer_right_row1">
                        <div className="footer_menu col-lg-3">
                            <h5>INFORMATION</h5>
                            <span>Specials</span>
                            <span>New products</span>
                            <span>Best sellers</span>
                            <span>Terms and conditions</span>
                        </div>
                        <div className="footer_menu col-lg-3">
                            <h5>ABOUT US</h5>
                            <span>Who are we ?</span>
                            <span>Delivery and return</span>
                            <span>Size guide</span>
                            <span>Legal Mentions</span>
                        </div>
                        <div className="footer_menu col-lg-3">
                            <h5>YOUR ACCOUNT</h5>
                            <span>My merchandise returns</span>
                            <span>My credit slips</span>
                            <span>My addresses</span>
                            <span>My personal info</span>
                        </div>
                        <div className="footer_menu col-lg-3">
                            <h5>CUSTOMER SERVICE</h5>
                            <span>Store Locator</span>
                            <span>Returns Policy</span>
                            <span>Order Tracking</span>
                            <span>Give Back Box</span>
                        </div>
                    </div>
                    <div className="footer_right_row2">
                        <div className="footer_newsletter col-lg-6">
                            <h5>NEWSLETTER</h5>

                            <p>Sign up for newsletter to receive special offers and exclusive news about FreshMart products</p>

                            <div className="input_subsribe">
                                <div className="input_group">
                                    <input type="text" placeholder="enter your email" />
                                    <span>
                                        SUBSRIBE
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="footer_contact col-lg-6">
                            <h5>NEWSLETTER</h5>
                            <div className="contact">
                                <div className="icon_contact">
                                    <span>
                                        <BiMap />
                                    </span>
                                </div>
                                <div className="addres_contact">
                                    <p>Address : 77 Le Trung Nghia, Ward 12,Tan Binh District, Ho Chi Minh City</p>
                                </div>
                            </div>
                            <div className="contact">
                                <div className="icon_contact">
                                    <span>
                                        <BsTelephoneInbound />
                                    </span>
                                </div>
                                <div className="phone_contact">
                                    <span>
                                        Hotline :
                                    </span>
                                    <p>
                                        0123456789
                                        <br />
                                        0987654321
                                    </p>
                                </div>
                            </div>
                            <div className="contact">
                                <div className="icon_contact">
                                    <span>
                                        <TfiEmail />
                                    </span>
                                </div>
                                <div className="email_contact">
                                    <span>
                                        Email :
                                    </span>
                                    <p>
                                        support@domain.com
                                        <br />
                                        bibostore@domain.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer_right_row3">
                        <div className="footer_coppy">
                            <AiOutlineCopyrightCircle />
                            <span>
                                2023 Bui Hai Kien. All rights reserved. |
                                haikien371316@gmail.com | Phone:
                                +84 334 917 045
                            </span>
                        </div>
                        <div className="footer_img">
                            <img src="../images/bocongthuong.png" alt="" />
                            <img src="../images/bocongthuong2.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
