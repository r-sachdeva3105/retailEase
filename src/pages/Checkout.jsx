import React, { useState, useEffect } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";
import { BsUpcScan } from "react-icons/bs";
import { FaBackspace } from "react-icons/fa";
import clsx from "clsx";

import {
  Button,
  Dialog,
  DialogPanel,
  Description,
  Field,
  Input,
  Label,
} from "@headlessui/react";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [subTotal, setSubtotal] = useState(0.0);
  const [tax, setTax] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch("http://localhost:8081/api-product/all-products")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setProducts(data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const [newItem, setNewItem] = useState("");
  const [transactionItems, setItems] = useState([], addItem); // transaction items
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentEditQuantity, setCurrentEditQuantity] = useState(0);

  function updateTotal(items, setSubtotal, setTotal) {
    const newSubTotal = items.reduce(
      (acc, item) => acc + parseFloat(item.productSellingPrice * item.quantity),
      0
    );
    setSubtotal(newSubTotal);

    const taxOnSubtotal = (0.13 * newSubTotal).toFixed(2);
    setTax(parseFloat(taxOnSubtotal));

    const totalWithTax = (newSubTotal + parseFloat(taxOnSubtotal)).toFixed(2);
    setTotal(parseFloat(totalWithTax));
  }

  const toggleSelect = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setCurrentEditQuantity(transactionItems[index].quantity);
  };

  const clearSelected = () => {
    if (selectedIndex >= 0 && selectedIndex < transactionItems.length) {
      let filteredTransactionList = transactionItems.filter(
        (_, index) => index !== selectedIndex
      );
      setItems(filteredTransactionList);
      updateTotal(filteredTransactionList, setSubtotal, setTotal);
      setSelectedIndex();
    }
  };

  const setTransactionItemQuantity = () => {
    console.log(currentEditQuantity);
    if (selectedIndex >= 0 && selectedIndex < transactionItems.length) {
      let updatedTransactionList = transactionItems.map((item, index) => {
        if (index === selectedIndex) {
          return { ...item, quantity: currentEditQuantity };
        }
        return item;
      });

      setItems(updatedTransactionList);
      updateTotal(updatedTransactionList, setSubtotal, setTotal);
      setSelectedIndex();
      setIsEditDialogOpen(false);
    }
  };

  function handleInputChange(event) {
    setNewItem(event.target.value);
    console.log(newItem);
  }

  function clearItems() {
    const clearedTransactionList = transactionItems.filter(() => false);
    setItems(clearedTransactionList);
    updateTotal(clearedTransactionList, setSubtotal, setTotal);
  }

  function addItem() {
    const itemToAdd = products.find(
      (product) => parseInt(product.productSKU) === parseInt(newItem)
    );

    const { productSKU, productName, productSellingPrice, discountID } =
      itemToAdd;
    const transactionWithQty = {
      productSKU,
      productName,
      productSellingPrice,
      discountID,
      quantity,
    };

    if (transactionWithQty) {
      const updatedItems = [...transactionItems, transactionWithQty];
      setItems(updatedItems); // Update items first

      // Update total using the updateTotal function
      updateTotal(updatedItems, setSubtotal, setTotal);

      // Reset newItem
      setNewItem("");
    }
    setIsDialogOpen(false);
  }

  const open = () => {
    setIsDialogOpen(true);
  };

  const close = () => {
    //setCatValid(true);
    setIsDialogOpen(false);
  };

  const openEdit = () => {
    setIsEditDialogOpen(true);
  };

  const closeEdit = () => {
    setIsEditDialogOpen(false);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const [barcodeData, setBarcodeData] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

  const handleCheckout = async (e) => {
    setIsEnabled(false);
    // if transaction list is not empty
    if (transactionItems.length !== 0) {
      const orderItem = {};

      transactionItems.forEach((product) => {
        const { productSKU, quantity } = product;

        if (orderItem[productSKU]) {
          orderItem[productSKU].orderQuantity += quantity;
        } else {
          orderItem[productSKU] = {
            productSku: productSKU,
            orderQuantity: quantity,
          };
        }
      });

      const orderItems = Object.values(orderItem);

      const order = {
        totalAmount: subTotal,
        amountAfterTax: total,
        employeeId: 5789,
        orderItems,
      };

      try {
        const response = await fetch(
          "http://localhost:8081/api-orders/add-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.ok) {
          console.log("posted");
          clearItems();
        }

        const jsonResponse = await response.json();
        console.log(jsonResponse);
      } catch (error) {
        console.log(error.message);
      }
    }
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
                {transactionItems.map((product, index) => (
                  <tbody>
                    <tr
                      key={index}
                      onClick={() => toggleSelect(index)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedIndex === index ? "#f0f0f0" : "transparent",
                      }}
                    >
                      <td className="px-4 py-3">{product.productName}</td>
                      <td className="px-4 py-3">
                        {product.productSellingPrice}
                      </td>
                      <td className="px-4 py-3">{product.quantity}</td>
                      <td className="px-4 py-3">0.0</td>
                      <td className="px-4 py-3">
                        {product.productSellingPrice * product.quantity}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="grid grid-cols-4 gap-x-2">
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-green-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Inquiry
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-red-700 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  onClick={clearSelected}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-amber-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  onClick={() => clearItems()}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={openEdit}
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-gray-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Edit
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 1)}
                >
                  1
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 4)}
                >
                  4
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 7)}
                >
                  7
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-red-700 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  onClick={() => setQuantity(Math.floor(quantity / 10))}
                >
                  <FaBackspace size={24} />
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 2)}
                >
                  2
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 5)}
                >
                  5
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 8)}
                >
                  8
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10)}
                >
                  0
                </button>
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 3)}
                >
                  3
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 6)}
                >
                  6
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-sky-800 px-3 py-5 text-md lg:text-xl font-semibold text-white shadow hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                  onClick={() => setQuantity(quantity * 10 + 9)}
                >
                  9
                </button>
                <button
                  type="button"
                  className="mt-2 inline-flex w-full h-16 justify-center rounded-md bg-green-600 px-3 py-5 text-md lg:text-lg font-semibold text-white shadow hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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
              <div className="flex gap-2 w-full">
                <div className="w-1/2">
                  <label
                    htmlFor="price"
                    className="block mt-3 text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-2 text-md lg:text-lg text-gray-900 font-bold ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                    autoComplete="off"
                    value={quantity}
                    disabled
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 w-1/2 h-10 lg:h-11 self-end justify-center rounded-md bg-sky-600 text-md lg:text-lg font-semibold text-white shadow hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  onClick={open}
                >
                  Manual Entry
                </button>
              </div>
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
                  <dd className="text-sm text-gray-900 font-medium">
                    ${subTotal}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">
                    Discount
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">-$0.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm font-medium text-gray-600">Tax</dt>
                  <dd className="text-sm text-gray-900 font-medium">
                    HST @1.3% ${tax}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-md font-bold text-gray-800">Total</dt>
                  <dd className="text-md font-bold text-gray-900">${total}</dd>
                </div>
              </dl>
              <button
                type="button"
                className={`mt-2 inline-flex w-full h-16 justify-center rounded-md 
                  ${
                    transactionItems.length === 0
                      ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                      : "bg-sky-600 text-white"
                  }
                  px-3 py-5 text-md lg:text-lg font-semibold shadow 
                  ${
                    transactionItems.length === 0
                      ? "hover:bg-gray-400"
                      : "hover:bg-sky-500"
                  }
                  focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-sky-600`}
                onClick={
                  transactionItems.length !== 0 ? handleCheckout : undefined
                }
                disabled={transactionItems.length === 0} //
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </main>

      <Dialog
        as="div"
        open={isDialogOpen}
        onClose={close}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Field>
                <form>
                  <Label className="text-md font-medium text-white">
                    Manual Entry
                  </Label>
                  <Description className="text-sm/6 text-white/50">
                    Enter UPC of the item
                  </Description>
                  <Input
                    type="text"
                    value={newItem}
                    onChange={handleInputChange}
                    className={clsx(
                      "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={close}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={() => addItem()}
                    >
                      Add
                    </Button>
                  </div>
                </form>
              </Field>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        as="div"
        open={isEditDialogOpen}
        onClose={closeEdit}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Field>
                <form>
                  <Label className="text-md font-medium text-white">
                    Update Product
                  </Label>
                  <Description className="text-sm/6 text-white/50">
                    Update quantity of product
                  </Description>
                  <div className="flex items-center justify-center my-3">
                    <button
                      className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-gray-600 hover:bg-gray-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentEditQuantity(currentEditQuantity - 1);
                      }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <Input
                      type="number"
                      className={clsx(
                        "mx-3 w-20 rounded-lg border-none bg-white/5 py-1.5 px-3 text-lg font-bold text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 text-center"
                      )}
                      value={currentEditQuantity}
                    />
                    <button
                      className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-sky-600 hover:bg-sky-500"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentEditQuantity(currentEditQuantity + 1);
                      }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v12M6 12h12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={closeEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setTransactionItemQuantity()}
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Field>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Checkout;
