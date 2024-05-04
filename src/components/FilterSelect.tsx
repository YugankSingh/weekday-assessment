import React from "react"
import { jobFilterGroupedValues } from "../types"

interface FilterSelectProp {
	isMultiSelect?: boolean
	isGrouped?: boolean
	onAdd: (value: string) => any
	onRemove?: (value: string) => any
	values?: string[]
	groupedValues?: jobFilterGroupedValues
}

function FilterSelect({
	isMultiSelect = false,
	isGrouped = false,
	onAdd,
	onRemove,
	values,
	groupedValues,
}: FilterSelectProp) {
	if (!!isGrouped && !groupedValues)
		throw new Error(
			"groupedValues can't be null, when isGrouped flag is on, in FilterSelect.tsx"
		)
	if (!isGrouped && !values)
		throw new Error("values can't be null, in FilterSelect.tsx")
	if (!!isMultiSelect && !onRemove)
		throw new Error(
			"onRemove can't be null, when isMultiSelect flag is on, in FilterSelect.tsx"
		)
	
	return <div>
		
	</div>
}

export default FilterSelect
