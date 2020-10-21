import mongoose from "mongoose";
const { Schema } = mongoose;
const uri =
  "mongodb+srv://alex:bubblegum76@rtca.jff2l.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  screenName: String,
  pronouns: String,
  birthday: Date,
  location: String,
  bio: String,
});

const testSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const Test = mongoose.model("test", testSchema);

const testData = new Test({
  username: "tester",
  email: "test123@test.com",
  password: "test1234",
});

testData.save(function (err) {
  if (err) console.log("ERROR< DID NOT UPLOAD");
  // saved!
});

Test.find({}, function (err, docs) {
  console.log(docs);
});
