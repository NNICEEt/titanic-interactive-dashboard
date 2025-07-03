import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full py-6 px-4 bg-white border-b mb-4">
        <h1 className="text-3xl font-bold text-center">Titanic Dashboard</h1>
        <p className="text-center text-gray-600 mt-2 text-lg">
          Key data insights from the Titanic dataset
        </p>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 md:px-6 flex flex-col gap-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
