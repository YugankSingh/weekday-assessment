import "./App.css"
import JobsList from "./components/JobList"
import JobFiltersList from "./components/JobFiltersList"
import { Container } from "@mui/material"
import { useEffect } from "react"
import { fetchMoreJobs } from "./store/jobsSlice"
import { useAppDispatch } from "./hooks"

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchMoreJobs())
	}, [])

	return (
		<div className="App">
			<Container maxWidth="lg">
				<JobFiltersList />
				<JobsList />
			</Container>
			<footer
				style={{ display: "block", height: "300px",  }}
			></footer>
		</div>
	)
}

export default App
