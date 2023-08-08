<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'
import CreateLessonButton from '@/components/buttons/CreateLessonButton.vue'

export default defineComponent({
  name: 'GroupLessonFirstGroupSecondGroupNumerator',
  components: { CreateLessonButton, DeleteLessonButton, EditLessonButton },
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
    <td rowspan="2">
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
    <td v-if="isAdmin" rowspan="2">
      <EditLessonButton :day-name="dayName" :lesson="lesson[0]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[0]" />
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
      <EditLessonButton :day-name="dayName" :lesson="lesson[1]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[1]" />
    </td>
  </tr>
  <tr>
    <td>
      <span class="lesson-name"> Пропускная </span>
    </td>
    <td v-if="isAdmin">
      <CreateLessonButton :day-name="dayName" :lesson-number="lesson[0].lesson_number" />
    </td>
  </tr>
</template>
