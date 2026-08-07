import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const output = resolve(root, "dist");
const task11Build = resolve(root, "Task11-TodoApp", "dist");
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
  "Task09-Furniture-Ecommerce",
  "Task10-Portfolio"
];

if (!existsSync(task11Build)) {
  throw new Error("Task11-TodoApp/dist was not created.");
}

if (!existsSync(task12Build)) {
  throw new Error("Task12-WeatherApp/dist was not created.");
}

rmSync(output, { force: true, recursive: true });
mkdirSync(output, { recursive: true });

copyFileSync(resolve(root, "index.html"), resolve(output, "index.html"));

for (const folder of staticTaskFolders) {
  cpSync(resolve(root, folder), resolve(output, folder), { recursive: true });
}

cpSync(task11Build, resolve(output, "Task11-TodoApp"), { recursive: true });
cpSync(task12Build, resolve(output, "Task12-WeatherApp"), { recursive: true });

console.log("Built Vercel output: hub at /, Task 10 at /Task10-Portfolio/, Task 11 at /Task11-TodoApp/, and Task 12 at /Task12-WeatherApp/.");
