<template>
  <div class="page flex flex-column">
    <div class="page-header pb4" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="flex justify-end pb2" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="flex-1 page-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout"
};
</script>
