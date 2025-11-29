const container = document.getElementById('details');
    const apiBase = 'https://www.themealdb.com/api/json/v1/1/';

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
            ingredients.push(`${measure} ${ing}`.trim());
          }
        }

        let instructionText = meal.strInstructions.replace(/\. \s*/g, '.<br><br>');

        container.innerHTML = `
          <h1>${meal.strMeal}</h1>
          <div class="top-section">
            <div class="meal-image">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="ingredients-section">
              <h2>Ingredients</h2>
              <ul class="ingredients">
                ${ingredients.map(i => `<li>${i}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="section">
            <h2>Instructions</h2>
            <p class="instructions">${instructionText}</p>
          </div>
          ${meal.strYoutube ? `<div class="section video">
            <h2>Video</h2>
            <a href="${meal.strYoutube}" target="_blank">Watch on Youtube</a>
          </div>` : ''}
        `;
      } catch (err) {
        container.innerHTML = '<p style="color:#c00;">Error loading dessert details (´；ω；`).</p>';
        console.error(err);
      }
    }

// get current user from localStorage (null if not logged in)
let currentUser = localStorage.getItem("currentUser");

// if no user, show login message instead of recipe
if (!currentUser || currentUser.trim() === "") {
  container.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h2 style="color:#bc6c25;">Login to view this recipe? </h2>
      <a href="login.html"
         style="display:inline-block; margin-top:20px; padding:12px 22px; 
                background:#bc6c25; color:white; border-radius:10px; 
                text-decoration:none; font-size:1rem;">
        Go to Login ✧
      </a>
    </div>
  `;
} else {
  // user exists → load the recipe :3
  loadDetails();
}
