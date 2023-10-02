import "./blog.scss"
import Carousel from "../Carousel/Carousel"
export default function Blog() {
    return (
        <div>
            <Carousel />
            <div className='blog_container'>
                <div className='blog_item'>
                    <img src="https://bizweb.dktcdn.net/thumb/grande/100/413/259/articles/organic-la-gi-thumb.jpg?v=1674009399030" alt="" />
                    <div className="blog_item_content">
                        <h4><i className="fa-brands fa-pagelines"></i>Proudly Supplying Fresh Produce at Freshmart</h4>
                        <p>At Freshmart, we take immense pride in being a leading source of fresh, live produce. Our mission extends beyond simply providing groceries; it's about revolutionizing the way people consume food. We tirelessly seek out and nurture the freshest products, ensuring that each fruit and vegetable we offer is brimming with natural flavor and optimal nutrition.

                            Freshmart isn't just about supplying clean, fresh produce; it's about fostering a foundation for a healthy and sustainable lifestyle. We listen to our customers' feedback and are committed to continual improvement to meet your ever-evolving demands. Join us on a journey to explore the exciting world of clean and fresh food at Freshmart!</p>
                    </div>
                </div>
                <div className='blog_item'>

                    <div className="blog_item_content">
                        <h4><i className="fa-regular fa-heart"></i>Together, Let's Build a Food Revolution for Clean Eating</h4>
                        <p>At Freshmart, we don't view supplying fruits and vegetables as a job; it's a mission. We believe that every piece of produce tells a story of dedication and passion from those who cultivate and farm it.

                            We welcome you, the clean food enthusiasts, to join us in contributing to the clean food revolution. Together, we can build a brighter future with clean, fresh products, not just for our health but also for our planet. Join Freshmart to learn more about how we're changing the way people perceive food and how you can be part of this food revolution.</p>
                    </div>
                    <img src="https://home.cdn.papaya.services/fi_B_Zf_P6_Vy42_ZV_Kd_Hv_H90l_U_p0u_Lj_Pa_Tbt_Ws_Th_DU_Zbyafhsaa1qz3_TQ_4_Ym0jhm_Yej_Dgxw_X_Me_Y3f4gb_H_Cad_Wxj_Qvt_Ip_Et_B_Juplt_HV_Oc_O9m_D409_K_Xuv7i3_Mu4_Phj9z_A1_WL_0_T_Mftu9_I0rx_N2u_X_u_MBW_91k_4223c3b6a7.false" alt="" />
                </div>
            </div>
        </div>
    )
}
