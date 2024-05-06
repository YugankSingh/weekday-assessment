import { Job, Filters } from "../types"

export default function applyFilters(jobs: Job[], filters: Filters): Job[] {
	return jobs.filter(job => {
		const jobRoleLower = job.jobRole.toLowerCase()
		const techStackLower = job.jobRole.toLowerCase()
		const companyNameLower = job.companyName.toLowerCase()
		const locationLower = job.location.toLowerCase()
		const workEnvironmentLower =
			job.location.toLowerCase() === "remote" ? "remote" : "in-office"

		const rolesLower = filters.roles.map(role => role.toLowerCase())
		const techStackFiltersLower = filters.techStack.map(tech =>
			tech.toLowerCase()
		)
		const companyNameLowerFilter = filters.companyName.toLowerCase()
		const locationLowerFilters = filters.location.map(loc => loc.toLowerCase())
		const workEnvironmentLowerFilters = filters.workEnvironment.map(env =>
			env.toLowerCase()
		)

		if (filters.minExperience !== null && job.minExp > filters.minExperience)
			return false

		if (
			filters.minBasePayInLPA !== null &&
			job.maxJdSalary !== null &&
			job.maxJdSalary < filters.minBasePayInLPA
		)
			return false

		//  roles
		if (
			rolesLower.length > 0 &&
			!rolesLower.some(
				currRole =>
					currRole.includes(jobRoleLower) || jobRoleLower.includes(currRole)
			)
		)
			return false

		// techStack
		if (
			techStackFiltersLower.length > 0 &&
			!techStackFiltersLower.some(
				tech => techStackLower.includes(tech) || tech.includes(techStackLower)
			)
		) {
			return false
		}

		// company name
		if (
			companyNameLowerFilter !== "" &&
			!(
				companyNameLower.includes(companyNameLowerFilter) ||
				companyNameLowerFilter.includes(companyNameLower)
			)
		) {
			return false
		}

		// location
		if (
			locationLowerFilters.length > 0 &&
			!locationLowerFilters.some(
				currLocationFilter =>
					currLocationFilter.includes(locationLower) ||
					locationLower.includes(currLocationFilter)
			)
		) {
			return false
		}

		// work environment
		if (
			workEnvironmentLowerFilters.length > 0 &&
			!workEnvironmentLowerFilters.includes(workEnvironmentLower)
		) {
			return false
		}

		// If all conditions are met, include the job in the filtered results
		return true
	})
}
