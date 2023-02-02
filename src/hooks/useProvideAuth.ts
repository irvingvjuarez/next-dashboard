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

	const signIn = async (email: string, password: string) => {
		const { data } = await axios.post(
			endpoints.auth.login,
			{ email, password },
			axiosConfig
		)

		if(data.access_token) {
			Cookies.set("token", data.access_token, { expires: 5 })
		}
	};

	return { user, signIn };
}