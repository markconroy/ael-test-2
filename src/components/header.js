import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"
import styled from "styled-components"

const StyledHeader = styled.header`
  border-bottom: 4px solid var(--primary);

  .header__inner {
    margin: 0 auto;
    max-width: 960px;
    padding: 1.5rem 1rem 0;
    display: flex;
    justify-content: space-between;
    > * {
      flex-basis: 50%;
    }
  }
  .header__branding-logo {
    margin-bottom: 1.5rem;
  }
  .header__link {
    text-decoration: none;
    background-color: var(--primary);
    display: inline-block;
    color: white;
    padding: .5rem;
    &:focus,
    &:hover {
      text-decoration: underline;
      background-color: white;
      color: var(--primary);
    }
  }
  .header__link--with-border {
    border: 3px solid var(--primary);
    border-bottom: 0;
    &:focus,
    &:hover {
      /* border-color:  */
    }
  }
  .header__support {
    padding-left: 1rem;
    text-align: right;
    max-width: 250px;
  }
`

const Header = () => (

  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            subtitle
            repo
          }
        },
        imageAnnertechLogo: file(relativePath: { eq: "annertech.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000 ) {
              ...GatsbyImageSharpFluid
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
    `}
    render={data => (
      <StyledHeader>
        <div className="header__inner">
          <div className="header__branding">
            <div className="header__branding-logo">
              <Link className="header__link" to="/">
                addEventLister
                <br></br>
                {data.siteVariables.childMarkdownRemark.frontmatter.sub_title}
              </Link>
            </div>
            <div>
              <a className="header__link header__link--with-border" href={`${data.siteVariables.childMarkdownRemark.frontmatter.site_repo}#add-your-event`}>Add New Event</a>
            </div>
          </div>
          <div className="header__support">
              <p>
                A project of Annertech
                <a href="https://annertech.com"><Img fluid={data.imageAnnertechLogo.childImageSharp.fluid} /></a>
              </p>
          </div>
        </div>
      </StyledHeader>
    )}
  />
)

export default Header
