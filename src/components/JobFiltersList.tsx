import React from "react"
import FilterSelect from "./FilterSelect"

function JobFiltersList({}) {
	return (
		<div>
			<FilterSelect
				isGrouped
				isMultiSelect
				onAdd={value => console.log("added the value", value)}
				onRemove={value => console.log("removed the value", value)}
				groupedValues={{}}
			/>
		</div>
	)
}

export default JobFiltersList
