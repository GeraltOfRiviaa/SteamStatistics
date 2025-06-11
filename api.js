
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2

app.use(express.static('public'));
app.use('/testJsonData', express.static(path.join(__dirname, 'testJsonData')));
/*
app.get('/api/topStories/:language', async (req, res) => {
    const language = req.params.language;
    
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=w1FTGJ6swYCaTBIbe3zvZ4Cx9nshXzbJk43HZ45B&language=${language}&limit=3`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Uložení do testJsonData/topStories_{language}.json pro vykreslování carouselu offline, 
        // abych nemusel volat API pokaždé a tím čerpat svoje drahocenné kredity
        const dir = path.join(__dirname, 'testJsonData');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(
            path.join(dir, `topStories_${language}.json`),
            JSON.stringify(data, null, 2),
            'utf8'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/allNews/:language', async (req, res) => {
    const language = req.params.language;
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=w1FTGJ6swYCaTBIbe3zvZ4Cx9nshXzbJk43HZ45B&${language}&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/similarNews/:language/:uuid', async (req, res) => {
    const language = req.params.language;
    const uuid = req.params.uuid;
    const url = `https://api.thenewsapi.com/v1/news/similar/${uuid}?api_token=w1FTGJ6swYCaTBIbe3zvZ4Cx9nshXzbJk43HZ45B&language=${language}&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

*/
app.listen(3000, () => console.log('Server běží na portu 3000'));
