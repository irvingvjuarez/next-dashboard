import { XCircleIcon } from '@heroicons/react/solid';
import { Alert as AlertType } from 'type';

type AlertProps = {
	alert: AlertType;
	handleClose(): void;
}

export const Alert: React.FC<AlertProps> = ({ alert, handleClose }) => {
	if (alert && !alert.autoClose) {
		setTimeout(handleClose, 9000)
	}

	if (alert?.active) {
		return (
			<div x-data className="bg-indigo-100 p-5 w-full rounded mb-8">
				<div className="flex space-x-3">
					<div className="flex-1 leading-tight text-sm text-black font-medium">{alert.message}</div>
					<button type="button">
						<XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
					</button>
				</div>
			</div>
		)
	}

	return null
}