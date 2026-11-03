import { renderEventCard } from "./ui/renderer.js";
import { getFavoritesFromLocalStorage } from "./localStorage.js";


function loadFavorites(search="", type="all"){

    const events = getFavoritesFromLocalStorage();
    
    const filteredEvents = events.filter(event =>{
        if(search){
            matchesId = event.id && event.id.toString().includes(search);
            matchesName = event.name && event.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            if(!matchesId && !matchesName){
                return false;
            }
        }

        if(type !== "all"){
            if(event.type !== type){
                return false
            }
        }
        return true;
    })

    const favSection = document.getElementById("favorites-list");
    favSection.replaceChildren();
    filteredEvents.forEach(event => {
        const card = renderEventCard(event, (e, isFavorite) => {
            if(!isFavorite){
                const card = document.querySelector(`.event-card[data-id='${event.id}'] ` );
                if(card){

                    card.remove();
                }
            }
        
        });
        favSection.append(card);

    })
}

function getTypes(){
    const events = getFavoritesFromLocalStorage();
    const typesSet = new Set();

    events.forEach(event => {
        if(event.type){
            typesSet.add(event.type)
        }
    })
    const types = Array.from(typesSet);
    return types;
}

function setTypesOptions(){
    const types = getTypes();
    const selector = document.getElementById("type-select");
    const options = types.map(tp => {
        const option = document.createElement("option");
        option.value = tp;
        option.textContent = tp;
        return option;
    })
    selector.append(...options)
}

function setSearchForm(){
    const form = document.getElementById("filter-form");
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = formData.get("search").toLocaleLowerCase().trim();
        const type = formData.get("type");
        loadFavorites(search, type);
    })
}

function controlSearchQuery(){
    const searchInput = document.getElementById("search-input");
    const typeSelector = document.getElementById("type-select");
    let timeout = null;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const search = e.target.value;
            const type = typeSelector.value;
            loadFavorites(search,type);
        }, 500)
    })

}

controlSearchQuery();
setTypesOptions();
setSearchForm();
loadFavorites();