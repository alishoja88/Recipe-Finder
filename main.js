const fetchData = async (searchValue) => {
    const API_URL = "https://api.edamam.com/api/recipes/v2?type=public"
    const API_ID = "4e7590ad";
    const API_KEY = "01e591526ca055cbc834437f07c2d653";
    const url = `${API_URL}&q=${searchValue}&app_id=${API_ID}&app_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("hit", data.hits)
        return data.hits;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

const createRecipeCards = (recipe) => {

    const { image, label } = recipe.recipe;

    const cards = document.createElement("div");
    cards.classList.add("recipe-card");

    const imageElement = document.createElement("img");
    imageElement.classList.add("image-recipe");
    imageElement.src = image;
    imageElement.alt = label;

    const titleRecipe = document.createElement("h3");
    titleRecipe.classList.add("title-recipe");
    titleRecipe.textContent = label.slice(0, 20) + (label.length > 20 ? '...' : '');

    const moreContent = document.createElement("div");
    moreContent.classList.add("more-content");

    const moreIcone = document.createElement("span");
    moreIcone.classList.add("fa", "fa-plus");
    moreIcone.id = "more-icone";
    moreIcone.ariaHidden = "true";

    const textMoreIcone = document.createElement("span");
    textMoreIcone.classList.add("text-information");
    textMoreIcone.textContent = "More Information";

    moreContent.addEventListener("click", function () {
        moreInforMATIONcONTENT(recipe)
    })

    moreContent.appendChild(moreIcone);
    moreContent.appendChild(textMoreIcone);

    cards.appendChild(imageElement);
    cards.appendChild(titleRecipe);
    cards.appendChild(moreContent);

    return cards;
}

let cardElements = [];

function showFetchDat() {
    let inputValue = inputElement.value.trim();;


    fetchData(inputValue).then(recipes => {
        const content = document.getElementById("card-content");

        cardElements.forEach(card => {
            content.removeChild(card);
        });

        cardElements = [];
        if (recipes.length === 0) {
            content.textContent = "No recipes found.";
            return;
        }

        cardElements = [];
        content.textContent = "";

        recipes.forEach(recipe => {
            const card = createRecipeCards(recipe);
            content.style.display = "flex"
            content.appendChild(card);
            cardElements.push(card);
        })
    })
}

const moreInforMATIONcONTENT = (recipe) => {

    const { image, label, cuisineType, totalDaily } = recipe.recipe;
    const existingInfoContent = document.getElementById("infoContent");
    if (existingInfoContent) {
        existingInfoContent.remove();
    }


    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";
    overlay.style.display = 'none';
    mainConteiner.appendChild(overlay);


    let infoContent = document.createElement("div");
    infoContent.classList.add("information-content");
    infoContent.id = "infoContent";
    infoContent.style.display = 'none';

    const imageElement = document.createElement("img");
    imageElement.classList.add("image-recipe");
    imageElement.src = image;
    imageElement.alt = label;

    const titleRecipe = document.createElement("h3");
    titleRecipe.classList.add("title-recipe");
    titleRecipe.textContent = label;

    const cuisineTypeFood = document.createElement("span");
    cuisineTypeFood.classList.add("cuisine-type");

    const strongElement = document.createElement("strong");
    strongElement.textContent = "Cuisine Type : ";

    const cuisineTypeText = document.createElement("span");
    cuisineTypeText.textContent = cuisineType;

    cuisineTypeFood.appendChild(strongElement);
    cuisineTypeFood.appendChild(cuisineTypeText);


    let overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay");
    overlayContent.id = "overlay";


    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredients-list");
    recipe.recipe.ingredients.forEach(ingredient => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient.text;
        ingredientsList.appendChild(listItem);
    });


    const EnerDailyCode = ["PROCNT", "CA", "CHOLE", "ENERC_KCAL", "FAT", "FIBTG", "VITC"];
    const showTotalDailyInfo = document.createElement("div");
    showTotalDailyInfo.classList.add("total-daily-info");

    EnerDailyCode.forEach(item => {

        if (totalDaily[item]) {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("item-container");

            const itemName = document.createElement("h5");
            itemName.textContent = totalDaily[item].label;
            itemContainer.appendChild(itemName);

            const itemValue = document.createElement("span");
            itemValue.textContent = totalDaily[item].quantity.toFixed(2) + totalDaily[item].unit;
            itemContainer.appendChild(itemValue);

            showTotalDailyInfo.appendChild(itemContainer);
        }
    });


    document.body.style.overflow = 'hidden';

    infoContent.appendChild(imageElement);
    infoContent.appendChild(titleRecipe);
    infoContent.appendChild(cuisineTypeFood);
    infoContent.appendChild(ingredientsList);
    infoContent.appendChild(showTotalDailyInfo);
    mainConteiner.appendChild(infoContent);

    overlay.style.display = 'block';
    infoContent.style.display = 'block';

    overlay.addEventListener('click', () => {
        infoContent.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}


const currentTime = new Date();
const currentHour = currentTime.getHours();
let greeting;

if (currentHour < 12) {
    greeting = "Good morning";
} else if (currentHour < 18) {
    greeting = "Good afternoon";
} else {
    greeting = "Good Evening"
};
let clientWelcom = document.getElementById("welcome-time")
clientWelcom.textContent = `${greeting}! Welcome to the Recipe Search App`;




let mainConteiner = document.getElementById("container");
let inputElement = document.getElementById("inputValue");
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", showFetchDat);



