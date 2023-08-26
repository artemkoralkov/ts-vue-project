<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import type { PropType } from 'vue'
import ResizableIcon from '@/components/icons/ResizableIcon.vue'

export default defineComponent({
  name: 'EditLessonButton',
  components: { ResizableIcon },
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
    <ResizableIcon :icon-name="'edit'" />
  </button>
</template>

<style scoped></style>
