import React from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Description,
  Field,
  Label,
} from "@headlessui/react";

const DeleteDialog = ({
  isDeleteDialogOpen,
  closeDeleteDialog,
  deleteProductName,
  deleteValid,
  handleDeleteConfirm,
}) => {
  return (
    <Dialog
      as="div"
      open={isDeleteDialogOpen}
      onClose={closeDeleteDialog}
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
                  Delete Product
                </Label>
                <Description className="text-sm/6 text-white/50">
                  Are you sure you want to delete {deleteProductName}?
                </Description>
                {deleteValid === false && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1">
                    Product is still in inventory!
                  </span>
                )}
                <div className="mt-4 flex justify-end gap-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={closeDeleteDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
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

export default DeleteDialog;
