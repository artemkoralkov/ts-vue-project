<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'
import CreateLessonButton from '@/components/buttons/CreateLessonButton.vue'

export default defineComponent({
  name: 'GroupLessonNumerator',
  components: { CreateLessonButton, DeleteLessonButton, EditLessonButton },
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    dayName: {
      type: String as PropType<Day>,
      default: ''
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
    <td rowspan="2">
      <span class="lesson-number">{{ lesson.lesson_number + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson.lesson_title }}
        <template v-if="lesson.lesson_type"> ({{ lesson.lesson_type }}) </template>
      </span>
      <p class="line-break">
        {{
          lesson.first_group ? 'первая подгруппа' : lesson.second_group ? 'вторая подгруппа' : ''
        }}
      </p>
      <p class="teacher-name line-break">
        {{ lesson.teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson.room_number?lesson.room_number:'' }}
    </td>` -->
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson" />
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td v-if="isAdmin" colspan="2">
      <CreateLessonButton :day-name="dayName" :lesson-number="lesson.lesson_number" />
    </td>
  </tr>
</template>
