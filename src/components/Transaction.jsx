import React, { forwardRef } from "react";

const Transaction = forwardRef(({ transaction }, ref) => {
  return (
    <div ref={ref} className="transaction border p-4 mb-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Order ID: {transaction.orderId}</h2>
      <p className="text-sm text-gray-600">
        Order Date & Time: {transaction.transactionDateAndTime}
      </p>
      <h3 className="text-lg font-medium mt-2">Items:</h3>
      <ul className="list-disc ml-5">
        {transaction.orderDTO.orderItems.map((item) => (
          <li key={item.productSku}>
            {item.orderQuantity} x {item.productName}
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold">
        Price: ${transaction.amountAfterTax.toFixed(2)}
      </p>
    </div>
  );
});

export default Transaction;
