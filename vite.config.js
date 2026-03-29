import { resolve } from "path";
import { defineConfig } from "vite";
import path from "path";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  build: {
    // outDir: path.resolve(__dirname, 'dist/'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        about: resolve(__dirname, "/src/about.html"),
        cart: resolve(__dirname, "/src/cart.html"),
        contact: resolve(__dirname, "/src/contact.html"),
        details: resolve(__dirname, "/src/details.html"),
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "/src/products.html")
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
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap")
    }
  },
  server: {
    hot: true
  }

});