import "./App.css"
import JobsList from "./components/JobList"
import JobFiltersList from "./components/JobFiltersList"

function App() {
	return (
		<div className="App">
			<JobFiltersList />
			<JobsList />
		</div>
	)
}

export default App
