import { PostsConnectionQueryVariables } from 'src/gql/generated'
import { PageProps } from '../_App/interfaces'

export type PostsPageProps = PageProps & {
  tagIds: PostsConnectionQueryVariables['tagIds']
  page: number
}
