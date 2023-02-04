import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Point } from "chart.js/dist/helpers/helpers.canvas"
import { BubbleDataPoint, ChartData } from "chart.js/dist/types/index"
import { Bar } from "react-chartjs-2"

type ChartProps = {
	chartData: ChartData<"bar", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const Chart: React.FC<ChartProps> = ({ chartData }) => {
	return (
		<Bar
		 data={chartData}
		 options={{
			plugins: {
				title: {
					display: true,
					text: "Category",
					font: {
						size: 20
					}
				},
				legend: {
					display: true,
					position: "right"
				}
			}
		 }}
		/>
	)
}