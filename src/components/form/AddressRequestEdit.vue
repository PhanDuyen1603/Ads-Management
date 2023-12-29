<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
      sync
    >

      <TextElement
        name="streetLine1"
        label="Địa chỉ (số)"
        placeholder="Nhập số nhà"
        :submit="submitType === 'request' ? false : true"
        :readonly="submitType === 'request' ? true : false"
      />

      <TextElement
        name="streetLine2"
        label="Địa chỉ (tên đường)"
        placeholder="Nhập tên đường"
        :submit="submitType === 'request' ? false : true"
        :readonly="submitType === 'request' ? true : false"
      />

      <SelectElement
        label="Loại địa điểm"
        name="locationType"
        rules="required"
        :native="false"
        :items="locationsTypes"
        :submit="submitType === 'request' ? false : true"
        :disabled="submitType === 'request' ? true : false"
      />

      <ToggleElement
        name="isPlanned"
        :submit="submitType === 'request' ? false : true"
        :disabled="submitType === 'request' ? true : false"
      >
        Thông tin quy hoạch
      </ToggleElement>

      <SelectElement
        label="Loại quảng cáo"
        name="adsCategory"
        rules="required"
        :native="false"
        :items="adsCategories"
        :submit="submitType === 'request' ? false : true"
        :disabled="submitType === 'request' ? true : false"
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

      <TextareaElement
        v-if="submitType === 'request'"
        name="reason"
        label="Nội dung chỉnh sửa"
      />

      <StaticElement readonly name="position">
        <ElementGmap
          :map-styles="{
            width: '100%',
            height: '300px'
          }"
          :markers="[defaultFormData]"
          @getPlace="(e) => getPlace(e)"
          :center="{ lat: form.lat, lng: form.long }"
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
const { updateLocation, getLocation, getLocationTypes, requestUpdateLocation, locationsTypes } = useLocation()
const { getAdsCategories, adsCategories } = useAdvertise()

await getLocationTypes()
await getAdsCategories()
const initData = await getLocation(props.defaultFormData._id)

const form = reactive(mapAdsLocationDetail(initData))

const handleSubmit = async (submitForm, el) => {
  if(props.submitType === 'update') await updateLocation(props.defaultFormData._id, submitForm)
  if(props.submitType === 'request') {
    submitForm.adsLocation = props.defaultFormData._id
    await requestUpdateLocation(submitForm)
  }
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