'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    const saveToStorage = (updatedProducts: Product[]) => {
        setProducts(updatedProducts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    };

    const addProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
        const newProduct: Product = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        saveToStorage([...products, newProduct]);
    };

    const updateProduct = (id: string, updatedData: Partial<Product>) => {
        const updated = products.map((p) =>
            p.id === id ? { ...p, ...updatedData } : p
        );
        saveToStorage(updated);
    };

    const deleteProduct = (id: string) => {
        const filtered = products.filter((p) => p.id !== id);
        saveToStorage(filtered);
    };

    return {
        products,
        addProduct,
        updateProduct,
        deleteProduct,
    };
}