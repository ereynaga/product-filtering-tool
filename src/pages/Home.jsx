import ProductFilter from "../components/ProductFilter"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Shop Our Collection</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover premium products curated for quality and style.
          </p>
        </div>
        <ProductFilter />
      </div>
    </main>
  )
}
