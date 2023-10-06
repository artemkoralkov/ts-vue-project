<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import GroupsLessonsTable from '@/components/GroupsLessons/GroupsLessonsTable.vue'
import TeachersLessonsTable from '@/components/TeacherLessons/TeachersLessonsTable.vue'
import TopBar from '@/components/TopBar.vue'
import LessonModal from '@/components/LessonModal.vue'
import { getTypeOfTheWeek } from '@/utils'
import TeacherLessonsTableBrief from '@/components/TeacherLessonsBrief/TeacherLessonsTableBrief.vue'

export default defineComponent({
  components: {
    TeacherLessonsTableBrief,
    GroupsLessonsTable,
    TeachersLessonsTable,
    TopBar,
    LessonModal
  },
  data() {
    return {
      scheduleStore: useScheduleStore(),
      typeOfTheWeek: getTypeOfTheWeek()
    }
  },
  async beforeMount() {
    await this.scheduleStore.getData()
    const savedPassword = localStorage.getItem('password')
    if (savedPassword) {
      await this.scheduleStore.login(savedPassword)
    }
  }
})
</script>

<template>
  <div class="container">
    <LessonModal
      :show-modal="scheduleStore.showModal"
      :lesson-for="scheduleStore.lessonFor"
      :previous-lesson="scheduleStore.previousLesson"
      :day-name="scheduleStore.dayName"
      :lesson-number="scheduleStore.lessonNumber"
    />
    <TopBar />
    <div class="schedule-table">
      <template v-if="scheduleStore.selectedGroup">
        <GroupsLessonsTable
          :lessons="scheduleStore.groupsLessons"
          :faculty="scheduleStore.selectedFaculty"
        />
      </template>
      <template v-if="scheduleStore.selectedTeacher">
        <template v-if="scheduleStore.teacherLessonTableMode === 'default'">
          <TeachersLessonsTable
            :lessons="scheduleStore.teachersLessons"
            :faculty="scheduleStore.selectedFaculty"
          />
        </template>
        <template v-else>
          <TeacherLessonsTableBrief :lessons="scheduleStore.teachersLessons" />
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
input,
textarea,
select,
button {
  font: inherit;
}

.error-input {
  border-color: red;
}

.error {
  color: red;
}

.container {
  font-family: 'Lato', sans-serif;

  @media screen {
    font-size: 150%;
  }

  @media screen and (max-height: 768px) {
    font-size: 80%;
  }

  @media (max-width: 450px) {
    font-size: 100%;
  }
}

.schedule-table {
  margin: 0 auto;
  min-width: 332px;
}

.line-break {
  margin-top: 0;
  margin-bottom: 0;
}

.centred-text {
  text-align: center;
}

.lesson-number {
  @media screen {
    font-size: 200%;
  }

  @media screen and (max-width: 400px) {
    font-size: 150%;
  }
}

.teacher-name,
.group-name {
  color: #2979ff;
}

.lesson-name {
  font-size: larger;
}
.row-radio {
  margin-left: 10px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

.word-break {
  word-break: break-all;
}

.table-brief {
  border-collapse: collapse;
  width: 100%;
  @media screen {
    font-size: 100%;
  }

  @media screen and (max-width: 900px) {
    font-size: 80%;
  }
}

td {
  text-align: center;
  border-top: solid 1px lightgrey;
  padding: 5px;
  height: 70px;

  // width
}

.lesson-number-col {
  width: 10%;
}

.button {
  border: none;
  background: none;
}

.faculty-selection {
  margin-bottom: 10px;
  width: 12%;
  min-height: 30px;
  min-width: 140px;
  border-radius: 5px;
}

.radio-btn-text {
  margin-left: 5px;
}

.form__radio {
  margin-bottom: 20px;
}

tbody tr:last-child td {
  padding-bottom: 30px;
}
</style>
