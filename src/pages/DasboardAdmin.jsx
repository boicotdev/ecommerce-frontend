"use client";

import { useState } from "react";
import NewOrder from "../components/NewOrder";

export default function Component() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("Pending");
  const [sort, setSort] = useState("date");
  const [createNewOrder, setCreateNewOrder] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <header className="sticky top-0 z-30 flex justify-start h-14 items-center gap-4 bg-white px-4 shadow">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-lg font-bold">Acme Inc</span>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          <a href="#" className="text-gray-500 hover:text-black">
            Dashboard
          </a>
          <a href="#" className="text-blue-600">
            Orders
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            Products
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            Customers
          </a>
          <div className="relative">
            <button
              type="button"
              className="overflow-hidden rounded-full border bg-white p-1 transition-all hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              <img
                src="https://i.pinimg.com/originals/43/44/c7/4344c77d736a589511b1ad7f9e3dd70a.png"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
                style={{ aspectRatio: "36/36", objectFit: "cover" }}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="block px-4 py-2 text-sm text-gray-700">
                  My Account
                </div>
                <div className="block px-4 py-2 text-sm text-gray-700">
                  Settings
                </div>
                <div className="block px-4 py-2 text-sm text-gray-700">
                  Support
                </div>
                <div className="block px-4 py-2 text-sm text-gray-700">
                  Logout
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between mt-3">
            <h1 className="text-2xl font-bold">Order Management</h1>
            <button onClick={() => setCreateNewOrder(true)} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Order
            </button>
          </div>
          {createNewOrder && <NewOrder toggle={setCreateNewOrder} />}
          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        Filter by
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Pending")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Pending"}
                        />
                        Pending
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Shipped")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Shipped"}
                        />
                        Shipped
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Delivered")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Delivered"}
                        />
                        Delivered
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setFilter("Cancelled")}
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filter === "Cancelled"}
                        />
                        Cancelled
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Sort
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="block px-4 py-2 text-sm text-gray-700">
                        Sort by
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("date")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "date"}
                        />
                        Date
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("customer")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "customer"}
                        />
                        Customer
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("status")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "status"}
                        />
                        Status
                      </div>
                      <div
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        onClick={() => setSort("total")}
                      >
                        <input
                          type="radio"
                          name="sort"
                          className="mr-2"
                          checked={sort === "total"}
                        />
                        Total
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative flex-1 md:grow-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search orders..."
                  className="w-full rounded-lg bg-white pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <a href="#" className="text-blue-600 hover:underline">
                        #123
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Doe
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-04-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      $99.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="relative">
                        <button
                          type="button"
                          className="rounded-md bg-white p-2 text-gray-400 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-haspopup="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                          <span className="sr-only">Order actions</span>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View Details
                          </a>
                          <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Edit
                          </div>
                          <div className="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
