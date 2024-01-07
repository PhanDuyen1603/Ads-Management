<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <TableBillboardTypes />
      </div>
      <div class="col-6">
        <TableReportTypes />
      </div>
      <div class="col-6">
        <TableAdsCategories />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
</script>
