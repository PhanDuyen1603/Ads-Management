<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
      sync
    >
      <StaticElement name="head">
        <h3>Yêu cầu chỉnh sửa</h3>
      </StaticElement>
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
        :object="true"
        :upload-temp-endpoint="(file, el$) => handleUploadMediaFiles(file, el$)"
        :remove-endpoint="(file, el$) => handleRemoveMediaFiles(file, el$)"
      />

      <!-- <SelectElement
        label="Loại bảng quảng cáo"
        rules="required"
        name="billboardType"
        :items="billboardTypes"
      /> -->
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

      <DateElement
        name="startDate"
        rules="required"
        label="Ngày đặt quảng cáo"
        :columns="{ container: 4 }"
        display-format="DD-MM-YYYY"
      />

      <DateElement
        name="endDate"
        label="Ngày kết thúc"
        rules="required"
        :columns="{ container: 4 }"
        display-format="DD-MM-YYYY"
      />

      <TextElement
        name="price"
        label="Giá"
        :columns="{ container: 4 }"
        type="number"
        placeholder="Giá"
      />

      <TextareaElement
        rules="required"
        name="reason"
        label="Lý do chỉnh sửa"
      />
      <ButtonElement name="submit" submits>
        Gửi
      </ButtonElement>
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
  },
  formType: {
    type: String,
    default: 'ad',
    validator:(x) => ['location', 'ad'].includes(x)
  }
})
const emits = defineEmits(['close'])
// const { getBillboardTypes, billboardTypes, requestUpdateAd } = useAdvertise()
const { requestUpdateAd } = useAdvertise()
import { useCloned } from '@vueuse/core'
const { getFileUrl } = useMedia()

// await getBillboardTypes()

const transformData = (data) => {
  return {
    ...data,
    billboardType: data.billboardType?._id,
    adsLocation: data.adsLocation?._id,
    images: data.images?.map(x => ({ file: getFileUrl(x.path) })) || []
  }
}

const form = reactive(JSON.parse(JSON.stringify(transformData(props.defaultFormData))))

const imagesViews = ref([])

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

const handleSubmit = async (submitForm, el) => {
  var formdata = new FormData();
  if(submitForm.images && submitForm.images.length && typeof submitForm.images[0].file !== 'string') {
    for (let k = 0; k < submitForm.images.length; k++) {
      if(submitForm.images[k]?.file?.file) formdata.append('images', submitForm.images[k].file.file)
    }
}
formdata.append('ads', props.defaultFormData._id)
  formdata.append('title', submitForm.title)
  formdata.append('content', submitForm.content)
  formdata.append('price', submitForm.price)
  formdata.append('height', submitForm.height)
  formdata.append('width', submitForm.width)
  formdata.append('startDate', submitForm.startDate)
  formdata.append('endDate', submitForm.endDate)
  formdata.append('reason', submitForm.reason)

  await requestUpdateAd(formdata)
  emits('close')
}
</script>