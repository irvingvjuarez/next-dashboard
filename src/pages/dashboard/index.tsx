import Head from "next/head"
import Loading from "../../common/Loading"
import { useEffect, useState } from "react";
import { Product } from "type";
import Pagination from "@/components/Pagination";
import { Chart } from "@/common/Chart";

const PRODUCTS_LIMIT = 25;


export default function Dashboard() {
	const [products, setProducts] = useState<Product[]>([])
	const [paginationLimit, setPaginationLimit] = useState(5)
	const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])

	const categoryNames = products?.map(product => product.category.name)
	// const uniqueCategories = Array.from(new Set(categoryNames))

	// const categoriesInstances = uniqueCategories.map(category => ({
	// 	category: categoryNames.filter(name => name == category).length
	// }))

	const countOccurrences = (arr: string[]) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {})

	const data = {
		datasets: [{
			label: "Categories",
			data: countOccurrences(categoryNames),
			borderWidth: 2,
			backgroundColor: ["#7286D3", "#8EA7E9", "#E5E0FF", "#FFF2F2", "#AAE3E2"]
		}]
	}

	const handlePagination = (value: number) => {
		const newProducts = products.filter((_, index) => index >= value - 1 && index <= value + 3)
		setDisplayedProducts(newProducts)
	}

	useEffect(() => {
		fetch(`https://api.escuelajs.co/api/v1/products?limit=${PRODUCTS_LIMIT}&offset=0`)
			.then(res => res.json())
			.then(data => {
				const displayedProducts = (data as Product[]).filter((_item, index) => index <= 4)

				setProducts(data)
				setDisplayedProducts(displayedProducts)
			})
	}, [])

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>

			<div className="mb-8 mt-2">
				<Chart chartData={data} />
			</div>

			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							{products.length > 0 ? (
								<>
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
										limit={paginationLimit}
										size={products.length}
										handlePagination={handlePagination}
									/>
								</>
							) : (
								<Loading />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}