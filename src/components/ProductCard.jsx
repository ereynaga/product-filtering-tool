// src/components/ProductCard.jsx
import { useState } from "react"
import { useCart } from "../context/CartContext"

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price)
}

export default function ProductCard({ product }) {
  const { name, brand, category, price, originalPrice, imageUrl, description, isNew, isOnSale } = product
  const { addToCart } = useCart()
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        {(isNew || isOnSale) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isNew && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-green-500 text-white rounded-full shadow-sm">
                New
              </span>
            )}
            {isOnSale && (
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded-full shadow-sm">
                Sale
              </span>
            )}
          </div>
        )}

        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm px-4 text-center">
            {name}
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{category} · {brand}</p>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-2">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">{formatPrice(price)}</p>
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatPrice(originalPrice)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${name} to cart`}
            className="text-sm px-3 py-1.5 rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
