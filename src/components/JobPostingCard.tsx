import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import { Job } from "../types"
import { Box } from "@mui/material"
import LazyLoad from "react-lazy-load"

interface JobPostingCardProps {
	job: Job
	onJobCardVisible: () => void
}

const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const JobPostingCard: React.FC<JobPostingCardProps> = ({
	job,
	onJobCardVisible,
}) => {
	const {
		jobRole: title,
		companyName,
		location,
		jobDetailsFromCompany: fullDescription,
		minExp,
		maxExp,
		minJdSalary: minSalary,
		maxJdSalary: maxSalary,
		logoUrl,
	} = job
	const postedDaysAgo = 10
	const salaryString = `${
		minSalary ? Math.floor(minSalary) + " - " : ""
	}${Math.floor(maxSalary || 0)}`

	const [showFullDescription, setShowFullDescription] = useState(false)
	const description = showFullDescription
		? fullDescription
		: fullDescription.slice(0, 350) + "..."

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription)
	}

	return (
		<Card
			sx={{
				"&:hover": {
					transform: "scale(1.02)",
					transition: "transform 0.3s ease",
				},
				borderRadius: "20px",
				boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
				p: 2,
			}}
		>
			<CardContent
				sx={{
					display: "grid",
					gridTemplateRows: "auto auto auto auto 1fr auto auto",
					gridTemplateColumns: "fit-content",
					height: showFullDescription ? "auto" : "650px",
				}}
			>
				<Chip
					label={`⏳ Posted ${postedDaysAgo} days ago`}
					variant="outlined"
					sx={{
						marginBottom: "16px",
						fontSize: "9px",
						padding: "0px 0px",
					}}
				/>{" "}
				<Grid container>
					<Grid item sx={{ width: "65px", marginRight: "10px" }}>
						<img
							src={logoUrl}
							alt="Company Logo"
							style={{ width: "100%", height: "auto" }}
						/>
					</Grid>
					<Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
						<Typography
							variant="h5"
							sx={{
								fontSize: "14px",
								fontWeight: "600",
								letterSpacing: "1px",
								color: "#8b8b8b",
							}}
						>
							{companyName}
						</Typography>
						<Typography
							variant="h6"
							sx={{
								fontSize: "16px",
								fontWeight: "400",
							}}
						>
							{capitalizeFirstLetter(title)}
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								fontSize: "12px",
								fontWeight: "500",
							}}
						>
							{capitalizeFirstLetter(location)}
						</Typography>
					</Box>
				</Grid>
				<Typography
					variant="body2"
					sx={{
						fontSize: "17px",
						fontWeight: "400",
						my: "10px",
						color: "rgb(77, 89, 106)",
					}}
				>
					Estimated Salary: {`₹${salaryString} LPA ✅`}
				</Typography>
				<Typography
					variant="h6"
					sx={{
						fontSize: "17px",
						fontWeight: "600",
						marginBottom: 0,
					}}
				>
					About Job:
				</Typography>
				<Typography
					variant="body1"
					paragraph
					sx={{
						position: "relative",
						overflowX: "hidden",
						overflowY: "hidden",
					}}
				>
					{description}
					{!showFullDescription && (
						<Button
							onClick={toggleDescription}
							size="small"
							sx={{
								position: "absolute",
								bottom: "0",
								left: "0",
								width: "100%",
								background:
									"linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
								height: "110px",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
								"&:hover": {
									background:
										"linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)",
								},
							}}
						>
							See more
						</Button>
					)}

					{!!showFullDescription && (
						<Button
							onClick={toggleDescription}
							size="small"
							sx={{
								width: "100%",
								background: "transparent",
								marginTop: "10px",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
								"&:hover": {
									background: "transparent",
								},
							}}
						>
							See Less
						</Button>
					)}
				</Typography>
				<Typography
					variant="body2"
					gutterBottom
					sx={{
						fontSize: "16px",
						fontWeight: "600",
						letterSpacing: "1px",
						color: "#8b8b8b",
						marginBottom: 0,
					}}
				>
					Minimum Experience
				</Typography>
				<Typography
					variant="body2"
					sx={{
						fontSize: "16px",
						fontWeight: "500",
						marginBottom: "20px",
					}}
				>
					{minExp} years
				</Typography>
				<LazyLoad onContentVisible={onJobCardVisible}>
					<Button
						variant="contained"
						sx={{
							background: "#54EFC4",
							color: "black",
							width: "100%",
							padding: "8px 18px",
							fontSize: "18px",
							fontWeight: "500",
							borderRadius: "10px",
							boxShadow: "none",
							"&:hover": {
								background: "#6cf5cc",
							},
						}}
					>
						⚡ Easy Apply
					</Button>
				</LazyLoad>
			</CardContent>
		</Card>
	)
}

export default JobPostingCard
