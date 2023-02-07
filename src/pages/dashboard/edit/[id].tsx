import Loading from "@/common/Loading"
import { FormProduct } from "@/components/FormProduct"
import { getProduct } from "@/pages/api/products"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Product } from "type"

const EditProduct = () => {
	const route = useRouter()
	const productID = route.query.id as string
	const [product, setProduct] = useState<Product>()

	useEffect(() => {
		getProduct(productID)
			.then(data => {
				setProduct(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<Head>
				<title>Edit Product</title>
			</Head>

			{product ? (
				<FormProduct
					title={product.title}
					price={product.price}
					categoryId={product.id}
					description={product.description}
				/>
			) :
				<Loading />
			}
		</>
	)
}

export default EditProduct