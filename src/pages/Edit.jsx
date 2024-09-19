import React, { useState, useEffect } from "react";
import { BsUpcScan } from "react-icons/bs";
import { HiPhoto } from "react-icons/hi2";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill";

const storage = [
  { value: "select", label: "select" },
  { value: "normal", label: "normal storage" },
  { value: "cold", label: "cold storage" },
  { value: "hot", label: "hot storage" },
  { value: "hazardious", label: "hazardous materials storage" },
];

const Edit = () => {
  console.log();
  const navigate = useNavigate();

  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api-product-category"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const [skuValid, setSkuValid] = useState();
  const [nameValid, setNameValid] = useState();
  const [descValid, setDescValid] = useState();
  const [imgValid, setImgValid] = useState();
  const [costValid, setCostValid] = useState();
  const [sellValid, setSellValid] = useState();
  const [catValid, setCatValid] = useState();
  const [storValid, setStorValid] = useState();
  const [quantValid, setQuantValid] = useState();
  const [disValid, setDisValid] = useState();
  const [isExpirable, setIsExpirable] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getBase64 = (image) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    });
  };

  const [isScanDialogOpen, setIsScanDialogOpen] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");

  const handleScan = (barcode) => {
    if (barcode) {
      console.log(barcode);
      setBarcodeData(barcode.rawValue);
      setIsScanDialogOpen(false);
    } else {
      console.error("Error scanning barcode");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      skuValid &&
      nameValid &&
      descValid &&
      imgValid &&
      costValid &&
      sellValid &&
      catValid &&
      storValid &&
      quantValid &&
      disValid
    ) {
      const product = {
        productSKU: e.target.form[0].value ? e.target.form[0].value : "No SKU",
        productName: e.target.form[2].value
          ? e.target.form[2].value
          : "No Name",
        productDescription: e.target.form[3].value
          ? e.target.form[3].value
          : "No Description",
        productImage: await getBase64(e.target.form[4].files[0]),
        productCostPrice: e.target.form[5].value
          ? parseFloat(e.target.form[5].value)
          : 0,
        productSellingPrice: e.target.form[6].value
          ? parseFloat(e.target.form[6].value)
          : 0,
        productCategoryName: e.target.form[7].value
          ? e.target.form[7].value
          : "No Category",
        storageType: e.target.form[8].value
          ? e.target.form[8].value
          : "No Storage Type",
        productQuantity: e.target.form[9].value
          ? parseInt(e.target.form[9].value)
          : 1,
        discountID: e.target.form[10].value
          ? parseFloat(e.target.form[10].value)
          : 0,
        discountName: "",
        isExpirable: e.target.form[11].checked ? true : false,
        expiryDate: e.target.form[12].value ? e.target.form[12].value : "",
        warehouseName: "Main Warehouse",
      };
      console.log(product);
      const request = {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify(product),
      };
      fetch("http://localhost:8081/api-inventory/add-product", request)
        .then((res) => {
          if (res.ok) {
            navigate("/products");
          } else {
            console.error("Failed to add product");
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <form className="mx-auto my-10 max-w-7xl px-4">
        <div className="space-y-12">
          <div className="pb-12">
            <h1 className="text-base md:text-xl font-semibold leading-7 text-gray-900">
              Product Information
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed in the inventory so be careful
              what you enter.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-600">
                    <input
                      type="number"
                      name="sku"
                      id="sku"
                      autoComplete="sku"
                      className="block bg-transparent flex-1 border-0 py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={barcodeData}
                      onChange={(e) => setBarcodeData(e.target.value)}
                      onBlur={(e) =>
                        e.target.value === ""
                          ? setSkuValid(false)
                          : setSkuValid(true)
                      }
                    />
                    <button
                      type="button"
                      className="flex gap-1 items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                      onClick={() => setIsScanDialogOpen(true)}
                    >
                      Scan
                      <BsUpcScan className="h-4" />
                    </button>
                  </div>
                </div>
                {skuValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid SKU field !
                  </span>
                )}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setNameValid(false)
                        : setNameValid(true)
                    }
                  />
                </div>
                {nameValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid name field !
                  </span>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setDescValid(false)
                        : setDescValid(true)
                    }
                  />
                </div>
                {descValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid description field !
                  </span>
                )}
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few words about the product
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <HiPhoto
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600 focus-within:ring-offset-2 hover:text-sky-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onBlur={(e) =>
                            e.target.files.length === 0
                              ? setImgValid(false)
                              : setImgValid(true)
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {imgValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid image field !
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="cost-price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cost Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="cost-price"
                    id="cost-price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setCostValid(false)
                        : setCostValid(true)
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      CAD
                    </span>
                  </div>
                </div>
                {costValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid cost price field !
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="selling-price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selling Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="selling-price"
                    id="selling-price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setSellValid(false)
                        : setSellValid(true)
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      CAD
                    </span>
                  </div>
                </div>
                {sellValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid selling price field !
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-sm leading-6 cursor-pointer capitalize"
                    onBlur={(e) =>
                      e.target.value === "select"
                        ? setCatValid(false)
                        : setCatValid(true)
                    }
                  >
                    <option value="select">Select</option>
                    {categories?.map((category) => (
                      <option
                        key={category.productCategoryId}
                        value={category.productCategoryName}
                      >
                        {category.productCategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                {catValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid category field !
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="storage-type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Storage Type
                </label>
                <div className="mt-2">
                  <select
                    id="storage-type"
                    name="storage-type"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-sm leading-6 cursor-pointer capitalize"
                    onBlur={(e) =>
                      e.target.value === "select"
                        ? setStorValid(false)
                        : setStorValid(true)
                    }
                  >
                    {storage?.map((storage) => (
                      <option key={storage.value} value={storage.value}>
                        {storage.label}
                      </option>
                    ))}
                  </select>
                </div>
                {storValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid storage type field !
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setQuantValid(false)
                        : setQuantValid(true)
                    }
                  />
                </div>
                {quantValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid quantity field !
                  </span>
                )}
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    onBlur={(e) =>
                      e.target.value === ""
                        ? setDisValid(false)
                        : setDisValid(true)
                    }
                  />
                </div>
                {disValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    Invalid discount field !
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 space-y-2">
              <legend className="block text-sm font-medium leading-6 text-gray-900">
                Expiry
              </legend>
              <div className="flex justify-between md:justify-normal md:gap-40">
                <div className="flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="expirable"
                      name="expirable"
                      type="checkbox"
                      onChange={(e) => setIsExpirable(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600 cursor-pointer"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="expirable"
                      className="font-medium text-gray-900"
                    >
                      Expirable?
                    </label>
                  </div>
                </div>
                {isExpirable && (
                  <div className=" flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="expiry-date"
                        name="expiry-date"
                        type="date"
                        className="rounded-md py-1.5 px-3 text-sm shadow-sm ring-1 ring-inset ring-gray-300 border-0 focus:ring-sky-600 cursor-pointer"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="expiry-date"
                        className="font-medium text-gray-900"
                      >
                        Expiry Date
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Save
          </button>
        </div>
      </form>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl transition duration-500 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Invalid Product Data
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                Please fill all the product details as all the details are
                mandatory to add the product.
              </p>
              <div className="mt-4 flex justify-end">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isScanDialogOpen}
        onClose={() => setIsScanDialogOpen(false)}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl transition duration-500 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/none font-medium text-white mb-4"
              >
                Scan Your Product Code
              </DialogTitle>
              <BarcodeScanner
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
              <div className="mt-4 flex justify-end">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setIsScanDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Edit;
