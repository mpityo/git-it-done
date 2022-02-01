var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons")

var formSubmitHandler = function (event) {
    event.preventDefault();
    
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
}

var buttonClickHander = function (event) {  
    var language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
}

var getUserRepos = function (user) {
    // get the github api url from user selected
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch the data from URL THEN do an action
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            // format the data that was recieve THEN do another action
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GotHub User Not Found");
        }
    })
    .catch(function(error) {  
        alert("Unable to connect to GitHub");
    })
};

var displayRepos = function (repos, searchTerm) {  
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop through repos
    for (var i = 0; i < repos.length; i ++) {
        // format repo name and create container for it
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        repoEl.appendChild(titleEl);

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container and then to dom
        repoEl.appendChild(statusEl);
        repoContainerEl.appendChild(repoEl);
    }
}

var getFeaturedRepos = function (language) {  
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response) {  
        if (response.ok) {
            response.json().then(function (data) {  
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: Github User Not Found");
        }
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHander);