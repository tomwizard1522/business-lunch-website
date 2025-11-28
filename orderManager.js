document.addEventListener('DOMContentLoaded', function() {
    console.log('OrderManager loaded');
    
    if (!window.dishes) {
        console.error('Dishes array not found!');
        return;
    }

    let selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };

    const orderDisplay = {
        soup: document.getElementById('selected-soup'),
        main: document.getElementById('selected-main'),
        drink: document.getElementById('selected-drink')
    };

    const totalPriceElement = document.getElementById('total-price');
    const orderSummary = document.getElementById('order-summary');
    const emptyOrderMessage = document.getElementById('empty-order-message');
    const orderCategories = document.querySelectorAll('.order-category');

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.closest('.dish-card')) {
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
        }
    });

    function selectDish(dish) {
        selectedDishes[dish.category] = dish;
        updateOrderDisplay();
        calculateTotal();
        console.log(`Selected: ${dish.name}`);
    }

    function updateOrderDisplay() {
        let hasSelectedDishes = false;

        Object.keys(selectedDishes).forEach(category => {
            const dish = selectedDishes[category];
            const displayElement = orderDisplay[category];
            
            if (displayElement) {
                const categoryElement = displayElement.closest('.order-category');
                
                if (dish) {
                    displayElement.innerHTML = `
                        <div class="selected-dish">
                            <span class="dish-name">${dish.name}</span>
                            <span class="dish-price">${dish.price} ₽</span>
                        </div>
                    `;
                    hasSelectedDishes = true;
                    if (categoryElement) categoryElement.style.display = 'block';
                } else {
                    const categoryNames = {
                        soup: 'суп',
                        main: 'основное блюдо', 
                        drink: 'напиток'
                    };
                    displayElement.innerHTML = `<span class="not-selected">${categoryNames[category]} не выбран</span>`;
                    if (categoryElement) categoryElement.style.display = 'block';
                }
            }
        });

        if (emptyOrderMessage) {
            emptyOrderMessage.style.display = hasSelectedDishes ? 'none' : 'block';
        }
        
        if (orderSummary) {
            orderSummary.style.display = hasSelectedDishes ? 'block' : 'none';
        }

        if (!hasSelectedDishes) {
            orderCategories.forEach(cat => cat.style.display = 'none');
        }
    }

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

    updateOrderDisplay();
});