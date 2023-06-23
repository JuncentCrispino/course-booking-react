import React from 'react';

export const Error = ({
  message,
  show,
}: {
  message: string | null | undefined;
  show: boolean;
}) => {
  return <>{show && <p className="text-xs text-red-500">{message}</p>}</>;
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-2xl font-bold text-primary">{children}</p>;
};
