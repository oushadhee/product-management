'use client';
import { useProducts } from '@/hooks/useProducts';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { products, deleteProduct } = useProducts();

    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="text-center py-20">Product not found</div>;
    }

    const handleDelete = () => {
        if (confirm('Delete this product permanently?')) {
            deleteProduct(product.id);
            toast.success('Product deleted');
            router.push('/products');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Products
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
                {product.imageUrl && (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-96 object-cover"
                    />
                )}

                <div className="p-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-semibold">{product.name}</h1>
                            <p className="text-5xl font-medium text-green-600 mt-4">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={`/products/edit/${product.id}`}
                                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50 flex items-center gap-2"
                            >
                                <Edit className="w-5 h-5" /> Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-3 bg-red-600 text-white rounded-2xl flex items-center gap-2 hover:bg-red-700"
                            >
                                <Trash2 className="w-5 h-5" /> Delete
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="font-medium text-lg mb-3">Description</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mt-8 text-sm text-gray-500">
                        Added on: {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}