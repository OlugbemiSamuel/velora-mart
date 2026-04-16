import OrdersHeader from "./OrdersHeader";
import OrdersDetailsGrid from "./OrdersDetailsGrid";

const OrdersGrid = ({ orders, getCartItems, isLoading, setIsLoading,}) => {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />
          <OrdersDetailsGrid setIsLoading={setIsLoading} isLoading={isLoading} getCartItems={getCartItems} order={order} />
          </div>
        );
      })}
    </div>
  );
};

export default OrdersGrid;
