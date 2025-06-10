
async function getData(gameID) {
    try {
        const response = await fetch(`/api/steam/${gameID}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
getData(236390);
//war thunder id = 236390