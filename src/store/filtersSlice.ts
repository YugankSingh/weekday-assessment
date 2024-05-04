import { createSlice } from "@reduxjs/toolkit"

interface InitialFitlersState {
	roles: string[]
	minPayInLPA: number
	maximumMinExperience: number
	companyName: string
	location: string[]
	workEnvironment: "remote" | "in-office" | "any"
	minBasePay: number
}

const initialFiltersState: InitialFitlersState = {
	roles: [],
	minPayInLPA: 0,
	maximumMinExperience: Infinity,
	companyName: "",
	location: [],
	workEnvironment: "any",
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
