import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "react",
    "import",
    "jsx-a11y",
    "nextjs",
    "react-perf",
    "promise",
    "node",
  ],
})
