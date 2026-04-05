'use client';
import { useProducts } from '@/hooks/useProducts';
import StatsCard from '@/components/StatsCard';
import { Package, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
    const { products } = useProducts();

    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const recentProducts = [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3);

    return (
        <div>
            {/* Welcome Message */}
            <div className="mb-12">
                <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                    Welcome to the
                </h2>
                <h2 className="text-2xl font-semibold text-[#00bf63] dark:text-[#d4a373]">
                    home of products
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
                    Manage your inventory efficiently with real-time tracking.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatsCard
                    title="Total Products"
                    value={products.length}
                    icon={<Package className="w-6 h-6" />}
                    color="bg-[#00bf63] text-white dark:bg-[#4d2626]"
                />
                <StatsCard
                    title="Total Inventory Value"
                    value={`₨ ${totalValue.toLocaleString('en-US')}`}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="bg-[#00bf63] text-white dark:bg-[#4d2626]"
                />
                <StatsCard
                    title="Recently Added"
                    value={recentProducts.length}
                    icon={<Clock className="w-6 h-6" />}
                    color="bg-[#00bf63] text-white dark:bg-[#4d2626]"
                />
            </div>

            {/* Recent Products */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Recent Products</h2>
                <Link
                    href="/products"
                    className="text-[#00bf63] hover:underline font-medium flex items-center gap-1"
                >
                    View All →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProducts.length > 0 ? (
                    recentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-2xl mb-5"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://picsum.photos/id/1005/300/300';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-5 flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                            <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
                            <p className="text-3xl font-medium text-[#00bf63] mb-3">
                                ₨ {product.price.toLocaleString('en-US')}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                                {product.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500 py-12">
                        No products yet. Add some from the Products page.
                    </p>
                )}
            </div>
        </div>
    );
}