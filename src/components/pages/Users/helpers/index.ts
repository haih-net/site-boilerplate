import { UsersConnectionQueryVariables } from 'src/gql/generated'

export function getUsersQueryVariables(
  page: number = 1,
  first: number = 10,
): UsersConnectionQueryVariables {
  return {
    first,
    skip: (page - 1) * first,
  }
}
