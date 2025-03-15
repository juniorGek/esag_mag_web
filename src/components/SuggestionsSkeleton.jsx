const SuggestionsSkeleton = () => {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col min-h-[300px] animate-pulse">
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              </div>
              <div className="px-6 py-4 mt-auto border-t border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default SuggestionsSkeleton;