'use client';
import { useState, useEffect } from 'react';
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

    // Reset form when opening for new product (important fix)
    useEffect(() => {
        if (!initialData) {
            setForm({
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
            });
        } else {
            setForm({
                name: initialData.name,
                price: initialData.price,
                description: initialData.description,
                imageUrl: initialData.imageUrl || '',
            });
        }
        setErrors({});
    }, [initialData]);

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
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Product Name
                </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00bf63] bg-white dark:bg-gray-800"
                    placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Price (LKR)
                </label>
                <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00bf63] bg-white dark:bg-gray-800"
                    placeholder="0.00"
                    step="0.01"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00bf63] bg-white dark:bg-gray-800 h-32 resize-y"
                    placeholder="Product description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Image URL (optional)
                </label>
                <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00bf63] bg-white dark:bg-gray-800"
                    placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Example: https://picsum.photos/id/1015/300/300
                </p>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3.5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#00bf63] hover:bg-[#4d2626] text-white rounded-2xl font-medium transition-colors"
                >
                    {initialData ? 'Update Product' : 'Add Product'}
                </button>
            </div>
        </form>
    );
}