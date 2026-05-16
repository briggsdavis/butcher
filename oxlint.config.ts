import { defineConfig } from "oxlint"

export default defineConfig({
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
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
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
  },
})
