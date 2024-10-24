import Product from "../models/productModel";

const data = [
    // Category: Tea
    {
        name: "English Breakfast",
        category: "Tea",
        subCategory: "English Tea",
        ingredients: ["Black Tea"],
        price: 15.99,
        weight: 250,
        image: "tea.jpg",
    },
    {
        name: "Earl Grey",
        category: "Tea",
        subCategory: "English Tea",
        ingredients: ["Black Tea", "Bergamot"],
        price: 18.99,
        weight: 200,
        image: "tea.jpg",
    },
    {
        name: "Oolong Tea",
        category: "Tea",
        subCategory: "Tea from China and Taiwan",
        ingredients: ["Oolong Tea"],
        price: 25.99,
        weight: 100,
        image: "tea.jpg",
    },
    {
        name: "Jasmine Green Tea",
        category: "Tea",
        subCategory: "Tea from China and Taiwan",
        ingredients: ["Green Tea", "Jasmine Flowers"],
        price: 20.99,
        weight: 150,
        image: "tea.jpg",
    },
    {
        name: "Relaxing Herbal Mix",
        category: "Tea",
        subCategory: "Special Herbal Mix Tea",
        ingredients: ["Chamomile", "Peppermint", "Lavender"],
        price: 12.99,
        weight: 50,
        image: "tea.jpg",
    },
    {
        name: "Detox Tea",
        category: "Tea",
        subCategory: "Special Herbal Mix Tea",
        ingredients: ["Dandelion", "Green Tea", "Lemon Balm"],
        price: 16.99,
        weight: 75,
        image: "tea.jpg",
    },
    {
        name: "Fruit Infusion",
        category: "Tea",
        subCategory: "Other Tea",
        ingredients: ["Hibiscus", "Apple", "Rosehip"],
        price: 14.99,
        weight: 100,
        image: "tea.jpg",
    },
    {
        name: "Rooibos Tea",
        category: "Tea",
        subCategory: "Other Tea",
        ingredients: ["Rooibos"],
        price: 17.99,
        weight: 120,
        image: "tea.jpg",
    },

    // Category: Tea accessories
    {
        name: "Porcelain Teapot",
        category: "Tea accessories",
        subCategory: "Teapots",
        ingredients: [],
        price: 45.99,
        weight: 500,
        image: "teapot.jpg",
    },
    {
        name: "Glass Teapot with Infuser",
        category: "Tea accessories",
        subCategory: "Teapots",
        ingredients: [],
        price: 29.99,
        weight: 400,
        image: "teapot.jpg",
    },
    {
        name: "Ceramic Tea Cups Set",
        category: "Tea accessories",
        subCategory: "Cups",
        ingredients: [],
        price: 24.99,
        weight: 300,
        image: "tea-cup.jpg",
    },
    {
        name: "Bamboo Tea Tray",
        category: "Tea accessories",
        subCategory: "Others",
        ingredients: [],
        price: 39.99,
        weight: 800,
        image: "bamboo_tea_tray.jpg",
    },
    {
        name: "Tea Strainer",
        category: "Tea accessories",
        subCategory: "Others",
        ingredients: [],
        price: 5.99,
        weight: 50,
        image: "tea_strainer.jpg",
    },

    // Category: Jam
    {
        name: "Strawberry Jam",
        category: "Jam",
        subCategory: "",
        ingredients: ["Strawberries", "Sugar", "Lemon Juice"],
        price: 8.99,
        weight: 350,
        image: "jam.jpg",
    },
    {
        name: "Apricot Jam",
        category: "Jam",
        subCategory: "",
        ingredients: ["Apricots", "Sugar", "Pectin"],
        price: 9.49,
        weight: 400,
        image: "jam.jpg",
    },
    {
        name: "Blueberry Jam",
        category: "Jam",
        subCategory: "",
        ingredients: ["Blueberries", "Sugar", "Lemon Juice"],
        price: 10.99,
        weight: 320,
        image: "jam.jpg",
    },

    // Category: Tea procedures
    {
        name: "Traditional Chinese Tea Ceremony",
        category: "Tea procedures",
        subCategory: "",
        ingredients: [],
        price: 60.00,
        weight: 0,
        image: "tea-procedures.jpg",
    },
    {
        name: "English Afternoon Tea Experience",
        category: "Tea procedures",
        subCategory: "",
        ingredients: [],
        price: 55.00,
        weight: 0,
        image: "english-tea-procedures.jpg",
    },
];

export async function seedProducts() {
    const estimatedCount = await Product.estimatedDocumentCount();
    if (estimatedCount > 0) return;
    const promiseArray = data.map((productSample) => {
        const product = new Product(productSample);
        return product.save();
    });
    await Promise.all(promiseArray);
}