import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
// inlude NLI ...to init first
import netlifyIdentity from 'netlify-identity-widget'

import BasePage from '../components/BasePage'
import { isLoggedIn } from "../services/auth"



// init netlify identity ...
// FIX for build test @2018/12/13
if(typeof netlifyIdentity.init !== `undefined`) netlifyIdentity.init();
// console.log('NLI init...')


export default class IndexPage extends React.Component {


  constructor(props) {
    super(props)
    
  }

  componentDidMount() {
    
  }
  

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    const cntBorder = { 
      // border: '1px solid #888',
      borderBottomWidth: 1,
      borderBottomColor: '#888',
      borderBottomStyle: 'solid', // this attribute doesn't auto complete???
      padding: '1em 0',
      display: 'flex', // horizontal align thumbnail and text ...
     }

    return (
      <BasePage>
        <section className="section">
          <div className="container">
            <div className="content">
              {/*<h1 className="has-text-weight-bold is-size-2">最新资源</h1>*/}
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={cntBorder}
                  key={post.id}
                >
                  {/** @2018/12/17 */}
                  <img src={post.frontmatter.image.childImageSharp.fluid.src} className="thumbnail-img"/>
                  <div className="post-item">
                    <p className="post-title">
                      <Link 
                        className={isLoggedIn()?"has-text-primary":"has-text-unlogin"} 
                        to={isLoggedIn() ? post.fields.slug:'/login'}>
                        {post.frontmatter.title}
                      </Link>
                      <span> &bull; </span>
                      <small>{post.frontmatter.date}</small>
                    </p>
                    <p>
                      <span className="post-excerpt">{post.excerpt}</span>
                      <Link 
                        className={isLoggedIn()?"button is-small orange":"button is-small"}
                        to={isLoggedIn() ? post.fields.slug:'/login'}>
                        Keep Reading →
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
          </div>
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
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
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
