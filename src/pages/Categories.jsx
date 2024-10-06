import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Description,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api-product-category"
        );
        const data = await response.json();
        setCategories(data);
        setIsRendered(true);
      } catch (error) {
        console.error(error);
        setCategories("");
      }
    };
    fetchCategories();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [catValid, setCatValid] = useState();

  const open = () => {
    setIsDialogOpen(true);
  };

  const close = () => {
    setCatValid(true);
    setIsDialogOpen(false);
  };

  const save = async (e) => {
    if (e?.value) {
      const request = {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          productCategoryName: e.value,
        }),
      };
      await fetch("http://localhost:8081/api-product-category", request)
        .then((res) => {
          if (res?.ok) {
            setCatValid(true);
            setIsDialogOpen(false);
            window.location.reload();
          } else {
            e.value = "";
            setCatValid(false);
          }
        })
        .catch((err) => {
          console.error(err);
          e.value = "";
          setCatValid(false);
        });
    } else {
      setCatValid(false);
    }
  };

  return (
    <div className="min-h-full">
      {/* HEADER */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <button
            onClick={open}
            type="button"
            className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <svg
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Category
          </button>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl p-4">
        {categories === "" && (
          <span className="text-lg font-semibold">No Category Found :(</span>
        )}
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isRendered &&
            categories?.map((category) => (
              <div
                key={category.productCategoryId}
                className="group relative p-4 rounded-xl shadow cursor-pointer hover:bg-gray-200"
              >
                <Link to={"/inventory?category=" + category.productCategoryId}>
                  <h3 className="text-md font-bold text-gray-700 text-center capitalize">
                    {category.productCategoryName}
                  </h3>
                </Link>
              </div>
            ))}
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
                    Category
                  </Label>
                  <Description className="text-sm/6 text-white/50">
                    Add a category mentioned on product box
                  </Description>
                  <Input
                    className={clsx(
                      "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                  {catValid === false && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Invalid category field !
                    </span>
                  )}
                  <div className="mt-4 flex justify-end gap-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={close}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={(e) => save(e.target.form[0])}
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

export default Categories;
