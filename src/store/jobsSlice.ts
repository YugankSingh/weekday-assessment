import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job } from "../types"

interface JobsState {
	list: Job[]
	status: "idle" | "loading" | "succeeded" | "failed"
	error: string | null
	totalCount: number
}

const fetchJobs = async (limit: number, offset: number) => {
	const myHeaders = new Headers()
	myHeaders.append("Content-Type", "application/json")

	const body = JSON.stringify({
		limit,
		offset,
	})

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body,
	}

	const response = await fetch(
		"https://api.weekday.technology/adhoc/getSampleJdJSON",
		requestOptions
	)
	if (!response.ok) {
		throw new Error("Failed to fetch data")
	}
	const data = await response.json()
	return data
}

export const fetchMoreJobs = createAsyncThunk(
	"jobs/fetchMoreJobs",
	async (data, thunkAPI) => {
		try {
			const fetchedData = (await fetchJobs(10, 0)) as any
			console.log(fetchedData)
			let jdList = fetchedData.jdList as Job[]
			jdList = jdList.map(jd => {
				if (jd.salaryCurrencyCode === "USD") {
					return {
						...jd,
						salaryCurrencyCode: "INR",
						maxJdSalary: jd.maxJdSalary ? jd.maxJdSalary * 0.8338 : null,
						minJdSalary: jd.minJdSalary ? jd.minJdSalary * 0.8338 : null,
					}
				}
				return jd
			})
			return { list: jdList, totalCount: fetchedData.totalCount } // Return list and totalCount
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

const initialJobsState: JobsState = {
	list: [],
	status: "idle",
	error: null,
	totalCount: 1000,
}

const jobsSlice = createSlice({
	name: "jobs",
	initialState: initialJobsState,
	reducers: {
		addJobs: state => {},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMoreJobs.pending, state => {
				state.status = "loading"
			})
			.addCase(fetchMoreJobs.fulfilled, (state, action) => {
				state.status = "succeeded"
				state.list = action.payload.list
				state.totalCount = action.payload.totalCount
			})
			.addCase(fetchMoreJobs.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message || null
			})
	},
})

export const {} = jobsSlice.actions
export default jobsSlice.reducer
