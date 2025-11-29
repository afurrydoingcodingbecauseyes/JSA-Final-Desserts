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
async function logOut(){
  localStorage.setItem("currentUser", "");
  setTimeout(() => window.location.href = 'index.html', 1500);
}
async function loadNav() {
  let currentUser = localStorage.getItem("currentUser");
  nav = document.getElementById('nav')
  // if no user, show login message instead of recipe
  if (!currentUser || currentUser.trim() === "") { 
    nav.innerHTML += '<div><a href="login.html"class="navPageLinks">Login</a><a href="signup.html" class="navPageLinks">Register</a></div>'
  }else{
    nav.innerHTML += '<button onclick="logOut()" type="button" class="navPageLinks">Logout</button>'
  }
}

loadDesserts();
loadNav();