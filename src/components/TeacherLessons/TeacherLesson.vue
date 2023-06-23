<template>
  <tr>
    <td>
      <span class="lesson-number">{{ lessonNumber + 1 }}</span>
    </td>
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
    name: 'TeacherLesson',
    props: {
        lesson: {
            type: Object,
            default() {
                return {};
            }
        },
        lessonNumber: {
            type: Number,
            default: 0,
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
emits: ['editLesson', 'dltLesson'],
}
</script>

