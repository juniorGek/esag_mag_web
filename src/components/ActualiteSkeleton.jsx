export const ActualitesSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Skeleton pour les 2 actualités principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
        {/* Skeleton pour les autres actualités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48"></div>
          ))}
        </div>
      </div>
    </div>
  );
};