/// <reference types="../@types/jquery"  />  

const loading = document.querySelector('.loader');

$('.open-close-icon i').on('click', function () { 
    toggleNav();
})
function toggleNav() {
    $('.outer-side').animate({ width: 'toggle' }, 1000);
    // $('.nav-header .open-close-icon i').toggleClass('d-none');
}

// ----------------------------------------------------------------------------------------------------------
// Display 20 meal at Hooooooooooome 
// ----------------------------------------------------------------------------------------------------------
async function homeData() {
    loading.classList.remove("d-none") // Show loading indicator
    let respons = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let data = await respons.json()
    loading.classList.add("d-none") // Show loading indicator
    displayHome(data.meals)
}

homeData();

function displayHome(mealsDataArr) {
    let container = ``;
    for (let i = 0; i < 20; i++) {
        container += `
            <div class="col-md-3">
                    <div class="card-content bg-dark border rounded-2 bg-danger">
                        <img class="w-100 border rounded-2" src="${mealsDataArr[i].strMealThumb}" alt="food">
                        <div class="img-layer border rounded-2 d-flex align-items-center">
                            <h2 class="ps-3">${mealsDataArr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `;
    }
    document.querySelector(`.dataRow`).innerHTML = container;
}

// ----------------------------------------------------------------------------------------------------------
// Display Search Data
// ----------------------------------------------------------------------------------------------------------
function displayInputs() {
    loading.classList.remove("d-none") // Show loading indicator
    document.querySelector(`.dataRow`).innerHTML = " ";
    
    let cartona = `
            <div class="d-flex justify-content-center">
                <input onkeyup="getSearchByName(this.value)"  placeholder="Search by name" class="text-bg-dark w-50 bg-transparent border border-dange rounded-2 mt-5 me-3 p-2" type="text" name="" id="searchByName">
                <input maxlength="1" onkeyup="getSearchByFirstLetter(this.value)" placeholder="Search by first Letter" class="text-bg-dark w-50 bg-transparent border border-dange rounded-2 mt-5 ms-3 p-2" type="text" name="" id="searchByFirstLetter">
                </div>
                <div class="row py-5 g-4 dataRow">

            </div>
    `;
    loading.classList.add("d-none") // Show loading indicator
    document.querySelector(`.inputsData`).innerHTML = cartona;

}

async function getSearchByName(mealName) {
    loading.classList.remove("d-none"); // Show loading indicator
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let dataByName = await respons.json();
    loading.classList.add("d-none"); // Show loading indicator
    displaySearchDataByname(dataByName.meals);
}

function displaySearchDataByname(data){
    loading.classList.add("d-none"); // Show loading indicator

    let container = "";
    for (let i = 0; i < data.length; i++) {
        container += `
            <div class="col-md-3">
                    <div class="card-content bg-dark border rounded-2 bg-danger">
                        <img class="w-100 border rounded-2" src="${data[i].strMealThumb}" alt="food">
                        <div class="img-layer border rounded-2 d-flex align-items-center">
                            <h2 class="ps-3">${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `;
    }
    document.querySelector(`.dataRow`).innerHTML = container;
}
async function getSearchByFirstLetter(firstLetter) {
    loading.classList.remove("d-none") // Show loading indicator
    if(firstLetter==""){
        firstLetter="a";
    }
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`)
    let dataByFirstLetter = await respons.json()
    loading.classList.add("d-none") // Show loading indicator
    displaySearchDataByFirstLetter(dataByFirstLetter.meals);
}
function displaySearchDataByFirstLetter(data){
    loading.classList.add("d-none"); // Show loading indicator
    let container = "";
    
    for (let i = 0; i < data.length; i++) {
        container += `
            <div class="col-md-3">
                    <div class="card-content bg-dark border rounded-2 bg-danger">
                        <img class="w-100 border rounded-2" src="${data[i].strMealThumb}" alt="food">
                        <div class="img-layer border rounded-2 d-flex align-items-center">
                            <h2 class="ps-3">${data[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `;
    }
    document.querySelector(`.dataRow`).innerHTML = container;
}




// ----------------------------------------------------------------------------------------------------------
// Display Categories Data
// ----------------------------------------------------------------------------------------------------------

async function getCategory() {
    loading.classList.remove("d-none") // Show loading indicator
    let respons = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let categData = await respons.json();
    loading.classList.add("d-none") // Show loading indicator
    displayCategory(categData.categories);

}
function displayCategory(mealsCateg) {
    document.querySelector(`.dataRow`).innerHTML = " ";
    document.querySelector(`.inputsData`).innerHTML = " ";
    let container = "";
    // console.log(mealsCateg.length);
    for (let i = 0; i < mealsCateg.length; i++) {
        container += `
            <div class="col-md-3">
                    <div class="card-content bg-transparent">
                        <img class="bg-transparent  w-100 " src="${mealsCateg[i].strCategoryThumb}" alt="food">
                        <div class="img-layer border rounded-2 text-center align-items-center fw-bold">
                            <h2 class="p-3">${mealsCateg[i].strCategory}</h2>
                            <p class="m-3">${mealsCateg[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                    </div>
                </div>
                `
    }
    document.querySelector(`.dataRow`).innerHTML = container;
}


// ----------------------------------------------------------------------------------------------------------
// Display Area Data
// ----------------------------------------------------------------------------------------------------------
async function getAreaApi() {
    loading.classList.remove("d-none") // Show loading indicator
    let respons = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let areaData = await respons.json();
    displayAreaData(areaData.meals);
    loading.classList.add("d-none") // Show loading indicator

}
function displayAreaData(areaArr) {
    document.querySelector(`.dataRow`).innerHTML = "";
    document.querySelector(`.inputsData`).innerHTML = " ";

    let cartona = "";
    for (var i = 0; i < areaArr.length; i++) {
        cartona += `
            <div class="col-md-3">
            <div onclick="" class="text-center rounded-2 cursor-pointer fs-3">
                    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <h3 class="text-white">${areaArr[i].strArea}</h3>
                </div>
            </div>
                `
    }
    document.querySelector(`.dataRow`).innerHTML = cartona;
}
// ----------------------------------------------------------------------------------------------------------
// Display Ingredient Data
// ----------------------------------------------------------------------------------------------------------

async function getIngredientApi() {
    loading.classList.remove("d-none") // Show loading indicator
    let respons = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let ingredientData = await respons.json();
    displayAreaData(ingredientData.meals);
    loading.classList.add("d-none") // Show loading indicator
    console.log(ingredientData.meals);
    displayIngredientData(ingredientData.meals);

}
function displayIngredientData(ingredientsArr) {
    document.querySelector(`.dataRow`).innerHTML = "";
    document.querySelector(`.inputsData`).innerHTML = " ";

    let cartona = "";
    for (let i = 0; i < 20; i++) {
        cartona += `
                <div class="col-md-3 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="text-white">${ingredientsArr[i].strIngredient}</h3>
                </div>`;
    }
    document.querySelector(`.dataRow`).innerHTML = cartona;
}