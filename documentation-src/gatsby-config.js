module.exports = {
  pathPrefix: "/katpat/documentation",
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
        start_url: ".",
        background_color: "#93d12f",
        theme_color: "#93d12f",
        display: "standalone",
        icon: "src/assets/icon.png",
        crossOrigin: `use-credentials`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js')
        }
      }
    }
  ]
}