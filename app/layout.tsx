import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './style.sass'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Navigate from './navigate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s - UCSC Course History',
		default: 'UCSC Course History',
	},
	description: 'See when a class has been offered at UCSC',
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	}
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="container is-fluid">
					<h1 className="title is-2 is-size-3-mobile mt-3 has-text-centered">UCSC Course History</h1>
					<Navigate />
					{children}
				</div>
			</body>
		</html>
	)
}
