'use client';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="w-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 p-6 hidden md:block">


            <div className="w-40 h-40 bg-[#00bf63] rounded-2xl flex items-center justify-center">
                <img
                    src="/images/logo.png"
                    alt="ProductHub Logo"
                    className="w-45 h-40 rounded-xl"
                />
            </div>

            <nav className="space-y-2 mb-12">
                <Link
                    href="/dashboard"
                    className="flex items-center px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                    Dashboard
                </Link>

                <Link
                    href="/products"
                    className="flex items-center px-5 py-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                    All Products
                </Link>
            </nav>


            <div className="absolute bottom-8 left-6 right-6">
                <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 bg-[#00bf63] hover:bg-[#1a734d] text-white py-3.5 rounded-2xl font-medium transition-colors"
                >
                    Add New Product
                </Link>
            </div>
        </div>
    );
}