import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

type PaginationProps = {
	limit: number;
	size: number;
	handlePagination: (value: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ limit, size, handlePagination }) => {
	const [current, setCurrent] = useState(1)
	const slices = new Array(size / limit).fill(null).map((_item, index) => index + 1)

	const handlePaginationClick = (value: number) => {
		handlePagination(value)
		setCurrent(value)
	}

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium focus:z-20 ${current == 1 ? "text-gray-200" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {slices.map(slice => (
							<span
								key={slice}
								onClick={() => handlePaginationClick(slice)}
								className={`cursor-pointer relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium text-gray-500 ${slice == current ? "bg-gray-200" : "bg-white"} focus:z-20`}
							>
								{slice}
							</span>
						))}
            {/* <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              4
            </span> */}
            <a
              href="#"
              className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium focus:z-20 ${current == slices[slices.length - 1] ? "text-gray-200" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination