<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { getTypeOfTheWeek } from '@/utils'

export default defineComponent({
  name: 'TopBar',
  data() {
    return {
      schedule: useScheduleStore(),
      typeOfTheWeek: getTypeOfTheWeek()
    }
  }
})
</script>

<template>
  <header class="top-bar">
    <button class="edit-button">Редактировать</button>
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
        />
        <label class="radio-btn-text" for="teachers-radiobutton"> Преподаватели </label>

        <input
          id="groups-radiobutton"
          v-model="schedule.selectedList"
          class="row-radio"
          type="radio"
          value="Группы"
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
    </template>
    <template v-else-if="schedule.selectedTeacher">
      <h1 class="centred-text">
        {{ schedule.selectedTeacher }}
      </h1>
    </template>
    <h3 class="centred-text">
      {{ typeOfTheWeek }}
    </h3>
  </header>
</template>

<style lang="scss" scoped>
.edit-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
