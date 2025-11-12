const loadingText = document.getElementById('loading');
const errorText = document.getElementById('error');
const userContainer = document.getElementById('user-container');

// async await 
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
        const users = await response.json();

        //step 5 : hide loading texts
        loadingText.classList.add('hidden');

        //step 6 : Render users
        displayUsers(users);      //displayUsers is function
    
    } catch(error){
        console.log(error);
        loadingText.classList.add('hidden');
        errorText.classList.remove('hidden');  //remove hidden if error occurs
    }
}

function displayUsers(users){
    userContainer.innerHTML = '';  //clear container first

    //use forEach loop
    users.forEach(user => {
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