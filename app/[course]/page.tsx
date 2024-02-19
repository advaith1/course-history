import { Suspense } from "react"
import Quarter from "./quarter"
import { termData } from "@/term-data"
import { notFound } from "next/navigation"

export default function Page({ params }: { params: { course: string } }) {
	const [subject, number] = params.course.split("-")
	if (!subject || !number) return notFound()
	return <>
		{termData.map((quarters, i) =>
			<div className="columns is-centered" key={i}>
				{Array.from({ ...quarters, length: 4 }).map((quarter, i) => (
					<div className="column" key={i}>
						{quarter ?
							<Suspense fallback={<p className="has-text-centered">Loading...</p>}>
								<Quarter subject={subject} number={number} quarter={quarter} />
							</Suspense>
						: null}
					</div>
				))}
			</div>
		)}
	</>
}

export function generateMetadata({ params }: { params: { course: string } }) {
	const course = params.course.replace("-", " ")
	return {
		title: course,
		description: `See when ${course} has been offered at UCSC`
	}
}

export const runtime = 'edge'
