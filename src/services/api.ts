export async function getApplications() {
    const response = await fetch('https://myownteststterraform.z16.web.core.windows.net/applications.json')

    if(!response.ok) {
        throw new Error('Failed to fetch applications')
    }

    return response.json()
}