"use client";

import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TreeDecorationProps {
    animationUrl: string;
    className?: string;
    delay?: number;
    size?: number;
}

export function TreeDecoration({
    animationUrl,
    className,
    delay = 0,
    size = 200
}: TreeDecorationProps) {
    const [animationData, setAnimationData] = useState<any>(null);

    useEffect(() => {
        fetch(animationUrl)
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error("Lottie fetch error:", err));
    }, [animationUrl]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay }}
            className={cn("pointer-events-none z-0", className)}
            style={{ width: size, height: size }}
        >
            {animationData && (
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-full h-full opacity-60"
                />
            )}
        </motion.div>
    );
}
