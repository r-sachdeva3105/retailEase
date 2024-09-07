import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      {/* HEADER */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl p-4 md:flex justify-between items-center">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-8 mt-2">
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 mt-6">
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
          <div className="relative p-4 rounded-md shadow cursor-pointer hover:bg-gray-200"></div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
