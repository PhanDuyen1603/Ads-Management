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
        <TextElement name="streetLine1" label="địa chỉ" placeholder="streetLine1" />
        <TextElement name="streetLine2" label="Tên đường" placeholder="streetLine1" />
        <TextElement
          name="city"
          rules="required"
          label="thanh pho"
          placeholder="thanh pho"
          readonly
        />

        <SelectElement
          label="Loại địa điểm"
          name="locationType"
          :native="false"
          :items="locationsTypes"
        />

        <TextElement
          name="district"
          rules="required"
          label="quan"
          placeholder="quan"
          :columns="{ container: 6 }"
          readonly
        />
        <TextElement
          name="ward"
          rules="required"
          label="phuong"
          placeholder="phuong"
          :columns="{ container: 6 }"
          readonly
        />
        <TextElement
          name="lat"
          rules="required"
          input-type="number"
          label="Kinh do"
          placeholder="Kinh do"
          :columns="{ container: 6 }"
          readonly
        />
        <TextElement
          name="lng"
          rules="required"
          input-type="number"
          label="vi do"
          placeholder="vi do"
          :columns="{ container: 6 }"
          readonly
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
const form = reactive({})
const { createLocation, getLocationTypes, locationsTypes } = useLocation()

await getLocationTypes()

const setPlace = ({ value }) => {
  form.title = value.title
  form.streetLine1 = value.streetLine1
  form.lat = value.position?.lat
  form.lng = value.position?.lng
  form.ward = value.ward
  form.city = value.city
  form.district = value.district
}

const handleCreateLocation = async (form, el$) => {
  try {
    const res = await createLocation(form)
    console.log({res})
  } catch (error) {
    console.log({error})
  }
}

</script>
