import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PageWithPluginSearchBar from "../components/page-with-plugin-searchbar"
import PackageReadme from "../components/package-readme"
import Unbird from "../components/unbird"

class DocsRemotePackagesTemplate extends React.Component {
  render() {
    const {
      data: { npmPackage, markdownRemark },
    } = this.props
    return (
      <Layout location={this.props.location}>
        <PageWithPluginSearchBar location={this.props.location}>
          <PackageReadme
            page={markdownRemark}
            packageName={npmPackage.name}
            excerpt={npmPackage.readme.childMarkdownRemark.excerpt}
            html={npmPackage.readme.childMarkdownRemark.html}
            githubUrl={
              npmPackage.repository !== null
                ? npmPackage.repository.url
                : `https://github.com/search?q=${npmPackage.name}`
            }
            modified={npmPackage.modified}
            timeToRead={npmPackage.readme.childMarkdownRemark.timeToRead}
            keywords={npmPackage.keywords}
            lastPublisher={npmPackage.lastPublisher}
          />
          <Unbird
            dataSetId="5c1ac24b4a828a169b6c235c"
            publicKey={process.env.UNBIRD_FEEDBACK_KEY_PLUGINLIB}
            feedbackPrompt="Have feedback on the Plugin Library?"
          />
        </PageWithPluginSearchBar>
      </Layout>
    )
  }
}

export default DocsRemotePackagesTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MarkdownPageFooter
    }
    npmPackage(slug: { eq: $slug }) {
      name
      description
      keywords
      lastPublisher {
        name
        avatar
      }
      repository {
        url
      }
      readme {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
    }
  }
`
