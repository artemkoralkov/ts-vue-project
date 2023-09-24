<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'
import CreateLessonButton from '@/components/buttons/CreateLessonButton.vue'

export default defineComponent({
  name: 'TeacherLessonDenominator',
  components: { CreateLessonButton, DeleteLessonButton, EditLessonButton },
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
    <td class="lesson-number" rowspan="2">
      <span>{{ lesson.lesson_number + 1 }}</span>
    </td>
    <td class="lesson">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td v-if="isAdmin">
      <CreateLessonButton :day-name="dayName" :lesson-number="lesson.lesson_number" />
    </td>
  </tr>
  <tr>
    <td>
      <span class="lesson-name">
        {{ lesson.lesson_title }}
        <template v-if="lesson.lesson_type"> {{ lesson.lesson_type }} </template>
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
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson" />
    </td>
  </tr>
</template>
