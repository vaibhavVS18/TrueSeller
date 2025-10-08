import { useState } from "react";

export default function UpdateShopFormModal({
  showShopModal,
  setShowShopModal,
  shopForm,
  handleShopChange,
  handleUpdateShop,
  shopUpdateLoading
}) {
  if (!showShopModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex backdrop-blur-sm items-center justify-center bg-black/50 p-2"
      onClick={() => setShowShopModal(false)}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowShopModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="flex justify-center text-2xl font-semibold mb-4 text-emerald-700">
          Update Shop
        </h2>

        <form onSubmit={handleUpdateShop} className="flex flex-col gap-3">
          {/* Logo Upload */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {shopForm.logo ? (
                  <img
                    src={
                      typeof shopForm.logo === "string"
                        ? shopForm.logo
                        : URL.createObjectURL(shopForm.logo)
                    }
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Upload Logo</span>
                )}
              </div>
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleShopChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Inputs */}
          <input
            type="text"
            name="shopname"
            placeholder="Shop Name"
            value={shopForm.shopname}
            onChange={handleShopChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={shopForm.city}
            onChange={handleShopChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shopForm.address}
            onChange={handleShopChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={shopForm.contactEmail}
            onChange={handleShopChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="text"
            name="contactPhone"
            placeholder="Contact Phone"
            value={shopForm.contactPhone}
            onChange={handleShopChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Shop Description"
            value={shopForm.description}
            onChange={handleShopChange}
            className="w-full p-2 border rounded-lg"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => setShowShopModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={shopUpdateLoading}
            >
            {shopUpdateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
