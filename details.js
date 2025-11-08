const container = document.getElementById('details');
    const apiBase = 'https://www.themealdb.com/api/json/v1/1/';

    // Get meal ID from URL ?id=52776
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get('id');

    async function loadDetails() {
      try {
        const resp = await fetch(apiBase + 'lookup.php?i=' + mealId);
        const data = await resp.json();
        const meal = data.meals[0];

        // Collect ingredients + measurements
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ing = meal['strIngredient' + i];
          const measure = meal['strMeasure' + i];
          if (ing && ing.trim() !== '') {
            ingredients.push(`${measure} ${ing}`);
          }
        }
        instruction = meal.strInstructions
        instruction = instruction.replace(/\./g,'.<br><br>')
        container.innerHTML = `
          <h1>${meal.strMeal}</h1>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
          <div class="section">
            <h2>Ingredients</h2>
            <ul>
              ${ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>
          <div class="section">
            <h2>Instructions</h2>
            <p>${instruction}</p>
          </div>
          ${meal.strYoutube ? `<div class="section">
            <h2>Video</h2>
            <a href="${meal.strYoutube}" target="_blank" style="background-color:#b30059;border-radius: 4px;padding:5px;color:white;text-decoration: none;font-weight:bold">Watch on YouTube</a>
          </div>` : ''}
        `;
      } catch (err) {
        container.innerHTML = '<p style="color:#c00;">Error loading dessert details (´；ω；`).</p>';
        console.error(err);
      }
    }

    loadDetails();