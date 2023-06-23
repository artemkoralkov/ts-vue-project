<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import GroupsLessonsTable from '@/components/GroupsLessons/GroupsLessonsTable.vue'
import { getTypeOfTheWeek } from '@/utils'
export default defineComponent({
  components: {
    GroupsLessonsTable
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
    <header class="top-bar">
      <select
        v-model="schedule.selectedFaculty"
        class="faculty-selection"
        @change="schedule.selectFaculty"
      >
        <option disabled value="">Выберите факультет</option>
        <option v-for="faculty in Object.keys(schedule.FACULTIES)" :key="faculty">
          {{ faculty }}
        </option>
      </select>
      <template v-if="schedule.selectedFaculty">
        <div class="form__radio">
          <input
            id="teachers-radiobutton"
            v-model="schedule.selectedList"
            class="row-radio"
            type="radio"
            value="Преподаватели"
            @change="clearSelectedGroup"
          />
          <label class="radio-btn-text" for="teachers-radiobutton"> Преподаватели </label>

          <input
            id="groups-radiobutton"
            v-model="schedule.selectedList"
            class="row-radio"
            type="radio"
            value="Группы"
            @change="clearSelectedTeacher"
          />
          <label for="groups-radiobutton" class="radio-btn-text"> Группы </label>
        </div>
      </template>
      <template v-if="schedule.selectedList === 'Преподаватели'">
        <!-- <AutoComplete 
            v-model="schedule.searchTerm"
            :suggestions="schedule.searchedTeachers"
            :placeholder="'Преподаватель'"
            @complete="schedule.search()"
            @item-select="OnSelectTeacher"
          /> -->
        <input
          id="search"
          v-model="schedule.searchTerm"
          type="text"
          placeholder="Преподаватель"
          autocomplete="off"
        />
        <div class="listWrapper">
          <ul v-if="schedule.searchTerm">
            <li
              v-for="teacher in schedule.searchedTeachers"
              :key="teacher"
              @click="schedule.selectTeacher(teacher.teacher_name)"
            >
              {{ teacher.teacher_name }}
            </li>
            <li v-if="schedule.searchTerm !== '' && schedule.searchedTeachers.length === 0">
              Ничего не найдно
            </li>
          </ul>
        </div>
      </template>
      <template v-else-if="schedule.selectedList === 'Группы'">
        <input
          id="search"
          v-model="schedule.searchTerm"
          type="text"
          placeholder="Группа"
          autocomplete="off"
        />
        <div class="listWrapper">
          <ul v-if="schedule.searchTerm">
            <li
              v-for="group in schedule.searchedGroups"
              :key="group"
              @click="schedule.selectGroup(group.group_name)"
            >
              {{ group.group_name }}
            </li>
            <li v-if="schedule.searchTerm !== '' && schedule.searchedGroups.length === 0">
              Ничего не найдно
            </li>
          </ul>
        </div>
      </template>
      <template v-if="schedule.selectedGroup">
        <h1 class="centred-text">
          {{ schedule.selectedGroup }}
        </h1>
        <h3 class="centred-text">
          {{ typeOfTheWeek }}
        </h3>
      </template>
    </header>

    <template v-if="schedule.selectedGroup">
      <div class="schedule-table">
        <GroupsLessonsTable :lessons="schedule.groupsLessons" :faculty="schedule.selectedFaculty" />
      </div>
    </template>
    <template v-if="schedule.selectedTeacher"></template>
  </div>
</template>

<style lang="scss">
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
    font-size: 120%;
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
  width: 10%;
  height: 30px;
  min-width: 140px;
  font-size: medium;
  border-radius: 5px;
}

#search {
  width: 25%;
  height: 25px;
  min-width: 130px;
  font-size: medium;
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
