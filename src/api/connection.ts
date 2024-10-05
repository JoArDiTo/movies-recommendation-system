import { URL_BACKEND_CONNECTION } from 'astro:env/client';

export async function fetchRecommendations(body: object) {
    const response = await fetch(URL_BACKEND_CONNECTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}
