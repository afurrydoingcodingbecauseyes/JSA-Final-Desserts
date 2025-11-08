const apiBase = 'https://www.themealdb.com/api/json/v1/1/';
const container = document.getElementById('desserts');

async function loadDesserts() {
  try {
    const resp = await fetch(apiBase + 'filter.php?c=Dessert');
    const data = await resp.json();
    const desserts = data.meals;

    const categories = {
      "Cakes": /cake/i,
      "Puddings & Custards": /(pudding|custard)/i,
      "Tarts & Pies": /(tart|pie)/i,
      "Cookies & Biscuits": /(cookie|biscuit)/i,
      "Brownies & Fudges": /(fudge|brownie|Chocolate Coconut Squares)/i,
      "Other Desserts": /.*/
    };

    const grouped = {};
    const usedIds = new Set(); // to track already-sorted desserts

    // Go through all categories except "Other Desserts"
    for (const [cat, regex] of Object.entries(categories)) {
      if (cat === "Other Desserts") continue;
      const matched = desserts.filter(d => regex.test(d.strMeal));
      grouped[cat] = matched;
      matched.forEach(d => usedIds.add(d.idMeal)); // mark them as used
    }

    // Add only unused desserts to "Other Desserts"
    grouped["Other Desserts"] = desserts.filter(d => !usedIds.has(d.idMeal));

    // Display categories
    for (const [cat, items] of Object.entries(grouped)) {
      if (items.length === 0) continue;
      const section = document.createElement('section');
      section.className = 'category';
      section.id = cat.replace(/\s|&/g,'');
      section.innerHTML = `
        <h2>${cat}</h2>
        <div class="meal-grid">
          ${items.map(m => `
            <div class="meal">
              <img src="${m.strMealThumb}" alt="${m.strMeal}">
              <h3>${m.strMeal}</h3>
              <a href="details.html?id=${m.idMeal}" class="viewButton">View Details</a>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(section);
    }

  } catch (err) {
    console.error('Error loading desserts:', err);
    container.innerHTML = '<p style="text-align:center;color:#c00;">Error loading desserts ?_? </p>';
  }
}

loadDesserts();