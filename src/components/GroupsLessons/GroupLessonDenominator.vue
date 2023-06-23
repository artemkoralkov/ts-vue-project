<template>
  <tr>
    <td rowspan="2">
      <span class="lesson-number">{{ lessonNumber + 1 }}</span>
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
        <p class="line-break">{{ lesson.first_group?'первая подгруппа':lesson.second_group?'вторая подгруппа':'' }}</p>
      </span>
      <p class="teacher-name line-break">
        {{ lesson.teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson.room_number?lesson.room_number:'' }}
    </td> -->
    <template v-if="isAdmin">
      <td>
        <button
          class="button"
          @click="$emit('editLesson', lesson.id)"
        >
          <span class="material-icons">
            create
          </span>
        </button>
      </td>
      <td>
        <button
          class="button"
          @click="$emit('dltLesson', lesson.id, day, lessonNumber)"
        >
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
</template>


<script>
export default {
    name: 'GroupLessonDenominator',
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
      day: {
        type: String,
        default: '',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },

    },
emits: ['dltLesson', 'editLesson', 'addLesson']
}
</script>