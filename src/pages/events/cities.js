import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import StyledHeading from "../../components/global-styles/headings.js"

const CitiesPage = ({ data: {
  allMarkdownRemark: { group }, siteVariables }, }) => (
  <Layout>

    <SEO 
      title="Events by City"
      description = {`View all ${siteVariables.childMarkdownRemark.frontmatter.site_title} by city`}
    />

    <StyledHeading h1>Cities</StyledHeading>

    <ul>
      {group.map(city => (
        <li key={city.fieldValue}>
          <Link to={`/cities/${kebabCase(city.fieldValue)}/`}>
            {city.fieldValue} ({city.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

CitiesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default CitiesPage

export const CitiesPageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___city) {
        fieldValue
        totalCount
      }
    }
    siteVariables: file(dir: {regex: "/(site-variables)/"}, name: {eq: "site-variables"}) {
      dir
      childMarkdownRemark {
        frontmatter {
          site_title
          site_subtitle
          site_description
          site_author
          site_repo
        }
      }
    }
  }
`