document.addEventListener('DOMContentLoaded', (event) => {
    const MY_API_KEY = "on3swefrghkyrgmayfs4qk5ufkcxmrmroqwfp0jm";
    const tickerContainer = document.getElementById('news-ticker-content');

    // Define an array of the feeds you want to combine
    const feedUrls = [
        encodeURIComponent('http://rss.newser.com/rss/section/1.rss'),
        encodeURIComponent('http://rss.newser.com/rss/section/2.rss'),
    //    encodeURIComponent('http://rss.newser.com/rss/section/3.rss')
    ];

    function fetchNews() {
        const fetchPromises = feedUrls.map(encodedUrl => {
            // Added timestamp to bypass cache for fresh data
            const url = `https://api.rss2json.com/v1/api.json?&rss_url=${encodedUrl}&t=${new Date().getTime()}`;
            return fetch(url).then(res => res.json());
        });

        Promise.all(fetchPromises).then(results => {
            let combinedItems = [];
            results.forEach(data => {
                if (data.status === 'ok' && data.items) combinedItems = combinedItems.concat(data.items);
            });

            let headlineHTML = combinedItems.map(item => 
                `<span class="ticker-item"><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></span>`
            ).join('');

            // Doubled content for seamless looping
            tickerContainer.innerHTML = headlineHTML + headlineHTML;
        }).catch(err => console.error('Ticker Error:', err));
    }

    fetchNews();
    setInterval(fetchNews, 1800000); // 30-minute refresh
});
