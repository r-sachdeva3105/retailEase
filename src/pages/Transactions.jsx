import React, { useEffect, useState } from "react";
import { MdPrint } from "react-icons/md";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api-transactions/all-transactions"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-full">
      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 md:flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Transactions
          </h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl p-4">
        <div className="relative overflow-x-auto shadow rounded-md mt-4 overflow-scroll max-h-[420px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600">
            <thead className="text-xs text-gray-900 uppercase bg-gray-300">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order#
                </th>
                <th scope="col" className="px-4 py-3">
                  Order Date & Time
                </th>
                <th scope="col" className="px-4 py-3">
                  Items
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.transactionId}
                    className="odd:bg-white even:bg-gray-50 border-b"
                  >
                    <td className="px-4 py-2">{transaction.orderId}</td>
                    <td className="px-4 py-2">
                      {transaction.transactionDateAndTime}
                    </td>
                    <td className="px-4 py-2">
                      {transaction.orderDTO.orderItems.map((item) => (
                        <div key={item.productSku}>
                          {item.orderQuantity} x {item.prooductName}{" "}
                          {/* Fixed the typo */}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      ${transaction.amountAfterTax.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <MdPrint size={30} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
