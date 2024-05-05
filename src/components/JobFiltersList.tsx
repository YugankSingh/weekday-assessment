import { useState } from "react"
import FilterMultiSelect from "./FilterMultiSelect"
import { useDispatch, useSelector } from "react-redux"
import { useAppSelector } from "../hooks"
import { setFilter } from "../store/filtersSlice"
import { Box } from "@mui/material"

const workEnvironemntValues = ["Remote", "In-Office", "Hybrid"]
const locationValues = [
	"Mumbai",
	"Delhi",
	"Bangalore",
	"Hyderabad",
	"Ahmedabad",
	"Chennai",
	"Kolkata",
	"Surat",
	"Pune",
	"Jaipur",
	"Lucknow",
	"Kanpur",
	"Nagpur",
	"Visakhapatnam",
	"Indore",
	"Thane",
	"Bhopal",
	"Patna",
	"Vadodara",
	"Ghaziabad",
	"Ludhiana",
	"Coimbatore",
	"Agra",
	"Madurai",
	"Nashik",
	"Vijayawada",
	"Faridabad",
	"Meerut",
	"Rajkot",
	"Kalyan-Dombivali",
	"Vasai-Virar",
	"Varanasi",
	"Srinagar",
	"Aurangabad",
	"Dhanbad",
	"Amritsar",
	"Navi Mumbai",
	"Allahabad",
	"Howrah",
	"Ranchi",
]
const techStackValues = [
	"MERN",
	"MEAN",
	"LAMP ",
	"Django",
	"Flask",
	"Ruby on Rails",
	"Java Spring",
	"ASP.NET",
	"Vue.js",
	"AngularJS",
	"React Native",
	"iOS",
	"Android",
	"TensorFlow",
	"PyTorch",
]
const rolesValues = {
	Engineering: [
		"Backend Developer",
		"Frontend Developer",
		"Full Stack Developer",
		"DevOps Engineer",
		"Mobile Developer",
		"Embedded Systems Engineer",
	],
	Design: [
		"Graphic Designer",
		"UI/UX Designer",
		"Web Designer",
		"Motion Designer",
		"Illustrator",
		"Product Designer",
	],
	"Product Management": [
		"Product Manager",
		"Product Owner",
		"Product Analyst",
		"Technical Product Manager",
		"Product Marketing Manager",
		"Product Strategist",
	],
	"Data Science": [
		"Data Scientist",
		"Data Analyst",
		"Machine Learning Engineer",
		"AI Researcher",
		"Big Data Engineer",
		"Business Intelligence Analyst",
	],
	"Quality Assurance": [
		"QA Engineer",
		"Automation Tester",
		"Manual Tester",
		"Quality Analyst",
		"Test Engineer",
		"Performance Tester",
	],
	"Project Management": [
		"Project Manager",
		"Scrum Master",
		"Agile Coach",
		"Project Coordinator",
		"Program Manager",
		"Release Manager",
	],
	"Business Analysis": [
		"Business Analyst",
		"Systems Analyst",
		"Requirements Engineer",
		"Process Analyst",
		"Product Analyst",
		"Functional Analyst",
	],
	"IT Operations": [
		"System Administrator",
		"Network Engineer",
		"IT Support Specialist",
		"Database Administrator",
		"Cloud Engineer",
		"Security Analyst",
	],
}

function JobFiltersList({}) {
	const filters = useAppSelector(state => state.filters.list)
	const dispatch = useDispatch()

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				gap: "4px",
				flexWrap: "wrap",
				p: 3,
			}}
		>
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
				values={workEnvironemntValues}
				minCharacter={14}
			/>

			<FilterMultiSelect
				setValues={values => {
					dispatch(setFilter({ ...filters, location: values }))
				}}
				placeholder="Location"
				selectedValues={filters.location}
				values={locationValues}
				minCharacter={15}
			/>

			<FilterMultiSelect
				setValues={values => {
					dispatch(
						setFilter({
							...filters,
							// @ts-ignore
							techStack: values,
						})
					)
				}}
				placeholder="Tech Stack"
				selectedValues={filters.techStack}
				values={techStackValues}
				minCharacter={14}
			/>

			<FilterMultiSelect
				setValues={values => {
					dispatch(
						setFilter({
							...filters,
							// @ts-ignore
							roles: values,
						})
					)
				}}
				placeholder="Roles"
				isGrouped
				selectedValues={filters.roles}
				groupedValues={rolesValues}
				minCharacter={20}
			/>
		</Box>
	)
}

export default JobFiltersList
