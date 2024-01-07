<template>
  <ClientOnly>
    <Vueform
      :endpoint="(form, el) => handleSubmit(form, el)"
      sync
      :form-data="(form$) => form$.requestData"
      v-model="form"
    >
      <SelectElement
        name="district"
        rules="required"
        label="Quận"
        placeholder="Quận"
        label-prop="name" 
        value-prop="_id" 
        :columns="{ container: 6 }"
        :items="districts"
      />

      <SelectElement
        name="ward"
        label="Phường"
        placeholder="Phường"
        label-prop="name" 
        value-prop="_id" 
        :columns="{ container: 6 }"
        :items="listWards"
      />

      <ButtonElement name="submit" submits> Phân công </ButtonElement>
    </Vueform>
  </ClientOnly>
</template>

<script setup>
import { useToast } from "vue-toastification";
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});
const form = ref({
  ward: props.modelValue.assigned?.ward || '',
  district: props.modelValue.assigned?.district || '',
});
const toast = useToast();
const { assignStaff } = useStaff();
const { getWards, getDistricts } = useLocation();
const emits = defineEmits(["close"]);

const districts = await getDistricts();
const wards = await getWards();

const listWards = computed(() => form.value?.district ? wards.filter(x => x.district?._id === form.value.district) : wards)

const handleSubmit = async (form, el) => {
  await assignStaff({
    id: props.modelValue._id,
    ...form
  })
  emits("close");
};
</script>
