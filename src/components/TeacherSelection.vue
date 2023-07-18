<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
export default defineComponent({
  name: 'TeacherSelection',
  emits: ['teacherSelection'],
  data() {
    return { scheduleStore: useScheduleStore(), searchTerm: '' }
  },
  methods: {
    selectTeacher(teacherName) {
      this.searchTerm = ''
      this.$emit('teacherSelection', teacherName)
    }
  },
  computed: {
    searchedTeachers(): { faculty: string; teacher_name: string }[] {
      if (this.searchTerm === '') {
        return []
      }
      return this.scheduleStore.teachers.filter(
        (teacher: { faculty: string; teacher_name: string }) =>
          teacher.teacher_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }
})
</script>

<template>
  <input
    id="search"
    v-model="searchTerm"
    type="text"
    placeholder="Преподаватель"
    autocomplete="off"
  />
  <div class="listWrapper">
    <ul v-if="searchTerm">
      <li
        v-for="teacher in searchedTeachers"
        :key="teacher"
        @click="selectTeacher(teacher.teacher_name)"
      >
        {{ teacher.teacher_name }}
      </li>
      <li v-if="searchTerm !== '' && searchedTeachers.length === 0">Ничего не найдно</li>
    </ul>
  </div>
</template>

<style scoped></style>
