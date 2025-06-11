
async function getNews(language,country) {
    try {
        const response = await fetch(`/api/latestNews/:${language}/:${country}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
async function getSources(language,country) {
    try {
        const response = await fetch(`/api/sources/:${language}/:${country}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}


getNews('cs,en','cz');
getSources('cs,en','cz');
//war thunder id = 236390