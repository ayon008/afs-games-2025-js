/**
 * Client helper to call the server-side Klaviyo subscribe route.
 * Usage: import subscribeToKlaviyo from '@/js/kalviyoSubscribe'
 * await subscribeToKlaviyo({ email, firstName, lastName, city })
 */
const subscribeToKlaviyo = async ({ email, name, surName, pays }) => {
    try {
        const res = await fetch('/api/klaviyo/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, surName, pays }),
        })

        const data = await res.json();
        console.log(data);

        return data
    } catch (err) {
        console.error('subscribeToKlaviyo error', err)
        return { ok: false, error: err?.message || 'Network error' }
    }
}

export default subscribeToKlaviyo

/**
 * Send a Klaviyo Track event (creates/updates a profile).
 * This uses the Klaviyo public token (site id). Safe to call client-side.
 * Provide publicKey explicitly or set NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY in your env.
 *
 * Returns an object { ok, status, body }
 */
export async function sendKlaviyoTrackEvent({ publicKey = "YdWsgy", email, firstName, lastName, city, eventName = 'Subscribed' }) {
    const key = publicKey || (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY);
    if (!key) {
        console.error('Klaviyo public key not provided. Set NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY or pass publicKey.')
        return { ok: false, error: 'Klaviyo public key missing' }
    }

    const payload = {
        token: key,
        event: eventName,
        customer_properties: {
            $email: email,
            $first_name: firstName,
            $last_name: lastName,
            city,
        },
        properties: { source: 'website' },
    }

    let b64
    try {
        b64 = typeof window !== 'undefined' ? btoa(JSON.stringify(payload)) : Buffer.from(JSON.stringify(payload)).toString('base64')
    } catch (e) {
        // fallback for unicode
        b64 = Buffer.from(JSON.stringify(payload)).toString('base64')
    }

    const trackUrl = `https://a.klaviyo.com/api/track?data=${encodeURIComponent(b64)}`

    try {
        const res = await fetch(trackUrl, { method: 'GET' })
        const text = await res.text().catch(() => '')
        return { ok: res.ok, status: res.status, body: text }
    } catch (err) {
        console.error('sendKlaviyoTrackEvent error', err)
        return { ok: false, error: err?.message || 'Network error' }
    }
}
