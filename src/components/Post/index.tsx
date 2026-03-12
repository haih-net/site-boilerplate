import Link from 'next/link'
import { PostFragment, PostStatus } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import { PostsLink } from 'src/components/Link/Posts'
import {
  PostStyled,
  PostBannerStyled,
  PostTitleStyled,
  PostDescriptionStyled,
  PostMetaStyled,
  PostAuthorStyled,
  PostDateStyled,
  PostIntroStyled,
  PostContentStyled,
  PostTagsStyled,
  PostTagStyled,
} from './styles'
import { UserLink } from '../Link/User'

type PostVariant = 'list' | 'full'

type PostProps = {
  post: PostFragment
  variant?: PostVariant
}

export const Post: React.FC<PostProps> = ({ post, variant = 'list' }) => {
  const title = post.title || 'Untitled'

  const isPublished = post.status === PostStatus.PUBLISHED

  const titleElement = (
    <PostTitleStyled $variant={variant}>{title}</PostTitleStyled>
  )

  return (
    <PostStyled $variant={variant}>
      {variant === 'full' && !isPublished && (
        <PostBannerStyled>This post is not published</PostBannerStyled>
      )}

      {variant === 'list' ? (
        <Link href={`/posts/${post.id}`}>{titleElement}</Link>
      ) : (
        titleElement
      )}

      {variant === 'list' && post.description && (
        <PostDescriptionStyled>{post.description}</PostDescriptionStyled>
      )}

      <PostMetaStyled>
        {post.CreatedBy && (
          <PostAuthorStyled>
            <UserLink user={post.CreatedBy} />
          </PostAuthorStyled>
        )}
        {post.createdAt && (
          <PostDateStyled>
            <FormattedDate value={post.createdAt} format="dateMedium" />
          </PostDateStyled>
        )}
      </PostMetaStyled>

      {variant === 'full' && post.intro && (
        <PostIntroStyled>{post.intro}</PostIntroStyled>
      )}

      {variant === 'full' && (
        <PostContentStyled>
          <Markdown>{post.content}</Markdown>
        </PostContentStyled>
      )}

      {variant === 'list' && post.Tags && post.Tags.length > 0 && (
        <PostTagsStyled>
          {post.Tags.map((tag) => (
            <PostsLink key={tag.id} tag={tag}>
              <PostTagStyled>{tag.name}</PostTagStyled>
            </PostsLink>
          ))}
        </PostTagsStyled>
      )}
    </PostStyled>
  )
}
