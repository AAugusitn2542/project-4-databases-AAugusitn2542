/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

 function deleteRestaurantCard(button) {
// Traverse from the button to the card (its parent elements) and remove it
const restaurantCard = button.closest('.restaurant-item');
restaurantCard.remove();  // Remove the card from the DOM
}
            
document.addEventListener('DOMContentLoaded', () => {
                
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const buttons = container.querySelectorAll('button');

    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            // Extract the restaurant ID from the button's ID attribute (e.g., delete-0 -> "0")
            let restaurantId = button.id.split("-")[1];
            console.log(restaurantId);

            // Make the DELETE request to the server to delete the restaurant by ID
            fetch(`/api/restaurants/${restaurantId}`, 
                {
                method: 'DELETE',
            }
        )
            .then(response => {
                // If the delete was successful, re-fetch the updated list of restaurants
                if (response.ok) {
                    console.log(`Restaurant with id ${restaurantId} deleted successfully`);
                    return fetch('/api/restaurants');  // Re-fetch the updated restaurant data
                } else {
                    throw new Error('Failed to delete the restaurant');
                }
            })
            .then(response => response.json())
            .then(updatedRestaurants => {
                // Re-render the updated restaurant list (after deletion)
                renderRestaurantCards(updatedRestaurants);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
// rendering the restaurantCards
function renderRestaurantCards(restaurants) {
    const container = document.querySelector('.container');
    container.innerHTML = '';  // Clear existing restaurant cards

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant-item');
        restaurantCard.setAttribute('data-id', restaurant.id);  // Set the data-id attribute

        restaurantCard.innerHTML = `
            <div class="grid-item">
                <img src="${restaurant.photo}" alt="${restaurant.name}">
                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.address}</p>
                    <p>${restaurant.phone}</p>
                    <button id="delete-${restaurant.id}" class="delete-btn">X</button>
                </div>
            </div>
        `;
        container.appendChild(restaurantCard);
    });
}