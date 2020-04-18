import React, { Fragment } from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"
import StyledHeading from "../components/global-styles/headings.js"
import GridContainer from "../components/global-styles/grid-container.js"
import GridItem from "../components/global-styles/grid-item.js"

const EventsPage = ({ data }) => (
  <Layout>
    
    <SEO 
      title="All Events"
      description = {`View all ${data.siteVariables.childMarkdownRemark.frontmatter.site_subtitle} from ${data.siteVariables.childMarkdownRemark.frontmatter.site_title}`}
    />

    <StyledHeading h1>{data.allMarkdownRemark.edges.length} {data.siteVariables.childMarkdownRemark.frontmatter.site_subtitle}</StyledHeading>

    <p>Click an event for more information.</p>
    
    <GridContainer>
      {data.allMarkdownRemark.edges.map(edge => (
        <Fragment>
          <GridItem>
            <Card
              cardTitle = {edge.node.frontmatter.title}
              cardPath = {`events/${_.kebabCase(edge.node.frontmatter.start_date)}-${_.kebabCase(edge.node.frontmatter.country)}-${_.kebabCase(edge.node.frontmatter.city)}-${_.kebabCase(edge.node.frontmatter.title)}`}
              cardCountry = {edge.node.frontmatter.country}
              cardCity = {edge.node.frontmatter.city}
              cardStartDate = {edge.node.frontmatter.start_date}
              cardEndDate = {edge.node.frontmatter.end_date}
              cardStartDateString = {edge.node.frontmatter.start_date_as_string}
              cardEndDateString = {edge.node.frontmatter.end_date_as_string}
            />
          </GridItem>
        </Fragment>
      ))}
    </GridContainer>

  </Layout>
)

export default EventsPage

export const EventsPageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { 
        order: ASC, 
        fields: [frontmatter___start_date]
      }, 
      filter: { 
        fileAbsolutePath: {
          regex: "/(data/events)/"
        } 
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            start_date: start_date
            end_date: end_date
            path_date: start_date(formatString: "YYYY-MM-DD")
            start_date_as_string: start_date(formatString: "Do MMMM YYYY")
            end_date_as_string: end_date(formatString: "Do MMMM YYYY")
            country
            city
          }
          excerpt
        }
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