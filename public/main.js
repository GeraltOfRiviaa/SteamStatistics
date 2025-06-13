const language = document.querySelector('#language');
const uuidButton = document.getElementById('uuidButton');
const uuidValue = document.getElementById('uuidValue');
const category = document.querySelector('#category');
console.log(language.value);
const limit = 1;

async function getTopStories(language, limit) {
    try {
        const response = await fetch(`/api/topStories/${language}/${limit}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json + ' - top stories');
        // Předpokládáme, že články jsou v json.data (nebo json.articles)
        const articles = json.data;
        const carouselInner = document.querySelector('#demo .carousel-inner');
        const carouselIndicators = document.querySelector('#demo .carousel-indicators');

        // Vyčisti starý obsah
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
                    <img src="${imgUrl}" class="d-block w-100" alt="news image">
                        <div class="carousel-caption">
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
    }
}

async function getAllNews(language,limit, category) {
    try {
        const response = await fetch(`/api/allNews/${language}/${limit}/${category}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const articles = json.data;
        console.log(json + ' - all news');

        const cards = document.getElementById('list-allNews');
        // Vyčisti starý obsah
            cards.innerHTML = '';

            articles.forEach((article,) => {
                const imgUrl = article.image_url ;
                const title = article.title;
                const description = article.description;
                const articleUrl = article.url;
                console.log('getAllNews: Spustilo se forEach');
                cards.innerHTML += `
                    <div class="card m-2">
                            <img src="${imgUrl}" class="card-img-top p-3" >

                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${description}</p>  
                            </div>
                            <a href="${articleUrl}" class="btn btn-primary m-2" style="width: 25%;">Read more</a>
                    </div>
                `;
            });
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
category.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'general':
            getAllNews(language.value, limit, 'general');
            break;
        case 'business':
            getAllNews(language.value, limit, 'business');
            break;
        case 'entertainment':
            getAllNews(language.value, limit, 'entertainment');
            break;
        case 'health':
            getAllNews(language.value, limit, 'health');
            break;
        case 'science':
            getAllNews(language.value, limit, 'science');
            break;
        case 'sports':
            getAllNews(language.value, limit, 'sports');
            break;
        case 'technology':
            getAllNews(language.value, limit, 'technology');
            break;
    }
});

language.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'en':
            getTopStories('en', limit);
            getAllNews('en', limit, 'general');
            break;
        case 'cs':
            getTopStories('cs', limit);
            getAllNews('cs', limit, 'general');
            break;
        case 'de':
            getTopStories('de', limit);
            getAllNews('de', limit, 'general');
            break;
        case 'fr':
            getTopStories('fr', limit);
            getAllNews('fr', limit, 'general');
            break;
        case 'es':
            getTopStories('es', limit);
            getAllNews('es', limit, 'general');
            break;
        case 'ru':
            getTopStories('ru', limit);
            getAllNews('ru', limit, 'general');
            break;
        case 'sk':
            getTopStories('sk', limit);
            getAllNews('sk', limit, 'general');
            break;
    }
});

getTopStories('en', limit);
getAllNews('en', limit);


// async function previewTopStoriesFromFile() {
//     try {
//         const response = await fetch(`/testJsonData/topStories_en.json`);
//         if (!response.ok) {
//             throw new Error(`Soubor nenalezen: ${response.status}`);
//         }
//         const json = await response.json();
//         previewTopStories(json.data);
//         previewAllStories(json.data);
//         previewSimilarStoriesFromFile('f76feb57-63a1-444e-a3d8-e5034ec10b53');
        
//     } catch (error) {
//         console.error('Chyba při načítání offline dat:', error.message);
//     }
// }

// async function previewTopStories(articles) {
     

//     const carouselInner = document.querySelector('#demo .carousel-inner');
//         const carouselIndicators = document.querySelector('#demo .carousel-indicators');

//     // Vyčisti starý obsah
//         carouselInner.innerHTML = '';
//         carouselIndicators.innerHTML = '';

