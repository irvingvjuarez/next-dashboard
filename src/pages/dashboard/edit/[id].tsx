import { Alert } from "@/common/Alert"
import Loading from "@/common/Loading"
import { FormProduct } from "@/components/FormProduct"
import { useAlert } from "@/hooks/useAlert"
import { getProduct } from "@/pages/api/products"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Product } from "type"

const EditProduct = () => {
	const route = useRouter()
	const productID = route.query.id as string
	const [product, setProduct] = useState<Product>()
	const {alert, toggleAlert, setAlert} = useAlert()

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

			<Alert alert={alert} handleClose={toggleAlert} />

			{product ? (
				<FormProduct product={product} />
			) :
				<Loading />
			}
		</>
	)
}

export default EditProduct