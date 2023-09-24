<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import EditLessonButton from '@/components/buttons/EditLessonButton.vue'
import DeleteLessonButton from '@/components/buttons/DeleteLessonButton.vue'

export default defineComponent({
  name: 'TeacherLessonNumeratorDenominator',
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
    <td class="lesson-number" rowspan="2">
      <span>{{ lesson[0].lesson_number + 1 }}</span>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson[0].lesson_title }}
        <template v-if="lesson[0].lesson_type"> {{ lesson[0].lesson_type }} </template>
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
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson[0]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[0]" />
    </td>
  </tr>
  <tr>
    <td>
      <span class="lesson-name">
        {{ lesson[1].lesson_title }}
        <template v-if="lesson?.[1].lesson_type"> {{ lesson[1].lesson_type }} </template>
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
    <td v-if="isAdmin">
      <EditLessonButton :day-name="dayName" :lesson="lesson[1]" />
      <DeleteLessonButton :day-name="dayName" :lesson="lesson[1]" />
    </td>
  </tr>
</template>
