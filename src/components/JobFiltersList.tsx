import React, { useState } from "react"
import FilterMultiSelect from "./FilterMultiSelect"
import FormControl from "@mui/material/FormControl"

function JobFiltersList({}) {
	const [selectedRoles, setSelectedRoles] = useState<string[]>([])

	const jobRoleValues = [
		"First",
		"Second",
		"Third",
		"Fourth",
		"Fairst",
		"wrtgs",
		"Thiasrd",
		"Fousrth",
		"Firsast",
		"Secsdond",
		"Thisrd",
		"Foaurth",
		"Firast",
		"Secrond",
		"Tharird",
		"Fouarrth",
	]

	return (
		<div>
			<FilterMultiSelect
				setValues={values => {
					setSelectedRoles(values)
				}}
				placeholder="Role"
				selectedValues={selectedRoles}
				values={jobRoleValues}
			/>
		</div>
	)
}

export default JobFiltersList
