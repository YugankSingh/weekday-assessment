import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Filters {
	roles: string[]
	techStack: string[]
	minExperience: number | null
	companyName: string
	location: string[]
	workEnvironment: ("Hybrid" | "In-Office" | "Remote")[]
	minBasePayInLPA: number | null
}

export interface FiltersState {
	list: Filters
}

const initialFiltersState: FiltersState = {
	list: {
		minExperience: null,
		companyName: "",
		location: [],
		workEnvironment: [],
		techStack: [],
		roles: [],
		minBasePayInLPA: null,
	},
}

const filtersSlice = createSlice({
	name: "filters",
	initialState: initialFiltersState,
	reducers: {
		setFilter: (state, action: PayloadAction<Filters>) => {
			state.list = { ...state.list, ...action.payload }
			console.log(state.list)
		},
	},
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
