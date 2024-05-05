import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Filters {
	roles: string[]
	techStack: string[]
	maximumMinExperience: number
	companyName: string
	location: string[]
	workEnvironment: ("Hybrid" | "In-Office" | "Remote")[]
	minBasePayInLPA: number
}

export interface FiltersState {
	list: Filters
}

const initialFiltersState: FiltersState = {
	list: {
		maximumMinExperience: Infinity,
		companyName: "",
		location: [],
		workEnvironment: [],
		techStack: [],
		roles: [],
		minBasePayInLPA: 0,
	},
}

const filtersSlice = createSlice({
	name: "filters",
	initialState: initialFiltersState,
	reducers: {
		setFilter: (state, action: PayloadAction<Filters>) => {
			console.log(action.payload)
			state.list = { ...state.list, ...action.payload }
		},
	},
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
