async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching quote: ', error);
        return "An error occurred while fetching the quote";
    }
}

document.getElementById('quoteButton').addEventListener('click', async function() {
    const quote = await fetchQuote();
    document.getElementById('quoteDisplay').textContent = quote;
});