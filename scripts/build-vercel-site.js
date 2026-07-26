import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const output = resolve(root, "dist");
const task12Build = resolve(root, "Task12-WeatherApp", "dist");

const staticTaskFolders = [
  "Task01",
  "Task02",
  "Task03-Clone-site",
  "Task04-clone-insta",
  "task05-responsive",
  "Task06-Startup2",
  "Task07-whitepace",
  "Task08-StudentRegistration",
  "Task09-Furniture-Ecommerce"
];

if (!existsSync(task12Build)) {
  throw new Error("Task12-WeatherApp/dist was not created.");
}

rmSync(output, { force: true, recursive: true });
mkdirSync(output, { recursive: true });

copyFileSync(resolve(root, "index.html"), resolve(output, "index.html"));

for (const folder of staticTaskFolders) {
  cpSync(resolve(root, folder), resolve(output, folder), { recursive: true });
}

cpSync(task12Build, resolve(output, "Task12-WeatherApp"), { recursive: true });

console.log("Built Vercel output: hub at / and Task 12 at /Task12-WeatherApp/.");
