const language = document.querySelector('#language');
const uuidButton = document.getElementById('uuidButton');
const uuidValue = document.getElementById('uuidValue');
console.log(language.value);


async function getTopStories(language) {
    try {
        const response = await fetch(`/api/topStories/${language}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);

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

async function getAllNews(language) {
    try {
        const response = await fetch(`/api/allNews/${language}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
async function getSimilar(language, uuid) {
    try {
        const response = await fetch(`/api/similarNews/${language}/${uuid}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        const articles = json.data;
        const cards = document.getElementById('list-similarNews');
    // Vyčisti starý obsah
        cards.innerHTML = '';
        
        articles.forEach((article) => {
            const imgUrl = article.image_url;
            const title = article.title;
            const description = article.description;
            const articleUrl = article.url;
            const articleUuid = article.uuid;
            
            cards.innerHTML += `
                <div class="card m-2">
                    <img src="${imgUrl}" class="card-img-top p-3">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                    <a href="${articleUrl}" class="btn btn-primary m-2" style="width: 25%;">Read more</a>
                    <p style="opacity: 75%;">UUID: ${articleUuid}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
uuidButton.addEventListener('click', () => {
    getSimilar(language.value, uuidValue.value);
    console.log(`UUID: ${uuidValue.value} a jazyk: ${language.value}`);
});

language.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'en':
            getTopStories('en');
            getAllNews('en');
            getSimilar('en', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'cs':
            getTopStories('cs');
            getAllNews('cs');
            getSimilar('cs', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'de':
            getTopStories('de');
            getAllNews('de');
            getSimilar('de', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'fr':
            getTopStories('fr');
            getAllNews('fr');
            getSimilar('fr', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'es':
            getTopStories('es');
            getAllNews('es');
            getSimilar('es', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'ru':
            getTopStories('ru');
            getAllNews('ru');
            getSimilar('ru', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
        case 'sk':
            getTopStories('sk');
            getAllNews('sk');
            getSimilar('sk', 'f76feb57-63a1-444e-a3d8-e5034ec10b53');
            break;
    }

});
            getTopStories('en');
            getAllNews('en');
            getSimilar('en','f76feb57-63a1-444e-a3d8-e5034ec10b53');
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