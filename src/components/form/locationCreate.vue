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
          readonly
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
          name="district"
          rules="required"
          label="Quận"
          placeholder="Quận"
          :columns="{ container: 6 }"
          readonly
          :disabled="true"
        />
        <TextElement
          name="ward"
          rules="required"
          label="Phường"
          placeholder="Phường"
          :columns="{ container: 6 }"
          readonly
          :disabled="true"
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
const emits = defineEmits(['close'])
const form = reactive({})
const { createLocation, getLocationTypes, locationsTypes } = useLocation()
const { getAdsCategories, adsCategories } = useAdvertise()

await getLocationTypes()
await getAdsCategories()

const setPlace = ({ value }) => {
  form.title = value.title
  form.streetLine1 = value.streetLine1
  form.lat = value.position?.lat
  form.long = value.position?.lng
  form.ward = value.ward
  form.city = value.city
  form.district = value.district
}

const handleCreateLocation = async (form, el$) => {
  try {
    const res = await createLocation(form)
    emits('close')
  } catch (error) {
    console.log({error})
  }
}

</script>
