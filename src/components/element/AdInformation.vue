<template>
  <div class="ad_info">
    <h3>trụ, cụm pano</h3>
    <p>Đồng khởi, quậnn 1, tp hồ chí minh</p>
    <p>kich thuoc: 2.5m x 1.2m</p>
    <p>so luong: <strong>1 tru/bang</strong></p>
    <p>hinh thuc: <strong>co dong chinh tri</strong></p>
    <p>phan loai: <strong>dat cong</strong></p>
    <div class="ad_info_actions">
        <IconsInfoCircle fill="blue" />
      <div>
        <button class="btn btn-outline-danger bt-alert">
          <span>
            <IconsExclamationOctagon fill="red" />
          </span>
          <span>Báo cáo vi phạm</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  detail: {
    type: String,
    default: null
  }
})
</script>

<style>
.bt-alert {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ad_info {
  padding: 15px;
  border-radius: 3px;
  border: 1px solid gray
}
.ad_info p {
  margin-bottom: .5rem;
}
.ad_info h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: .8rem;
}
.ad_info_actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>