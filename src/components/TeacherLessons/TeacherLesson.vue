<template>
  <tr>
    <td>
      <span class="lesson-number">{{ lessonNumber + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson.lesson_title }}
        <template v-if="lesson.lesson_type"> ({{ lesson.lesson_type }}) </template>
      </span>
      <p class="group-name line-break">
        {{ lesson.group_name }}
      </p>
      <p v-if="lesson.first_group || lesson.second_group" class="group-name line-break">
        {{
          lesson.first_group ? 'первая подгруппа' : lesson.second_group ? 'вторая подгруппа' : ''
        }}
      </p>
    </td>
    <template v-if="true">
      <td>
        <button class="button">
          <span class="material-icons"> create </span>
        </button>
      </td>
      <td>
        <button class="button">
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'TeacherLesson',
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    lessonNumber: {
      type: Number,
      default: 0
    },
    day: {
      type: String,
      default: ''
    }
  },
  emits: ['editLesson', 'deleteLesson']
})
</script>
