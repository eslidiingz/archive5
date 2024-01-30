const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var mongoose = require("mongoose");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");
const excel = require("node-excel-export");
const AdmZip = require("adm-zip");

// const {ConnectionDB} = require('./config/connectDB')
const app = express();

app.use(express.static("public"));

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://root:f41f78eab2bb431@mongo:27017";
const dbName = "genAssets";
const collection = "collections";
const assets = "assets";
const exportAssets = "export";
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", async (req, res) => {
  await MongoClient.connect(url, async function (err, db) {
    db.db(dbName)
      .collection(collection)
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("index", { data: result });
        db.close();
      });
  });
});
app.get("/collection/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("require id");
  }
  let result = [];
  await MongoClient.connect(url, async function (err, db) {
    result["collection"] = await db
      .db(dbName)
      .collection(collection)
      .findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

    result["asset"] = await db
      .db(dbName)
      .collection(assets)
      .find({ collection: mongoose.Types.ObjectId(req.params.id) })
      .toArray();

    console.log(result);
    res.render("collection", {
      collection: result["collection"],
      asset: result["asset"],
    });
  });
});
app.get("/generate/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("require id");
  }
  let result = [];
  await MongoClient.connect(url, async function (err, db) {
    result["collection"] = await db
      .db(dbName)
      .collection(collection)
      .findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

    result["asset"] = await db
      .db(dbName)
      .collection(assets)
      .find({ collection: mongoose.Types.ObjectId(req.params.id) })
      .toArray();

    res.render("generate", {
      collection: result["collection"],
      asset: result["asset"],
    });
  });
});

app.get("/data/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("require id");
  }
  let result = [];
  await MongoClient.connect(url, async function (err, db) {
    result["collection"] = await db
      .db(dbName)
      .collection(collection)
      .findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

    result["export"] = await db
      .db(dbName)
      .collection(exportAssets)
      .find({ collection: mongoose.Types.ObjectId(req.params.id) })
      .sort({ name: 1 })
      .toArray();

    res.render("data", {
      collection: result["collection"],
      data: result["export"],
    });
  });
});

app.post("/api/collection/add", async (req, res) => {
  if (!req.body.name && req.body.name == "") {
    return res.status(400).send("Require name.");
  }
  const _name = req.body.name;
  await MongoClient.connect(url, async function (err, db) {
    var dbo = db.db(dbName);
    if (err) throw err;
    const result = await dbo
      .collection(collection)
      .insertOne({ name: _name, uploading: true });
    console.log(result);
  });
  res.redirect("/");
});

app.post("/api/asset/add", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const _file = req.files.file;
  const _title = req.body.title;
  const _sort = req.body.sort;
  const _collection = req.body.collection;
  const _folder = "/uploads/" + _collection + "/" + _title;
  const _dir = "./public" + _folder;
  const _assets = [];
  if (!fs.existsSync(_dir)) {
    fs.mkdirSync(_dir, { recursive: true });
  }
  if (_file.length > 1) {
    _file.forEach((element) => {
      uploadPath = _dir + "/" + element.name;
      element.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
      _assets.push({
        name: element.name,
        path: _folder + "/" + element.name,
      });
    });
  } else {
    uploadPath = _dir + "/" + _file.name;
    _file.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
    _assets.push({
      name: _file.name,
      path: _folder + "/" + _file.name,
    });
  }
  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const result = await db
      .db(dbName)
      .collection(assets)
      .insertOne({
        title: _title,
        sort: _sort,
        collection: mongoose.Types.ObjectId(_collection),
        asset: _assets,
      });
  });
  res.redirect("/collection/" + _collection);
});

