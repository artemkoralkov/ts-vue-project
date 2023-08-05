<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'GroupLessonDenominator',
  props: {
    lesson: {
      type: Object as PropType<Lesson>,
      required: true
    },
    dayName: {
      type: String,
      default: ''
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
    <td rowspan="2" class="lesson-number">
      <span>{{ lesson.lesson_number + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td v-if="isAdmin">
      <button class="button" @click="$emit('openModal', dayName, lesson.lesson_number)">
        <span class="material-icons"> add </span>
      </button>
    </td>
  </tr>
  <tr>
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
    <td v-if="isAdmin">
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
