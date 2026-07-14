import React from 'react';

export default function BookCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="p-4 bg-surface-container-low">
        <div className="w-full aspect-[4/5] bg-outline-variant/30 rounded"></div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Skeleton */}
        <div className="w-16 h-3 bg-outline-variant/30 rounded mb-2"></div>
        
        {/* Title Skeleton */}
        <div className="w-3/4 h-5 bg-outline-variant/40 rounded mb-2"></div>
        <div className="w-1/2 h-5 bg-outline-variant/40 rounded mb-3"></div>
        
        {/* Author Skeleton */}
        <div className="w-1/3 h-3 bg-outline-variant/30 rounded mb-4"></div>
        
        {/* Rating Skeleton */}
        <div className="w-1/4 h-4 bg-outline-variant/30 rounded mb-5"></div>
        
        {/* Price and Button Skeleton */}
        <div className="mt-auto flex justify-between items-center">
          <div className="w-16 h-6 bg-outline-variant/40 rounded"></div>
          <div className="w-10 h-10 bg-outline-variant/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
