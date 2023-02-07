import Loading from "@/common/Loading"
import Pagination from "@/components/Pagination"
import Head from "next/head"
import { PAGINATION_LIMIT, PRODUCTS_LIMIT } from "@/globals"
import { useEffect, useState } from "react"
import { Category, Product } from "type"
import { Fragment } from 'react'
import { PlusIcon, XCircleIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import Modal from "@/common/Modal"
import { FormProduct } from "@/components/FormProduct"
import { useAlert } from "@/hooks/useAlert"
import { Alert } from "@/common/Alert"
import endPoints from "@/services/api"
import axios from "axios"
import { deleteProduct } from "../api/products"
import Link from "next/link"

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const Products = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
	const [open, setOpen] = useState(false)
	const { alert, toggleAlert, setAlert } = useAlert()

	const triggerModal = () => setOpen(prev => !prev)
	const handlePagination = (value: number) => {
		const newProducts = products.filter((_, index) => index >= (value - 1) && index <= value + (PAGINATION_LIMIT - 2))
		setDisplayedProducts(newProducts)
	}

	const deleteItem = (id: string) => {
		deleteProduct(id)
			.then(data => {
				setAlert(prev => ({
					...prev,
					active: true,
					message: "Product Deleted successfully",
					autoClose: true,
					type: "error"
				}))
			})
			.catch(err => {
				setAlert(prev => ({
					...prev,
					active: true,
					message: err.message,
					autoClose: true,
					type: "error"
				}))
			})
	}

	useEffect(() => {
		fetch(`https://api.escuelajs.co/api/v1/products?limit=${PRODUCTS_LIMIT}&offset=0`)
			.then(res => res.json())
			.then(data => {
				const displayedProducts = (data as Product[]).filter((_item, index) => index <= PAGINATION_LIMIT - 1)

				setProducts(data)
				setDisplayedProducts(displayedProducts)
			})
			.catch(err => {
				console.log(err)
			})
	}, [alert])

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

			<Alert alert={alert} handleClose={toggleAlert} />

			<div className="lg:flex lg:items-center lg:justify-between mb-3">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Product List
					</h2>
				</div>
				<div className="mt-5 flex lg:mt-0 lg:ml-4">

					<span className="sm:ml-3">
						<button
							onClick={triggerModal}
							type="button"
							className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
							Add Product
						</button>
					</span>

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
												<Link href={`/dashboard/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
													Edit
												</Link>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<XCircleIcon
													aria-hidden="true"
													className="flex-shrink-0 h-6 w-6 text-red-400 cursor-pointer"
													onClick={() => deleteItem(String(product.id))}
												/>
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

			<Modal open={open} setOpen={setOpen}>
				<FormProduct setAlert={setAlert} setOpen={setOpen} />
			</Modal>
		</>
	)
}

export default Products