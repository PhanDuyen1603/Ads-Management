import useModalStore from '~/stores/modal.store'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      modal: {
        alert({ html, title, message = '', btnYes = 'OK'}) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              id: Math.random().toString(),
              component: 'ModalCommonDefaultMessage',
              // wrapper: 'ModalWrapperMessage',
              props: {
                html,
                title,
                message,
                btns: [
                  { label: btnYes, value: true }
                ]
              },
              config: {
                maxWidth: '640px'
              },
              resolve
            })
          })
        },
        develop({beforeClose}) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              id: Math.random().toString(),
              component: 'ModalDevelopinng',
              resolve,
              beforeClose
            })
          })
        },
        show({
          component, wrapper, wrapperProps, btns, props = {}, btnYes = 'OK', btnNo = 'NO',
          beforeClose, id = Math.random().toString(),
          ...rest
        }) {
          return new Promise(resolve => {
            const $store = useModalStore()
            $store.addModal({
              ...rest,
              id, component, wrapper, wrapperProps,
              props: {
                ...props,
                formData: props.formData || {},
              },
              btns: btns || [
                { label: btnNo, value: false },
                { label: btnYes, value: true },
              ],
              resolve,
              beforeClose,
            })
          })
        },
        clear() {
          const $store = useModalStore()
          $store.clearAll
        },
        clost({ id, result }) {
          return new Promise(resolve => {
            const $store = useModalStore()
            const instance = $store.list.find(x => x.id === id)
            if(!instance) return resolve
            instance.resolve(result)
            $store.removeModal(id)
          })
        }
      }
    }
  }
})