/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require("lodash")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = `events/${_.kebabCase(node.frontmatter.start_date)}-${_.kebabCase(node.frontmatter.country)}-${_.kebabCase(node.frontmatter.city)}-${_.kebabCase(node.frontmatter.title)}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const eventPageTemplate = path.resolve(`src/templates/eventTemplate.js`)
  const countryPageTemplate = path.resolve("src/templates/countryTemplate.js")
  const cityPageTemplate = path.resolve("src/templates/cityTemplate.js")

  const result = await graphql(`
    {
      eventsRemark: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/(data/events)/"}}, 
        sort: {order: DESC, fields: [frontmatter___start_date]}) {
        edges {
          node {
            frontmatter {
              path_date: start_date(formatString: "YYYY-MM-DD")
              start_date
              country
              city
              title
            }
            fields {
              slug
            }
          }
        }
      }
      countriesRemark: allMarkdownRemark {
        group(field: frontmatter___country) {
          fieldValue
        }
      }
      citiesRemark: allMarkdownRemark {
        group(field: frontmatter___city) {
          fieldValue
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const events = result.data.eventsRemark.edges
  events.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: eventPageTemplate,
      context: {
        slug: node.fields.slug
      },
    })
  })

  const countries = result.data.countriesRemark.group
  countries.forEach(country => {
    createPage({
      path: `/countries/${_.kebabCase(country.fieldValue)}`,
      component: countryPageTemplate,
      context: {
        country: country.fieldValue,
      },
    })
  })

  const cities = result.data.citiesRemark.group
  cities.forEach(city => {
    createPage({
      path: `/cities/${_.kebabCase(city.fieldValue)}`,
      component: cityPageTemplate,
      context: {
        city: city.fieldValue,
      },
    })
  })
}
