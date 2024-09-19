import React from "react";
import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogPanel,
  Description,
  Field,
  Label,
  Input,
} from "@headlessui/react";

const AddDialog = ({
  isAddDialogOpen,
  closeAddDialog,
  addProductName,
  addProductExpirable,
  quantValid,
  expValid,
  setQuantValid,
  setExpValid,
  handleAddConfirm,
}) => {
  return (
    <Dialog
      as="div"
      open={isAddDialogOpen}
      onClose={closeAddDialog}
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
                  Add Product
                </Label>
                <Description className="text-sm/6 text-white/50">
                  Add {addProductName} to the Inventory
                </Description>
                <div className="mt-4">
                  <Label className="text-sm/6 font-medium text-white">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    autoFocus
                    className={clsx(
                      "mt-1 block w-2/3 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    onBlur={(e) =>
                      e.target.value < 1
                        ? setQuantValid(false)
                        : setQuantValid(true)
                    }
                  />
                  {quantValid === false && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                      Invalid quantity field!
                    </span>
                  )}

                  {addProductExpirable && (
                    <Label className="text-sm/6 font-medium text-white">
                      Expiry Date
                    </Label>
                  )}
                  {addProductExpirable && (
                    <Input
                      id="expiry-date"
                      name="expiry-date"
                      type="date"
                      className={clsx(
                        "mt-1 block w-2/3 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white cursor-text",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                      onBlur={(e) =>
                        e.target.value === ""
                          ? setExpValid(false)
                          : setExpValid(true)
                      }
                    />
                  )}
                  {addProductExpirable && expValid === false && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                      Invalid expiry field!
                    </span>
                  )}
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={closeAddDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleAddConfirm}
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
  );
};

export default AddDialog;
