// displayDishes.js - с улучшенной обработкой ошибок
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DisplayDishes started');
    
    // Проверяем что dishes загружен
    if (!window.dishes || !Array.isArray(window.dishes)) {
        console.error('❌ Dishes array not found or invalid!');
        showError('Ошибка загрузки меню');
        return;
    }
    
    console.log(`✅ Loaded ${window.dishes.length} dishes`);

    try {
        // Сортируем блюда по алфавиту
        const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));
        
        // Группируем по категориям
        const dishesByCategory = {
            soup: sortedDishes.filter(dish => dish.category === 'soup'),
            main: sortedDishes.filter(dish => dish.category === 'main'),
            drink: sortedDishes.filter(dish => dish.category === 'drink')
        };

        console.log('📊 Dishes by category:', {
            soup: dishesByCategory.soup.length,
            main: dishesByCategory.main.length, 
            drink: dishesByCategory.drink.length
        });

        // Создаем карточку блюда
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

        // Отображаем блюда категории
        function displayCategoryDishes(category, containerSelector, categoryDishes) {
            const container = document.querySelector(containerSelector);
            if (!container) {
                console.error(`❌ Container not found: ${containerSelector}`);
                return;
            }

            container.innerHTML = '';
            
            if (categoryDishes.length === 0) {
                container.innerHTML = '<p class="no-dishes">Блюда временно недоступны</p>';
                return;
            }
            
            categoryDishes.forEach(dish => {
                const dishCard = createDishCard(dish);
                container.appendChild(dishCard);
            });
            
            console.log(`✅ Displayed ${categoryDishes.length} ${category} dishes in ${containerSelector}`);
        }

        // Отображаем все категории
        displayCategoryDishes('soup', '.soups .dishes-grid', dishesByCategory.soup);
        displayCategoryDishes('main', '.main-dishes .dishes-grid', dishesByCategory.main);
        displayCategoryDishes('drink', '.drinks .dishes-grid', dishesByCategory.drink);
        
        console.log('🎉 All dishes displayed successfully!');

    } catch (error) {
        console.error('❌ Error displaying dishes:', error);
        showError('Ошибка отображения меню');
    }
});

function showError(message) {
    // Показываем сообщение об ошибке пользователю
    const containers = [
        '.soups .dishes-grid',
        '.main-dishes .dishes-grid', 
        '.drinks .dishes-grid'
    ];
    
    containers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            container.innerHTML = `<p class="error-message">${message}</p>`;
        }
    });
}