import React from 'react'
import { UserFragment } from 'src/gql/generated'
import {
  UsersViewStyled,
  UsersViewGridStyled,
  UsersViewCardStyled,
} from './styles'
import { UserLink } from 'src/components/Link/User'
import { Pagination } from 'src/components/Pagination'

type UsersViewProps = {
  users: UserFragment[]
  count: number
  page: number
}

export const UsersView: React.FC<UsersViewProps> = ({ users, count, page }) => {
  const totalPages = count ? Math.floor(count / 10) + 1 : 0

  return (
    <UsersViewStyled>
      <h1>Users</h1>

      <UsersViewGridStyled>
        {users.map((user) => (
          <UsersViewCardStyled key={user.id}>
            <UserLink user={user} />
          </UsersViewCardStyled>
        ))}
      </UsersViewGridStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </UsersViewStyled>
  )
}
