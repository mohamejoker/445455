export default function HelpLoading() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header Skeleton */}
      <header className="border-b bg-white">
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
          <div className="w-48 h-10 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="w-80 h-6 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>

          {/* Search Skeleton */}
          <div className="relative max-w-2xl mx-auto">
            <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-8 text-center animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="w-20 h-6 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-10 bg-gray-300 rounded-md"></div>
            ))}
          </div>

          {/* FAQ Content Skeleton */}
          <div className="space-y-8">
            {[1, 2, 3, 4].map((categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((faqIndex) => (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-lg animate-pulse">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-80 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section Skeleton */}
        <div className="mt-16 bg-gray-200 rounded-2xl p-8 text-center animate-pulse">
          <div className="w-64 h-8 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="w-96 h-6 bg-gray-300 rounded mx-auto mb-8"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-32 h-12 bg-gray-300 rounded"></div>
            <div className="w-32 h-12 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
