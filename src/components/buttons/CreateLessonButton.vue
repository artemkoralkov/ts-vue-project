<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import type { PropType } from 'vue'
import ResizableIcon from '@/components/icons/ResizableIcon.vue'

export default defineComponent({
  name: 'CreateLessonButton',
  components: { ResizableIcon },
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
    <ResizableIcon :icon-name="'add'" />
  </button>
</template>

<style scoped></style>
