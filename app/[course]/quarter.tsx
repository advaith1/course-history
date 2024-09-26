import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Quarter } from '@/term-data'
import { faClock, faLocationDot, faPeopleGroup, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'

interface Instructor {
	cruzid: string
	name: string
}

interface Class {
	strm: string
	class_nbr: string
	class_section: string
	session_code: string
	class_status: string
	subject: string
	catalog_nbr: string
	title: string
	title_long: string
	component: string
	start_time: string
	end_time: string
	location: string
	meeting_days: string
	enrl_status: string
	waitlist_total: string
	enrl_capacity: string
	enrl_total: string
	instructors: Instructor[]
}

export default async function Quarter({ subject, number, quarter }: { subject: string, number: string, quarter: Quarter }) {
	let { classes }: { classes?: Class[] } = await (await fetch(`https://my.ucsc.edu/PSIGW/RESTListeningConnector/PSFT_CSPRD/SCX_CLASS_LIST.v1/${quarter.id}?subject=${subject}&catalog_nbr=${number}`)).json()
	classes = classes?.filter(c => c.subject === subject && c.catalog_nbr === number && c.class_status !== 'X')
	if (!classes?.length) return null
	classes.sort((a, b) => +a.class_section - +b.class_section)
	return (
		<div className="box">
			<h2 className="title is-5 mb-3">{quarter.name}</h2>
			{classes.map(c => (
				<div className="mt-2" key={c.class_nbr}>
					<h3 className="title is-6 mb-1"><a href={`https://pisa.ucsc.edu/class_search/index.php?action=detail&class_data=${btoa(`a:2:{s:5:":STRM";s:4:"${quarter.id}";s:10:":CLASS_NBR";s:5:"${c.class_nbr}";}`)}`} target="_blank" className="has-text-white">Section {c.class_section}</a></h3>
					<FontAwesomeIcon icon={faPersonChalkboard} fixedWidth />{' '}
					{c.instructors.map((instructor, i) => [i > 0 && '; ',
						<a
							href={`https://campusdirectory.ucsc.edu/cd_detail?uid=${instructor.cruzid}`}
							target="_blank"
							key={instructor.cruzid}
							className="has-text-white"
						>
						{instructor.name.replaceAll(',', ', ')}
						</a>
					])}<br />
					<FontAwesomeIcon icon={faLocationDot} fixedWidth /> {c.location}<br />
					{c.meeting_days !== 'TBA' && <><FontAwesomeIcon icon={faClock} fixedWidth /> {c.meeting_days} {c.start_time} - {c.end_time}<br /></>}
					<FontAwesomeIcon icon={faPeopleGroup} fixedWidth /> {c.enrl_total} {c.enrl_capacity !== '0' && <>of {c.enrl_capacity}</>} enrolled
				</div>
			))}
		</div>
	)
}
