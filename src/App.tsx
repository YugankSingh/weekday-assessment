import "./App.css"
import JobsList from "./components/JobList"
import JobFiltersList from "./components/JobFiltersList"
import { Container } from "@mui/material"

function App() {
	return (
		<div className="App">
			<Container maxWidth="lg">
				<JobFiltersList />
				<JobsList />
			</Container >
		</div>
	)
}

export default App
