const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');
const noResultsText = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const recipeContainer = document.getElementById('recipe-container');

//store all fetched api
let allRecipes = [];

let filteredRecipes = [];

// 1. Fetch categories from dropdown
async function fetchCategories(){
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        
        // Add categories to dropdown 
        data.meals.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.strCategory;
            option.textContent = cat.strCategory;
            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.log("Error loading categories:", error);
}
}

// 2. Fetch Recipes (Default: All recipes via search s=) 
async function fetchRecipes(searchTerm = "") {
    try {
    loadingText.classList.remove('hidden');
    errorText.classList.add('hidden');
    noResultsText.classList.add('hidden');

    //Fetch based on search term
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`); 
    const data = await res.json();

    loadingText.classList.add("hidden");

    //If no recipes found
    // if(!data.meals){           // if condition false
    //     allRecipes = [];
    //     renderRecipes();        //card 
    //     return;
    // }
    allRecipes = data.meals;  // else condition true
    applyFilters();

 } catch (err) { 
    loadingText.classList.add("hidden"); 
    errorText.classList.remove("hidden"); 
    console.error(err); 
  }
}

//  3. Filter Recipes by Category 
function applyFilters(){
    const selectedCategory = categorySelect.value;

    filteredRecipes = [...allRecipes];

    if (selectedCategory !== "all"){
        filteredRecipes = filteredRecipes.filter(recipe => recipe.strCategory === selectedCategory);
    }

    renderRecipes(filteredRecipes);
}

// 4. Render Recipe Cards
function renderRecipes(recipes = allRecipes){
    recipeContainer.innerHTML = "";

    if (recipes.length === 0) {
        noResultsText.classList.remove("hidden");
        return;
    } 
    noResultsText.classList.add("hidden");

    recipes.forEach(recipe =>{
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>${recipe.strMeal}</h3>
        <p><strong>Category : </strong>${recipe.strCategory}</p>
        <a href="recipe.html">View Recipe</a>`;

        recipeContainer.appendChild(card);
    });
}

// 5. Search Input Logic 
searchInput.addEventListener("input",e=>{
    const term = e.target.value;
    fetchRecipes(term); //new search
});

// 6. Categories
categorySelect.addEventListener("change",()=>{
    applyFilters();
});

// 7. Initial Load
fetchCategories(); // load categories first
fetchRecipes(); // load all the recipes bydefault