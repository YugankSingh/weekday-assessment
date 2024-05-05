import React, { useState } from "react"
import { jobFilterGroupedValues } from "../types"
import Box from "@mui/material/Box"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import CustomChip from "./CustomRemovableChip"
import FormControl from "@mui/material/FormControl"
import Autocomplete from "@mui/material/Autocomplete"
import { Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

interface FilterMultiSelectProp {
	placeholder: string
	isGrouped?: boolean
	setValues: (value: string[]) => any
	selectedValues: string[]
	values: string[]
	groupedValues?: jobFilterGroupedValues
	minCharacter?: number
}

function FilterMultiSelect({
	isGrouped = false,
	placeholder,
	setValues,
	values,
	groupedValues,
	selectedValues,
	minCharacter = 30,
}: FilterMultiSelectProp) {
	if (!!isGrouped && !groupedValues)
		throw new Error(
			"groupedValues can't be null, when isGrouped flag is on, in FilterMultiSelect.tsx"
		)
	if (!isGrouped && !values)
		throw new Error("values can't be null, in FilterMultiSelect.tsx")

	const handleRemove = (value: string) => {
		setValues(selectedValues.filter(currValue => currValue !== value))
	}

	const selectedValuesMemo = React.useMemo(
		() => selectedValues.filter(v => true),
		[selectedValues]
	)
	const valuesNotSelected = React.useMemo(
		() => values.filter(v => !selectedValues.includes(v)),
		[selectedValues, values]
	)
	const [open, setOpen] = useState(false)

	const getBorderColor = (isHovering: boolean, isActive: boolean) => {
		if (isActive) return "#007DFF"
		if (isHovering) return "rgb(153, 153, 153)"
		return "rgb(204, 204, 204)"
	}

	const [removeItemClass] = useState(
		"remove-item" + Math.floor(Math.random() * 1000000000)
	)
	const [parentId] = useState(
		"parent-id" + Math.floor(Math.random() * 1000000000)
	)

	const handleClick = (e: any) => {
		e.preventDefault()
		let shouldToggle = true
		const elementsToAvoid: Element[] = []
		// document
		// 	.querySelectorAll(`.MuiAutocomplete-popper`)
		// 	.forEach(el => elementsToAvoid.push(el))
		document
			.querySelectorAll(`#${parentId} .${removeItemClass} button`)
			.forEach(el => elementsToAvoid.push(el))

		elementsToAvoid.forEach(el => {
			if (el.contains(e?.target)) {
				shouldToggle = false
			}
		})

		if (shouldToggle) setOpen(!open)
	}

	return (
		<FormControl sx={{ m: 1, transition: "all 0.3s linear" }} id={parentId}>
			<Typography
				sx={{
					color: selectedValues.length ? "black" : "transparent",
					fontSize: "14px",
					margin: "6px 0",
					marginBottom: 0,
					fontWeight: "800",
				}}
			>
				{selectedValues.length ? placeholder : "|"}
			</Typography>
			<Autocomplete
				multiple
				id="tags-standard"
				value={selectedValues}
				options={valuesNotSelected}
				onChange={(event, newValue) => {
					setValues(newValue)
				}}
				open={open}
				onClose={handleClick}
				renderInput={params => (
					<Box
						onClick={e => handleClick(e)}
						ref={params.InputProps.ref}
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							p: 1,
							minWidth : `calc( 0px + ${minCharacter}ch )`,
							cursor: "pointer",
							border: `1px solid ${getBorderColor(false, open)}`,
							color: "#333333",
							boxShadow: `${
								open ? "rgb(38, 132, 255) 0px 0px 0px 1px" : "none"
								}`,
							"&:hover": {
								border: `1px solid ${getBorderColor(true, open)}`,
							},
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: "5px",
							}}
						>
							{selectedValuesMemo.map((option, index) => (
								<CustomChip
									className={removeItemClass}
									key={index}
									text={option}
									onRemove={() => handleRemove(option)}
								/>
							))}
							<input
								style={{
									all: "unset",
									height: "22px",
									fontSize: "13px",
									// width: "10px",
									// minWidth: "min-content"
									width: selectedValues.length
										? `${params.inputProps.value?.toString().length || 2}ch`
										: minCharacter+"ch",
								}}
								type="text"
								{...params.inputProps}
								placeholder={selectedValues.length ? "" : placeholder}
							/>
						</Box>

						<Box
							sx={{
								display: "flex",
								flexWrap: "no-wrap",
								gap: "8px",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{!!selectedValues.length && (
								<CloseRoundedIcon
									onClick={() => {
										setValues([])
									}}
									sx={{
										height: "20px",
										width: "20px",
										cursor: "pointer",
										color: open ? "#666666" : "rgb(204, 204, 204)",
										":hover": {
											color: open ? "#666666" : "rgb(153, 153, 153)",
										},
									}}
								/>
							)}
							<span
								style={{
									borderRight: "1px solid #ccc",
									boxSizing: "content-box",
									height: "90%",
									cursor: "pointer",
								}}
								onClick={() => setOpen(!open)} // Toggle dropdown on clicking the separator
							/>
							<KeyboardArrowDownIcon
								onClick={() => setOpen(!open)} // Toggle dropdown on clicking the icon
								sx={{
									cursor: "pointer",
									color: open ? "#666666" : "rgb(204, 204, 204)",
									":hover": { color: open ? "#666666" : "rgb(153, 153, 153)" },
								}}
							/>
						</Box>
					</Box>
				)}
			/>
		</FormControl>
	)
}

export default FilterMultiSelect
