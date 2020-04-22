//Shopping list app that allows user to add and remove items to list, filter the items and save to local storage

//UI variables
const addItem = document.querySelector(".add-item");
const itemText = document.querySelector(".item-input");
const filterItem = document.querySelector(".filter-item");
const shoppingList = document.querySelector(".shopping-list");
const clearAll = document.querySelector(".clear-all");

//Local storage functions
//persist to local storage
addToLocalStorage = item => {
    //Create items variable
    let items;

    //Check local storage
    if(localStorage.getItem("items") === null) {
        //If empty set items to an empty array
        items = [];
    } else {
        //Otherwise save as the parsed array
        items = JSON.parse(localStorage.getItem("items"));
    }
    //Push new item to the items array
    items.push(item);
    //Set the items array back to storage
    localStorage.setItem("items", JSON.stringify(items));

};

//display items from local storage
displayFromLocalStorage = () => {
    //Set items to whatever is in storage
    let items = JSON.parse(localStorage.getItem("items"));

    //If there are items in storage loop through and display each one in the UI
    if(items) {
        items.forEach(item => displayItem(item));
    }
};
//remove from local storage
removeFromLocalStorage = (item) => {
    //Set items to whatever is on storage
    let items = JSON.parse(localStorage.getItem("items"));
    //Grab value of item
    let removeItem = item;

    //Check if anything is in storage
    if(items) {
        //loop through each item
        items.forEach((item, index) => {
            //Check to see if the item matches something in local storage
            if(item === removeItem) {
                //take the index of that item and remove from items array
                items.splice(index, 1);
            }
        });
    }

    //Set items back to local storage
    localStorage.setItem("items", JSON.stringify(items));
    

};

//clear all from local storage
clearAllFromLocalStorage = () => {
    localStorage.clear();
}

//Function to display item in UI
displayItem = item => {
    //Create html
    let html = `
    <div class="shopping-item">
        <svg class="bi bi-list-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3.854 2.146a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 3.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 7.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>
        </svg>
        <span class="item-desc">${item}</span>
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
</div>
    `
    //Insert html into UI
    shoppingList.insertAdjacentHTML("beforeend", html);
}

//add new item
newItem = e => {
    //Prevent default submit behaviour
    e.preventDefault();
    //Get text input
    let item = itemText.value;
    //Display in UI
    displayItem(item);
    //Add to local storage
    addToLocalStorage(item);
    //Clear input
    itemText.value = "";
}

//Filter items
filterItems = e => {
    //capture input value and change to lowercase
    let text = e.target.value.toLowerCase();

    //Select all shopping items and loop through each product
    document.querySelectorAll(".shopping-item").forEach(product => {
        //capture product name
        let item = product.firstChild.nextElementSibling.nextElementSibling.textContent;
        //convert to lowercase and check that the filter input matches the content of text
        if(item.toLowerCase().indexOf(text) !== -1) {
            //If it does display the item in the UI
            product.style.display = "block";
        } else {
            //If it doesnt, hide the items in the UI
            product.style.display = "none";
        }
    });
};
//remove individual items
removeItem = e => {
    //Check user has clicked the delete icon
    if(e.target.parentElement.parentElement.classList.contains("shopping-item")) {
        //If so, remove item from UI
        e.target.parentElement.parentElement.remove();
    }

    //Remove from local storage
    removeFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

}

//clear all item
clearAllItems = e => {
    //Prevent default button behaviour
    e.preventDefault();
    //Remove all items from UI
    shoppingList.innerHTML = "";
    //Clear from local storage
    clearAllFromLocalStorage();
}
//Event listeners
loadEventListeners = () => {
    //Event listener to display any items in local storage upon load
    document.addEventListener("DOMContentLoaded", displayFromLocalStorage);
    //Event listener to add new item
    addItem.addEventListener("click", newItem);
    //Event listener to remove item
    shoppingList.addEventListener("click", removeItem);
    //Event listener to clear all items
    clearAll.addEventListener("click", clearAllItems);
    //Event listener to filter items
    filterItem.addEventListener("keyup", filterItems);
}

//Initiate event listeners
loadEventListeners();