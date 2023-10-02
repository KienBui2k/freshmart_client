import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';

export default function MyCarousel() {
    const slider = useRef<typeof Carousel>(null);
    const [banners, setBanners] = useState([
        {
            id: 1,
            url: "https://harvestplanet.ca/media/wysiwyg/slider/banner-mix-fruit-veg.jpg"
        },
        {
            id: 2,
            url: "https://localorganicdelivery.com.au/cdn/shop/files/Local_Organic_Delivery_-_social_sharing_image.jpg?v=1636938773"
        },
        {
            id: 3,
            url: "https://olimpiq.com.vn/media/Olimpiq_12_Thap_dinh_duong.jpg"
        },
    ]);

    return (
        <div>
            <Carousel

                autoplay
                autoplaySpeed={1500}
                effect="fade"
                dots={true}
                dotPosition="bottom"
                waitForAnimate={true}
            >
                {banners.map((banner, index) => (
                    <div className="items" key={banner.id + index}>
                        <img style={{ width: "100%", height: "650px" }} className="items-img" src={banner.url} alt={`Banner ${banner.id}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
