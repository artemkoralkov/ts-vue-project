<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'TeacherLessonDenominator',
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    dayName: {
      type: String as PropType<Day>
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  emits: ['deleteLesson', 'openModal']
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
    <td class="buttons">
      <button class="button" @click="$emit('openModal', dayName, lesson.lesson_number)">
        <span class="material-icons"> add </span>
      </button>
    </td>
  </tr>
  <tr>
    <td>
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
    <td v-if="true">
      <button class="button" @click="$emit('openModal', dayName, lesson.lesson_number, lesson)">
        <span class="material-icons"> create </span>
      </button>
      <button
        class="button"
        @click="$emit('deleteLesson', lesson.id, dayName, lesson.lesson_number)"
      >
        <span class="material-icons">delete</span>
      </button>
    </td>
  </tr>
</template>
