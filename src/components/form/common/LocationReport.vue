<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
      sync
    >
      <TextElement
        name="firstName"
        label="Họ và tên đệm"
        placeholder="Nhập họ và tên đệm"
        rules="required"
        :columns="{ container: 6 }"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
        :submit="false"
      />
      <TextElement
        name="lastName"
        rules="required"
        label="Tên"
        placeholder="Nhập tên"
        :columns="{ container: 6 }"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
        :submit="false"
      />
      <TextElement
        name="email"
        label="Email"
        placeholder="Email"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
      />

      <TextElement
        name="phone"
        rules="required"
        label="Số điện thoại"
        placeholder="Điện thoại liên lạc"
        :messages="{ required: 'Vui lòng nhập đầy đủ thông tin' }"
      />

      <SelectElement
        label="Hình thức báo cáo"
        rules="required"
        name="reportType"
        :native="false"
        :items="reportTypes"
      />

      <EditorElement
        name="content"
        rules="required"
        label="Nội dung báo cáo"
        :accept="['image/png', 'image/jpeg']"
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

      <StaticElement>
        <ElementCaptcha ref="captcha" />
      </StaticElement>

      <ButtonElement name="submit" submits>
        Gửi báo cáo
      </ButtonElement>

    </Vueform>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  addressId: {
    type: String,
    default: ''
  },
  adId: {
    type: String,
    default: ''
  },
  updateType: {
    type: String,
    default: 'location',
    validator:(x) => ['location', 'ad'].includes(x)
  }
})
const emits = defineEmits(['close'])
const captcha = ref(null)
const form = reactive({})
const { $clientId } = useNuxtApp()
const { getFileUrl } = useMedia()
const { getReportTypes } = useReport()
const { createReport } = useAdReport()
const { createReport: createAdLocationReport } = useAdLocationReport()

const reportTypes = await getReportTypes()

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

const handleSubmit = async (submitForm, el) => {
  // check captcha
  const { value: captchaRes } = await captcha.value.checkCaptcha()
  // console.log({ captchaRes, captcha: captcha.value })
  if(!captchaRes) return false
  const _id = props.updateType === 'ad' ? props.adId : props.addressId

  if (!_id) window.alert('Khong tim thay quang cao hay địa điểm')
  var formdata = new FormData();

  const keys = Object.keys(submitForm)

  for (let i = 0; i < keys.length; i++) {
    if(keys[i] === 'images') {
      for (let k = 0; k < submitForm.images.length; k++) {
        if(submitForm.images[k]?.file?.file) formdata.append('images', submitForm.images[k].file.file)
      }
    } else {
      formdata.append(keys[i], submitForm[keys[i]])
    }
  }
  formdata.append('fullName', `${form.firstName} ${form.lastName}`)
  formdata.append('guestId', $clientId)
  if(props.updateType === 'ad') formdata.append('adsId', _id)
  if(props.updateType === 'location') formdata.append('adsLocationId', _id)
  try {
    const res = props.updateType === 'ad' ? await createReport(formdata) : await createAdLocationReport(formdata)
    const list = props.updateType === 'ad' ? window.localStorage.getItem('reports') : window.localStorage.getItem('reports_location') || ''
    if(props.updateType === 'ad') window.localStorage.setItem('reports', list && list.length ? `${list}, ${res.data?.adsReport?._id}` : res.data?.adsReport?._id)
    if(props.updateType === 'location') window.localStorage.setItem('reports_location', list && list.length ? `${list}, ${res.data?.adsLocationReport?._id}` : res.data?.adsLocationReport?._id)
    emits('close')
  } catch (error) {
    console.log({error})
  }

}
</script>