'use client';
import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
    onClose: () => void;
}

export default function ProductForm({ initialData, onSubmit, onClose }: ProductFormProps) {
    const [form, setForm] = useState({
        name: initialData?.name || '',
        price: initialData?.price || 0,
        description: initialData?.description || '',
        imageUrl: initialData?.imageUrl || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = 'Product name is required';
        if (form.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Product description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
                <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                >
                    {initialData ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </form>
    );
}