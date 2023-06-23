<template>
  <tr>
    <td
      class="lesson-number"
      rowspan="2"
    >
      <span>{{ lessonNumber + 1 }}</span>
    </td>
    <td colspan="3">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td
      v-if="isAdmin"
      colspan="2"
    >
      <button
        class="button"
        @click="$emit('addLesson')"
      >
        <span class="material-icons">
          add
        </span>
      </button>
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <span class="lesson-name">
        {{ lesson.lesson_title }} 
        <template v-if="lesson.lesson_type">
          ({{ lesson.lesson_type }})
        </template>
         
      </span>
      <p class="group-name line-break">
        {{ lesson.group_name }}
      </p>
      <p
        v-if="lesson.first_group || lesson.second_group"
        class=" group-name line-break"
      >
        {{ lesson.first_group?'первая подгруппа':lesson.second_group?'вторая подгруппа':'' }} 
      </p>
    </td>
    <template v-if="isAdmin">
      <td>
        <button
          class="button"
          @click="$emit('editLesson')"
        >
          <span class="material-icons">
            create
          </span>
        </button>
      </td>
      <td>
        <button
          class="button"
          @click="$emit('dltLesson', lesson.id, dayName, lessonNumber)"
        >
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
</template>


<script>
export default {
    name: 'TeacherLessonDenominator',
    props: {
      lesson: {
        type: Object,
        default() {
          return {};
        }
      },
      lessonNumber: {
        type: Number,
        default: 0
      },
      dayName: {
        type: String,
        default: '',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
emits: ['dltLesson', 'addLesson', 'editLesson']
}
</script>

