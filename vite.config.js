import { resolve } from "path";
import { defineConfig } from "vite";
import path from "path";
import eslint from "vite-plugin-eslint";

import.meta.dirname;
export default defineConfig({
  build: {
    // outDir: path.resolve(__dirname, 'dist/'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        about: resolve("/src/about.html"),
        cart: resolve("/src/cart.html"),
        contact: resolve("/src/contact.html"),
        details: resolve("/src/details.html"),
        main: resolve("index.html"),
        products: resolve("/src/products.html")
      }
    },
    sourcemap: true
  },
  plugins: [
    { // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: "build"
    },
    { // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false
      }),
      apply: "serve",
      enforce: "post"
    }
  ],
  resolve: {
    alias: {
      "~bootstrap": path.resolve("node_modules/bootstrap")
    }
  }


});