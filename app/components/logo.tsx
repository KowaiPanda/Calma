'use client';

import Image from "next/image";

export default function Logo() {
    return (
        <div className="relative">
            <Image 
                src="/images/finallogo.png" 
                alt="Logo" 
                width={450} 
                height={450}
            />
        </div>
    );
}