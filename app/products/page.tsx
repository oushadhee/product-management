'use client';
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductForm from '@/components/ProductForm';
import ProductTable from '@/components/ProductTable';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = (data: any) => {
        addProduct(data);
        toast.success('Product added successfully');
    };

    const handleUpdate = (data: any) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, data);
            toast.success('Product updated successfully');
            setEditingProduct(null);
        }
    };

    const handleDelete = (id: string) => {
        deleteProduct(id);
        toast.success('Product deleted successfully');
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight">All Products</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Total Products: <span className="font-medium text-gray-900 dark:text-white">{products.length}</span>
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 bg-[#00bf63] hover:bg-[#1a734d] text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow--500/20 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Product
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                />
            </div>

            {/* Product Table */}
            <ProductTable
                products={filteredProducts}
                onEdit={(product) => {
                    setEditingProduct(product);
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl">
                        <h2 className="text-2xl font-semibold mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <ProductForm
                            initialData={editingProduct}
                            onSubmit={editingProduct ? handleUpdate : handleAdd}
                            onClose={() => {
                                setIsModalOpen(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}