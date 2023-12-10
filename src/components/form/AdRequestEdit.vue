<template>
  <div class="card-body">
    <form class="form-horizontal form-material" @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="col-md-12">Tên người sửa</label>
        <div class="col-md-12">
          <input type="text" placeholder="Johnathan Doe" class="form-control form-control-line">
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-12">Ngày chỉnh sửa</label>
        <div class="col-md-12">
          <input type="text" placeholder="Johnathan Doe" class="form-control form-control-line">
        </div>
      </div>
      <div>Nội dung chỉnh sửa</div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="col-sm-12">Khu vực</label>
            <div class="col-sm-12">
              <select class="form-control form-control-line">
                <option>Phường</option>
                <option>Quận</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="col-sm-12">Loại vị trí</label>
            <div class="col-sm-12">
              <select class="form-control form-control-line">
                <option v-for="(item, index) in Object.values(mapPositionType)">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-group">
            <label class="col-sm-12">Hình thức quảng cáo</label>
            <div class="col-sm-12">
              <select class="form-control form-control-line">
                <option v-for="(item, index) in Object.values(mapAdvertisingType)">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-12">
          <label class="col-sm-12">Hình ảnh điểm đặt bảng quảng cáo</label>
          <div class="form-control-img">
            <img v-for="(img, index) in info.images" :key="`img_${index}`" :src="img || ''"/>
          </div>
        </div>

        <div class="form-submit">
          <button class="btn btn-success">
            Gửi đi
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { mapPositionType, mapAdvertisingType } from '~/utils/generateLocation'
const props = defineProps({
  info: {
    type: Object,
    default:() => {}
  }
})
onMounted(() => {
  console.log(props.info)
})
const onSubmit = () => {
  console.log(111)
}
</script>

<style lang="scss">
.form-control-img {
  display: flex;
  gap: 10px;
  margin: 5px 0 25px 0;
  img {
    width: 80px;
    height: 80px;
    border-radius: 12px
  }
}
.form-submit {
  display: flex;
  justify-content: center
}
</style>