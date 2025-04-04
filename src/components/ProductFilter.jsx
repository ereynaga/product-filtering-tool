import { useEffect, useMemo, useState } from "react"
import ProductCard from "./ProductCard"
import products from "../data/products.json"

export default function ProductFilter() {
  // Track currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Store the min/max price as strings for controlled input behavior
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  // Filtered product list based on current filters
  const [filtered, setFiltered] = useState([])

  // Set price boundaries and unique categories once
  const { categories, minPrice, maxPrice } = useMemo(() => {
    const prices = products.map(p => p.price)
    const unique = Array.from(new Set(products.map(p => p.category)))
    return {
      categories: ["All", ...unique],
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    }
  }, [])

  // Initialize price inputs with actual min/max values from dataset
  useEffect(() => {
    setPriceRange({
      min: minPrice.toString(),
      max: maxPrice.toString(),
    })
  }, [minPrice, maxPrice])
  
  // Apply filters whenever category or price range changes
  useEffect(() => {
    const result = products.filter(p => {
      const categoryMatch = selectedCategory === "All" || p.category === selectedCategory
      const priceMin = parseFloat(priceRange.min) || 0
      const priceMax = parseFloat(priceRange.max) || Infinity
      const priceMatch = p.price >= priceMin && p.price <= priceMax
      return categoryMatch && priceMatch
    })
    setFiltered(result)
  }, [selectedCategory, priceRange])

  // Handle controlled price input changes (only allow whole numbers)
  const handlePriceChange = (e) => {
    const { name, value } = e.target

    if (value === "" || /^[0-9]+$/.test(value)) {
      setPriceRange(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Reset all filters to default values
  const resetFilters = () => {
    setSelectedCategory("All")
    setPriceRange({
      min: minPrice.toString(),
      max: maxPrice.toString(),
    })
  }

  // Toggle for collapsing the sidebar on mobile
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapse = () => setIsCollapsed(prev => !prev)

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full h-full md:w-64 bg-white border border-gray-100 p-4 rounded-xl">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-lg">Filters</h2>

          <button
            onClick={toggleCollapse}
            className="md:hidden text-xl font-bold text-gray-700"
            aria-label="Toggle filter visibility"
          >
            {isCollapsed ? "+" : "−"}
          </button>
        </div>

        <div className={`transition-all duration-300 ${isCollapsed ? "hidden" : "block"}`}>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 mt-4">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm px-3 py-1.5 rounded-md border ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="min" className="block text-xs text-gray-500 mb-1">Min Price ($)</label>
                <input
                  type="text"
                  name="min"
                  id="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="max" className="block text-xs text-gray-500 mb-1">Max Price ($)</label>
                <input
                  type="text"
                  name="max"
                  id="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full mt-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-1">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
            <p className="text-gray-500 mb-4">No products match your current filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