app.post("/api/asset/generate", async (req, res) => {
  if (!req.body.collection) {
    return res.status(400).send("Require id.");
  }
  if (!req.body.type) {
    return res.status(400).send("Require type");
  }
  if (req.body.type == "loop") {
    if (!req.body.start || !req.body.end) {
      return res.status(400).send("Require start, end.");
    }
  } else if (req.body.type == "random" && !req.body.random) {
    return res.status(400).send("Require total number.");
  }
  let _collection = req.body.collection;
  let _type = req.body.type;
  let _start = req.body.start ? req.body.start : 0;
  let _end = req.body.end ? req.body.end : 0;
  let _random = req.body.random ? req.body.random : 0;

  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const result = await db
      .db(dbName)
      .collection(assets)
      .find({ collection: mongoose.Types.ObjectId(_collection) })
      .toArray(async function (err, result) {
        if (err) throw err;

        var resultSorted = result.sort(function (a, b) {
          return a.sort - b.sort;
        });

        let allLength = 1;
        resultSorted.forEach((element, index) => {
          allLength *= element.asset.length;
        });
        if (!fs.existsSync("./public/assets/" + _collection)) {
          fs.mkdirSync("./public/assets/" + _collection, { recursive: true });
        }
        _end = _end >= allLength ? allLength - 1 : _end;
        _random = _random >= allLength ? allLength - 1 : _random;

        // format number loop
        _start = _type == "loop" ? _start : 0;
        _end = _type == "loop" ? _end : _random - 1;

        for (let i = _start; i <= _end; i++) {
          let image = [];
          let dataImage = {
            name: "",
            data: [],
            collection: mongoose.Types.ObjectId(_collection),
          };
          let rand = Math.floor(Math.random() * allLength);
          let number = _type == "loop" ? i : rand;
          resultSorted.forEach((element, index) => {
            image.push(
              "./public" + element.asset[number % element.asset.length].path
            );
            const pathImage = element.asset[number % element.asset.length].path;
            const nameImage = pathImage.substring(
              pathImage.lastIndexOf("/") + 1
            );
            dataImage.data.push({
              title: element.title,
              image: pathImage,
              name: nameImage,
            });
            if (element.asset.length != 1) {
              number = Math.floor(number / element.asset.length);
            }
          });
          dataImage.name =
            ("0000000000000000" + (_type == "loop" ? i : rand)).substr(-16) +
            ".png";
          await mergeImages(image, {
            Canvas: Canvas,
            Image: Image,
          }).then(async (b64) => {
            fs.writeFile(
              "./public/assets/" + _collection + "/" + dataImage.name,
              b64.replace(/^data:image\/png;base64,/, ""),
              "base64",
              function (err) {
                console.log("err", err);
              }
            );
            const checkOldData = await db
              .db(dbName)
              .collection(exportAssets)
              .findOne({
                collection: mongoose.Types.ObjectId(_collection),
                name: dataImage.name,
              });
            if (checkOldData) {
              db.db(dbName).collection(exportAssets).deleteOne({
                _id: checkOldData._id,
              });
            }
            await db.db(dbName).collection(exportAssets).insertOne(dataImage);
          });
        }
        db.close();
      });
  });
  res.redirect("/generate/" + _collection);
});

app.get("/api/asset/export/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("require id");
  }
  await MongoClient.connect(url, async function (err, db) {
    if (err) throw err;
    const datas = await db
      .db(dbName)
      .collection(exportAssets)
      .find({ collection: mongoose.Types.ObjectId(req.params.id) })
      .sort({ name: 1 })
      .toArray();

    db.close();
    const headerExcel = ["name"];
    const bodyExcel = [];
    datas.forEach((element, index) => {
      // clear data
      const _data = [];
      // set file name
      _data[0] = element.name;

      // loop assets
      element.data.forEach((_element, _index) => {
        //add header onetime datas
        if (index == 0) {
          headerExcel.push(_element.title);
        }
        _data[_index + 1] = _element.name
          .replace(/[\-_]/g, " ")
          .substring(0, _element.name.indexOf("."));
      });
      bodyExcel.push(_data);
    });
    const headerStyle = {
      fill: {
        fgColor: {
          rgb: "FFFFFF",
        },
      },
      font: {
        color: {
          rgb: "000000",
        },
        sz: 20,
        bold: true,
        underline: true,
      },
    };
    //Here you specify the export structure
    const specification = [];
    headerExcel.forEach((element, index) => {
      specification[index] = {
        displayName: element,
        headerStyle: headerStyle, // <- Header style
        width: 200,
      };
    });

    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport([
      // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: "Report", // <- Specify sheet name (optional)
        specification: specification, // <- Report specification
        data: bodyExcel, // <-- Report data
      },
    ]);

    // You can then return this straight
    res.attachment(req.params.id + ".xlsx"); // This is sails.js specific (in general you need to set headers)
    return res.send(report);
  });
});
app.get("/api/asset/download/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("require id");
  }
  const zip = new AdmZip();
  var uploadDir = fs.readdirSync("./public/assets/" + req.params.id);
  for (var i = 0; i < uploadDir.length; i++) {
    console.log("zip file : ", i);
    zip.addLocalFile("./public/assets/" + req.params.id + "/" + uploadDir[i]);
  }
  const downloadName = `${req.params.id}_${Date.now()}.zip`;
  const data = zip.toBuffer();

  // zip.writeZip(downloadName);
  // console.log("zip success!!");

  res.attachment(downloadName);
  return res.send(data);
});

// const
app.listen(5000, () => {
  console.log("Start server at port 5000.");
});
