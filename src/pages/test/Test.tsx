import React, { useState } from 'react';
import './test.scss';

export default function Test() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const cardData = ["cawnwjkcvnasjd nk", "cawnwjkcvnasjd nk", "cawnwjkcvnasjd nk", "cawnwjkcvnasjd nk"];

    return (
        <div>
            {cardData.map((text, index) => (
                <div
                    key={index}
                    className={`testbg ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    {text}
                </div>
            ))}
        </div>
    );
}
