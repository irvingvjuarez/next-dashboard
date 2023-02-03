import Head from "next/head"
import Loading from "../../common/Loading"
import { useEffect, useState } from "react";
import { Person } from "type";
import Pagination from "@/components/Pagination";

export default function Dashboard() {
	const [people, setPeople] = useState<Person[]>([])

	useEffect(() => {
		fetch("https://api.escuelajs.co/api/v1/products?limit=10&offset=0")
			.then(res => res.json())
			.then(data => {
				setPeople(data)
			})
	}, [])

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>

			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							{people.length > 0 ? (
								<>
									<table className="min-w-full divide-y divide-gray-200">
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
											{people.map((person) => (
												<tr key={person.id}>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img className="h-10 w-10 rounded-full" src={person.images[0]} alt="" />
															</div>
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">{person.title}</div>
																<div className="text-sm text-gray-500">${person.price}</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="text-sm text-gray-900">{person.category.name}</div>
														{/* <div className="text-sm text-gray-500">{person.category.id}</div> */}
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

									<Pagination />
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