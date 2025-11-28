// orderManager.js - обновленная версия
document.addEventListener('DOMContentLoaded', function() {
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

    // Обработчик клика на карточку блюда
    document.addEventListener('click', function(e) {
        const dishCard = e.target.closest('.dish-card');
        if (dishCard) {
            const dishKeyword = dishCard.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === dishKeyword);
            
            if (dish) {
                selectDish(dish);
            }
        }
    });

    // Функция выбора блюда
    function selectDish(dish) {
        selectedDishes[dish.category] = dish;
        updateOrderDisplay();
        calculateTotal();
    }

    // Обновление отображения выбранных блюд в форме
    function updateOrderDisplay() {
        let hasSelectedDishes = false;

        // Показываем/скрываем категории и обновляем содержимое
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
                    hasSelectedDishes = true;
                    
                    // Показываем категорию
                    const categoryElement = displayElement.closest('.order-category');
                    if (categoryElement) {
                        categoryElement.style.display = 'block';
                    }
                } else {
                    const categoryNames = {
                        soup: 'суп',
                        main: 'основное блюдо', 
                        drink: 'напиток'
                    };
                    displayElement.innerHTML = `<span class="not-selected">${categoryNames[category]} не выбран</span>`;
                    
                    // Показываем категорию даже если не выбрано
                    const categoryElement = displayElement.closest('.order-category');
                    if (categoryElement) {
                        categoryElement.style.display = 'block';
                    }
                }
            }
        });

        // Показываем/скрываем сообщение о пустом заказе
        if (emptyOrderMessage) {
            if (hasSelectedDishes) {
                emptyOrderMessage.style.display = 'none';
                // Скрываем категории если ничего не выбрано? Нет, показываем все категории
                orderCategories.forEach(cat => cat.style.display = 'block');
            } else {
                emptyOrderMessage.style.display = 'block';
                // Скрываем категории если ничего не выбрано
                orderCategories.forEach(cat => cat.style.display = 'none');
                if (orderSummary) orderSummary.style.display = 'none';
            }
        }
        
        // Показываем/скрываем блок с итоговой стоимостью
        if (orderSummary) {
            orderSummary.style.display = hasSelectedDishes ? 'block' : 'none';
        }
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
    }

    // Инициализация
    updateOrderDisplay();
});