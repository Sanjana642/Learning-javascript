 const loadingText = document.getElementById("loading");
 const errorText = document.getElementById("error");
 const recipeDetailDiv = document.getElementById("recipe-detail");
 const backBtn = document.getElementById("back-btn");

// Back button
 backBtn.addEventListener("click", () => {
 window.history.back();
});

// Get recipe ID from URL
function getMealIdFromURL() {
 const params = new URLSearchParams(window.location.search);
 return params.get("id");
}

// Fetch full details of a recipe
async function fetchRecipeDetail() {

    const mealId = getMealIdFromURL();
    
    if(!mealId){
        errorText.classList.remove("hidden");
        return;
    }
 
    try{
        
        loadingText.classList.remove("hidden");

        const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );

        if(!res.ok){
            throw new Error("Failed to load recipes.");
        }

        const data = await res.json();

        const meal = data.meal[0];             //fetch recipes - 0th index 
        console.log(meal);
        
        loadingText.classList.add("hidden");

        if(!mealId){
        errorText.classList.remove("hidden");
        return;
        }

        displayRecipe(meal);                //display recipes

    } catch (error){
        loadingText.classList.add("hidden");
        errorText.classList.remove("hidden");
        console.error(err);
    }
}

// build ingredients list
function getIngredients(meal){
    const ingredients = [];                 

    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];   //get ingredient 
        const measure = meal[`strMeasure${i}`];

        if(ingredient && ingredient.trim() !== ""){
            ingredients.push(`${ingredient} - ${measure}`); //push in ingredients array [ingredient-measure,ingredient-measure]
        }
    }
    return ingredients;
}

//Display recipe detail
function displayRecipe(meal){
    recipeDetailDiv.classList.remove("hidden");

    const ingredientsList = getIngredients(meal)
    .map(item => `<li>${item}<li>`)    //ingredient-measure, -> in list
    .join("");                        // ingredient-measure -> "," = .join("")

    recipeDetailDiv.innerHTML = `<h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>

    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>

    <h3>Ingredients:</h3>
    <ul>${ingredientsList}</ul>
    
    ${meal.strYoutube ? 
        `<h3>Video Tutorial:</h3> 
        <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>` : "" }`;
}

// Start loading details
fetchRecipeDetail();