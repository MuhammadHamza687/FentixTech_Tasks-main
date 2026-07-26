import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("Task12-WeatherApp", "dist");
const target = resolve("dist");

if (!existsSync(source)) {
  throw new Error("Task12-WeatherApp/dist was not created.");
}

rmSync(target, { force: true, recursive: true });
cpSync(source, target, { recursive: true });

console.log("Copied Task12-WeatherApp/dist to root dist.");
