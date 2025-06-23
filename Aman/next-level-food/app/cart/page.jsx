'use client';

import Image from 'next/image';
import classes from './page.module.css';
import { useCart } from '@/_components/cart/cart-context';

const Cart = () => {
    const { cartItems, addItem, removeItem, subtotal, tax, total, clearCart } = useCart();

    if (cartItems.length === 0) return (
        <main className="not-found">
            <p>Your cart is empty.</p>
        </main>
    )

    return (
        <div className={classes["cart-container"]}>
            <h2>Cart</h2>
            {cartItems.map(item => (
                <div key={item.id} className={classes["cart-item"]}>
                    <Image src={item.image} alt={item.title} className={classes["cart-img"]} width={80} height={80} />
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.price}</p>
                        <div className={classes["quantity-controls"]}>
                            <button onClick={() => removeItem(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => addItem(item, item.restaurantId)}>+</button>
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ marginTop: '2rem', borderTop: '1px solid #444', paddingTop: '1rem' }}>
                <p>Subtotal: {subtotal.toFixed(2)}</p>
                <p>Tax (10%): {tax.toFixed(2)}</p>
                <p><strong>Total: {total.toFixed(2)}</strong></p>
                <button onClick={clearCart} style={{ marginTop: '1rem', backgroundColor: '#ff4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px' }}>Clear Cart</button>
            </div>
        </div >
    )
}

export default Cart