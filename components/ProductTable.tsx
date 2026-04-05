'use client';
import { Product } from '@/types/product';
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">Image</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-medium">Description</th>
                        <th className="px-6 py-4 text-right text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <td className="px-6 py-4">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://picsum.photos/seed/${product.id}/300/300`;
                                            e.currentTarget.alt = 'Image not available';
                                        }}
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">No Image</span>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 font-medium">{product.name}</td>
                            <td className="px-6 py-4 font-medium text-[#00bf63]">
                                ₨ {product.price.toLocaleString('en-US')}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm line-clamp-2 max-w-xs">
                                {product.description}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="p-2 text-[#00bf63] hover:bg-[#00bf63]/10 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this product?')) {
                                                onDelete(product.id);
                                            }
                                        }}
                                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {products.length === 0 && (
                <p className="text-center text-gray-500 py-12">No products found</p>
            )}
        </div>
    );
}