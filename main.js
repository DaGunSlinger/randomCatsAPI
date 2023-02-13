//API URL
let API_URL = 'https://api.thecatapi.com/v1/'; //v1
//endpoitns
const methodGET = 'images/search'
const queryLimit = '?limit=5'
const favorites = 'favourites'
const uploadImg = 'images/upload'
//key
const API_KEY = 'live_baeVDLnjkGPGw4iWNwc5CEE8wYwetNLHlaiHJw7uYLu2Cvb4UECgTLIksB9jUgJO'
//constructor
let API_URL_GENERAL = API_URL + methodGET + queryLimit;
let API_URL_FAVS = API_URL + favorites + queryLimit;

const img1 = document.querySelector('.kitty-1');
const img2 = document.querySelector('.kitty-2');
const img3 = document.querySelector('.kitty-3');
const img4 = document.querySelector('.kitty-4');
const img5 = document.querySelector('.kitty-5');

const images = [img1, img2, img3, img4, img5]

const favBtn1 = document.querySelector(".fav-1")
const favBtn2 = document.querySelector(".fav-2")
const favBtn3 = document.querySelector(".fav-3")
const favBtn4 = document.querySelector(".fav-4")
const favBtn5 = document.querySelector(".fav-5")

const refreshBtn = document.querySelector('.refresh');
const favsSection = document.querySelector('.favorites');
const span = document.querySelector('.spanErr')

const formBtn = document.querySelector('.upload--form__button');
formBtn.addEventListener('click', uploadCat);

refreshBtn.addEventListener('click', refreshCats)

async function refreshCats(){
    try{
        const res = await fetch(API_URL_GENERAL, {
            method: 'GET',
            headers: {
                'x-api-key': API_KEY,
            }
        });
        let dataJson = await res.json();
        for (let i = 0; i < 5; i++) {
            images[i].src = dataJson[i].url
        }
        favBtn1.onclick = () => saveCat(dataJson[0].id)
        favBtn2.onclick = () => saveCat(dataJson[1].id)
        favBtn3.onclick = () => saveCat(dataJson[2].id)
        favBtn4.onclick = () => saveCat(dataJson[3].id)
        favBtn5.onclick = () => saveCat(dataJson[4].id)
    } catch(err){
        console.log(err.message);
    }
}

async function loadFavoriteCats(){
    try{
        const res = await fetch(API_URL_FAVS, {
            headers: {
                'x-api-key': API_KEY,
            }
        });
        const dataJson = await res.json();
        console.log(dataJson);

        favsSection.innerHTML = ""
        for(el of dataJson){

            const URL = el.image.url

            const div = document.createElement('div')
            div.className = 'container--kitties'
            const img = document.createElement('img');
            img.className = 'kitty--img'
            const btn = document.createElement('button');
            const span = document.createElement('span');
            span.className = 'container--close'

            const ide = el.id;
            span.onclick = () => deleteCat(ide);
            img.src = URL;
            div.appendChild(img);
            div.appendChild(span);
            favsSection.appendChild(div)

        }
    } catch(err){
        console.log("el error es: " + err.message);
    }
}

async function saveCat(id){
    try{
        const res = await fetch(API_URL_FAVS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                image_id: id
            }),
        });

        refreshCats()
        loadFavoriteCats();
    } catch(err){
        console.log("el error es: " + err.message);
    }
}

async function deleteCat(id){
    try{
        API_ID = `${API_URL}${favorites}/${id}?${API_KEY}`;
        console.log(API_ID);
        const res = await fetch((API_ID), {
            method: 'DELETE',
            headers: {
                "x-api-key": API_KEY,
            }
        });
        const dataJson = await res.json();
        if(res.status !== 200){
            span.innerHTML = "ERROR: " + res.status + dataJson.message
        }

        loadFavoriteCats();
    } catch(err){
        console.log("el error es: " + err.message);
    }
}


async function uploadCat(){
    const form = document.querySelector('.upload--form');
    const formData = new FormData(form);
    try{
        const res = await fetch(API_URL + uploadImg,{
            method: 'POST',
            headers:{
                'x-api-key': API_KEY
            },
            body: formData,
        })

        const dataJson = await res.json();
        saveCat(dataJson.id)
        if(res.status !== 200){
            span.innerHTML = "ERROR: " + res.status + dataJson.message
        }else {
            console.log('IMAGEN DE GATO SUBIDA CON EXITO');
        }
    }catch(err){
        console.log(err.message);
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