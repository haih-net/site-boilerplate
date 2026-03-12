import { Page } from '../_App/interfaces'
import { PostsPageView } from './View'
import { postsPageGetInitialProps } from './postsPageGetInitialProps'
import { usePostsConnectionQuery, useTagsQuery } from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { PostsPageProps } from './interfaces'
import { getPostsConnectionQueryVariables } from './helpers'

export const PostsPage: Page<PostsPageProps> = ({ page, tagIds }) => {
  const tagsResponse = useTagsQuery()

  const postsResponse = usePostsConnectionQuery({
    variables: getPostsConnectionQueryVariables({
      page,
      tagIds,
    }),
  })

  const posts = postsResponse.data?.posts
  const count = postsResponse.data?.postsCount ?? 0
  const tags = tagsResponse.data?.tags

  return (
    <>
      <SeoHeaders title="Posts" />
      <PostsPageView
        posts={posts ?? []}
        count={count}
        tags={tags ?? []}
        // selectedTagId={tagIds}
        page={page}
      />
    </>
  )
}

PostsPage.getInitialProps = postsPageGetInitialProps
