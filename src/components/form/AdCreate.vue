<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData" v-model="form"
      sync
    >
    <template #empty>
      <!--  -->
      <FormSteps>
        <FormStep
          name="desc"
          :elements="['title', 'content']"
        >Thông tin</FormStep>
        <FormStep
          name="personal"
          :elements="['addressId', 'map']"
        >Địa điểm đặt</FormStep>
        <FormStep
          name="extra"
          :elements="['adsCategoryId', 'billboardTypeId', 'height', 'width', 'quantity']"
        >Thông tin thêm</FormStep>
      </FormSteps>
      <!--  -->

      <FormElements>
        <!-- step 1 -->
        <TextElement
          name="title"
          :submit="false"
          rules="required"
          label="Tiêu đề quảng cáo"
          placeholder="Nhập tên bảng quảng cáo"
          :messages="{ required: 'Vui lòng nhập vào biểu mẫu' }"
        />
        <TextareaElement
          name="content"
          rules="required"
          label="Thông tin bảng quảng cáo"
          placeholder="Nhập thông tin bảng quảng cáo"
        />

        <!-- step 2 -->
        <SelectElement
          label="Địa chỉ đặt quảng cáo"
          name="addressId"
          :native="false"
          :items="addresses"
          @change="(e) => changeLocation(e, 'addressId')"
        />
        <StaticElement name="map">
          <ElementGmap
            :map-styles="{
              width: '100%',
              height: '300px'
            }"
            :center="mapCenter"
          />
        </StaticElement>

        <!-- step 3 -->
        <SelectElement
          label="Hình thức quảng cáo"
          name="adsCategoryId"
          :native="false"
          :items="adsCategories"
        />
        <SelectElement
          label="Loại bảng quảng cáo"
          name="billboardTypeId"
          :native="false"
          :items="billboardTypes"
        />
        <TextElement
          name="height"
          label="Chiều dài"
          type="number"
          :columns="{ container: 4 }"
        />
        <TextElement
          name="width"
          label="Chiều rộng"
          :columns="{ container: 4 }"
          type="number"
        />
        <TextElement
          name="quantity"
          label="Số lượng"
          :columns="{ container: 4 }"
          type="number"
          placeholder="Số lượng"
        />
      </FormElements>

      <FormStepsControls :labels="false">
        <template #next>
          bước tiếp theo
        </template>
        <template #previous>
          quay lại
        </template>
        <template #finish>
          gửi
        </template>
      </FormStepsControls>
    </template>

      <!-- <MultifileElement
        :drop="true"
        name="images"
        view="gallery"
        :upload-temp-endpoint="handleUpload"
        :remove-temp-endpoint="handleRemoveTemp"
        :max-files="5"
        @remove="handleRemoveImage"
      /> -->

    </Vueform>
  </ClientOnly>
</template>

<script setup>
import useAdsStore from '~/stores/ads.store'
import useMapStore from '~/stores/map.store'

const adsStore = useAdsStore()
const mapStore = useMapStore()

const props = defineProps({
  defaultFormData: {
    type: Object,
    default: null
  },
  submitType: {
    type: String,
    default: 'create',
    validator:(x) => ['create', 'update', 'request'].includes(x)
  }
})
const emits = defineEmits(['close'])

await adsStore.getCategories()
await adsStore.getBillboardTypes()

const form = reactive(props.defaultFormData && props.submitType === 'update' ? props.defaultFormData : {})

const adsCategories = computed(() => adsStore.adsCategories)
const billboardTypes = computed(() => adsStore.adsBillboardTypes)
const addresses = computed(() => mapStore.addresses.map(x => ({
  value: x._id,
  label: x.streetLine1
})))
const mapCenter = ref(null)

const handleSubmit = async (form, $el) => {
  try {
    const endpoint = props.submitType === 'create' ? '/api/advertise/create' : `/api/advertise/${props.defaultFormData._id}`
    const options = {
      method: props.submitType === 'create' ? 'POST' : 'PUT',
      body: form,
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await $fetch(endpoint, options)
    emits('close')
  } catch (error) {
    console.log({error})
  }
}
const changeLocation = (e, fieldname) => {
  const target = mapStore.addresses.find(x => x._id === e)
  if(target && target._id) {
    form[fieldname] = e
    mapCenter.value = {
      lat: target.lat,
      lng: target.lng
    }
  }
}
</script>