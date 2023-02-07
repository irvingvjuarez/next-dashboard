import { useState } from "react"
import { Alert } from "type"

export const useAlert = <T>(options?: T) => {
	const [alert, setAlert] = useState<Alert>({
		active: false,
		message: "",
		type: "error",
		autoClose: true
	})

	const toggleAlert = () => {
		setAlert(prev => ({
			...prev,
			active: !prev,
			autoClose: false
		}))
	}

	return {alert, toggleAlert, setAlert}
}