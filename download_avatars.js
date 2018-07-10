var request = require("request");
var token = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      "User-Agent": "request",
      "Authorization": token
    }
  };

  // var url = "https://api.github.com/repos/" + repoOwner + repoName + "/contributors";
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("aseprite", "aseprite", function(err, response) {
  if (err) throw err;

  // console.log("Error:", err);
  console.log("Result:", response);
});

console.log("Welcome to the Github Avatar Downloader!");