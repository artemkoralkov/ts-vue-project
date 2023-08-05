<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'GroupLessonNumeratorWithGroups',
  props: {
    lesson: {
      type: Array as PropType<Lesson[]>,
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
  emits: ['openModal', 'deleteLesson']
})
</script>
<template>
  <tr>
    <td rowspan="2">
      <span class="lesson-number">{{ lesson[0].lesson_number + 1 }}</span>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson[0].lesson_title }}
        <template v-if="lesson[0].lesson_type"> ({{ lesson[0].lesson_type }}) </template>
      </span>
      <p class="line-break">
        {{
          lesson[0].first_group
            ? 'первая подгруппа'
            : lesson[0].second_group
            ? 'вторая подгруппа'
            : ''
        }}
      </p>
      <p class="teacher-name line-break">
        {{ lesson[0].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[0].room_number?lesson[0].room_number:'' }}
    </td> -->
    <td v-if="isAdmin" class="right-border">
      <button
        class="button"
        @click="$emit('openModal', dayName, lesson[0].lesson_number, lesson[0])"
      >
        <span class="material-icons"> create </span>
      </button>
      <button
        class="button"
        @click="$emit('deleteLesson', lesson[0].id, dayName, lesson[0].lesson_number)"
      >
        <span class="material-icons">delete</span>
      </button>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson[1].lesson_title }}
        <template v-if="lesson[1].lesson_type"> ({{ lesson[1].lesson_type }}) </template>
      </span>
      <p class="line-break">
        {{
          lesson[1].first_group
            ? 'первая подгруппа'
            : lesson[1].second_group
            ? 'вторая подгруппа'
            : ''
        }}
      </p>
      <p class="teacher-name line-break">
        {{ lesson[1].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[1].room_number?lesson[1].room_number:'' }}
    </td> -->
    <td v-if="isAdmin">
      <button
        class="button"
        @click="$emit('openModal', dayName, lesson[1].lesson_number, lesson[1])"
      >
        <span class="material-icons"> create </span>
      </button>
      <button
        class="button"
        @click="$emit('deleteLesson', lesson[1].id, dayName, lesson[1].lesson_number)"
      >
        <span class="material-icons">delete</span>
      </button>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson[2].lesson_title }}
        <template v-if="lesson[2].lesson_type"> ({{ lesson[2].lesson_type }}) </template>
      </span>
      <p class="line-break">
        {{
          lesson[2].first_group
            ? 'первая подгруппа'
            : lesson[2].second_group
            ? 'вторая подгруппа'
            : ''
        }}
      </p>
      <p class="teacher-name line-break">
        {{ lesson[2].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[2].room_number?lesson[2].room_number:'' }}
    </td> -->
    <td v-if="isAdmin">
      <button
        class="button"
        @click="$emit('openModal', dayName, lesson[2].lesson_number, lesson[2])"
      >
        <span class="material-icons"> create </span>
      </button>
      <button
        class="button"
        @click="$emit('deleteLesson', lesson[2].id, dayName, lesson[2].lesson_number)"
      >
        <span class="material-icons">delete</span>
      </button>
    </td>
  </tr>
</template>
