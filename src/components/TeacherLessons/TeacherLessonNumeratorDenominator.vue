<template>
  <tr>
    <td class="lesson-number" rowspan="2">
      <span>{{ lessonNumber + 1 }}</span>
    </td>
    <td colspan="3">
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
    <template v-if="isAdmin">
      <td>
        <button
          class="button"
          @click="$emit('editLesson', lesson[0].day, dayName, lessonNumber, lesson[0])"
        >
          <span class="material-icons"> create </span>
        </button>
      </td>
      <td>
        <button class="button" @click="$emit('dltLesson', lesson[0].id, dayName, lessonNumber)">
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
    <template v-if="isAdmin">
      <td>
        <button
          class="button"
          @click="$emit('editLesson', lesson[1].day, dayName, lessonNumber, lesson[1])"
        >
          <span class="material-icons"> create </span>
        </button>
      </td>
      <td>
        <button class="button" @click="$emit('dltLesson', lesson[1].id, dayName, lessonNumber)">
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
</template>
<script>
export default {
  name: 'TeacherLessonNumeratorDenominator',
  props: {
    lesson: {
      type: Array,
      default() {
        return []
      }
    },
    lessonNumber: {
      type: Number,
      default: 0
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
  emits: ['dltLesson', 'editLesson']
}
</script>
