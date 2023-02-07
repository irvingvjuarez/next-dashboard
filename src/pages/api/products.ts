import axios from "axios";
import endPoints from "@/services/api";
import { PostProductData } from "type";

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