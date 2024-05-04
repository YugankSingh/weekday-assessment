import React from "react"
import { useAppSelector } from "../hooks"

interface JobsListProps {}

function JobsList({}: JobsListProps) {
	const jobs = useAppSelector(state => state.jobs.list)
	return (
		<div>
			<pre>{JSON.stringify(jobs, null, 2)}</pre>
		</div>
	)
}

export default JobsList
