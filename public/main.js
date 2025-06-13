const language = document.querySelector('#language');
const uuidButton = document.getElementById('uuidButton');
const uuidValue = document.getElementById('uuidValue');
const category = document.querySelector('#category');
//console.log(language.value);
const limit = 3;


async function getTopStories(language, limit) {
    // Show loading state for carousel
    const carouselInner = document.querySelector('#demo .carousel-inner');
    const carouselIndicators = document.querySelector('#demo .carousel-indicators');
    
    // Clear existing content
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    // Add loading indicator
    carouselInner.innerHTML = `
        <div class="carousel-item active">
            <div class="d-flex justify-content-center align-items-center" style="height: 600px; background-color: #f8f9fa;">
                <div class="text-center">
                    <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <h3>Loading top stories...</h3>
                </div>
            </div>
        </div>
    `;
    
    try {
        const response = await fetch(`/api/topStories/${language}/${limit}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        
        // Předpokládáme, že články jsou v json.data (nebo json.articles)
        const articles = json.data;
         console.log('getTopStories: Data = ' + JSON.stringify(articles));
        // Vyčisti starý obsah včetně loadingu
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        articles.forEach((article, idx) => {
            // Vezmi obrázek z klíče image_url (případně uprav podle skutečné struktury)
            const imgUrl = article.image_url || '';
            const activeClass = idx === 0 ? 'active' : '';
            const title = article.title;
            const description = article.description;
            const articleUrl = article.url; 
            // Přidej obrázek do carouselu
            carouselInner.innerHTML += `
                <div class="carousel-item ${activeClass}">
                    <img src="${imgUrl}" class="d-block w-100" alt="news image" style="height: 600px; object-fit: cover;">
                        <div class="carousel-caption" style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px;">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <button class="btn btn-primary" onclick="window.location.href='${articleUrl}'">Read more</button>
                        </div>
                </div>
            `;
            // Přidej indikátor
            carouselIndicators.innerHTML += `
                <button type="button" data-bs-target="#demo" data-bs-slide-to="${idx}" class="${activeClass}"></button>
            `;
        });

    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <div class="d-flex justify-content-center align-items-center" style="height: 600px; background-color: #f8f9fa;">
                    <div class="text-center">
                        <div class="alert alert-danger p-4">
                            <h3>Unable to load top stories</h3>
                            <p>Please try again later.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

async function getAllNews(language, limit, category) {
    let attempts = 0;
    const maxAttempts = 3;
    
    // Show loading state for cards
    const cards = document.getElementById('list-allNews');
    cards.innerHTML = `
        <div class="col-12 text-center my-5">
            <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
            <h3>Loading ${category} news...</h3>
        </div>
    `;
    
    while (attempts < maxAttempts) {
        try {
            attempts++;
            const response = await fetch(`/api/allNews/${language}/${limit}/${category}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            const articles = json.data;

            // Vyčisti starý obsah včetně loadingu
            cards.innerHTML = '';
            console.log('getAllNews: Data = ' + JSON.stringify(articles));
            
            
            articles.forEach((article) => {
                const imgUrl = article.image_url;
                const title = article.title;
                const description = article.description;
                const articleUrl = article.url;
                //console.log('getAllNews: Spustilo se forEach');
                cards.innerHTML += `
                    <div class="card m-2 d-flex flex-column" style="height: 600px;">
                        <div class="image-container" style="flex-grow: 1; overflow: hidden; margin-bottom: 10px;margin-top: 10px;">
                            <img src="${imgUrl}" class="card-img-top w-100" style="object-fit: cover; height: 75%;">
                        </div>
                        <div class="card-body d-flex flex-column" style="padding-top: 5px;">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text mb-4">${description}</p>  
                            <a href="${articleUrl}" class="btn btn-primary mt-auto">Read more</a>
                        </div>
                    </div>
                `;
            });
            
            // Úspěšné načtení, přeruš smyčku
            return;
            
        } catch (error) {
            console.error(`Pokus ${attempts}/${maxAttempts} selhal: ${error.message}`);
            
            if (attempts >= maxAttempts) {
                console.error(`Data se nepodařilo načíst ani po ${maxAttempts} pokusech.`);
                
                // Zobraz chybovou zprávu uživateli
                cards.innerHTML = `
                    <div class="alert alert-danger col-12 text-center">
                        <h4>Nepodařilo se načíst data</h4>
                        <p>Zkuste to prosím později nebo vyberte jinou kategorii.</p>
                    </div>
                `;
            }
            
            // Počkej chvíli před dalším pokusem
            if (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}

category.addEventListener('change', () => {
    switch (category.value) {
        case 'general':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'business':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'entertainment':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'health':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'science':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'sports':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'technology':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'politics':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'food':
            
            getAllNews(language.value, limit, category.value);
            break;
        case 'travel':
            getAllNews(language.value, limit, category.value);
            break;
    }
    
});

language.addEventListener('change', (e) => {
    switch (language.value) {
        case 'en':
            getTopStories('en', limit);
            getAllNews('en', limit, category.value);
            break;
        case 'cs':
            getTopStories('cs', limit);
            getAllNews('cs', limit, category.value);
            break;
        case 'de':
            getTopStories('de', limit);
            getAllNews('de', limit, category.value);
            break;
        case 'fr':
            getTopStories('fr', limit);
            getAllNews('fr', limit, category.value);
            break;
        case 'es':
            getTopStories('es', limit);
            getAllNews('es', limit, category.value);
            break;
        case 'ru':
            getTopStories('ru', limit);
            getAllNews('ru', limit, category.value);
            break;
        case 'sk':
            getTopStories('sk', limit);
            getAllNews('sk', limit, category.value);
            break;
    }
});


getTopStories('en', limit);
getAllNews('en', limit, category.value);

//Here are viewing functions for the carousel and cards without API calls, using static JSON data
//because its keeps eating my API credits and I want to test the carousel and cards without calling the API every time

// async function getTopStoriesViewer() {
//     // Import test data (assumes testJsonData_en.js is loaded and exposes testJsonData_en)
//      try{
//         const response = await fetch(`/testJsonData/topStories_en.json`);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log(json + ' - top stories');
//         // Předpokládáme, že články jsou v json.data (nebo json.articles)
//         const articles = json.data;
//         const cards = document.getElementById('list-topStories');


//         const carouselInner = document.querySelector('#demo .carousel-inner');
//     const carouselIndicators = document.querySelector('#demo .carousel-indicators');
//     carouselInner.innerHTML = '';
//     carouselIndicators.innerHTML = '';
//     articles.forEach((article, idx) => {
//         const imgUrl = article.image_url || '';
//         const activeClass = idx === 0 ? 'active' : '';
//         const title = article.title;
//         const description = article.description;
//         const articleUrl = article.url;
//         carouselInner.innerHTML += `
//             <div class="carousel-item ${activeClass}">
//                 <img src="${imgUrl}" class="d-block w-100" alt="news image" style="height: 600px; object-fit: cover;">
//                 <div class="carousel-caption" style="background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px;">
//                     <h3>${title}</h3>
//                     <p>${description}</p>
//                     <button class="btn btn-primary" onclick="window.location.href='${articleUrl}'">Read more</button>
//                 </div>
//             </div>
//         `;
//         carouselIndicators.innerHTML += `
//             <button type="button" data-bs-target="#demo" data-bs-slide-to="${idx}" class="${activeClass}"></button>
//         `;
//     });
        
//     } catch (error) {
//         console.error(`Nastala chyba: ${error.message}`);
//         const carouselInner = document.querySelector('#demo .carousel-inner');
//         carouselInner.innerHTML = `
//             <div class="carousel-item active">
//                 <div class="d-flex justify-content-center align-items-center" style="height: 600px; background-color: #f8f9fa;">
//                     <div class="text-center">
//                         <div class="alert alert-danger p-4">
//                             <h3>Unable to load top stories</h3>
//                             <p>Please try again later.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//         return;
//     }
    
// }

// async function getAllNewsViewer() {
//     try{
//         const response = await fetch(`/testJsonData/topStories_en.json`);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log(json + ' - top stories');
//         // Předpokládáme, že články jsou v json.data (nebo json.articles)
//         const articles = json.data;
//         const cards = document.getElementById('list-allNews');
//     cards.innerHTML = '';

    
//     articles.forEach((article) => {
//         const imgUrl = article.image_url;
//         const title = article.title;
//         const description = article.description;
//         const articleUrl = article.url;
//         cards.innerHTML += `
//             <div class="card m-2 d-flex flex-column" style="height: 600px;">
//                 <div class="image-container" style="flex-grow: 1; overflow: hidden; margin-bottom: 10px;margin-top: 10px;">
//                     <img src="${imgUrl}" class="card-img-top w-100" style="object-fit: cover; height: 75%;">
//                 </div>
//                 <div class="card-body d-flex flex-column" style="padding-top: 5px;">
//                     <h5 class="card-title">${title}</h5>
//                     <p class="card-text mb-4">${description}</p>  
//                     <a href="${articleUrl}" class="btn btn-primary mt-auto">Read more</a>
//                 </div>
//             </div>
//         `;
//     });
//     }
//  catch (error) {
//         console.error(`Nastala chyba: ${error.message}`);
//         carouselInner.innerHTML = `
//             <div class="carousel-item active">
//                 <div class="d-flex justify-content-center align-items-center" style="height: 600px; background-color: #f8f9fa;">
//                     <div class="text-center">
//                         <div class="alert alert-danger p-4">
//                             <h3>Unable to load top stories</h3>
//                             <p>Please try again later.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }
    
// }
// getAllNewsViewer();
// getTopStoriesViewer();
/* supported countries
ar	Argentina
am	Armenia
au	Australia
at	Austria
by	Belarus
be	Belgium
bo	Bolivia
br	Brazil
bg	Bulgaria
ca	Canada
cl	Chile
cn	China
co	Colombia
hr	Croatia
cz	Czechia
ec	Ecuador
eg	Egypt
fr	France
de	Germany
gr	Greece
hn	Honduras
hk	Hong Kong
in	India
id	Indonesia
ir	Iran
ie	Ireland
il	Israel
it	Italy
jp	Japan
kr	Korea
mx	Mexico
nl	Netherlands
nz	New Zealand
ni	Nicaragua
pk	Pakistan
pa	Panama
pe	Peru
pl	Poland
pt	Portugal
qa	Qatar
ro	Romania
ru	Russia
sa	Saudi Arabia
za	South Africa
es	Spain
ch	Switzerland
sy	Syria
tw	Taiwan
th	Thailand
tr	Turkey
ua	Ukraine
gb	United Kingdom
us	United States Of America
uy	Uruguay
ve	Venezuela
*/
/*supported languages
ar
bg
bn
cs
da
de
el
en
es
et
fa
fi
fr
he
hi
hr
hu
id
it
ja
ko
lt
multi
nl
no
pl
pt
ro
ru
sk
sv
ta
th
tr
uk
vi
zh
*/