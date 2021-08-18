let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  init();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    const newToyObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
       "name" : event.target.name.value,
       "image" : event.target.image.value,
       "likes" : 0
      })
    };
    fetch("http://localhost:3000/toys", newToyObj)
    .then(resp => resp.json())
    .then(data => console.log(data));
  })
});

const init = () => {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    // console.log(data);
    const newCard = data.forEach(createCard);
  })
}

function createCard(toy) {
  const newToyCard = document.createElement("div");
  newToyCard.className = "card";
  const toyContainer = document.querySelector("#toy-collection");
  toyContainer.appendChild(newToyCard);
  // add info to card
  const heading = document.createElement("h2");
  heading.textContent = toy.name;
  newToyCard.appendChild(heading);

  const toyImage = document.createElement("img");
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";
  newToyCard.appendChild(toyImage);

  const newP = document.createElement("p");
  newP.textContent = `${toy.likes} likes`;
  newToyCard.appendChild(newP);

  const newButton = document.createElement("button");
  newButton.className = "like-btn";
  newButton.id = toy.id;
  newButton.textContent = "Like";
  newToyCard.appendChild(newButton);
  newButton.addEventListener("click", event => {
    toy.likes += 1;
    newP.textContent = `${toy.likes} likes`;
    updateLikes(toy);
  })
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method : "PATCH",
    headers : {
      "Content-Type": "application/json",
      Accept : "application/json"
    },
    // body : JSON.stringify(toyObj)
    body : JSON.stringify({
      "likes" : toyObj.likes
    })
  })
  .then(resp => resp.json())
  .then(toy => console.log(toy))
}