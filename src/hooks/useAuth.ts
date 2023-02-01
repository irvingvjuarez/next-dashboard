import Cookie from "js-cookie"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

function useProviderAuth() {
	const [user, setUser] = useState(null)
	const signIn = (email: string, password: string) => {

	}

	return {
		user, signIn
	}
}

export function ProviderAuth({ children }: { children: JSX.Element }) {
	const auth = useProviderAuth()

	return (
		<AuthContext.Provider>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}