'use client';

import React, { useState, useEffect } from 'react';

type TypeWriterProps = {
    text: string;
    delay: number;
}
export default function Typewriter ({ text, delay }: TypeWriterProps) {
    // const text = 'Warning: Risk of getting stuck in an infinite loop! The navbar on the top points to my Resume which points back to this website. Proceed with caution!';
    const [currentText, setCurrentText] = useState(text[0]);
    const [currentIndex, setCurrentIndex] = useState(1);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return (
        <p className="pr-5 text-xs text-white ">
            {currentText}
        </p>
    )
};