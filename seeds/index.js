const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd90405d51f7834b5f77eb7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, accusamus explicabo! Magni unde accusantium fugiat, neque exercitationem iusto rerum, vitae consectetur maxime explicabo esse qui in eius doloribus, ratione soluta.',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/coolsonu39/image/upload/v1608124482/YelpCamp/ahyeb1wqtbgs3gc6mll3.png',
                    filename: 'YelpCamp/ahyeb1wqtbgs3gc6mll3'
                },
                {
                    url: 'https://res.cloudinary.com/coolsonu39/image/upload/v1608124484/YelpCamp/zbhhtaumh0feobhdw7hi.png',
                    filename: 'YelpCamp/zbhhtaumh0feobhdw7hi'
                }
            ]
        })
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
})