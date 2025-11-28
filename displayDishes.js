// displayDishes.js - отображение блюд на странице
console.log('🔄 DisplayDishes started');

function initializeDisplay() {
    // Проверяем доступность массива dishes
    if (typeof dishes === 'undefined' || !Array.isArray(dishes)) {
        console.error('❌ Dishes array not found or invalid!');
        setTimeout(initializeDisplay, 100); // Повторяем проверку
        return;
    }

    console.log('✅ Dishes array loaded successfully, count:', dishes.length);
    
    try {
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
                <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                <p class="price">${dish.price} ₽</p>
                <p class="name">${dish.name}</p>
                <p class="weight">${dish.count}</p>
                <button type="button">Добавить</button>
            `;
            
            return dishCard;
        }

        // Отображаем блюда по категориям
        displayCategoryDishes('soup', '.soups .dishes-grid', dishesByCategory.soup);
        displayCategoryDishes('main', '.main-dishes .dishes-grid', dishesByCategory.main);
        displayCategoryDishes('drink', '.drinks .dishes-grid', dishesByCategory.drink);

        function displayCategoryDishes(category, containerSelector, categoryDishes) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.warn(`⚠️ Container not found: ${containerSelector}`);
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
            
            console.log(`✅ Displayed ${categoryDishes.length} ${category} dishes`);
        }
        
        console.log('🎉 All dishes displayed successfully');
        
    } catch (error) {
        console.error('❌ Error displaying dishes:', error);
    }
}

// Запускаем инициализацию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDisplay);
} else {
    initializeDisplay();
}