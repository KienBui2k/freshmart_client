import "./contact.scss"

export default function Contact() {
    return (
        <div className="contact_section">
            <div className="contact_map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.251009001743!2d106.65301827575242!3d10.792077358903406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293529c8f155%3A0xc101e984845bad65!2zNDIgVOG7sSBDxrDhu51uZywgUGjGsOG7nW5nIDQsIFTDom4gQsOsbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1693816417262!5m2!1sen!2s" width="100%" height="100%" style={{ border: '0' }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="contact_info_container">
                <div className="contact_info col-md-8 col-lg-8">
                    <div className="row mb-5">
                        <div className="col-lg-4">
                            <div className="service ">
                                <div className="service-icon color-1 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                </div>
                                <div className="service-contents">
                                    <p>43 Raymouth Rd. Baltemoer, London 3910</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service">
                                <div className="service-icon color-1 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                    </svg>
                                </div>
                                <div className="service-contents">
                                    <p>info@yourdomain.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="service">
                                <div className="service-icon color-1 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                                <div className="service-contents">
                                    <p>+1 294 3925 3939</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="text-black" htmlFor="fname">First name</label>
                                    <input type="text" className="form-control" id="fname" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="text-black" htmlFor="lname">Last name</label>
                                    <input type="text" className="form-control" id="lname" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="text-black" htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" />
                        </div>

                        <div className="form-group mb-5">
                            <label className="text-black" htmlFor="message">Message</label>
                            <textarea name="" className="form-control" id="message" cols={30} rows={5}></textarea>
                        </div>

                        <button type="submit" className="send_mess">Send Message</button>
                    </form>
                </div>
            </div>


        </div>
    )
}
