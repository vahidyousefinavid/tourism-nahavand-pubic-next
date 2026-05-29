"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';

export default function AppLoader({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (i18n.isInitialized) {
            setLoading(false);
            return;
        }

        const interval = setInterval(() => {
            if (i18n.isInitialized) {
                setLoading(false);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [i18n.isInitialized]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-18 h-18 rounded-full bg-blue-10 shadow-lg"
                    >
                        <img
                            src="/images/noah.png"
                            alt="loading"
                            className="w-[80px] h-full object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
