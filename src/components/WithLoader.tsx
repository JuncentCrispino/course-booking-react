import React from 'react';
import { CircleLoader } from './CircleLoader';

interface IWithLoaderInterface {
  children: React.ReactNode;
  isLoading: boolean;
}
export default function WithLoader({
  isLoading,
  children,
}: IWithLoaderInterface) {
  return <>{isLoading ? <CircleLoader /> : <>{children}</>}</>;
}
