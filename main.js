//API URL
let API_URL = 'https://api.thecatapi.com/v1/'; //v1
let API_URL_ERR = 'https://http.cat/';
//endpoitns
const methodGET = 'images/search'
const queryLimit = '?limit=5'
const favorites = 'favourites'
//key
const API_KEY = '&api_key=live_baeVDLnjkGPGw4iWNwc5CEE8wYwetNLHlaiHJw7uYLu2Cvb4UECgTLIksB9jUgJO'
//constructor
API_URL_GENERAL = API_URL + methodGET + queryLimit + API_KEY;
API_URL_FAVS = API_URL + favorites + queryLimit + API_KEY;

const img1 = document.querySelector('.kitty-1');
const img2 = document.querySelector('.kitty-2');
const img3 = document.querySelector('.kitty-3');
const img4 = document.querySelector('.kitty-4');
const img5 = document.querySelector('.kitty-5');
const img6 = document.querySelector('.kitty-6');
const img7 = document.querySelector('.kitty-7');
const img8 = document.querySelector('.kitty-8');
const img9 = document.querySelector('.kitty-9');
const img10 = document.querySelector('.kitty-10');

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]


const refreshBtn = document.querySelector('.refresh');
const spanErr = document.querySelector('.status');


refreshBtn.addEventListener('click', refreshCats)

async function refreshCats(){
    try{
        const res = await fetch(API_URL_GENERAL);
        let dataJson = await res.json();
        for (let i = 0; i < 5; i++) {
            images[i].src = dataJson[i].url
        }
    } catch(err){
        console.log(catError);
    }
}

async function loadFavoriteCats(){
    try{
        const res = await fetch(API_URL_FAVS);
        const dataJson = await res.json();
        console.log(dataJson);
    } catch(err){
        console.log("el error es: " + err.message);
    }
}

async function saveCats(){
    try{
        const res = await fetch(API_URL_FAVS);
        const dataJson = await res.json();
        console.log(dataJson);
    } catch(err){
        console.log("el error es: " + err.message);
    }
}

refreshCats()
loadFavoriteCats()

/* Lógica básica
fetch(URL)                      //traigo con fetch
    .then(res => res.json())    //una promesa que convierto la respuesta a json
    .then(data => {
        console.log(data);      //analizo la respeusta: es una lista
        console.log(data[0].url);   //en la lista analizo y extraigo la url
        

        img.src = data[0].url
    })
*/