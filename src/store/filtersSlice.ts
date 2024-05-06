import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Filters } from "../types"

export interface FiltersState {
	list: Filters
}

export const initialFiltersState: FiltersState = {
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
			state.list = {
				...state.list,
				...action.payload,
			}
		},
	},
})

export const { setFilter } = filtersSlice.actions
export default filtersSlice.reducer
