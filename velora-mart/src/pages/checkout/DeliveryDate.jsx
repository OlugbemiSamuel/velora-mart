import dayjs from "dayjs"

const DeliveryDate = ({deliveryDate}) => {
    return(
         <div class="delivery-date">
                Delivery date:{" "}
                {dayjs(deliveryDate.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
    )
}
export default  DeliveryDate