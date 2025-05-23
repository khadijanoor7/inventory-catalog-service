import { useState } from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newStock, setNewStock] = useState(product.localStock);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = () => {
        onUpdate({ ...product, localStock: Number(newStock) });
        setIsEditing(false);
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{product.name}</h3>
                <span className={styles.price}>${product.price}</span>
            </div>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.footer}>
                {isEditing ? (
                    <div className={styles.editStock}>
                        <input
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            className={styles.stockInput}
                        />
                        <button onClick={handleUpdate} className={styles.saveBtn}>Save</button>
                        <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
                    </div>
                ) : (
                    <span className={styles.stock}>Stock: {product.localStock}</span>
                )}

                {onDelete && !isEditing && (
                    <div className={styles.actions}>
                        {isDeleting ? (
                            <>
                                <button onClick={() => onDelete(product.id)} className={styles.confirmDeleteBtn}>
                                    Confirm
                                </button>
                                <button onClick={() => setIsDeleting(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsDeleting(true)} className={styles.deleteBtn}>
                                    Delete
                                </button>
                                <button onClick={() => setIsEditing(true)} className={styles.updateBtn}>
                                    Update Stock
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
