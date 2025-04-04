// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  const { name, category, price, imageUrl, description } = product
  
  // Format price as USD currency with 2 decimal places
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{category}</p>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-2">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <p className="font-semibold text-gray-900">{formatPrice(price)}</p>
          <button className="text-sm px-3 py-1.5 rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-800">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}