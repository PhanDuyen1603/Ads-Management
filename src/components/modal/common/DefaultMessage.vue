<template>
  <div class="modal-message" :calss="wrapperClass">
    <div class="modal-message-head">
      <div v-if="title" class="modal-title">
        {{ title }}
      </div>
      <button class="modal-close" @click="$emit('close')"></button>
    </div>

    <div class="modal-content" :style="textStyles? textStyles : ''">
      {{ message }}
    </div>

    <div class="modal-actions">
      <div class="modal-button">
        <button
          v-for="(item, index) in btns"
          :key="index"
          type="button"
          :class="`btn btn-${item.value ? 'success' : 'danger'}`"
          @click="$emit('close', item.value)"
        >{{ item.label }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    wrapperClass: {
      type: String,
      default: '',
    },
    btns: {
      type: Array,
      default:() => [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    },
    textStyles: {
      type: Object,
      required: false,
    },
  }
}
</script>

<style lang="scss" scoped>
.modal-message {
  .modal-message-head {
    height: 40px;
    position: relative;
  }
  .modal-content {
    padding: 17px 30px;
    font-size: var(--fs-lg);
    font-weight: 400;
    color: #222;
    line-height: 26px;
    text-align: center;
  }
  .modal-close {
    position: absolute;
    top: -16px;
    right: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border: unset;
    background-color: unset;
    opacity: 0.3;
  }
  .modal-close:hover {
    opacity: 1;
  }
  .modal-close:before, .modal-close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
  }
  .modal-close:before {
    transform: rotate(45deg);
  }
  .modal-close:after {
    transform: rotate(-45deg);
  }
}

.modal-button {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  // button {
  //   padding: 5px 10px;
  //   background-color: var(--clr-red-primary);
  //   border-color: var(--clr-red-primary);
  //   color: #fff;
  //   border-radius: 8px;
  //   text-align: center;
  //   transition: .2s all ease;
  //   width: 50%;
  //   &:hover {
  //     box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  //   }
  //   &.btn-confirm {
  //     background-color: var(--clr-green-primary);
  //     border-color: var(--clr-green-primary);
  //   }
  // }
}
</style>