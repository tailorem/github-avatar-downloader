var request = require("request");
// require authorizations
var secrets = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    body = JSON.parse(body);
    // console.log(body);
    cb(err, body);
  });

}

getRepoContributors("aseprite", "aseprite", function(err, response) {
  if (err) throw err;

  response.forEach(worker => {
    console.log(worker.avatar_url);
  });
  // console.log("Error:", err);
  // console.log("Result:", response);
});

console.log("Welcome to the Github Avatar Downloader!");