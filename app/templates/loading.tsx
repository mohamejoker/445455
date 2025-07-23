export default function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Skeleton */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-12">
          <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="w-96 h-6 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>

          {/* Search and Filter Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-8">
            <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Templates Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-32 h-6 bg-gray-200 rounded"></div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="w-16 h-6 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Templates Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-24 h-5 bg-gray-200 rounded"></div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-200 rounded"></div>
                      <div className="w-6 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2].map((j) => (
                        <div key={j} className="w-12 h-5 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="text-center mt-16 bg-gray-200 rounded-2xl p-12 animate-pulse">
          <div className="w-64 h-8 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="w-96 h-6 bg-gray-300 rounded mx-auto mb-8"></div>
          <div className="w-40 h-12 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
