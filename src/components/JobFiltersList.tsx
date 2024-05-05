import { useState } from "react"
import FilterMultiSelect from "./FilterMultiSelect"
import { useDispatch, useSelector } from "react-redux"
import { useAppSelector } from "../hooks"
import { setFilter } from "../store/filtersSlice"

const workEnvironemnt = ["Remote", "In-Office", "Hybrid"]

function JobFiltersList({}) {
	const filters = useAppSelector(state => state.filters.list)
	const dispatch = useDispatch()

	return (
		<div>
			<FilterMultiSelect
				setValues={values => {
					dispatch(
						setFilter({
							...filters,
							// @ts-ignore
							workEnvironment: values,
						})
					)
				}}
				placeholder="Work Environemnt"
				selectedValues={filters.workEnvironment}
				values={workEnvironemnt}
				minCharacter={14}
			/>
		</div>
	)
}

export default JobFiltersList
