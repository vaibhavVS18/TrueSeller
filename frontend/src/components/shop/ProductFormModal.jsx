import { useState } from "react";

export default function ProductFormModal({ 
  showProductModal, 
  setShowProductModal,
  newProduct,
  handleProductChange,
  handleImageUpload,
  uploading,
  handleCreateProduct
}) {
  if (!showProductModal) return null;

  return (
    <div
     className="fixed inset-0 z-50 p-3 flex items-center justify-center backdrop-blur-sm bg-black/50"
     onClick={()=>setShowProductModal(false)}
     >
      <div
       className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative"
       onClick={(e)=>e.stopPropagation()}
       >

        {/* Close Button */}
        <button
          onClick={() => setShowProductModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold mb-4">New Product</h3>

        <form onSubmit={handleCreateProduct} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleProductChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleProductChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleProductChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleProductChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newProduct.tags}
            onChange={handleProductChange}
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleProductChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />

          {uploading && (
            <p className="text-sm text-gray-500">Uploading images...</p>
          )}

          {/* Image Previews */}
          <div className="flex flex-wrap gap-2 mt-2">
            {newProduct.images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setShowProductModal(false)}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
