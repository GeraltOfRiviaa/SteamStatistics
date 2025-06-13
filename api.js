
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // npm install node-fetch@2
const token = "9rHrV9evRvKJTgv6q826f2Pf8X0loasAoTskhTfg"

app.use(express.static('public'));
app.use('/testJsonData', express.static(path.join(__dirname, 'testJsonData')));

app.get('/api/topStories/:language/:limit', async (req, res) => {
    const language = req.params.language;
    const limit = req.params.limit || 3;
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=${token}&language=${language}&limit=${limit}`;
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

app.get('/api/allNews/:language/:limit/:category', async (req, res) => {
    const language = req.params.language;
    const limit = req.params.limit || 3;
    const category = req.params.category || 'general';
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${token}&language=${language}&limit=${limit}&categories=${category}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const dir = path.join(__dirname, 'testJsonData');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        
        fs.writeFileSync(
            path.join(dir, `topAllStories_${language}.json`),
            JSON.stringify(data, null, 2),
            'utf8'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => console.log('Server běží na portu 3000'));
