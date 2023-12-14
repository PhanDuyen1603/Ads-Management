<template>
  <teleport to='body' >
    <div v-for="item in lisModal" :key="item.id">
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
const lisModal = computed(() => $store.list)
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
.modal_overlay {
  position: fixed;
  z-index: 101;
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