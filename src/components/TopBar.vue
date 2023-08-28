<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { getTypeOfTheWeek } from '@/utils'
import ItemsSelection from '@/components/ItemsSelection.vue'
import LoginButton from '@/components/buttons/LoginButton.vue'
import LoginModal from '@/components/LoginModal.vue'
export default defineComponent({
  name: 'TopBar',
  components: {
    LoginModal,
    LoginButton,
    ItemsSelection
  },
  data() {
    return {
      scheduleStore: useScheduleStore(),
      typeOfTheWeek: getTypeOfTheWeek(),
      showModal: false
    }
  },
  methods: {
    openLoginModal() {
      document.body.style.overflow = 'hidden'
      this.showModal = true
    }
  }
})
</script>

<template>
  <header class="top-bar">
    <LoginButton @open-login-modal="openLoginModal" />
    <LoginModal :show-modal="this.showModal" @close-modal="this.showModal = false" />
    <select
      v-model="scheduleStore.selectedFaculty"
      class="faculty-selection"
      @change="scheduleStore.selectFaculty"
    >
      <option disabled value="">Выберите факультет</option>
      <option v-for="faculty in Object.keys(scheduleStore.FACULTIES)" :key="faculty">
        {{ faculty }}
      </option>
    </select>
    <template v-if="scheduleStore.selectedFaculty">
      <div class="form__radio">
        <input
          id="teachers-radiobutton"
          v-model="scheduleStore.selectedList"
          class="row-radio"
          type="radio"
          value="Преподаватели"
        />
        <label class="radio-btn-text" for="teachers-radiobutton"> Преподаватели </label>

        <input
          id="groups-radiobutton"
          v-model="scheduleStore.selectedList"
          class="row-radio"
          type="radio"
          value="Группы"
        />
        <label for="groups-radiobutton" class="radio-btn-text"> Группы </label>
      </div>
    </template>
    <template v-if="scheduleStore.selectedList === 'Преподаватели'">
      <ItemsSelection
        :items="scheduleStore.teachers.map((teacher) => teacher.teacher_name)"
        :placeholder="'Преподаватели'"
        @select-item="scheduleStore.selectTeacher"
      />
    </template>
    <template v-else-if="scheduleStore.selectedList === 'Группы'">
      <ItemsSelection
        :items="scheduleStore.groups.map((group) => group.group_name)"
        :placeholder="'Группы'"
        @select-item="scheduleStore.selectGroup"
      />
    </template>
    <template v-if="scheduleStore.selectedGroup">
      <h1 class="centred-text">
        {{ scheduleStore.selectedGroup }}
      </h1>
    </template>
    <template v-else-if="scheduleStore.selectedTeacher">
      <h1 class="centred-text">
        {{ scheduleStore.selectedTeacher }}
      </h1>
    </template>
    <h2 class="centred-text">
      {{ typeOfTheWeek }}
    </h2>
    <div v-if="scheduleStore.selectedList === 'Преподаватели' && scheduleStore.selectedTeacher">
      <input type="radio" id="brief" value="brief" v-model="scheduleStore.teacherLessonTableMode" />
      <label for="brief">Кратко</label>
      <input
        type="radio"
        id="default"
        value="default"
        v-model="scheduleStore.teacherLessonTableMode"
      />
      <label for="default">По-умолчанию</label>
    </div>
  </header>
</template>

<style lang="scss" scoped>
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
