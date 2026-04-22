import axios from "axios"
import { formatMoney } from "../../utils/money"
import { useNavigate } from "react-router"

const PaymentSummmary = ({paymentSummmary, getCartItems, isLoading, setIsLoading}) => {
  


  const navigate = useNavigate();

  const placeOrder = async () => {
    if(paymentSummmary.totalItems <= 0) return
     setIsLoading(true)
    try{
         await axios.post(`/api/orders`);
         await getCartItems();
         navigate('/orders');
    } catch(error){
      console.error('failed to place order:', error);
    } finally{
         setIsLoading(false);
    }
  };
    const disable = !paymentSummmary || paymentSummmary.totalItems <= 0 || isLoading



    return(
         <div class="payment-summary">
            <div class="payment-summary-title">Payment Summary</div>

            {paymentSummmary && (
              <>
                <div class="payment-summary-row">
                  <div>Items ({paymentSummmary?.totalItems}):</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.productCostCents)}
                  </div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.shippingCostCents)}
                  </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.taxCents)}
                  </div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.totalCostCents)}
                  </div>
                </div>

                <button  disabled={disable} onClick={placeOrder} class="place-order-button button-primary">
                  {isLoading ? 'Placing Order....' : 'Place Order'}
                </button>
              </>
            )}
          </div>
    )
}

export default PaymentSummmary