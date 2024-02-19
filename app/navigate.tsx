'use client'

import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Navigate() {
	const router = useRouter()
	const path = usePathname()
	const ref = useRef<HTMLInputElement>(null)

	// focus textbox at end when slash key is pressed
	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.key === '/' && ref.current && document.activeElement !== ref.current) {
				event.preventDefault()
				ref.current.setSelectionRange(-1, -1)
				ref.current.focus()
			}
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [])

	return (
		<form action={data => router.push(`/${(data.get('course') as string).replace(' ', '-').toUpperCase()}`)} className="mb-5">
			<div className="field has-addons has-addons-centered">
				<div className="control">
					<input
						className="input is-uppercase is-medium"
						type="text"
						name="course"
						defaultValue={path.includes('-') ? path.substring(1).replace('-', ' ') : ''}
						pattern="[A-Za-z]{2,4} \d{1,3}[A-Za-z]?"
						title="Enter the subject and number, e.g. &quot;CSE 13S&quot;"
						placeholder="Class code, e.g. CSE 13S"
						autoFocus={path === '/'}
						ref={ref}
					/>
				</div>
				<div className="control">
					<button type="submit" className="button is-info is-medium">
						<span className="icon">
							<FontAwesomeIcon icon={faCheck} />
						</span>
					</button>
				</div>
			</div>
		</form>
	)	
}
