"use client";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LoadingCardProps {
  count?: number; 
}

const LoadingCard: React.FC<LoadingCardProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          {/* Rasm uchun skeleton */}
          <Skeleton 
            height={200} 
            enableAnimation 
            baseColor="#000000" 
            highlightColor="#444444" 
          />
          {/* Matn uchun skeleton */}
          <Skeleton 
            count={2} 
            style={{ marginTop: '10px' }} 
            enableAnimation 
            baseColor="#000000" 
            highlightColor="#444444" 
          />
        </div>
      ))}
    </>
  );
};

export default LoadingCard;
