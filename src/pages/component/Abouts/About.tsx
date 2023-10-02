// import Carousel from "../Carousel/Carousel"
// import "./about.scss"

// export default function About() {
//     return (
//         <div>
//             <Carousel />
//         </div>
//     )
// }

import "./about.scss"

export default function About() {
    return (
        <div className='main_about_page'>
            <div className="why-choose-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <h2 className="section-title">Why Choose Us</h2>
                            <p>
                                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
                            </p>

                            <div className="row my-5">
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/bhk-img.appspot.com/o/images%2Fabout_img%2Ftruck.svg?alt=media&token=14893f86-cb00-4527-bb96-94df2417f60f"
                                                alt="Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3>Fast &amp; Free Shipping</h3>
                                        <p>
                                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                            aliquet velit. Aliquam vulputate.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/bhk-img.appspot.com/o/images%2Fabout_img%2Fbag.svg?alt=media&token=97118d2f-3d56-429d-a1ed-71de9af37c5e"
                                                alt="Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3>Easy to Shop</h3>
                                        <p>
                                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                            aliquet velit. Aliquam vulputate.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/bhk-img.appspot.com/o/images%2Fabout_img%2Fsupport.svg?alt=media&token=f6820059-6a2a-4013-860e-417d4e146fa6"
                                                alt="Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3>24/7 Support</h3>
                                        <p>
                                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                            aliquet velit. Aliquam vulputate.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img
                                                src="https://firebasestorage.googleapis.com/v0/b/bhk-img.appspot.com/o/images%2Fabout_img%2Freturn.svg?alt=media&token=b38930bd-b040-408e-accc-cc292fbb8f2b"
                                                alt="Image"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <h3>Hassle Free Returns</h3>
                                        <p>
                                            Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                                            aliquet velit. Aliquam vulputate.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="img-wrap">
                                <img
                                    src="../images/blog-4.jpg"
                                    alt="Image"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="we_are_section">
                <div className="we_are_grit1 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <h2>
                        We are Freshmart - Your Go-To Source for Fresh Produce
                    </h2>
                    <p>
                        Welcome to our Freshmart website! We've designed this space with all you passionate home chefs and healthy eaters in mind. If you're someone who truly appreciates the beauty of fresh fruits and vegetables, you've come to the right place. Here, you'll immerse yourself in a world bursting with vibrant colors and innovative ideas to elevate your culinary experience.
                        <br />
                        <br />
                        At Freshmart, we take immense pride in curating a selection of top-quality produce, ranging from the juiciest fruits to the crispiest vegetables. Whether you're in search of organic goodness, exotic flavors, or just the basics for your kitchen, our wide variety of choices is sure to satisfy your cravings.
                    </p>
                    <br/>
                    <p>Join us on a journey to transform your meals into culinary masterpieces. Explore our articles and guides to discover tips and tricks for creating delectable dishes with our fresh ingredients. Let us be your trusted companion in the realm of wholesome and flavorful cooking. Welcome to our Freshmart world!</p>
                </div>
                <div className="we_are_grit2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="we_are_grit3 ">
                        <img src="../images/blog-1.jpg" alt="" />
                        <p>Modern manufacturing facility.</p>
                    </div>
                </div>

            </div>
            <div className="made_with_section">
                <div className="made_with_grit1 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <img src="../images/blog-3.jpg" alt="" />
                </div>
                <div className="made_with_grit2 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="made_with_content">
                        <h2>
                            Passionately Delivering Clean and Fresh Products at Freshmart
                        </h2>
                        <p>
                            At Freshmart, our dedication lies in delivering the cleanest and freshest products. We pour our hearts and passion into caring for and selecting each piece of produce. Our meticulous attention and care ensure that you always receive products of the highest quality and nutrition standards. We believe that providing clean, fresh food is a way to ensure health and happiness for you and your family. With Freshmart, you can trust in our commitment and passion to bring you clean, fresh products for your daily meals.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

