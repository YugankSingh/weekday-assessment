import { createSlice } from "@reduxjs/toolkit"

const initialJobsState = {
	list: [{ name: "First Job", description: "This is the job description" }],
	areAllLoaded: false,
}

const jobsSlice = createSlice({
	name: "jobs",
	initialState: initialJobsState,
	reducers: {
		addJobs: state => {},
	},
})

export const {} = jobsSlice.actions
export default jobsSlice.reducer
