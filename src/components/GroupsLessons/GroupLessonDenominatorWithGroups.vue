<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'
export default defineComponent({
  name: 'GroupLessonDenominatorWithGroups',
  components: { DeleteLessonButton, EditLessonButton },
  props: {
    lesson: {
      type: Array as PropType<Lesson[]>,
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
    <td rowspan="2" class="lesson-number">
      <span>{{ lesson[0].lesson_number + 1 }}</span>
    </td>
    <td colspan="3">
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
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson[0]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[0]" />
    </td>
  </tr>
  <tr>
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
    <td v-if="isAdmin" class="right-border">
      <EditLessonButton :day-name="dayName" :lesson="lesson[1]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[1]" />
    </td>
    <td>
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
      <EditLessonButton :day-name="dayName" :lesson="lesson[2]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[2]" />
    </td>
  </tr>
</template>
