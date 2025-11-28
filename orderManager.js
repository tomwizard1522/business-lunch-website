// orderManager.js - управление выбором блюд и подсчет стоимости
console.log('🔄 OrderManager loaded');

function initializeOrderManager() {
    // Проверяем доступность массива dishes
    if (typeof dishes === 'undefined' || !Array.isArray(dishes)) {
        console.error('❌ Dishes array not found!');
        setTimeout(initializeOrderManager, 100); // Повторяем проверку
        return;
    }

    console.log('✅ OrderManager started with dishes count:', dishes.length);
    
    let selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };

    // Элементы для отображения выбранных блюд в форме
    const orderDisplay = {
        soup: document.getElementById('selected-soup'),
        main: document.getElementById('selected-main'),
        drink: document.getElementById('selected-drink')
    };

    const totalPriceElement = document.getElementById('total-price');
    const orderSummary = document.getElementById('order-summary');
    const emptyOrderMessage = document.getElementById('empty-order-message');
    const orderCategories = document.querySelectorAll('.order-category');

    // Показываем категории заказа
    function showOrderCategories() {
        orderCategories.forEach(category => {
            category.style.display = 'block';
        });
    }

    // Скрываем категории заказа
    function hideOrderCategories() {
        orderCategories.forEach(category => {
            category.style.display = 'none';
        });
    }

    // Обработчик клика на карточку блюда
    document.addEventListener('click', function(e) {
        const dishCard = e.target.closest('.dish-card');
        if (dishCard) {
            const dishKeyword = dishCard.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === dishKeyword);
            
            if (dish) {
                selectDish(dish);
                
                // Визуальная обратная связь
                document.querySelectorAll('.dish-card').forEach(card => {
                    card.classList.remove('selected');
                });
                dishCard.classList.add('selected');
            }
        }
    });

    // Функция выбора блюда
    function selectDish(dish) {
        selectedDishes[dish.category] = dish;
        console.log(`✅ Selected ${dish.name} for ${dish.category}`);
        updateOrderDisplay();
        calculateTotal();
    }

    // Обновление отображения выбранных блюд в форме
    function updateOrderDisplay() {
        let hasSelectedDishes = false;

        // Проверяем, есть ли выбранные блюда
        Object.values(selectedDishes).forEach(dish => {
            if (dish) {
                hasSelectedDishes = true;
            }
        });

        // Управляем видимостью элементов
        if (emptyOrderMessage) {
            emptyOrderMessage.style.display = hasSelectedDishes ? 'none' : 'block';
        }
        
        if (orderSummary) {
            orderSummary.style.display = hasSelectedDishes ? 'block' : 'none';
        }

        // Всегда показываем категории, но управляем их содержимым
        showOrderCategories();

        // Обновляем отображение для каждой категории
        Object.keys(selectedDishes).forEach(category => {
            const dish = selectedDishes[category];
            const displayElement = orderDisplay[category];
            
            if (displayElement) {
                if (dish) {
                    displayElement.innerHTML = `
                        <div class="selected-dish">
                            <span class="dish-name">${dish.name}</span>
                            <span class="dish-price">${dish.price} ₽</span>
                        </div>
                    `;
                } else {
                    const categoryNames = {
                        soup: 'суп',
                        main: 'основное блюдо', 
                        drink: 'напиток'
                    };
                    displayElement.innerHTML = `<span class="not-selected">${categoryNames[category]} не выбран</span>`;
                }
            }
        });
    }

    // Подсчет общей стоимости
    function calculateTotal() {
        let total = 0;
        
        Object.values(selectedDishes).forEach(dish => {
            if (dish) {
                total += dish.price;
            }
        });

        if (totalPriceElement) {
            totalPriceElement.textContent = `${total} ₽`;
        }
        
        console.log(`💰 Total order price: ${total} ₽`);
    }

    // Инициализация
    updateOrderDisplay();
    console.log('🎉 OrderManager initialized successfully');
}

// Запускаем инициализацию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOrderManager);
} else {
    initializeOrderManager();
}