import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [isRendered, setIsRendered] = useState(false);

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
        setIsRendered(true);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventory();
    // eslint-disable-next-line
  }, []);

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:gap-8 mt-2">
          <div>
            <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          </div>
          <div>
            <h1 className="text-md text-center font-bold text-gray-900 uppercase">
              Expiring Soon
            </h1>
            {isRendered && (
              <div className="relative p-4 mt-2 max-h-60 overflow-scroll rounded-md shadow cursor-pointer hover:bg-gray-200">
                <div className="flex justify-between items-center text-sm font-bold text-gray-900 uppercase">
                  <p>Product Name</p>
                  <span>Expiry</span>
                </div>
                {inventory?.map((product) => (
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
                      <span
                        className={
                          product.aboutToExpire > 30
                            ? "text-green-500 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {product.aboutToExpire} days
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          </div>
          <div>
            <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 xl:gap-8 mt-6">
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;
