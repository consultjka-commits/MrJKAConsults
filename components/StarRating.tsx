'use client';

import React, { useState } from 'react';
import './StarRating.css';

interface StarRatingProps {
    onRating: (rating: number) => void;
}

export default function StarRating({ onRating }: StarRatingProps) {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);

    const handleClick = (index: number) => {
        setRating(index);
        onRating(index);
    };

    return (
        <div className="star-container">
            {[1, 2, 3, 4, 5].map((index) => {
                return (
                    <button
                        type="button"
                        key={index}
                        className={`star-btn ${index <= (hover || rating) ? 'active' : ''} ${rating ? 'rated' : ''}`}
                        onClick={() => handleClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`Rate ${index} Stars`}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}
