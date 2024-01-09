function searchUser() {
  const userInput = document.querySelector("#github-form input#search");
  const userName = userInput.value;
  //console.log(`Your username is ${userName}`);

  fetch(`https://api.github.com/users/${userName}`)
    .then((resp) => resp.json())
    .then((user) => {
      const listContainer = document.querySelector(
        "#github-container #user-list"
      );
      const userDetails = document.createElement("li");
      userDetails.innerHTML = `
    Name: ${user.name}<br>
    ID: ${user.id}<br>
    Avatar: ${user.avatar_url}<br>
    Link: ${user.html_url}<br>
    X (twitter): ${user.twitter_username}
    `;
      console.log(userDetails);
      listContainer.appendChild(userDetails);

      //get user repos
      userDetails.addEventListener("click", () => {
        fetch(`https://api.github.com/users/${userName}/repos`)
          .then((resp) => resp.json())
          .then((repos) => {
            repos.forEach((element) => {
              return element;
            });
            // for (let i = 0; i < repos.length; i++) {
            //   console.log(repos[i]);
            // }
            const repoContainer = document.getElementById("repos-list");
            const reposList = document.createElement("li");
            reposList.innerHTML = `Repos: ${repos
              .map((repo) => repo.name)
              .join(", ")}`;
            repoContainer.appendChild(reposList);
          });
      });
    });
}

function logUserNameOnClick() {
  const form = document.getElementById("github-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    searchUser();
  });
}

logUserNameOnClick();
