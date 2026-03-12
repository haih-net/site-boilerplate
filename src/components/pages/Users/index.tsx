import { useUsersConnectionQuery } from 'src/gql/generated'
import { Page } from '../_App/interfaces'
import { UsersView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getUsersQueryVariables } from './helpers'
import { usersPageGetInitialProps } from './usersPageGetInitialProps'
import { UsersPageProps } from './interfaces'

export const UsersPage: Page<UsersPageProps> = ({ page }) => {
  const variables = getUsersQueryVariables(page)

  const response = useUsersConnectionQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const users = response.data?.users || []
  const count = response.data?.usersCount ?? 0

  return (
    <>
      <SeoHeaders title="Users" />
      <UsersView users={users} count={count} page={page} />
    </>
  )
}

UsersPage.getInitialProps = usersPageGetInitialProps
