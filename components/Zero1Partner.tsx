"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Zero1LogoProps {
    isDark?: boolean;
    className?: string;
    width?: number;
    height?: number;
}

export default function Zero1Logo({
    isDark: propIsDark,
    className = "",
    width = 320,
    height = 80,
}: Zero1LogoProps) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof propIsDark === "boolean") {
            setIsDark(propIsDark);
            return;
        }



    }, [propIsDark]);

    return (
        <div className={`flex items-center justify-center ${className}`}> <a
            href="https://www.zero1-tech.com.br"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zero1 Soluções em Tecnologia"
            className="transition-transform duration-300 hover:scale-105"
        >
            <Image
                src={isDark ? "/rodape_prata.png" : "/rodape_preto.png"}
                alt="Zero1 Soluções em Tecnologia"
                width={width}
                height={height}
                className="h-16 w-auto md:h-20"
                loading="lazy"
            /> </a> </div>
    );
}
