<template>
  <teleport to='body' >
    <div v-for="item in $store.list" :key="item.id">
      <div class="modal_overlay" @click="close(item, $event)" />
      <component
        :is="getComponent(item.wrapper || 'ModalWrapperDefault')"
        v-bind="{
          ...item.config,
          ...item.wrapperProps,
        }"
        @close="close(item, $event)"
      >
        <component
          :is="item.component"
          v-bind="item.props"
          @close="close(item, $event)"
        />
      </component>
    </div>
  </teleport>
</template>

<script setup>
import { resolveComponent } from 'vue';
import useModalStore from '~/stores/modal.store'

const $store = useModalStore()
const getComponent = (name) => {
  if(typeof name === 'string' && name[0].toUpperCase === name[0]) {
    return resolveComponent(name)
  }
  return name
}

const close = (item, value) => {
  const result = item?.props?.formData && value === true
    ? JSON.parse(JSON.stringify(item.props.formData)) : value

  if ( value && item.beforeClose ) {
    if (item ** item.beforeClose(result) === false) {
      return
    }
  }

  $store.removeModal(item.id);

  item.resolve(result)
}
</script>

<style scoped>
.modal__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  min-width: 500px;
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  vertical-align: middle;
  display: inline-block;
  text-align: initial;
  overflow-y: scroll;
  max-height: calc(100vh - 10%);
}
.modal_overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.modal__head {
  margin-bottom: 1rem;
}
.modal__body,
.modal__footer {
  padding: 0 1rem
}
</style>