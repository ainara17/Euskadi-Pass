class Event{
    constructor(id, name, type, description, language,  imageUrl, day, month, municipalities, province){
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.imageUrl = imageUrl;
        this.language = language;
        this.day = day;
        this.month = month;
        this.municipalities = municipalities;
        this.province = province;
    }

    static fromJson({id, name, type, description, language,  image, day, month, municipalities, province}){
        return new Event(id, name, type, description, language,  image, day, month, municipalities, province)
    }
} 


export default Event;