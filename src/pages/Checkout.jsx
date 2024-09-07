import React, { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { BsUpcScan } from "react-icons/bs";

const Checkout = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [barcodeData, setBarcodeData] = useState([]);

  const handleScan = (barcode) => {
    if (barcode) {
      setBarcodeData((prevData) => {
        if (!prevData.includes(barcode.rawValue)) {
          return [...prevData, barcode.rawValue];
        }
        return prevData;
      });
    } else {
      console.error("Error scanning barcode");
    }
    console.log(barcodeData);
  };

  const handleCheckout = () => {
    setIsEnabled(false);
  };

  return (
    <div className="min-h-full">
      {/* HEADER */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 md:flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Checkout
          </h1>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-4">
          <div className="relative col-span-1 lg:col-span-2 p-4 rounded-md shadow order-last lg:order-first">
            <div className="overflow-auto shadow rounded-md h-60 lg:h-80">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-900 uppercase bg-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Item Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Discount
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                {/* {isRendered && <tbody>
                                    {filteredProducts?.map((product) => (
                                        <tr key={product.productSKU} className="odd:bg-white even:bg-gray-50 border-b">
                                            <th scope="row" className="px-4 py-4 font-medium text-gray-800 whitespace-nowrap capitalize">
                                                {product.productName}
                                            </th>
                                            <td className="px-4 py-4 capitalize">
                                                {product.productCategoryName}
                                            </td>
                                            <td className="px-4 py-4">
                                                ${product.productSellingPrice}
                                            </td>
                                            <td className="px-4 py-4 capitalize">
                                                {product.storageType}
                                            </td>
                                            <td className="px-4 py-4 flex gap-3">
                                                <p
                                                    onClick={() => handleAdd(product.productSKU, product.productName, product.isExpirable)}
                                                    className="font-medium text-sky-600 hover:underline cursor-pointer"
                                                >
                                                    Add
                                                </p>
                                                <p
                                                    className="font-medium text-sky-600 hover:underline cursor-pointer"
                                                >
                                                    Edit
                                                </p>
                                                <p
                                                    onClick={() => handleDelete(product.productSKU, product.productName)}
                                                    className="font-medium text-sky-600 hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>} */}
              </table>
            </div>
            <div className="grid grid-cols-4 gap-x-2">
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Inquiry
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Settings
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  1
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  4
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  7
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  .
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  2
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  5
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  8
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  0
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  3
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  6
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                >
                  9
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
          <div className="relative col-span-1 p-4 rounded-md shadow lg:flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Scan Items
              </h2>
              <div className="w-full h-64 flex justify-center items-center bg-gray-200 rounded-md">
                {!isEnabled && (
                  <button
                    type="button"
                    className="mt-2 h-fit rounded-md bg-transparent px-3 py-5 text-sm font-semibold hover:text-sky-600"
                    onClick={() => setIsEnabled(true)}
                  >
                    <BsUpcScan size={40} />
                  </button>
                )}
                {isEnabled && (
                  <BarcodeScanner
                    className="rounded-md"
                    options={{
                      formats: [
                        "code_128",
                        "code_39",
                        "code_93",
                        "codabar",
                        "ean_13",
                        "ean_8",
                        "itf",
                        "upc_a",
                        "upc_e",
                      ],
                    }}
                    onCapture={handleScan}
                  />
                )}
              </div>
              <input
                type="number"
                name="price"
                id="price"
                class="block w-full mt-3 rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-md sm:leading-6"
                placeholder="0.00"
                autoComplete="off"
                disabled
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 my-2">
                Order Summary
              </h2>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">
                    Subtotal
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">$0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">
                    Discount
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">-$0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">Tax</dt>
                  <dd className="text-sm text-gray-900 font-medium">$0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-md font-bold text-gray-800">Total</dt>
                  <dd className="text-md font-bold text-gray-900">$0.00</dd>
                </div>
              </dl>
              <button
                type="button"
                className="mt-2 inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                onClick={handleCheckout}
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
