let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

    function getToys() {
        const toyCollection = document.querySelector("#toy-collection");
        fetch("http://localhost:3000/toys")
            .then((res) => res.json())
            .then((data) => {
                data.forEach((toy) => {
                    const toyCard = document.createElement("div");
                    const name = document.createElement("h2");
                    const pic = document.createElement("img");
                    const likes = document.createElement("p");
                    const likesButton = document.createElement("button");
                    likesButton.className = "like-btn";
                    likesButton.setAttribute("id", `${toy.id}`);
                    likesButton.innerText = "Like ❤️";
                    likes.innerText = `${toy.likes} Likes`;
                    pic.src = toy.image;
                    pic.className = "toy-avatar";
                    name.innerText = toy.name;
                    toyCard.className = "card";
                    toyCollection.appendChild(toyCard);
                    toyCard.appendChild(name);
                    toyCard.appendChild(pic);
                    toyCard.appendChild(likes);
                    toyCard.appendChild(likesButton);
                    likesButton.addEventListener("click", () => {
                        newNumberOfLikes = toy.likes + 1;
                        fetch(`http://localhost:3000/toys/${toy.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },

                            body: JSON.stringify({
                                likes: newNumberOfLikes,
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                likes.innerText = `${data.likes} Likes`;
                            });
                    });
                });
            });
    }
    getToys();
    createToy = document.querySelector(".add-toy-form");
    toyNameInput = document.querySelectorAll(".input-text")[0];
    toyImageInput = document.querySelectorAll(".input-text")[1];
    createToy.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(toyNameInput.value);
        fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: `${toyNameInput.value}`,
                image: `${toyImageInput.value}`,
                likes: 0,
            }),
        });
    });
});
