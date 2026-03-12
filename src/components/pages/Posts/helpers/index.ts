import { PostsConnectionQueryVariables, PostStatus } from 'src/gql/generated'

type getPostsConnectionQueryVariablesProps = {
  tagIds: PostsConnectionQueryVariables['tagIds']
  page: number
  first?: number
}

export function getPostsConnectionQueryVariables({
  tagIds,
  page,
  first = 10,
}: getPostsConnectionQueryVariablesProps): PostsConnectionQueryVariables {
  return {
    where: { status: PostStatus.PUBLISHED },
    tagIds,
    skip: (page - 1) * first,
  }
}
