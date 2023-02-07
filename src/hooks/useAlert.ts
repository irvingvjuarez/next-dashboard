import { useState } from "react"

const defaultOptions = {
	active: false,
	message: "",
	type: "",
	autoClose: true
}

export const useAlert = <T>(options?: T) => {
	const [alert, setAlert] = useState({
		...defaultOptions,
		...options
	})

	const toggleAlert = () => {
		setAlert(prev => ({
			...prev,
			active: !prev
		}))
	}

	return {alert, toggleAlert, setAlert}
}