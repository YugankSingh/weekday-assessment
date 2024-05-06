import { Filters } from "../types"

export function areFiltersEqual(filters1: Filters, filters2: Filters): boolean {

	// Check each property for equality
	return (
		arraysAreEqual(filters1.roles, filters2.roles) &&
		arraysAreEqual(filters1.techStack, filters2.techStack) &&
		filters1.minExperience === filters2.minExperience &&
		filters1.companyName === filters2.companyName &&
		arraysAreEqual(filters1.location, filters2.location) &&
		arraysAreEqual(filters1.workEnvironment, filters2.workEnvironment) &&
		filters1.minBasePayInLPA === filters2.minBasePayInLPA
	)
}

function arraysAreEqual<T>(arr1: T[], arr2: T[]): boolean {
	if (arr1.length !== arr2.length) return false
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}
	return true
}
