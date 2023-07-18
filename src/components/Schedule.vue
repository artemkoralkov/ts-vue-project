<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import GroupsLessonsTable from '@/components/GroupsLessons/GroupsLessonsTable.vue'
import TeachersLessonsTable from '@/components/TeacherLessons/TeachersLessonsTable.vue'
import TopBar from '@/components/TopBar.vue'
import SendLessonToServerModal from '@/components/SendLessonToServerModal.vue'
import { getTypeOfTheWeek } from '@/utils'

export default defineComponent({
  components: {
    GroupsLessonsTable,
    TeachersLessonsTable,
    TopBar,
    SendLessonToServerModal
  },
  data() {
    return {
      schedule: useScheduleStore(),
      typeOfTheWeek: getTypeOfTheWeek()
    }
  },
  async beforeMount() {
    await this.schedule.getData()
  }
})
</script>

<template>
  <div class="container">
    <TopBar />
    <div class="schedule-table">
      <template v-if="schedule.selectedGroup">
        <GroupsLessonsTable :lessons="schedule.groupsLessons" :faculty="schedule.selectedFaculty" />
      </template>
      <template v-if="schedule.selectedTeacher">
        <TeachersLessonsTable
          :lessons="schedule.teachersLessons"
          :faculty="schedule.selectedFaculty"
        />
      </template>
    </div>
    <SendLessonToServerModal />
  </div>
</template>

<style lang="scss">
input,
textarea,
select,
button {
  font: inherit;
}

.lesson-number {
  @media screen {
    font-size: 200%;
  }

  @media screen and (max-width: 400px) {
    font-size: 150%;
  }
}

.container {
  font-family: 'Lato', sans-serif;

  @media screen {
    font-size: 130%;
  }

  @media (max-width: 400px) {
    font-size: 80%;
  }
}

.top-bar {
  position: sticky;
  top: 0;
  background-color: #13a7cc;
  min-width: 332px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listWrapper {
  max-height: 100px;
  overflow-y: auto;
  text-align: center;
}

.listWrapper li:hover {
  background: lightgray;
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
  padding: 0;
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

#search {
  width: 25%;
  min-height: 30px;
  min-width: 130px;
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

.top-bar {
  position: sticky;
  top: 0;
  background-color: #13a7cc;
  min-width: 332px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
