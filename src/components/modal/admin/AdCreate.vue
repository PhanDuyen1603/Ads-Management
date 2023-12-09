<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)" :form-data="form$ => form$.requestData" v-model="form"
    >
      <!-- <TextElement
        name="title"
        :submit="false"
        label="Tiêu đề quảng cáo"
        placeholder="Nhập tên bảng quảng cáo"
        :messages="{ required: 'Vui lòng nhập vào biểu mẫu' }"
      /> -->
      <TextareaElement
        name="content"
        rules="required"
        label="Thông tin bảng quảng cáo"
        placeholder="Nhập thông tin bảng quảng cáo"
      />
      <DateElement
        name="start_date"
        value-format="DD-MM-YYYY"
        load-format="DD-MM-YYYY"
        display-format="DD-MM-YYYY"
        label="Ngày bắt đầu"
        placeholder="Nhập ngày bắt đầu"
      />
      <DateElement
        name="end_date"
        value-format="DD-MM-YYYY"
        load-format="DD-MM-YYYY"
        display-format="DD-MM-YYYY"
        label="Ngày kết thúc"
        placeholder="Nhập ngày kết thúc"
      />
      <SelectElement label="Địa chỉ đặt quảng cáo" name="addressId" :native="false" :items="adsLocations" />
      <SelectElement label="Loại quảng cáo" name="adsCategoryId" :native="false" :items="adsCategories" />
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

      <!-- <TextElement
        name="price"
        label="Giá tiền"
        placeholder="Nhập giá tiền bảng quảng cáo"
      /> -->

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
        'Tạo mới'
      </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script>
import useAdsStore from '~/stores/ads.store'
export default {
  async setup() {
    const adsStore = useAdsStore()
    await adsStore.getLocations()
    await adsStore.getCategories()
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

    const adsLocations = computed(() => adsStore.adsLocations)
    const adsCategories = computed(() => adsStore.adsCategories)
    return {
      adsLocations,
      adsCategories,
      form,
      handleSubmit
    }
  }
}
</script>