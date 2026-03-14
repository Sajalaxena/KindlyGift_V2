import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaTimes, FaCheckCircle, FaGift } from "react-icons/fa";

export default function WelcomePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check if the popup has already been shown in this session
        const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");

        if (!hasSeenPopup) {
            // Small delay before showing the popup for better UX
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenWelcomePopup", "true");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("WELCOME10");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="relative w-full max-w-sm overflow-hidden bg-white rounded-2xl shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-10 p-2 text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                            aria-label="Close popup"
                        >
                            <FaTimes />
                        </button>

                        {/* Header / Graphic Area */}
                        <div className="bg-gradient-to-br from-[#ffc8dd] to-[#ffafcc] p-6 text-center text-[#d65a8d]">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg mb-4"
                            >
                                <FaGift className="text-3xl text-[#d65a8d]" />
                            </motion.div>
                            <h2 className="text-2xl font-black uppercase tracking-wider text-white drop-shadow-md">
                                Special Offer!
                            </h2>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 text-center">
                            <p className="mb-2 text-lg font-medium text-gray-800">
                                Get <span className="text-[#d65a8d] font-bold text-xl">10% OFF</span> your first order!
                            </p>
                            <p className="mb-6 text-sm text-gray-500">
                                Use the coupon code below at checkout to claim your discount.
                            </p>

                            {/* Coupon Code Section */}
                            <div className="flex items-center justify-between rounded-lg border-2 border-dashed border-[#ffafcc] bg-pink-50 p-2 relative">
                                <span className="text-xl font-bold tracking-widest text-[#d65a8d] ml-4">
                                    WELCOME10
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition-all ${copied ? "bg-green-500" : "bg-[#d65a8d] hover:bg-[#e476a3]"
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <FaCheckCircle /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy /> Copy
                                        </>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={handleClose}
                                className="mt-6 text-sm font-medium text-gray-400 hover:text-gray-600 underline"
                            >
                                No thanks, I prefer paying full price
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
