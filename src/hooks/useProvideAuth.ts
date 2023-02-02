import axios from "axios";
import Cookies from "js-cookie"
import { useState } from "react";
import { UserAuth } from "type"
import endpoints from "@/services/api/index"

const axiosConfig = {
	headers: {
		accept: "*/*",
		"Content-Type": "application/json"
	}
}

export const useProvideAuth = () => {
	const [user, setUser] = useState<UserAuth | null>(null);

	const signIn = async (email: string, password: string): Promise<UserAuth | null> => {
		try {
			const { data } = await axios.post(
				endpoints.auth.login,
				{ email, password },
				axiosConfig
			)

			const token = data.access_token

			if(token) {
				Cookies.set("token", token, { expires: 5 })

				axios.defaults.headers.Authorization = `Bearer ${token}`
				const { data } = await axios.get(endpoints.auth.profile)
				setUser(data)
			}
		} catch(err) {
			// TODO: Giving visual feedback to the user when an error ocurred
			console.log(err)
		}

		return user
	};

	return { user, signIn };
}