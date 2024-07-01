// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@vueuse/motion/nuxt",
    "nuxt-svgo",
  ],
  googleFonts: {
    families: {
      "Julius+Sans+One": true,
      Inter: "200..700",
      Lalezar: true,
      "Crimson Pro": {
        wght: "200..900",
        ital: "200..700",
      },
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: "github-dark",
    },
  },
});
