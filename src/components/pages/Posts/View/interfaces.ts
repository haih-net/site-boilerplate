import { PostFragment, TagFragment } from 'src/gql/generated'

export type PostsPageViewProps = {
  posts: PostFragment[]
  count: number
  tags?: TagFragment[]
  selectedTagId?: string | null
  page: number
}
