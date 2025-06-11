
const express = require('express');
const app = express();
const fetch = require('node-fetch'); // npm install node-fetch@2

app.use(express.static('public'));

app.get('/api/latestNews/:language/:country', async (req, res) => {
    const language = req.params.language;
    const country = req.params.country
    const newsUrl = `https://newsdata.io/api/1/latest?apikey=pub_3eb33a819d28479cb5fecdd76ef121c1&language=${language}&country=${country}`;
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/sources/:language/:country', async (req, res) => {
    const language = req.params.language;
    const country = req.params.country;
    const newsUrl = `https://newsdata.io/api/1/sources?apikey=pub_3eb33a819d28479cb5fecdd76ef121c1&language=${language}&country=${country}`;
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => console.log('Server běží na portu 3000'));
//api key = f076f6a9bcd040e6afbef564c923769b