'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import styles from '../styles/Home.module.css';

const API_URL = 'http://localhost:3000';

export default function Home() {
    const [inventory, setInventory] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [activeTab, setActiveTab] = useState('inventory');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch(`${API_URL}/inventory`);
            const data = await res.json();
            if (data.success) setInventory(data.data);
        } catch (err) {
            console.error('Failed to fetch inventory:', err);
        }
    };

    const fetchCatalog = async () => {
        try {
            const res = await fetch(`${API_URL}/catalog/top-5-rated`);
            const data = await res.json();
            if (data.success) setCatalog(data.data);
        } catch (err) {
            console.error('Failed to fetch catalog:', err);
        }
    };

    const handleAddProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/inventory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (res.ok) fetchInventory();
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API_URL}/inventory/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) fetchInventory();
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    const handleUpdate = async (product) => {
        try {
            const res = await fetch(`${API_URL}/inventory/${product.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ localStock: product.localStock }),
            });
            if (res.ok) fetchInventory();
        } catch (err) {
            console.error('Failed to update product:', err);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Inventory & Catalog Service</title>
                <meta name="description" content="Manage your inventory and view external catalog" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Inventory <span className={styles.highlight}>Manager</span>
                </h1>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'inventory' ? styles.active : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        Local Inventory
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'catalog' ? styles.active : ''}`}
                        onClick={() => {
                            setActiveTab('catalog');
                            fetchCatalog();
                        }}
                    >
                        External Catalog
                    </button>
                </div>

                {activeTab === 'inventory' ? (
                    <>
                        <AddProductForm onAdd={handleAddProduct} />
                        <div className={styles.grid}>
                            {inventory.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={styles.grid}>
                        {catalog.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    ...product,
                                    localStock: 'N/A (External)'
                                }}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