//         articles.forEach((article, idx) => {
//             // Vezmi obrázek z klíče image_url (případně uprav podle skutečné struktury)
//             const imgUrl = article.image_url ;
//             const activeClass = idx === 0 ? 'active' : '';
//             const title = article.title;
//             const description = article.description;
//             const articleUrl = article.url; 
//             // Přidej obrázek do carouselu
//             carouselInner.innerHTML += `
//                 <div class="carousel-item ${activeClass} col-12">
//                     <img src="${imgUrl}" class="d-block" style="height: 600px; object-fit: span;" alt="news image">
//                         <div class="carousel-caption" style="background-color: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px;">
//                             <h3>${title}</h3>
//                             <p>${description}</p>
//                             <button class="btn btn-primary" onclick="window.location.href='${articleUrl}'">Read more</button>
//                         </div>
//                 </div>
//             `;
//             // Přidej indikátor
//             carouselIndicators.innerHTML += `
//                 <button type="button" data-bs-target="#demo" data-bs-slide-to="${idx}" class="${activeClass}"></button>
//             `;
//         });

// }

// async function previewAllStories(articles) {
     

//     const cards = document.getElementById('list-allNews');
//     // Vyčisti starý obsah
//         cards.innerHTML = '';

//         articles.forEach((article,) => {
//             // Vezmi obrázek z klíče image_url (případně uprav podle skutečné struktury)
//             const imgUrl = article.image_url ;
//             const title = article.title;
//             const description = article.description;
//             const articleUrl = article.url;
//             const uuid = article.uuid; 
//             // Přidej obrázek do carouselu
//             cards.innerHTML += `
//                 <div class="card m-2">
//                         <img src="${imgUrl}" class="card-img-top p-3" >

//                         <div class="card-body">
//                             <h5 class="card-title">${title}</h5>
//                             <p class="card-text">${description}</p>  
//                         </div>
//                         <a href="${articleUrl}" class="btn btn-primary m-2" style="width: 25%;">Read more</a>
//                         <p style="opacity: 75%;">UUID: ${uuid}</p>
//                 </div>
//             `;
//         });

// }

// async function similarStories(articles) {
     

    

// }
// async function previewSimilarStoriesFromFile(uuid) {
//     try {
//         // Použijeme stejná data jako pro topStories
//         const response = await fetch(`/testJsonData/topStories_en.json`);
//         if (!response.ok) {
//             throw new Error(`Soubor nenalezen: ${response.status}`);
//         }
//         const json = await response.json();
        
//         // Filtrovat články podle UUID nebo prostě použít všechny
//         let articles = json.data;
//         if (uuid) {
//             // Pro demo účely předstíráme, že ostatní články jsou "podobné" tomu s daným UUID
//             articles = json.data.filter(article => article.uuid !== uuid);
//         }
        
//         // Zobrazit články
//         const cards = document.getElementById('list-similarNews');
//         cards.innerHTML = '';
        
//         articles.forEach((article) => {
//             const imgUrl = article.image_url;
//             const title = article.title;
//             const description = article.description;
//             const articleUrl = article.url;
//             const articleUuid = article.uuid;
            
//             cards.innerHTML += `
//                 <div class="card m-2">
//                     <img src="${imgUrl}" class="card-img-top p-3">
//                     <div class="card-body">
//                         <h5 class="card-title">${title}</h5>
//                         <p class="card-text">${description}</p>
//                     </div>
//                     <a href="${articleUrl}" class="btn btn-primary m-2" style="width: 25%;">Read more</a>
//                     <p style="opacity: 75%;">UUID: ${articleUuid}</p>
//                 </div>
//             `;
//         });
//     } catch (error) {
//         console.error('Chyba při načítání offline dat:', error.message);
//     }
// }

//previewTopStoriesFromFile();
//getTopStories('en');
//getAllNews('en');
//getSimilar('en','f76feb57-63a1-444e-a3d8-e5034ec10b53')
//war thunder id = 236390

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