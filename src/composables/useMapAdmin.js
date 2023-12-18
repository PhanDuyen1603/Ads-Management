import useUsersStore from '~/stores/users.store'
export default function useMapAdmin() {
  const $store = useUsersStore()
  /**
   * @desc user permission
   */
  const userPermission = computed(() => $store.userPermission)

  /**
   * @desc get users
   */
  const getUsers = async () => {

  }

  /**
   * @desc get user
   */
  const getUser = async () => {

  }

  return {
    userPermission,
    getUsers,
    getUser
  }
}