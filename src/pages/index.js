import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledHeading from "../components/global-styles/headings.js"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO 
      title={`${data.allMarkdownRemark.edges.length} Events`}
    />

    <StyledHeading h1>Free Developer Events</StyledHeading>

    <p>{data.allMarkdownRemark.edges.length} Upcoming Developer Events</p>
    <p>Browse:
      <ul>
        <li><Link to="/events">{data.allMarkdownRemark.edges.length} upcoming events</Link></li>
        <li><Link to="/events/cities">In {data.allMarkdownRemark.cityGroup.length} Cities</Link></li>
        <li><Link to="/events/countries">Across {data.allMarkdownRemark.countriesGroup.length} Countries</Link></li>
        <li><Link to="/events/online">Online Events</Link></li>
        <li><Link to="/events/physical">Physical Events</Link></li>
      </ul>
    </p>

  </Layout>
)

export default IndexPage

export const IndexPageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            city
            country
          }
        }
      }
      cityGroup: group(field: frontmatter___city) {
        totalCount
      }
      countriesGroup: group(field: frontmatter___country) {
        totalCount
      }
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`