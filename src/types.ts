export interface jobFilterGroupedValues {
	[groupName: string]: string[]
}

export interface Job {
	jdUid: string
	jdLink: string
	jobDetailsFromCompany: string
	maxJdSalary: number | null
	minJdSalary: number | null
	salaryCurrencyCode: string
	location: string
	minExp: number
	maxExp: number
	jobRole: string
	companyName: string
	logoUrl: string
}
