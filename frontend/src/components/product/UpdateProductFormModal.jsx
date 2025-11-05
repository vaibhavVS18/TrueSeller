import React from "react";
import { Loader2 } from "lucide-react";

export default function UpdateProductFormModal({
  showModal,
  setShowModal,
  productForm,
  handleProductFormChange,
  handleUpdateProduct,
  handleImageUpload,
  uploading,
  setProductForm
}) {
  if (!showModal) return null;

  return (
        <div 
        className="fixed inset-0 z-50 p-2 flex items-start sm:items-center justify-center backdrop-blur-sm bg-black/50 overflow-auto"
        onClick={()=>setShowModal(false)}
        >
          <div 
          className="relative bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto mt-20 sm:mt-0"
          onClick={(e)=>e.stopPropagation()}
          >
          {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              X
            </button>

            <h3 className="text-lg font-semibold mb-4">Update Product</h3>
            <form onSubmit={handleUpdateProduct} className="space-y-3">

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Product Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  className="w-full p-2 border rounded"
                />
              </label>

            <div className="grid grid-cols-2 gap-3">

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Price</span>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Stock</span>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={productForm.stock}
                  onChange={handleProductFormChange}
                  className="w-full p-2 border rounded"
                />
              </label>

            </div>


              <label className="block">
                <span className="text-sm font-medium text-gray-700">Category</span>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={productForm.category}
                  onChange={handleProductFormChange}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Tags (comma separated)</span>
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={productForm.tags}
                  onChange={handleProductFormChange}
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Upload Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full"
                />
              </label>

              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

              <div className="grid grid-cols-3 gap-2">
                {productForm.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-24 object-cover border rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded transition">
                      ✕
                    </button>
                  </div>
                ))}
              </div>


              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-emerald-500 text-white rounded"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}
