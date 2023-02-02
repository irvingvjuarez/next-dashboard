import { useState } from "react";
import { UserAuth } from "type"

export const useProvideAuth = () => {
	const [user, setUser] = useState<UserAuth | null>(null);

	const signIn = async (email: string, password: string) => {
		console.log("Loggin in...")
	};

	return { user, signIn };
}