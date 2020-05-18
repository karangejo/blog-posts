//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Post = require("./post/post");

//joining path of directory
const uploadMdToDb = async (dir, type) => {
  
  const directoryPath = path.join(__dirname, dir);
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    try {
      files.forEach(async (file) => {
        //console.log(file);
        let name = String(file).split(".")[0].replace(/_/g, " ");
        let markdown = fs.readFileSync(directoryPath + "/" + file, "utf8");
        //console.log(name);
        const post = new Post({
          name: name,
          type: type,
          date: new Date(),
          markdown: markdown,
        });

        //console.log(post);
        // save this to mongoDB
        const save = await post.save();
        console.log(save);
        console.log("saved to Database. For location: " + name);
      });
    } catch (e) {
      console.log(e);
    }
  });
};

uploadMdToDb("../posts/blog", "blog");
uploadMdToDb("../posts/code", "code");
