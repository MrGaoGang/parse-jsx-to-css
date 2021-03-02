import path from "path";
import transform from "../../src/index";
import fs from "fs";

// generate file
transform({
  input: path.join(__dirname, "./demo.vue"),
  outType: "less",
});

// get result code
const code = fs.readFileSync(path.join(__dirname, "./demo.vue"), {
  encoding: "utf-8",
});

transform({
  input: code,
  transformType: "code",
  outType: "css",
  language:'vue',
  callback: (res) => {
    console.log(res);
  },
});
