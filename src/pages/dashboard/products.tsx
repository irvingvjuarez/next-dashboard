import Loading from "@/common/Loading"
import Pagination from "@/components/Pagination"
import Head from "next/head"
import { PAGINATION_LIMIT, PRODUCTS_LIMIT } from "@/globals"
import { useEffect, useState } from "react"
import { Product } from "type"
import { Fragment } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])

	const handlePagination = (value: number) => {
		const newProducts = products.filter((_, index) => index >= (value - 1) && index <= value + (PAGINATION_LIMIT - 2))
		setDisplayedProducts(newProducts)
	}

	useEffect(() => {
		fetch(`https://api.escuelajs.co/api/v1/products?limit=${PRODUCTS_LIMIT}&offset=0`)
			.then(res => res.json())
			.then(data => {
				const displayedProducts = (data as Product[]).filter((_item, index) => index <= PAGINATION_LIMIT - 1)

				setProducts(data)
				setDisplayedProducts(displayedProducts)
			})
	}, [])

	if (products.length < 1) {
		return (
			<Loading />
		)
	}

	return (
		<>
			<Head>
				<title>Dashboard Products</title>
			</Head>

			<div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Product List
        </h2>
        {/* <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Closing on January 9, 2020
          </div>
        </div> */}
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {/* <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Edit
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            View
          </button>
        </span> */}

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Product
          </button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <PlusIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    View
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>

			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 mb-3">
								<thead className="bg-gray-50">
									<tr>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Product
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Category
										</th>
										<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Stock
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Edit</span>
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Delete</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{displayedProducts.map((product) => (
										<tr key={product.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">{product.title}</div>
														<div className="text-sm text-gray-500">${product.price}</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">{product.category.name}</div>
												{/* <div className="text-sm text-gray-500">{product.category.id}</div> */}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{Math.round(Math.random() * 1000)}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<a href="#" className="text-indigo-600 hover:text-indigo-900">
													Edit
												</a>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<a href="#" className="text-red-400 hover:text-red-900">
													Delete
												</a>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<Pagination
								limit={PAGINATION_LIMIT}
								size={products.length}
								handlePagination={handlePagination}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Products