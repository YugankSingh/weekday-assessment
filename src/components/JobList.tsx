import React, { useEffect } from "react"
import { useAppSelector } from "../hooks"
import JobPostingCard from "./JobPostingCard"
import { Grid } from "@mui/material"
import LazyLoad from "react-lazy-load"

interface JobsListProps {}

function JobsList({}: JobsListProps) {
	const jobs = useAppSelector(state => state.jobs.list)
	const onJobCardVisible = (index: number) => {
		console.log(index, "visible")
	}

	if (!jobs)
		return <h1>Loading...</h1>

	return (
		<div>
			<Grid container spacing={4}>
				{jobs.map((job, index) => (
					<Grid
						key={index}
						item
						xs={12}
						sm={6}
						md={4}
						sx={{ py: "30px", px: "15px" }}
					>
						<JobPostingCard
							job={job}
							// onJobCardVisible={() => onJobCardVisible(index)}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

export default JobsList
