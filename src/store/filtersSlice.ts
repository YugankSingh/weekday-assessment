import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Filters {
	roles: string[]
	minPayInLPA: number
	maximumMinExperience: number
	companyName: string
	location: string[]
	workEnvironment: ("Hybrid" | "In-Office" | "Remote")[]
	minBasePay: number
}

export interface FiltersState {
	list: Filters
}

const initialFiltersState: FiltersState = {
	list: {
		roles: [],
		minPayInLPA: 0,
		maximumMinExperience: Infinity,
		companyName: "",
		location: [],
		workEnvironment: [],
		minBasePay: 0,
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
