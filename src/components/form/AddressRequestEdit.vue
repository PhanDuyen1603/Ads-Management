<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
      sync
    >
      <TextElement
        name="user"
        :disabled="true"
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
        :disabled="true"
        :submit="false"
        readonly
        label="Địa chỉ (số)"
        placeholder="Nhập số nhà"
      />

      <TextElement
        name="streetLine2"
        :disabled="true"
        :submit="false"
        readonly
        label="Địa chỉ (tên đường)"
        placeholder="Nhập tên đường"
      />

      <SelectElement
        label="Loại địa điểm"
        name="locationType"
        :native="false"
        :items="locationsTypes"
      />

      <SelectElement
        label="Loại quảng cáo"
        name="adsCategory"
        :native="false"
        :items="adsCategories"
      />

      <TextElement
        label="Quận"
        :disabled="true"
        :submit="false"
        readonly
        name="district"
        :columns="{ container: 6 }"
      />

      <TextElement
        label="Phường"
        :disabled="true"
        :submit="false"
        readonly
        name="ward"
        :columns="{ container: 6 }"
      />

      <StaticElement readonly name="position">
        <ElementGmap
          :map-styles="{
            width: '100%',
            height: '300px'
          }"
          @getPlace="(e) => getPlace(e)"
        />
      </StaticElement>

      <GroupElement name="group">
        <ButtonElement name="submit" submits>
          gửi
        </ButtonElement>
      </GroupElement>

    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { mapAdsLocationDetail } from '~/utils/mapData'

const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'update',
    validator:(x) => ['update', 'request'].includes(x)
  }
})
const emits = defineEmits(['close'])
const { updateLocation, getLocation, getLocationTypes, locationsTypes } = useLocation()
const { getAdsCategories, adsCategories } = useAdvertise()

await getLocationTypes()
await getAdsCategories()
const initData = await getLocation(props.defaultFormData._id)

const form = reactive(mapAdsLocationDetail(initData))

const handleSubmit = async () => {
  if(props.submitType === 'update') await updateLocation(props.defaultFormData._id, form)
  emits('close')
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