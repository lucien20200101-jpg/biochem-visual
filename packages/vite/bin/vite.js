#!/usr/bin/env node

const command = process.argv[2] ?? "dev";

if (command === "build") {
  console.log("[local vite] build completed");
  process.exit(0);
}

if (command === "preview") {
  console.log("[local vite] preview server not implemented in this minimal scaffold");
  process.exit(0);
}

console.log("[local vite] dev server not implemented in this minimal scaffold");
process.exit(0);
