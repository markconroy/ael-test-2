import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import StyledHeading from "../../components/global-styles/headings.js"

const CountriesPage = ({ data: {
  allMarkdownRemark: { group }, siteVariables }, }) => (
  <Layout>

    <SEO 
      title="Events by Country"
      description = {`View all ${siteVariables.childMarkdownRemark.frontmatter.site_title} by country`}
    />

    <StyledHeading h1>Countries</StyledHeading>

    <ul>
      {group.map(country => (
        <li key={country.fieldValue}>
          <Link to={`/countries/${kebabCase(country.fieldValue)}/`}>
            {country.fieldValue} ({country.totalCount})
          </Link>
        </li>
      ))}
    </ul>

  </Layout>
)

CountriesPage.propTypes = {
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

export default CountriesPage

export const CountriesPageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___country) {
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