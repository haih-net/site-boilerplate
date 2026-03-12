import { PostsPageViewProps } from './interfaces'
import { Post } from 'src/components/Post'
import { PostsLink } from 'src/components/Link/Posts'
import {
  PostsPageViewStyled,
  PostsPageViewTitleStyled,
  PostsPageViewTagsFilterStyled,
  PostsPageViewTagFilterStyled,
  PostsPageViewListStyled,
} from './styles'
import { Pagination } from 'src/components/Pagination'

export const PostsPageView: React.FC<PostsPageViewProps> = ({
  posts,
  count,
  tags,
  selectedTagId = null,
  page,
}) => {
  const totalPages = count ? Math.floor(count / 10) + 1 : 0

  return (
    <PostsPageViewStyled>
      <PostsPageViewTitleStyled>Posts</PostsPageViewTitleStyled>

      {tags && tags.length > 0 && (
        <PostsPageViewTagsFilterStyled>
          {tags.map((tag) => (
            <PostsLink key={tag.id} tag={selectedTagId === tag.id ? null : tag}>
              <PostsPageViewTagFilterStyled $active={selectedTagId === tag.id}>
                {tag.name}
              </PostsPageViewTagFilterStyled>
            </PostsLink>
          ))}
        </PostsPageViewTagsFilterStyled>
      )}

      <PostsPageViewListStyled>
        {posts.map((post) => (
          <Post key={post.id} post={post} variant="list" />
        ))}
      </PostsPageViewListStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </PostsPageViewStyled>
  )
}
