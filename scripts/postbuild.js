const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const targets = ["index.mjs", "index.js"];
const importLine = `import './index.css';\n`;

for (const fileName of targets) {
  const filePath = path.join(distDir, fileName);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes(importLine.trim())) {
      fs.writeFileSync(filePath, importLine + content);
      console.log(`✅ CSS import added to ${fileName}`);
    } else {
      console.log(`ℹ️ CSS import already exists in ${fileName}`);
    }
  } else {
    console.log(`⚠️ ${fileName} not found in dist/`);
  }
}
