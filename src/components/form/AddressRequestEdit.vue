<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData" v-model="form"
      sync
    >
      <TextElement
        name="user"
        :submit="false"
        label="Tên người sửa"
        placeholder="Nhập Tên người sửa"
      />

      <DateElement
        name="date"
        label="Ngày chỉnh sửa"
      />

      <TextElement
        name="streetLine1"
        :submit="false"
        label="Địa chỉ (số)"
        placeholder="Nhập số nhà"
      />

      <TextElement
        name="streetLine2"
        :submit="false"
        label="Địa chỉ (tên đường)"
        placeholder="Nhập tên đường"
      />

      <SelectElement
        label="Quận"
        name="district"
        :native="true"
        :items="districts"
        :columns="{ container: 6 }"
        label-prop="name"
        value-prop="slug"
      />

      <SelectElement
        label="Phường"
        name="ward"
        :native="true"
        :items="listWards"
        :columns="{ container: 6 }"
        label-prop="name"
        value-prop="slug"
      />

      <StaticElement name="position">
        <ElementGmap
          :map-styles="{
            width: '100%',
            height: '300px'
          }"
          @getPlace="(e) => getPlace(e)"
        />
      </StaticElement>

      <GroupElement name="group">
        <ButtonElement name="button">
          Đóng
        </ButtonElement>

        <ButtonElement name="submit" submits>
          gửi
        </ButtonElement>
      </GroupElement>

    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { districts } from '~/constant/location'

const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'create',
    validator:(x) => ['create', 'update'].includes(x)
  }
})
const emits = defineEmits(['close'])

const form = reactive(props.defaultFormData && props.submitType === 'update' ? props.defaultFormData : {})

const position = reactive({
  lat: 0,
  lng: 0
})

const listWards = computed(() => form.district ? districts.find(x => x.slug === form.district)?.wards : [])

onMounted(() => {

})
const handleSubmit = () => {
  console.log(111)
}
const getPlace = (data) => {
  console.log(121212, data)
}
</script>

<style lang="scss">
.form-control-img {
  display: flex;
  gap: 10px;
  margin: 5px 0 25px 0;
  img {
    width: 80px;
    height: 80px;
    border-radius: 12px
  }
}
.form-submit {
  display: flex;
  justify-content: center
}
</style>