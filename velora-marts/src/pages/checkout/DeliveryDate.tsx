import dayjs from "dayjs"

const DeliveryDate = ({deliveryDate}) => {
    return(
         <div className="font-bold text-[19px] text-green-700">
                Delivery date:{" "}
                {dayjs(deliveryDate.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
    )
}
export default  DeliveryDate