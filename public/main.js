
async function getTopStories(language,country) {
    try {
        const response = await fetch(`/api/topStories/:${language}/:${country}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
async function getAllNews(language) {
    try {
        const response = await fetch(`/api/allNews/:${language}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}
async function getSimilar(language,uuid) {
    try {
        const response = await fetch(`/api/similarNews/:${language}/:${uuid}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(`Nastala chyba: ${error.message}`);
    }
}


getTopStories('en','cz');
getAllNews('en');
getSimilar('en','f76feb57-63a1-444e-a3d8-e5034ec10b53')
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