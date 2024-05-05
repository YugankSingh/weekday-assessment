import { useState } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import { Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

interface FilterInputProp {
	placeholder: string
	setValue: (value: string) => void
	selectedValue: string
	minCharacter?: number
}

function FilterInput({
	placeholder,
	setValue,
	selectedValue,
	minCharacter = 30,
}: FilterInputProp) {
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

	return (
		<FormControl sx={{ m: 0, transition: "all 0.3s linear" }} id={parentId}>
			{!!selectedValue.length && (
				<Typography
					sx={{
						color: selectedValue.length ? "black" : "transparent",
						fontSize: "14px",
						margin: "6px 0",
						marginBottom: 0,
						fontWeight: "800",
					}}
				>
					{selectedValue.length ? placeholder : "|"}
				</Typography>
			)}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					p: 1,
					minWidth: `calc( 0px + ${minCharacter}ch )`,
					cursor: "pointer",
					border: `1px solid ${getBorderColor(false, false)}`,
					borderRadius: "4px",
					color: "#333333",
					// boxShadow: `${open ? "rgb(38, 132, 255) 0px 0px 0px 1px" : "none"}`,
					"&:hover": {
						border: `1px solid ${getBorderColor(true, false)}`,
					},
					"&:focused": {
						border: `1px solid ${getBorderColor(true, true)}`,
						boxShadow: `rgb(38, 132, 255) 0px 0px 0px 1px`,
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
					<input
						onChange={e => {
							setValue(e.target.value)
						}}
						value={selectedValue}
						style={{
							all: "unset",
							height: "22px",
							fontSize: "14px",
							// width: "10px",
							// minWidth: "min-content"
							width: selectedValue.length
								? `${(selectedValue.length || 0) * 1.3 || 2}ch`
								: minCharacter + "ch",
						}}
						type="text"
						placeholder={placeholder}
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
					{!!selectedValue && (
						<CloseRoundedIcon
							onClick={() => {
								setValue("")
							}}
							sx={{
								height: "20px",
								width: "20px",
								cursor: "pointer",
								color: "rgb(204, 204, 204)",
								"&:hover": {
									color: "rgb(153, 153, 153)",
								},
								"&:focus": {
									color: "#666666",
								},
							}}
						/>
					)}
				</Box>
			</Box>
		</FormControl>
	)
}

export default FilterInput
