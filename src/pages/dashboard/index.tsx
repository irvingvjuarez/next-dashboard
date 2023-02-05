import Head from "next/head"
import Loading from "../../common/Loading"
import { useEffect, useState } from "react";
import { Product } from "type";
import { Chart } from "@/common/Chart";
import { PRODUCTS_LIMIT } from "@/globals";


export default function Dashboard() {
	const [products, setProducts] = useState<Product[]>([])

	const categoryNames = products?.map(product => product.category.name)
	const countOccurrences = (arr: string[]) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {})

	const data = {
		datasets: [{
			label: "Categories",
			data: countOccurrences(categoryNames),
			borderWidth: 2,
			backgroundColor: ["#7286D3", "#8EA7E9", "#E5E0FF", "#FFF2F2", "#AAE3E2"]
		}]
	}

	useEffect(() => {
		fetch(`https://api.escuelajs.co/api/v1/products?limit=${PRODUCTS_LIMIT}&offset=0`)
			.then(res => res.json())
			.then(data => {
				setProducts(data)
			})
	}, [])

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>

			{products.length > 0 ? (
				<div className="mb-8 mt-2">
					<Chart chartData={data} />
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}