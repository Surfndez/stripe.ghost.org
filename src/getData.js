async function getData() {
    const res = await fetch(`/.netlify/functions/get-stripe-connect-integration-token${window.location.search}`, {
        method: 'POST'
    });

    const text = await res.text();

    if (!res.ok) {
        throw new Error(text);
    }

    return text;
}

export default getData;
