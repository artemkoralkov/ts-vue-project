<template>
  <tr>
    <td rowspan="2">
      <span class="lesson-number">{{ lessonNumber + 1 }}</span>
    </td>
    <td>
      <span class="lesson-name">
        {{ lesson[0].lesson_title }} 
        <template v-if="lesson[0].lesson_type">
          ({{ lesson[0].lesson_type }})
        </template>
        <p class="line-break">{{ lesson[0].first_group?'первая подгруппа':lesson[0].second_group?'вторая подгруппа':'' }}</p>
      </span>
      <p class="teacher-name line-break">
        {{ lesson[0].teacher_name }}
      </p>
    </td>
    <!-- <td>
      {{ lesson[0].room_number?lesson[0].room_number:'' }}
    </td> -->
    <template v-if="isAdmin">
      <td class="right-border">
        <button
          class="button"
          @click="$emit('dltLesson', lesson[0].id, day, lessonNumber)"
        >
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
    <td>
      <span class="lesson-name">
        {{ lesson[1].lesson_title }} 
        <template v-if="lesson[1].lesson_type">
          ({{ lesson[1].lesson_type }})
        </template>
        <p class="line-break">{{ lesson[1].first_group?'первая подгруппа':lesson[1].second_group?'вторая подгруппа':'' }}</p>
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
        <button
          class="button"
          @click="$emit('dltLesson', lesson[0].id, day, lessonNumber)"
        >
          <span class="material-icons">delete</span>
        </button>
      </td>
    </template>
  </tr>
  <tr>
    <td colspan="2">
      <span class="lesson-name">Пропускная</span>
    </td>
    <td
      v-if="isAdmin"
      colspan="3"
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
</template>
  
  
  <script>
  export default {
    name: 'GroupLessonFirstGroupNumeratorSecondGroupNumerator',
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
    emits: ['editLesson', 'dltLesson', 'addLesson']
  }
  </script>