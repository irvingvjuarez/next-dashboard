import axios from "axios";
import endPoints from "@/services/api";
import { PostProductData } from "type";

export const getProduct = async (id: string) => {
	const res = await axios.get(endPoints.products.getProduct(id))
	return res.data
}

export const addProduct = async (body: PostProductData) => {
	const config = {
		headers: {
			accept: "*/*",
			"Content-Type": "application/json"
		}
	}

	const res = await axios.post(endPoints.products.addProducts, body, config)
	return res.data
}

export const deleteProduct = async (id: string) => {
	const res = await axios.delete(endPoints.products.deleteProducts(id))
	return res.data
}