const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');
const userContainer = document.getElementById('user-container');
const searchInput = document.getElementById("search-input"); 
const sortSelect = document.getElementById("sort-select"); 
const noResultsText = document.getElementById("no-results"); 
const userCount = document.getElementById("user-count");

let allUsers = [];   // Store all users fetched from API 

let filteredUsers = [];   // Store users after applying search/sort filters 

// Fetch Users from API  
async function fetchUsers(){
    try {

        //step 1 : start loading
        loadingText.classList.remove('hidden');
        errorText.classList.add('hidden');       //add hidden to errorText

        //step 2 : fetch data 
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        //step 3 : check response status
        if (!response.ok){
            throw new Error('Failed to fetch users');
        }

        //step 4 : parse JSON
        allUsers = await response.json();

        //step 5 :Initially, filteredUsers = all users 
        filteredUsers = [...allUsers];

        //step 6 : hide loading texts
        loadingText.classList.add('hidden');

        //step 7 : Display users on screen 
        updateDisplay();
    
    } catch(error){
        console.log(error);
        loadingText.classList.add('hidden');
        errorText.classList.remove('hidden');  //remove hidden if error occurs
    }
}

//updates UI whenever search or sort changes
function updateDisplay() { 
  applySearch();      // 1. Filter users based on search input 
  applySort();        // 2. Sort filtered users based on dropdown 
  renderUsers();      // 3. Display users on screen 
  updateUserCount();  // 4. Update "Showing X of Y" text 
}

// 1. Filter users based on search name, email, or city
function applySearch() { 
  const term = searchInput.value.toLowerCase(); // Get search text in lowercase 
 
  filteredUsers = allUsers.filter(user =>  
    user.name.toLowerCase().includes(term) || 
    user.email.toLowerCase().includes(term) || 
    user.address.city.toLowerCase().includes(term) 
  ); 
} 

// 2. Sort filtered users based on dropdown (A–Z or Z–A using localeCompare())
function applySort (){
    const value =  sortSelect.value; 

    if (value === "az"){
        //sort ascending A -> Z
        filteredUsers.sort((a,b) => a.name.localeCompare(b.name));
    } else if (value === "za"){
        //sort descending Z -> A
        filteredUsers.sort((a,b) => b.name.localeCompare(a.name));
    }
}

// 3. Display users on screen (render users)

  function renderUsers(users){ 
    userContainer.innerHTML = '';  //clear container first

    // If no users after filtering, show "No results" 
    if (filteredUsers.length === 0) { 
      noResultsText.classList.remove("hidden"); 
      return; 
    } 
 
    // Hide "No results" if we have users 
    noResultsText.classList.add("hidden");

    //use forEach loop
    filteredUsers.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');

        card.innerHTML = `<h3> ${user.name} </h3>
        <p><strong>Email : </strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>`;

        userContainer.appendChild(card);
    });
  }

  //Run on page load
  fetchUsers();

// 4. Update "Showing X of Y" text (Showing 5 of 10 users)
function updateUserCount() {
  userCount.textContent = `Showing ${filteredUsers.length} of 
  ${allUsers.length} users`; 
}

// 5. Trigger updateDisplay() whenever search or sort changes

searchInput.addEventListener("input", updateDisplay); //live search
sortSelect.addEventListener("change", updateDisplay); //to sort

// 6. Initial fetch call
fetchUsers();


// To change mode 
let modeBtn = document.querySelector('#mode');

let currMode = "light";

modeBtn.addEventListener("click", () =>{
    if(currMode==="light"){
        currMode = "dark";
        document.querySelector("body").style.backgroundColor = "#333";
    } else{
        currMode = "light";
        document.querySelector("body").style.backgroundColor = "white";
    }
})
