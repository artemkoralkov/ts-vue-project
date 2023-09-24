<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'
import CreateLessonButton from '@/components/buttons/CreateLessonButton.vue'
export default defineComponent({
  name: 'GroupLessonFirstGroupSecondGroup',
  components: { CreateLessonButton, DeleteLessonButton, EditLessonButton },
  props: {
    lesson: {
      type: Array as PropType<Lesson>,
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
    <td class="lesson-number">
      <span>{{ lesson.lesson_number + 1 }}</span>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson.lesson_title }}
        <template v-if="lesson.lesson_type"> {{ lesson.lesson_type }} </template>
      </span>
      <p class="line-break">первая подгруппа</p>
      <p class="teacher-name line-break">
        {{ lesson.teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[0].room_number?lesson[0].room_number:'' }}
    </td> -->
    <td v-if="isAdmin" class="right-border">
      <EditLessonButton :day-name="dayName" :lesson="lesson" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson" />
    </td>
    <td colspan="3">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td v-if="isAdmin">
      <CreateLessonButton :day-name="dayName" :lesson-number="lesson.lesson_number" />
    </td>
  </tr>
</template>
