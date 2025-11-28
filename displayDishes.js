document.addEventListener('DOMContentLoaded', function() {
    console.log('DisplayDishes loaded');
    
    if (!window.dishes) {
        console.error('Dishes array not found!');
        return;
    }

    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
    
    const dishesByCategory = {
        soup: sortedDishes.filter(dish => dish.category === 'soup'),
        main: sortedDishes.filter(dish => dish.category === 'main'),
        drink: sortedDishes.filter(dish => dish.category === 'drink')
    };

    function createDishCard(dish) {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.setAttribute('data-dish', dish.keyword);
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
            <p class="price">${dish.price} ₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button type="button">Добавить</button>
        `;
        
        return dishCard;
    }

    function displayCategoryDishes(category, containerSelector, categoryDishes) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`Container not found: ${containerSelector}`);
            return;
        }

        container.innerHTML = '';
        
        if (categoryDishes.length === 0) {
            container.innerHTML = '<p>Блюда временно недоступны</p>';
            return;
        }
        
        categoryDishes.forEach(dish => {
            const dishCard = createDishCard(dish);
            container.appendChild(dishCard);
        });
        
        console.log(`Displayed ${categoryDishes.length} ${category} dishes`);
    }

    displayCategoryDishes('soup', '.soups .dishes-grid', dishesByCategory.soup);
    displayCategoryDishes('main', '.main-dishes .dishes-grid', dishesByCategory.main);
    displayCategoryDishes('drink', '.drinks .dishes-grid', dishesByCategory.drink);
});