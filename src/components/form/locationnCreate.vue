<template>
  <div>
    <ClientOnly>
      <Vueform endpoint="/api/address/create" :form-data="form$ => form$.requestData" v-model="form" >
        <TextElement name="streetLine1" label="Hello" placeholder="streetLine1" />
        <TextElement name="city" rules="required" label="thanh pho" placeholder="thanh pho" />
        <TextElement name="district" rules="required" label="quan" placeholder="quan" />
        <TextElement name="lat" rules="required" input-type="number" label="lat" placeholder="World" />
        <TextElement name="lng" rules="required" input-type="number" label="long" placeholder="World" />
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

    return {
      form,
    }
  }
}
</script>