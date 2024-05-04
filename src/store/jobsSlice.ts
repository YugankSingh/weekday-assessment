import { createSlice } from "@reduxjs/toolkit"

const jobsSlice = createSlice({
	name: "jobs",
	initialState: {
		list: [{ name: "First Job", description: "This is the job description" }],
		areAllLoaded: false,
	},
	reducers: {
		addJobs: state => {},
	},
})

export const {} = jobsSlice.actions
export default jobsSlice.reducer
