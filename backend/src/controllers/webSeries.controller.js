import { WebSeries } from "../models/webSeries.model.js";

const addWebseries = async (req, res) => {
    const {name, channel, episodes, genre, rating, link, description, cast} = req.body

    if (!(name && channel && episodes && rating && link && description && cast)) {
        console.log(name, channel, episodes, rating, link, description, cast)
        return res.status(400).send({"message" : "ALL FIELDS ARE REQUIRED"})
    }

    if (episodes<1) {
        return res.status(409).send({"message": "episodes cannot be less than 1"})
    }

    if (genre.length < 1) {
        return res.status(409).send({"message": "genre is required"})
    }

    const newWebSeries = new WebSeries({
        name,
        channel,
        episodes,
        genre,
        rating,
        link,
        description,
        cast
    })

    try {
        await newWebSeries.save()
        return res.status(200).send({"message": "webseries added successfully"})        
    } catch (error) {
        console.error("error in adding webSeries", error)
    }
}

export {addWebseries}