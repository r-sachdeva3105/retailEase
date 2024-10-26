import React, { useEffect, useState } from "react";
import { FiDollarSign, FiCreditCard } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [isInventoryRendered, setIsInventoryRendered] = useState(false);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isTransactionsRendered, setIsTransactionsRendered] = useState(false);
  const [bestSellings, setBestSellings] = useState([]);
  const [isBestSellingsRendered, setIsBestSellingsRendered] = useState(false);
  let totalAmount = 0;
  let totalCostPrice = 0;
  let totalProfit = 0;

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
            // calculate();
            setIsTransactionsRendered(true);
            console.log(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();

    const fetchBestSelling = async () => {
      try {
        await fetch("http://localhost:8081/api-product/best-selling-product")
          .then((response) => response.json())
          .then((data) => {
            setBestSellings(data);
            setIsBestSellingsRendered(true);
            console.log(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSelling();
    // eslint-disable-next-line
  }, []);

  totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction?.orderDTO?.totalAmount,
    0
  );

  let data = [];
  let sizing = {};

  transactions.forEach((transaction) => {
    transaction.orderDTO.orderItems.forEach((item) => {
      totalCostPrice += item.productCostPrice;
    });
  });

  totalProfit = totalAmount - totalCostPrice;

  const getArcLabel = (params) => {
    const percent = params.value / totalAmount;
    return `${(percent * 100).toFixed(0)}%`;
  };

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
              <FaChartLine />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              ${totalAmount}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-normal text-gray-900">
                Total Profit
              </h2>
              <FiDollarSign />
            </div>
            <span className="text-3xl font-extrabold text-gray-900">
              ${totalProfit}
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
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 mt-6">
          <div className="relative p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <h1 className="text-md font-bold text-gray-900">Cost and Profit</h1>
            <div className="flex justify-center">
              {isTransactionsRendered && (
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: totalProfit,
                          label: "Profit",
                          color: "#14b8a6",
                        },
                        {
                          id: 1,
                          value: totalCostPrice,
                          label: "Cost",
                          color: "#0284c7",
                        },
                      ],
                      arcLabel: getArcLabel,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontSize: 14,
                    },
                  }}
                  width={400}
                  height={200}
                />
              )}
            </div>
          </div>
          <div className="relative cursor-pointer hover:bg-gray-200 border border-yellow-500 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <h1 className="text-md font-bold text-gray-900">
              Best Selling Products
            </h1>
            {isBestSellingsRendered &&
              bestSellings.map((product) => (
                <div
                  key={product.productSKU}
                  className="flex justify-between items-center mt-3"
                >
                  <p>{product.productName}</p>
                </div>
              ))}
            <div className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-8 font-bold transform rotate-45 translate-x-10 translate-y-5 shadow-lg">
              Bestseller
            </div>
          </div>
          <div className="relative p-4 mt-2 max-h-80 md:max-h-60 overflow-auto rounded-xl shadow cursor-pointer hover:bg-gray-200">
            <h1 className="text-md font-bold text-gray-900">
              Recent Transactions
            </h1>
            {isTransactionsRendered &&
              transactions?.map((transaction) => (
                <div key={transaction.transactionId}>
                  <div className="flex justify-between items-center mt-3">
                    <p className="w-3/4 md:w-4/5 flex gap-2 text-sm font-mono">
                      {transaction.transactionDateAndTime.split(" ")[0]}
                      {" at "}
                      {transaction.transactionDateAndTime
                        .split(" ")[1]
                        .slice(0, -5)}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
