import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Content, { HTMLContent } from '../components/Content'

import BasePage from '../base/BasePage'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        
        <div className="content hide-in-mobile">
          <h1 className="title  has-text-weight-bold is-bold-light">
            {title}
          </h1>
        </div>
        
        <PageContent className="content" content={content} />
      </div>      
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ location, data }) => {
  const { markdownRemark: post } = data

  return (
    <BasePage location={location}>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </BasePage>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
