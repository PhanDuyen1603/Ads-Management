<template>
  <div class="modal_ad_detail">
    <Vueform
      sync
      :endpoint="(form, el) => handleSubmit(form, el)"
      :form-data="form$ => form$.requestData"
      v-model="form"
    >
        <TextElement
          name="fullName"
          class="disable_mouse"
          :columns="{ container: 12, label: 4, wrapper: 12 }"
          :submit="false"
          label="Họ và tên người gửi: "
        />
        <TextElement
          name="phone"
          :columns="{ container: 12, label: 4, wrapper: 12 }"
          class="disable_mouse"
          :submit="false"
          label="Số điện thoại: "
        />
        <TextElement
          name="email"
          :columns="{ container: 12, label: 4, wrapper: 12 }"
          class="disable_mouse"
          :submit="false"
          label="Email: "
        />
        <EditorElement
          name="content"
          :columns="{ container: 12, label: 4, wrapper: 12 }"
          class="disable_mouse"
          :submit="false"
          :hide-tools="['attach', 'bold', 'italic',
            'strike', 'link', 'heading',
            'quote', 'code', 'bullet-list',
            'number-list', 'decrease-nesting', 'increase-nesting',
            'attach', 'undo', 'redo'
          ]"
          label="Nội dung báo cáo: "
        />
        <StaticElement name="map">
          <!-- <b>Thông tin biển quảng cáo</b>
          {{ modelValue.ads }}
          <div class="row">
            <div class="col-6">{{ modelValue.das.title }}</div>
            <div class="col-6">{{ modelValue.das.content }}</div>
            <div class="col-6"></div>
          </div> -->
          <!-- <ElementGmap
            :map-styles="{
              width: '100%',
              height: '300px'
            }"
            :center="mapCenter"
          /> -->
        </StaticElement>
        <!-- TODO: list image -->
        <MultifileElement
          v-if="modelValue.report?.images && modelValue.report?.images.lengths"
          name="images"
          view="gallery"
          :url="false"
          order-by="order" :object="true"
          @mounted="el$ => imagesViews && imagesViews.length && el$.load(imagesViews)"
        />
        <EditorElement
          name="handle"
          :columns="{ container: 12, label: 4, wrapper: 12 }"
          :submit="false"
          label="Hình thức xử lý: "
        />
        <ToggleElement text="Trạng thái xử lý" name="status" :true-value="1" :false-value="0" />
        <ButtonElement name="submit" submits>
           Lưu thay đổi
        </ButtonElement>
    </Vueform>
  </div>
</template>

<script setup>
import { keys } from '~/utils/generateAdReports'
import get from '~/utils/getter/get';
const props = defineProps({
  modelValue: {
    type: Object,
    default:() => {}
  },
  type: {
    type: String,
    default: 'ad',
    validator:(x) => ['ad', 'location'].includes(x)
  }
})
const { changeStatue } = useAdReport()
const emits = defineEmits(['close'])
const imagesViews = []

const form = ref({
 fullName: get(props.modelValue, keys.fullName),
 phone: get(props.modelValue, keys.phone),
 email: get(props.modelValue, keys.email),
 content: get(props.modelValue, keys.content),
 status: get(props.modelValue, keys.status),
})

const handleSubmit = async (form, el) => {
  console.log(1)
  if (props.type === 'ad') {
    // awa
    const status = form.status
    const res = await changeStatue(props.modelValue._id, { status })
    console.log({res})
  }
  emits('close')
}

</script>

<style lang="scss">
.modal_ad_detail {
  display: flex;
  flex-direction: column;
  .detail_item {
    display: inline-flex;
    gap: 10px;
    h4 {
      font-weight: 600;
      font-size: 16px;
    }
    p {
      // font-size: 14px
    }
  }
}
.disable_mouse {
  pointer-events: none
}
</style>