// displayDishes.js - отображение блюд на странице
document.addEventListener('DOMContentLoaded', function() {
    // Сортируем блюда в алфавитном порядке по названию
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    
    // Группируем блюда по категориям
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink')
    };

    // Функция создания карточки блюда
    function createDishCard(dish) {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.setAttribute('data-dish', dish.keyword);
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price} ₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Добавить</button>
        `;
        
        return dishCard;
    }

    // Отображаем блюда по категориям
    displayCategoryDishes('soup', '.soups .dishes-grid', dishesByCategory.soup);
    displayCategoryDishes('main', '.main-dishes .dishes-grid', dishesByCategory.main);
    displayCategoryDishes('drink', '.drinks .dishes-grid', dishesByCategory.drink);

    function displayCategoryDishes(category, containerSelector, categoryDishes) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = '';
        
        categoryDishes.forEach(dish => {
            const dishCard = createDishCard(dish);
            container.appendChild(dishCard);
        });
    }
});