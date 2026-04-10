import { formatMoney } from "../../utils/Money"

const PaymentSummmary = ({paymentSummmary}) => {
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

                <button class="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
    )
}

export default PaymentSummmary