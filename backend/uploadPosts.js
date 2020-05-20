//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Post = require("./post/post");

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/posts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
          const post = new Post({
            name: name,
            type: type,
            date: new Date(),
            markdown: markdown,
          });
          const save = await post.save();
          console.log(save);
          console.log("saved to Database. For location: " + name);
        });
      } catch (e) {
        console.log(e);
      }
    });
  };
  await mongoose.connection.collection("posts").drop();
  await uploadMdToDb("../posts/blog", "blog");
  await uploadMdToDb("../posts/code", "code");
  setTimeout(() => mongoose.disconnect(), 2000);
};

main();
