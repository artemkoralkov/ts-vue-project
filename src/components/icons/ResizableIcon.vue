<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ResizableIcon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
})
</script>
<template>
  <span class="material-symbols-outlined icon-style">{{ iconName }}</span>
</template>

<style>
span.icon-style {
  @media screen {
    font-size: 40px;
    font-variation-settings: 'OPSZ' 40;
  }

  @media (max-width: 450px) {
    font-size: 20px;
    font-variation-settings: 'OPSZ' 20;
  }
}
</style>
