var getUserRepos = function (user) {
    // get the github api url from user selected
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // fetch the data from URL THEN do an action
    fetch(apiUrl).then(function(response) {
        // format the data that was recieve THEN do another action
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos("mpityo");