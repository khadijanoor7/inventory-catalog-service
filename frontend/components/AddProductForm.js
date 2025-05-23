import { useState } from 'react';
import styles from './AddProductForm.module.css';

export default function AddProductForm({ onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        localStock: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            price: Number(formData.price),
            localStock: Number(formData.localStock)
        });
        setFormData({ name: '', description: '', price: '', localStock: '' });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Add New Product</h2>
            <div className={styles.grid}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    min="0"
                    step="0.01"
                    className={styles.input}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={formData.localStock}
                    onChange={(e) => setFormData({ ...formData, localStock: e.target.value })}
                    required
                    min="0"
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className={styles.input}
                />
            </div>
            <button type="submit" className={styles.submitBtn}>Add Product</button>
        </form>
    );
}
