<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginButton',
  emits: ['openLoginModal']
})
</script>

<template>
  <button class="edit-button" @click="$emit('openLoginModal')">Редактировать</button>
</template>

<style scoped>
.edit-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
