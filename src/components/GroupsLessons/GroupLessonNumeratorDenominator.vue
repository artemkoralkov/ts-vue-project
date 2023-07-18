<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'GroupLessonNumeratorDenominator',
  props: {
    lesson: {
      type: Array as PropType<Lesson[]>,
      required: true
    },
    lessonNumber: {
      type: Number,
      default: 0
    },
    day: {
      type: String,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  emits: ['editLesson', 'dltLesson']
})
</script>
<template>
  <tr>
    <td rowspan="2" class="lesson-number-col">
      <span class="lesson-number">{{ lessonNumber + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson[0].lesson_title }}
        <template v-if="lesson[0].lesson_type"> ({{ lesson[0].lesson_type }}) </template>
        <p class="line-break">
          {{
            lesson[0].first_group
              ? 'первая подгруппа'
              : lesson[0].second_group
              ? 'вторая подгруппа'
              : ''
          }}
        </p>
      </span>
      <p class="teacher-name line-break">
        {{ lesson[0].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[0].room_number?lesson[0].room_number:'' }}
    </td> -->
    <template v-if="isAdmin">
      <td>
        <button class="button" @click="$emit('editLesson', lesson[0].id)">
          <span class="material-icons"> create </span>
        </button>
      </td>
      <td>
        <button class="button" @click="$emit('dltLesson', lesson[0].id, day, lessonNumber)">
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
  <tr>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson[1].lesson_title }}
        <template v-if="lesson[1].lesson_type"> ({{ lesson[1].lesson_type }}) </template>
        <p class="line-break">
          {{
            lesson[1].first_group
              ? 'первая подгруппа'
              : lesson[1].second_group
              ? 'вторая подгруппа'
              : ''
          }}
        </p>
      </span>
      <p class="teacher-name line-break">
        {{ lesson[1].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[1].room_number?lesson[1].room_number:'' }}
    </td> -->
    <template v-if="isAdmin">
      <td>
        <button class="button" @click="$emit('editLesson', lesson[1].id)">
          <span class="material-icons"> create </span>
        </button>
      </td>
      <td>
        <button class="button" @click="$emit('dltLesson', lesson[1].id, day, lessonNumber)">
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
</template>
