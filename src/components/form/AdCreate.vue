<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      sync
      :form-data="form$ => form$.requestData"
      v-model="form"
    >
    <template #empty>
      <!--  -->
      <FormSteps>
        <FormStep
          name="desc"
          :elements="['title', 'content', 'images']"
        >Thông tin</FormStep>
        <FormStep
          name="personal"
          :elements="['adsLocation', 'map']"
        >Địa điểm đặt</FormStep>
        <FormStep
          name="extra"
          :elements="['billboardType', 'height', 'width', 'quantity', 'startDate', 'endDate', 'price']"
        >Thông tin thêm</FormStep>
      </FormSteps>
      <!--  -->

      <FormElements>
        <!-- step 1 -->
        <TextElement
          name="title"
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
        <MultifileElement
          :drop="true"
          name="images"
          view="gallery"
          :url="false"
          order-by="order" :object="true"
          :upload-temp-endpoint="(file, el$) => handleUploadMediaFiles(file, el$)"
          :remove-endpoint="(file, el$) => handleRemoveMediaFiles(file, el$)"
          :max-files="5"
          @mounted="el$ => imagesViews && imagesViews.length && el$.load(imagesViews)"
        />

        <!-- step 2 -->
        <SelectElement
          label="Địa chỉ đặt quảng cáo"
          name="adsLocation"
          rules="required"
          :native="false"
          :items="addresses"
          @change="(e) => changeLocation(e, 'adsLocation')"
        />
        <StaticElement name="map">
          <ElementGmap
            :map-styles="{
              width: '100%',
              height: '300px'
            }"
            :center="mapCenter"
            @open-detail="showAdDetail"
            :markers="markers"
          />
        </StaticElement>

        <!-- step 3 -->
        <SelectElement
          label="Loại bảng quảng cáo"
          rules="required"
          name="billboardType"
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

        <DateElement
          name="startDate"
          rules="required"
          label="ngay dat qc"
          :columns="{ container: 4 }"
          display-format="DD-MM-YYYY"
        />

        <DateElement
          name="endDate"
          label="ngay ket thuc"
          rules="required"
          :columns="{ container: 4 }"
          display-format="DD-MM-YYYY"
        />

        <TextElement
          name="price"
          label="gia"
          :columns="{ container: 4 }"
          type="number"
          placeholder="gia"
        />

      </FormElements>

      <FormStepsControls :labels="false">
        <template #next>
          Bước tiếp theo
        </template>
        <template #previous>
          Quay lại
        </template>
        <template #finish>
          Gửi
        </template>
      </FormStepsControls>
    </template>

    </Vueform>
  </ClientOnly>
</template>

<script setup>
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
const { $apiFetch } = useNuxtApp()
const { getFileUrl } = useMedia()
const emits = defineEmits(['close'])
const { getBillboardTypes, billboardTypes, getAdById } = useAdvertise()
const { getLocations, addresses: locations, markers} = useLocation()

await getBillboardTypes()
await getLocations()
const initData = props.submitType !== 'create' && props.defaultFormData?._id ? await getAdById(props.defaultFormData._id) : {}

const transformData = (data) => {
  return {
    ...data,
    billboardType: data.billboardType?._id,
    adsLocation: data.adsLocation?._id,
  }
}

const form = reactive(props.defaultFormData?._id && props.submitType !== 'create'
  ? JSON.parse(JSON.stringify(transformData(initData)))
  : {}
)

const addresses = computed(() => locations.value?.map(x => ({
  value: x._id,
  label: `${x.address?.streetLine1}, ${x.address?.streetLine2}`
})))

const mapCenter = ref(null)

const changeLocation = (e, fieldname) => {
  const target = locations.value?.find(x => x._id === e)
  if(target && target._id) {
    form[fieldname] = e
    mapCenter.value = {
      lat: target.address.lat,
      lng: target.address.long
    }
  }
}

const showAdDetail = ({value}) => {
  if(value._id) {
    form.adsLocation = value._id
  }
}

const imagesViews = ref(form?.images?.map((x, i) => ({ file: getFileUrl(x.path), order: i+1 })) || [])

const handleUploadMediaFiles = async (file, el$) => {
  return {
    tmp: file.name, // the temp file identifier
    originalName: file.name, // the original name of the file that will be displayed to the user
    file
  }
}
const handleRemoveMediaFiles = async (file, el$) => {
  imagesViews.value = imagesViews.value.filter(x => x.file !== file)
}

const handleSubmit = async (form, $el) => {

  var formdata = new FormData();
  const keys = Object.keys(form)
  for (let i = 0; i < keys.length; i++) {
    if(keys[i] === 'images') {
      for (let k = 0; k < form.images.length; k++) {
        if(form.images[k]?.file?.file) formdata.append('images', form.images[k].file.file)
      }
    } else {
      formdata.append(keys[i], form[keys[i]])
    }
  }

  try {
    const endpoint = props.submitType === 'create' ? '/ads' : `/ads/${props.defaultFormData._id}`
    const options = {
      method: props.submitType === 'create' ? 'POST' : 'PATCH',
      body: formdata
    }
    const res = await $apiFetch(endpoint, options)
    emits('close')
    return true
  } catch (error) {
    console.log({error})
    return false
  }

}
</script>