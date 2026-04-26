import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router";
import type { PaymentSummary } from "../../types/ecommerce";

interface PaymentSummaryProps {
  paymentSummmary: PaymentSummary | null; 
  getCartItems: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PaymentSummmary = ({ paymentSummmary, getCartItems, isLoading, setIsLoading }: PaymentSummaryProps) => {
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!paymentSummmary || paymentSummmary.totalItems <= 0) return;
    setIsLoading(true);
    try {
      await axios.post(`/api/orders`);
      await getCartItems();
      navigate('/orders');
    } catch (error) {
      console.error('failed to place order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disable = !paymentSummmary || paymentSummmary.totalItems <= 0 || isLoading;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm h-fit">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Payment Summary</h2>

      {paymentSummmary && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Items ({paymentSummmary.totalItems}):</span>
            <span>{formatMoney(paymentSummmary.productCostCents)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping & handling:</span>
            <span>{formatMoney(paymentSummmary.shippingCostCents)}</span>
          </div>

          <div className="my-2 border-t border-gray-100 pt-2 flex justify-between text-sm text-gray-600">
            <span>Total before tax:</span>
            <span>{formatMoney(paymentSummmary.totalCostBeforeTaxCents)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Estimated tax (10%):</span>
            <span>{formatMoney(paymentSummmary.taxCents)}</span>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
            <span>Order total:</span>
            <span>{formatMoney(paymentSummmary.totalCostCents)}</span>
          </div>

          <button 
            disabled={disable} 
            onClick={placeOrder} 
            className="mt-6 w-full rounded-full bg-yellow-400 py-3 text-sm font-bold text-black transition-all hover:bg-yellow-500 active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSummmary;