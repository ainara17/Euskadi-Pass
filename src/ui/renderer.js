function renderEventCard(event, name, imageUrl){


    const article = document.createElement("article");
    article.classList.add("event", "event-card");
    
    const eventName = document.createElement("h3");
    eventName.textContent = name;
    eventName.classList.add("event-name");

    const eventImage = document.createElement("img");
    eventImage.setAttribute("src", imageUrl);
    eventImage.setAttribute("alt", `imagen de ${name}`);

    

}