import { Page } from '../_App/interfaces'
import {
  PostsConnectionDocument,
  PostsConnectionQuery,
  PostsConnectionQueryVariables,
} from 'src/gql/generated'
import { PostsPageProps } from './interfaces'
import { getPostsConnectionQueryVariables } from './helpers'

export const postsPageGetInitialProps: Page<PostsPageProps>['getInitialProps'] =
  async ({ query, apolloClient }) => {
    const pageParam = query.page
    const page =
      typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
        ? parseInt(pageParam, 10)
        : 1

    const tagIds = query.tags
      ? typeof query.tags === 'string'
        ? [query.tags]
        : query.tags
      : undefined

    await apolloClient.query<
      PostsConnectionQuery,
      PostsConnectionQueryVariables
    >({
      query: PostsConnectionDocument,
      variables: getPostsConnectionQueryVariables({
        page,
        tagIds,
      }),
    })

    return {
      tagIds,
      page,
    }
  }
