import path from "path";
import transform from "../../src/index";
transform({
  inputPath: path.join(__dirname, "./demo.vue"),
  outType:'sass'
});
