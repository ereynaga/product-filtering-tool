// src/components/ProductFilter.jsx
import { useMemo, useState } from "react"
import ProductCard from "./ProductCard"
import products from "../data/products.json"

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "under-50", label: "Under $50", min: 0, max: 50 },
  { value: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { value: "100-500", label: "$100 - $500", min: 100, max: 500 },
  { value: "over-500", label: "Over $500", min: 500, max: Infinity },
]

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]
const brands = ["All", ...Array.from(new Set(products.map(p => p.brand)))]

const categoryOptions = categories.map(c => ({ value: c, label: c }))
const brandOptions = brands.map(b => ({ value: b, label: b }))
const priceOptions = priceRanges.map(r => ({ value: r.value, label: r.label }))

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export default function ProductFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedBrand !== "All" ? 1 : 0) +
    (selectedPriceRange !== "all" ? 1 : 0)

  const filtered = useMemo(() => {
    const range = priceRanges.find(r => r.value === selectedPriceRange) || priceRanges[0]
    return products.filter(p => {
      const categoryMatch = selectedCategory === "All" || p.category === selectedCategory
      const brandMatch = selectedBrand === "All" || p.brand === selectedBrand
      const priceMatch = p.price >= range.min && p.price <= range.max
      return categoryMatch && brandMatch && priceMatch
    })
  }, [selectedCategory, selectedBrand, selectedPriceRange])

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedBrand("All")
    setSelectedPriceRange("all")
  }

  const FilterSelect = ({ label, value, onChange, options }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-shadow cursor-pointer"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </span>
      </div>
    </div>
  )

  return (
    <section>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FilterSelect
              label="Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryOptions}
            />
            <FilterSelect
              label="Brand"
              value={selectedBrand}
              onChange={setSelectedBrand}
              options={brandOptions}
            />
            <FilterSelect
              label="Price"
              value={selectedPriceRange}
              onChange={setSelectedPriceRange}
              options={priceOptions}
            />
          </div>
          <button
            type="button"
            onClick={clearFilters}
            disabled={activeFiltersCount === 0}
            className="w-full md:w-auto py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            Clear all {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Showing <span className="font-medium text-gray-900">{filtered.length}</span> of {products.length} products
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">No products match your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  )
}
