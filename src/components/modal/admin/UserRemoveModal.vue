<template>
  <div class="">
      <h4>Bạn chắc chắn muốn xoá người dùng này</h4>
      <div class="card-group-buttons">
        <button type="button" @click="handleDelete">có</button>
        <button type="button" @click="emits('close')">không</button>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default:() => {}
  }
})
const emits = defineEmits(['close'])

const handleDelete = async () => {
  try {
    const res = await $fetch(`/api/user/${props.data._id}`, {
      method: 'DELETE'
    })
    emits('close')
  } catch (error) {
    console.log({error})
  }
}
</script>