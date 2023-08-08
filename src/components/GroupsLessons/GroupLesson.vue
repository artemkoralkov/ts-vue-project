<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'

export default defineComponent({
  name: 'GroupLesson',
  components: { DeleteLessonButton, EditLessonButton },
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    dayName: {
      type: String as PropType<Day>,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<template>
  <tr>
    <td class="lesson-number">
      <span>{{ lesson.lesson_number + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name"
        >{{ lesson.lesson_title }}
        <template v-if="lesson.lesson_type"> ({{ lesson.lesson_type }}) </template>
      </span>
      <p v-if="lesson.first_group || lesson.second_group" class="line-break">
        {{
          lesson.first_group ? 'первая подгруппа' : lesson.second_group ? 'вторая подгруппа' : ''
        }}
      </p>
      <p class="teacher-name line-break">
        {{ lesson.teacher_name }}
      </p>
    </td>
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson" />
    </td>
  </tr>
</template>
