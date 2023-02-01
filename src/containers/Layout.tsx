import Header from "@/components/Header"
import Nav from "@/common/Nav"

type LayoutProps = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return(
		<div className="min-h-full">
			<Header />
			<Nav />
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	)
}

export default Layout