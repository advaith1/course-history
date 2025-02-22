import { Fragment, Suspense } from "react"
import Quarter from "./quarter"
import { termData } from "@/term-data"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ course: string }> }) {
    const [subject, number] = (await params).course.split("-")
    if (!subject || !number) return notFound()
    return <>
		{termData.map((quarters, i) => <Fragment key={i}>
			<div className="columns is-centered">
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
			<hr className="is-hidden-tablet my-4" />
		</Fragment>)}
	</>
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
    const course = (await params).course.replace("-", " ")
    return {
		title: course,
		description: `See when ${course} has been offered at UCSC`
	}
}

export const runtime = 'edge'
