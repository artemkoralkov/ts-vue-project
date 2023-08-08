<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'CreateLessonButton',
  data() {
    return {
      scheduleStore: useScheduleStore()
    }
  },
  props: {
    lessonNumber: {
      type: Number,
      required: true
    },
    dayName: {
      type: String as PropType<Day>,
      required: true
    }
  },
  emits: ['createLesson']
})
</script>

<template>
  <button class="button" @click="this.scheduleStore.openLessonModal(dayName, lessonNumber)">
    <span class="material-icons"> add </span>
  </button>
</template>

<style scoped></style>
