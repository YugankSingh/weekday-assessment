import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import JobPostingCard from "./JobPostingCard"
import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import LazyLoad from "react-lazy-load"
import { getMoreJobs, onEmptyJobsList } from "../store/jobsSlice"
import JobPostingCardSkeleton from "./JobPostingCardSkeleton"

interface JobsListProps {}

function JobsList({}: JobsListProps) {
	const jobsFetchingStatus = useAppSelector(state => state.jobs.status)
	const filters = useAppSelector(state => state.filters.list)
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log("filters have changed")
		dispatch(onEmptyJobsList())
		dispatch(getMoreJobs())
	}, [filters])
	useEffect(() => {
		dispatch(getMoreJobs())
	}, [])

	const jobs = useAppSelector(state => state.jobs.list)

	const onJobCardVisible = (index: number) => {
		const indexOfCardToLoadMorePosts = jobs.length - 4
		if (indexOfCardToLoadMorePosts === index) dispatch(getMoreJobs())
	}

	return (
		<div>
			<Grid container spacing={4}>
				{jobsFetchingStatus !== "loading" && !jobs.length && (
					<Typography variant="h2" sx={{ py: "30px", px: "30px" }}>
						No Jobs found, try editing the filters
					</Typography>
				)}

				{jobs.map((job, index) => (
					<Grid
						key={job.jdUid}
						item
						xs={12}
						sm={6}
						md={4}
						sx={{ py: "30px", px: "15px" }}
					>
						<JobPostingCard
							job={job}
							onJobCardVisible={() => onJobCardVisible(index)}
						/>
					</Grid>
				))}
			</Grid>
			{jobsFetchingStatus === "loading" && (
				<Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
					<CircularProgress />
				</Box>
			)}
		</div>
	)
}

export default JobsList
