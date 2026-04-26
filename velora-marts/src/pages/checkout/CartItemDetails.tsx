import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";
import type { CartItem } from "../../types/ecommerce";

interface CartItemDetailsProps {
  cartItem: CartItem;
  getCartItems: () => void;
}

const CartItemDetails = ({ cartItem, getCartItems }: CartItemDetailsProps) => {
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(Number(cartItem?.quantity));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteCartItem = async () => {
    try {
      await axios.delete(`/api/cart-items/${cartItem.productId}`);
      await getCartItems();
      setShowDeleteConfirm(false); 
    } catch (error) {
      console.error('failed to delete:', error);
    }
  };

  const updateQuantity = async () => {
    try {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      await getCartItems();
      setIsUpdateQuantity(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onUpdateQuantity = () => {
    if (!isUpdateQuantity) {
      setIsUpdateQuantity(true);
    } else {
      updateQuantity();
    }
  };

  const onKeyEvent = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateQuantity();
    } else if (e.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdateQuantity(false);
    }
  };

  return (
    <div className="flex items-start gap-4 py-6 border-b border-gray-100 last:border-0">
      {/* PRODUCT IMAGE */}
      <div className="h-24 w-24 shrink-0">
        <img 
          className="h-full w-full object-contain" 
          src={cartItem.product?.image} 
          alt={cartItem.product?.name} 
        />
      </div>

      {/* PRODUCT INFO & ACTIONS */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {cartItem.product?.name}
        </h3>
        
        <p className="text-base font-bold text-gray-900">
          {formatMoney(cartItem.product?.priceCents)}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-y-2 gap-x-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="font-medium">Quantity:</span>
            {isUpdateQuantity ? (
              <input 
                autoFocus
                onKeyDown={onKeyEvent} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                value={quantity} 
                type="number" 
                className="w-14 rounded border border-gray-300 px-2 py-0.5 text-center focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
              />
            ) : (
              <span className="font-semibold">{cartItem.quantity}</span>
            )}
          </div>

          <div className="flex items-center gap-3 border-l border-gray-300 pl-4 text-sm">
            <button 
              onClick={onUpdateQuantity} 
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
            >
              {isUpdateQuantity ? "Save" : "Update"}
            </button>
            
            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="text-blue-600 font-medium hover:text-red-600 hover:underline transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* DELETE MODAL OVERLAY */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900">Remove Item?</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold">"{cartItem.product?.name}"</span>?
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="order-2 sm:order-1 flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={deleteCartItem}
                className="order-1 sm:order-2 flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 shadow-md shadow-red-200 transition-colors"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemDetails;