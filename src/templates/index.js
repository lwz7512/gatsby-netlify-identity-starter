/**
 * index template for the site as start point
 * @2018/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

// inlude NLI ...to init first
import netlifyIdentity from 'netlify-identity-widget';

import BasePage from '../base/BasePage';
import Pagination from '../components/Pagination';
import PostItem from '../components/PostItem';
import { isLoggedIn } from "../services/auth";


// init netlify identity ...
// FIX for build test @2018/12/13
if(typeof netlifyIdentity.init !== `undefined`) netlifyIdentity.init();


export default class IndexPage extends React.Component {


  render() {
    
    const posts = this.props.data.allMarkdownRemark.edges;
    const { currentPage, numPages } = this.props.pageContext;
    const logged = isLoggedIn();

    return (
      <BasePage location={{pathname: '/'}}>
        <section className="section">
          <div className="container">
            <div className="content hide-in-mobile">
              <h1 className="has-text-weight-bold is-size-3">Latest</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <PostItem post={post} logged={logged} />
              ))
            }
          </div>
        </section>
        {/** pagination row */}
        <section className="section">
          <Pagination 
            currentPage={currentPage} 
            numPages={numPages}/>
        </section>
      </BasePage>
    )
  }

}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query HomeQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
      limit: $limit, skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            
            image {
              childImageSharp {
                fluid(maxWidth: 160, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }

          }
        }
      }
    }
  }
`
