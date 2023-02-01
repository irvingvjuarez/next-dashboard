import Header from "@/components/Header"

type LayoutProps = {
	children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return(
		<>
			<Header />
			{children}
		</>
	)
}

export default Layout