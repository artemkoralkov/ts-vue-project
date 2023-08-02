<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TeacherLessonNumeratorDenominator',
  props: {
    lesson: {
      type: Array as PropType<Lesson[]>,
      required: true
    },
    dayName: String as PropType<Day>,
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
      <span>{{ lesson[0].lesson_number + 1 }}</span>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson[0].lesson_title }}
        <template v-if="lesson[0].lesson_type"> ({{ lesson[0].lesson_type }}) </template>
      </span>
      <p class="group-name line-break">
        {{ lesson[0].group_name }}
      </p>
      <p v-if="lesson[0].first_group || lesson[0].second_group" class="group-name line-break">
        {{
          lesson[0].first_group
            ? 'первая подгруппа'
            : lesson[0].second_group
            ? 'вторая подгруппа'
            : ''
        }}
      </p>
    </td>
    <td v-if="true">
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
  </tr>
  <tr>
    <td>
      <span class="lesson-name">
        {{ lesson[1].lesson_title }}
        <template v-if="lesson?.[1].lesson_type"> ({{ lesson[1].lesson_type }}) </template>
      </span>
      <p class="group-name line-break">
        {{ lesson[1].group_name }}
      </p>
      <p v-if="lesson[1].first_group || lesson[1].second_group" class="group-name line-break">
        {{
          lesson[1].first_group
            ? 'первая подгруппа'
            : lesson[1].second_group
            ? 'вторая подгруппа'
            : ''
        }}
      </p>
    </td>
    <td v-if="true">
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
</template>
