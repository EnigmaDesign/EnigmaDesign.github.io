const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const src = path.join(__dirname, "..", "img", "logos");
const out = path.join(__dirname, "logos_png");
fs.mkdirSync(out, { recursive: true });

const svgs = ["amazon", "microsoft", "workday", "yahoo", "salesforce"];

(async () => {
  for (const name of svgs) {
    const inp = path.join(src, name + ".svg");
    // render at high density for crisp raster, height ~ 220px
    await sharp(inp, { density: 400 })
      .resize({ height: 220, fit: "inside" })
      .png()
      .toFile(path.join(out, name + ".png"));
    console.log("rasterized", name);
  }
})();
