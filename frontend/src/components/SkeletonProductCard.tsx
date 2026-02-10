import React from 'react';

const SkeletonProductCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-sm overflow-hidden shadow-elegant flex flex-col">
      <div className="relative overflow-hidden h-80 bg-stone-200 dark:bg-stone-700 animate-pulse"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-1/2 mb-6 animate-pulse"></div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-10 bg-stone-200 dark:bg-stone-700 rounded w-full animate-pulse"></div>
            <div className="h-10 bg-stone-200 dark:bg-stone-700 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
