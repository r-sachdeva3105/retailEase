import React, { useEffect, useState } from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [isInventoryRendered, setIsInventoryRendered] = useState(false);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isTransactionsRendered, setIsTransactionsRendered] = useState(false);
  let totalAmountAfterTax = 0;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api-inventory/all-inventory"
        );
        const data = await response.json();
        setInventory(
          data
            .filter((product) => product.product.isExpirable)
            .sort((a, b) => a.aboutToExpire - b.aboutToExpire)
        );
        setIsInventoryRendered(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventory();

    const fetchProducts = async () => {
      try {
        await fetch("http://localhost:8081/api-product/all-products")
          .then((response) => response.json())
          .then((data) => {
            setProducts(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();

    const fetchTransactions = async () => {
      try {
        await fetch("http://localhost:8081/api-transactions/all-transactions")
          .then((response) => response.json())
          .then((data) => {
            setTransactions(data);
            setIsTransactionsRendered(true);
            console.log(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
    // eslint-disable-next-line
  }, []);

  totalAmountAfterTax = transactions.reduce(
    (sum, transaction) => sum + transaction.amountAfterTax,
    0
  );

  return (
    <div className="min-h-full">
      {/* HEADER */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 md:flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 xl:gap-8 mt-4">
          <div className="flex flex-col gap-2 p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal text-gray-900">
                Total Revenue
              </h2>
              <FiDollarSign />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              ${totalAmountAfterTax}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal text-gray-900">
                Total Transactions
              </h2>
              <FiCreditCard />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              {transactions.length}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal text-gray-900">
                Total Products
              </h2>
              <MdOutlineInventory2 />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              {products.length}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal text-gray-900">
                {/* Total Revenue */}
              </h2>
              {/* <FiDollarSign /> */}
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              {/* $25,000 */}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 mt-6">
          <div className="relative p-4 mt-2 max-h-80 md:max-h-60 overflow-auto rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <h1 className="text-md font-bold text-gray-900">
              Recent Transactions
            </h1>
            {isTransactionsRendered &&
              transactions?.map((transaction) => (
                <div key={transaction.transactionId}>
                  <div className="flex justify-between items-center mt-3">
                    <p className="w-3/4 md:w-4/5 flex gap-2 text-sm font-mono">
                      <span>{transaction.transactionDateAndTime.split(" ")[0]}</span>
                      <span className="">{transaction.transactionDateAndTime.split(" ")[1].slice(0,-5)}</span>
                    </p>
                    <p className="font-bold">${transaction.amountAfterTax}</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="relative p-4 mt-2 max-h-80 md:max-h-60 overflow-auto rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <h1 className="text-md font-bold text-gray-900">Expiring Soon</h1>
            {isInventoryRendered &&
              inventory?.map((product) => (
                <div
                  key={
                    product.productSKU +
                    (product.product.isExpirable
                      ? product.expiryDate.split(" ")[0]
                      : "")
                  }
                >
                  <div className="flex justify-between items-center mt-3">
                    <p className="w-3/4 md:w-4/5">
                      {product.product.productName}
                    </p>
                    <p
                      className={
                        product.aboutToExpire > 30
                          ? "text-green-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {product.aboutToExpire} days
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <div className="relative p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200"></div>
          </div>
          <div>
            <div className="relative p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
