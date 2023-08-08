<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'EditLessonButton',
  data() {
    return {
      scheduleStore: useScheduleStore()
    }
  },
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    dayName: {
      type: String as PropType<Day>,
      required: true
    }
  }
})
</script>

<template>
  <button
    class="button"
    @click="this.scheduleStore.openLessonModal(dayName, lesson.lesson_number, lesson)"
  >
    <span class="material-icons"> create </span>
  </button>
</template>

<style scoped></style>
