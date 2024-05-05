import React, { useRef, useState } from "react"
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
	values?: string[]
	groupedValues?: jobFilterGroupedValues
	minCharacter?: number
	isMultiple: boolean
}

function FilterMultiSelect({
	isMultiple,
	isGrouped = false,
	placeholder,
	setValues,
	values,
	groupedValues,
	selectedValues,
	minCharacter = 30,
}: FilterMultiSelectProp) {
	let groups: { [value: string]: string } = {}
	if (isGrouped) {
		if (!groupedValues)
			throw new Error(
				"groupedValues can't be null, when isGrouped flag is on, in FilterMultiSelect.tsx"
			)
		values = []
		for (let group in groupedValues) {
			const currGroupValues = groupedValues[group]
			currGroupValues.forEach(value => {
				values?.push(value)
				groups[value] = group
			})
		}
	}
	values = values || []

	if (!isGrouped && !values)
		throw new Error("values can't be null, in FilterMultiSelect.tsx")

	const handleRemove = (value: string) => {
		setValues(selectedValues.filter(currValue => currValue !== value))
	}

	console.log(placeholder, "selectedValues", selectedValues, isMultiple)
	const valuesToShow = React.useMemo(() => {
		return isMultiple
			? values?.filter(v => !selectedValues.includes(v))
			: values
	}, [selectedValues, values])
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
	const inputRef = useRef(null)

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
		const newOpen = !open
		if (!shouldToggle) return
		setOpen(newOpen)
		if (!newOpen)
			// @ts-ignore
			document.querySelectorAll(`#${parentId} input`).forEach(el => el.blur())
	}

	return (
		<FormControl sx={{ m: 0, transition: "all 0.3s linear" }} id={parentId}>
			{!!selectedValues.length && (
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
			)}
			<Autocomplete
				multiple
				// getOptionLabel={(option) => option.title}
				id="tags-standard"
				value={selectedValues}
				groupBy={value => groups[value]}
				options={valuesToShow || []}
				onChange={(event, newValue) => {
					console.log(newValue)

					if (!newValue) return
					if (!isMultiple) newValue = [newValue[newValue.length - 1]]
					setValues(newValue)
				}}
				onInputChange={e => {
					// @ts-ignore
					const inputValue: string = e?.target?.value || ""
					console.log("inputValue", inputValue)
					if (!isMultiple && inputValue && inputValue.length) {
						// setValues([])
					}
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
							minWidth: `calc( 0px + ${minCharacter}ch )`,
							cursor: "pointer",
							border: `1px solid ${getBorderColor(false, open)}`,
							borderRadius: "4px",
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
							{!!isMultiple &&
								selectedValues.map((option, index) => (
									<CustomChip
										className={removeItemClass}
										key={index}
										text={option}
										onRemove={() => handleRemove(option)}
									/>
								))}

							<Box>
								{!isMultiple &&
									selectedValues[0] &&
									!params.inputProps.value?.toString().length && (
										<Typography
											sx={{
												all: "unset",
												height: "22px",
												fontSize: "14px",
												width: selectedValues.length
													? `${(selectedValues.length || 0) * 1.3 || 2}ch`
													: minCharacter + "ch",
											}}
										>
											{selectedValues[0]}
										</Typography>
									)}

								<input
									style={{
										all: "unset",
										height: "22px",
										fontSize: "14px",
										// width: "10px",
										// minWidth: "min-content"

										width: selectedValues.length
											? `${
													(params.inputProps.value?.toString().length || 0) *
														1.3 || 2
											  }ch`
											: minCharacter + "ch",
									}}
									type="text"
									{...params.inputProps}
									placeholder={selectedValues.length ? "" : placeholder}
								/>
							</Box>
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
