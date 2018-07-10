var owner = process.argv.slice(2)[0];
var name = process.argv.slice(2)[1];

var fs = require("fs");
var request = require("request");
// require authorizations
var secrets = require("./secrets");

function getRepoContributors(repoOwner, repoName, cb) {
  console.log("Welcome to the Github Avatar Downloader!");
  var oops = "Oops! You need to specify a repo owner and name.";
  if (!repoOwner || !repoName) {
    console.log(oops);
    return oops;
  }
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

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

getRepoContributors(owner, name, function(err, avatar, filePath) {
  if (err) throw err;

  downloadImageByURL(avatar, filePath);

});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on("error", err => {
      throw err;
    })
    .on("response", response => {
    })
    .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/avatar.jpg");

// url = "https://avatars2.githubusercontent.com/u/2741?v=3&s=466";
// filePath = "avatars/avatar.jpg";
