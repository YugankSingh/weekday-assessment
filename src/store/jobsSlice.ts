import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Job, Filters } from "../types"
import { FiltersState, initialFiltersState } from "./filtersSlice"
import { areFiltersEqual } from "../util/areFiltersEqual"
import filterJobs from "../util/filterJobs"

interface JobsState {
	cachedList: Job[]
	localFilters: Filters
	list: Job[]
	status: "idle" | "loading" | "succeeded" | "failed"
	error: string | null
	totalCount: number
}

const fetchJobs = async (limit: number, offset: number, cachedList: Job[]) => {
	console.log(cachedList.length)
	console.log(offset)
	console.log(limit)
	if (cachedList.length >= offset + limit)
		return {
			jdList: cachedList.slice(offset, offset + limit),
			totalCount: undefined,
		}

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

export const getMoreJobs = createAsyncThunk(
	"jobs/getMoreJobs",
	async (data, thunkAPI) => {
		try {
			const currentState = thunkAPI.getState() as any
			const currentJobs = currentState.jobs as JobsState
			let localJobsList = currentJobs.list

			const filters = currentState.filters.list as Filters

			if (!areFiltersEqual(filters, currentJobs.localFilters)) {
				localJobsList = []
			}

			const shouldFetchAll = !areFiltersEqual(filters, initialFiltersState.list)

			const offset = !!shouldFetchAll ? 0 : currentJobs.list?.length
			const limit = !!shouldFetchAll ? currentJobs.totalCount : 10

			const fetchedData = (await fetchJobs(
				limit,
				offset,
				currentJobs.cachedList
			)) as any

			let fetchedList = fetchedData.jdList as Job[]
			fetchedList = fetchedList.map(jd => {
				if (jd.salaryCurrencyCode === "USD") {
					return {
						...jd,
						salaryCurrencyCode: "INR",
						maxJdSalary: jd.maxJdSalary ? jd.maxJdSalary * 0.8338 : null,
						minJdSalary: jd.minJdSalary ? jd.minJdSalary * 0.8338 : null,
						minExp: jd.minExp || 0,
					}
				}
				return jd
			})

			const newCachedList = [
				...currentJobs.cachedList,
				...fetchedList.filter(jd => {
					return !currentJobs.cachedList.find(
						includedJd => includedJd.jdUid === jd.jdUid
					)
				}),
			]

			fetchedList = filterJobs(fetchedList, filters)

			const newList = [
				...localJobsList,
				...fetchedList.filter(jd => {
					return !localJobsList.find(
						includedJd => includedJd.jdUid === jd.jdUid
					)
				}),
			]
			console.log("localJobsList.length", localJobsList.length)
			return {
				list: newList.slice(0, localJobsList.length + 10),
				totalCount: fetchedData.totalCount || currentJobs.totalCount,
				newCachedList,
				filters,
			} // Return list and totalCount
		} catch (error: any) {
			console.error(error)
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

const initialJobsState: JobsState = {
	cachedList: [],
	list: [],
	localFilters: initialFiltersState.list,
	status: "idle",
	error: null,
	totalCount: 100000,
}

const jobsSlice = createSlice({
	name: "jobs",
	initialState: initialJobsState,
	reducers: {
		onEmptyJobsList: state => {
			state.list = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getMoreJobs.pending, state => {
				state.status = "loading"
			})
			.addCase(getMoreJobs.fulfilled, (state, action) => {
				state.status = "succeeded"
				// return
				state.totalCount = action.payload.totalCount
				state.list = [...action.payload.list]
				state.cachedList = [...action.payload.newCachedList]
				state.localFilters = action.payload.filters
			})
			.addCase(getMoreJobs.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message || null
			})
	},
})

export const { onEmptyJobsList } = jobsSlice.actions
export default jobsSlice.reducer
