<template>
  <div>
    <ClientOnly>
      <Vueform @submit="handleSubmit" v-model="form" >
        <TextElement name="hello_world" label="Hello" placeholder="World" />
        <TextElement name="name" rules="required" label="name" placeholder="World" />
        <ButtonElement
          name="submit"
          add-class="mt-2"
          submits
        >
          Register
        </ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<script>

export default {
  setup() {
    const form = reactive({
      hello_world: '',
      name: '',
      password: ''
    })

    // onMounted(() => {
    //   console.log(form)
    // })

    const handleSubmit = (target) => {
      console.log('target', target)
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>