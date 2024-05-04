import { createSlice } from "@reduxjs/toolkit"

interface InitialFitlersState {
	roles: string[]
	minPayInLPA: number
	maximumMinExperience: number
	companyName: ""
	location: string[]
	workEnvironment: "remote" | "in-office" | "any"
	minBasePay: number
}

const initialFiltersState = {
	roles: [],
	minPayInLPA: 0,
	maximumMinExperience: Infinity,
	comapanyName: null,
	location: [],
	workEnv: "any",
	minBasePay: 0,
}

const filtersSlice = createSlice({
	name: "filters",
	initialState: initialFiltersState,
	reducers: {
		addJobs: state => {},
	},
})

export const {} = filtersSlice.actions
export default filtersSlice.reducer
