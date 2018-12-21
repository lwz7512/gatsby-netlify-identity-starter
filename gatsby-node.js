const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')



// Implement the Gatsby API “onCreatePage”. 
// This is called after every page is created.
// to allow client-only routes
// @2018/12/20
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}


// FIX netlify-identity-widget server rendering ... @2018/12/12
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /netlify-identity-widget/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}// end of onCreateWebpackConfig


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              title
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    // const blogpost = post => post.node.frontmatter.templateKey == 'blog-post';
    // const posts = result.data.allMarkdownRemark.edges.filter(blogpost);
    const posts = result.data.allMarkdownRemark.edges;

    // Create blog post list pages
    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);

    // page path determine the access order
    // here create `root` page of site by `/`
    // @2018/12/19
    _.times(numPages, i => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: path.resolve('./src/templates/index.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        },
      });
    });// end of _.times

    // create pages by template in .md
    _.each(posts, (post, index) => {
      const previous = (index === posts.length - 1) ? null : posts[index + 1].node;
      const next = (index === 0) ? null : posts[index - 1].node;
      const id = post.node.id;
      createPage({
        path: post.node.fields.slug,
        tags: post.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    });

  })// end of then
}// end of createPages

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
