

export async function getEvents() {
    const res = await fetch(`https://API_URL/venues/today`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
     })
     return res.json()
}