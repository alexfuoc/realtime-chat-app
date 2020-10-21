import mongoose from "mongoose";
const { Schema } = mongoose;

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

console.log(Test.find({}));
