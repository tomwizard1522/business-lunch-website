// dishes.js - массив всех блюд
window.dishes = [
    // Супы
    {
        keyword: "mushroom-soup",
        name: "Крем-суп из шампиньонов",
        price: 250,
        category: "soup",
        count: "300 мл",
        image: "images/mushroom_soup.png"
    },
    {
        keyword: "borscht",
        name: "Борщ с говядиной",
        price: 280,
        category: "soup",
        count: "350 мл",
        image: "images/borscht.png"
    },
    {
        keyword: "tom-yum",
        name: "Том Ям с креветками",
        price: 320,
        category: "soup",
        count: "300 мл",
        image: "images/tom_yam.png"
    },

    // Главные блюда
    {
        keyword: "chicken-veggies",
        name: "Куриное филе с овощами гриль",
        price: 350,
        category: "main",
        count: "350 г",
        image: "images/chicken-veggies.png"
    },
    {
        keyword: "carbonara",
        name: "Паста Карбонара",
        price: 320,
        category: "main",
        count: "300 г",
        image: "images/carbonara.png"
    },
    {
        keyword: "salmon-puree",
        name: "Лосось с картофельным пюре",
        price: 420,
        category: "main",
        count: "320 г",
        image: "images/salmon.png"
    },
    {
        keyword: "beef-buckwheat",
        name: "Говядина с гречкой",
        price: 380,
        category: "main",
        count: "380 г",
        image: "images/beef.png"
    },
    {
        keyword: "vegetable-stew",
        name: "Овощное рагу с тофу",
        price: 290,
        category: "main",
        count: "320 г",
        image: "images/vegetables.png"
    },
    {
        keyword: "pizza-margarita",
        name: "Пицца Маргарита",
        price: 310,
        category: "main",
        count: "280 г",
        image: "images/margarita.png"
    },

    // Напитки
    {
        keyword: "orange-juice",
        name: "Свежевыжатый апельсиновый сок",
        price: 180,
        category: "drink",
        count: "250 мл",
        image: "images/orange-juice.png"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 150,
        category: "drink",
        count: "200 мл",
        image: "images/cappuccino.png"
    },
    {
        keyword: "green-tea",
        name: "Зеленый чай с жасмином",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/green-tea.png"
    }
];

console.log('🍽️ Dishes array loaded with', window.dishes.length, 'items');