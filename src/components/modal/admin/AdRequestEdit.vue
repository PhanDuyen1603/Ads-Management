<template>
  <div class="card-body">
    <form class="form-horizontal form-material">
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
      </div>
    </form>
  </div>
</template>

<script setup>
import { mapPositionType } from '~/utils/generateLocation'
const props = defineProps({
  info: {
    type: Object,
    default:() => {}
  }
})
onMounted(() => {
  console.log(props.info)
})
</script>