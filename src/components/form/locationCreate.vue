<template>
  <div>
    <ClientOnly>
      <Vueform
        :endpoint="(form, el$) => handleCreateLocation(form, el$)"
        :form-data="form$ => form$.requestData"
        v-model="form"
        class="form_create_address"
        sync
      >

        <StaticElement name="map">
          <ElementGmap
            :map-styles="{
              width: '100%',
              height: '300px'
            }"
            :show-markers="false"
            @getPlace="setPlace"
          />
        </StaticElement>

        <TextElement name="title" label="Tên địa điểm" placeholder="Tên" />
        <TextElement name="streetLine1" label="Địa chỉ" placeholder="streetLine1" />
        <TextElement name="streetLine2" label="Tên đường" placeholder="streetLine1" />
        <TextElement
          name="city"
          rules="required"
          label="Thành phố"
          placeholder="Thành phố"
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
          rules="required"
          :native="false"
          :items="adsCategories"
        />

        <SelectElement
          name="district"
          rules="required"
          label="Quận"
          placeholder="Quận"
          :columns="{ container: 6 }"
          :items="listDistricts"
        />

        <SelectElement
          name="ward"
          rules="required"
          label="Phường"
          placeholder="Phường"
          :columns="{ container: 6 }"
          :items="listWards"
        />
        <TextElement
          name="lat"
          rules="required"
          input-type="number"
          label="Kinh độ"
          placeholder="Kinh độ"
          :columns="{ container: 6 }"
          readonly
          :disabled="true"
        />
        <TextElement
          name="long"
          rules="required"
          input-type="number"
          label="Vĩ độ"
          placeholder="Vĩ độ"
          :columns="{ container: 6 }"
          readonly
          :disabled="true"
        />

        <ButtonElement
          name="submit"
          add-class="mt-2"
          submits
        >
          Tạo mới
        </ButtonElement>
      </Vueform>
    </ClientOnly>
  </div>
</template>

<script setup>
import { standardize_district, standardize_ward } from '~/utils/location/locations'
import { slugify } from "~/utils/string/slug"
const emits = defineEmits(['close', 'refresh'])
const form = reactive({})
const { createLocation, getLocationTypes, locationsTypes, getWards, getDistricts } = useLocation()
const { getAdsCategories, adsCategories } = useAdvertise()

await getLocationTypes()
await getAdsCategories()
const listDistricts = await getDistricts(true)
const listWards = await getWards(true)

const setPlace = async ({ value }) => {
  const district = standardize_district(value.full_address)
  const ward = standardize_ward(value.full_address)
  const isExistDistrict = listDistricts.find(x => {
    let slugText = slugify(x.label)
    if(!slugText.startsWith('quan')) slugText = `quan${slugText}`
    return slugText === slugify(district)
  })
  const isExistWard = listWards.find(x => {
    let slugText = slugify(x.label)
    return slugText === slugify(ward)
  })
  if(!isExistDistrict) return window.alert('Quận không khả dụng')
  if(!isExistWard) return window.alert('Phường không khả dụng')
  form.title = value.title
  form.streetLine1 = value.streetLine1
  form.lat = value.position?.lat
  form.long = value.position?.lng
  form.city = 'Hồ Chí Minh'
  form.ward = isExistWard.value
  form.district = isExistDistrict.value
}

const handleCreateLocation = async (form, el$) => {
  try {
    const res = await createLocation(form)
    emits('refresh')
    emits('close')
  } catch (error) {
    console.log({error})
  }
}

</script>
