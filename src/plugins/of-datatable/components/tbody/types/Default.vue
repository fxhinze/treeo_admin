<template>
  <div class="of-text-overflow">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    }
  }
}
</script>
