
const express = require('express');
const app = express();
const fetch = require('node-fetch'); // npm install node-fetch@2

app.use(express.static('public'));

app.get('/api/steam/:appid', async (req, res) => {
    const appid = req.params.appid
    const steamApiUrl = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v1/?key=35C8750D4A95BD7B05733B199CDA8B6E&appid=${appid}`;
    
    try {
        const response = await fetch(steamApiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server běží na portu 3000'));