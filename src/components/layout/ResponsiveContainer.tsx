import React from "react";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full ${className}`}
  >
    {children}
  </div>
);

export default ResponsiveContainer;
