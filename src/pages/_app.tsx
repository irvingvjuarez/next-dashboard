import Layout from '@/containers/Layout'
import { AuthContext } from '@/contexts/auth.context'
import { useProvideAuth } from '@/hooks/useProvideAuth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const auth = useProvideAuth()

  return (
		<AuthContext.Provider value={auth}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthContext.Provider>
	)
}
