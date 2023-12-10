<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)" :form-data="form$ => form$.requestData" v-model="form"
    >
      <TextElement
        name="title"
        :submit="false"
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

      <SelectElement label="Địa chỉ đặt quảng cáo" name="addressId" :native="false" :items="addresses" />
      <SelectElement label="Hình thức quảng cáo" name="adsCategoryId" :native="false" :items="adsCategories" />
      <SelectElement label="Loại bảng quảng cáo" name="billboardTypeId" :native="false" :items="billboardTypes" />

      <TextElement
        name="height"
        label="Chiều dài"
        type="number"
        placeholder="Nhập chiều dài bảng quảng cáo"
      />
      <TextElement
        name="width"
        label="Chiều rộng"
        type="number"
        placeholder="Nhập chiều rộng bảng quảng cáo"
      />
      <TextElement
        name="quantity"
        label="Số lượng"
        type="number"
        placeholder="Số lượng"
      />

      <!-- <MultifileElement
        :drop="true"
        name="images"
        view="gallery"
        :upload-temp-endpoint="handleUpload"
        :remove-temp-endpoint="handleRemoveTemp"
        :max-files="5"
        @remove="handleRemoveImage"
      /> -->

      <ButtonElement name="submit" add-class="mt-2" submits>
        Tạo mới
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script>
import useAdsStore from '~/stores/ads.store'
import useMapStore from '~/stores/map.store'

export default {
  async setup() {
    const adsStore = useAdsStore()
    const mapStore = useMapStore()

    await adsStore.getCategories()
    await adsStore.getBillboardTypes()
    const form = reactive({})

    const handleSubmit = async (form, $el) => {
      try {
        const res = await $fetch('/api/advertise/create', {
          method: 'POST',
          body: form,
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(res)
      } catch (error) {
        console.log({error})
      }
    }

    const adsCategories = computed(() => adsStore.adsCategories)
    const billboardTypes = computed(() => adsStore.adsBillboardTypes)
    const addresses = computed(() => mapStore.addresses.map(x => ({
      value: x._id,
      label: x.streetLine1
    })))

    return {
      addresses,
      adsCategories,
      billboardTypes,
      form,
      handleSubmit
    }
  }
}
</script>