import path from "path";
import transform from "../../src/index";
import fs from "fs";

transform({
  input: path.join(__dirname, "./demo.js"),
  outType: "css",
});

const code = fs.readFileSync(path.join(__dirname, "./demo.js"), {
  encoding: "utf-8",
});
transform({
  input: code,
  transformType: "code",
  outType: "css",
  callback: (res) => {
    console.log(res);
  },
});
