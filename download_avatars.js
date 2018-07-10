// Get command line arguments
var owner = process.argv.slice(2)[0];
var name = process.argv.slice(2)[1];

var fs = require("fs");
var request = require("request");

// require authorizations
var secrets = require("./secrets");

// Declare new function to get repo contributor info
function getRepoContributors(repoOwner, repoName, cb) {
  console.log("Welcome to the Github Avatar Downloader!");

  // "Error" in case of missing arguments
  var oops = "Oops! You need to specify a repo owner and name.";
  if (!repoOwner || !repoName) {
    console.log(oops);
    return oops;
  }

  // Specify options for https request
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

  // Make request for github repo contributor info
  request(options, function(err, res, body) {
    body = JSON.parse(body);

    console.log("Downloading images...");
    body.forEach(contributor => {
      avatar = contributor.avatar_url;
      filePath = "./avatars/" + contributor.login + ".jpg";
      // console.log(filePath);
      cb(err, avatar, filePath);
    });
    console.log("Download complete!");

  });

}

// Call to get repo contributor info
getRepoContributors(owner, name, function(err, avatar, filePath) {
  if (err) throw err;

  downloadImageByURL(avatar, filePath);

});

// Function declaration to download avatars by URLS
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on("error", err => {
      throw err;
    })
    .on("response", response => {
    })
    .pipe(fs.createWriteStream(filePath));
}

