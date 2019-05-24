module.exports = {
  pathPrefix: "/katpat",
  siteMetadata: {
    title: 'Katpat',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-less',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "KatPat",
        short_name: "KatPat",
        start_url: "/",
        background_color: "#93d12f",
        theme_color: "#93d12f",
        display: "standalone",
        icon: "src/assets/icon.png",
        crossOrigin: `use-credentials`
      },
    }
  ]
}