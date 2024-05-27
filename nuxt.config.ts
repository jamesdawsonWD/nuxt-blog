// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxt/image"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: "catppuccin-macchiato",
    },
  },
});