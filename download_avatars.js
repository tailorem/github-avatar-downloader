var request = require("request");

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("aseprite", "aseprite", function(err, response) {
  console.log("Errors:", err);
  console.log("Result:", response);
});

console.log("Welcome to the Github Avatar Downloader!");