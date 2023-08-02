<script lang="ts">
import { defineComponent } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { getTypeOfTheWeek } from '@/utils'
import Modal from '@/components/Modal.vue'
import { selectUser } from '@/utils'
import { HmacSHA256, enc } from 'crypto-js'
import ItemsSelection from '@/components/ItemsSelection.vue'
export default defineComponent({
  name: 'TopBar',
  components: {
    ItemsSelection,
    Modal
  },
  data() {
    return {
      scheduleStore: useScheduleStore(),
      typeOfTheWeek: getTypeOfTheWeek(),
      showModal: false,
      password: '',
      isWrongPassword: false
    }
  },
  methods: {
    async login() {
      const hash = HmacSHA256(this.password, import.meta.env.VITE_CRYPT_SALT)
      const user = selectUser(enc.Base64.stringify(hash))
      if (user) {
        this.scheduleStore.currentUser = user
        this.showModal = false
      } else {
        this.isWrongPassword = true
      }
      this.password = ''
    },
    closeModal() {
      this.showModal = false
      this.isWrongPassword = false
    }
  }
})
</script>

<template>
  <header class="top-bar">
    <button class="edit-button" @click="showModal = true">Редактировать</button>
    <Teleport to="body">
      <modal :show="showModal" @close="closeModal">
        <template #header>
          <h3>Введите пароль</h3>
        </template>
        <template #body>
          <input id="password" v-model="password" :class="{ 'error-input': isWrongPassword }" />
          <label v-if="isWrongPassword" id="error" for="password">Неверный пароль</label>
        </template>
        <template #footer>
          <button class="modal-default-button" @click="login">Ок</button>
        </template>
      </modal>
    </Teleport>
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
        :items="scheduleStore.teachers.map((teacher: {teacher_name: string, faculty: string}) => teacher.teacher_name)"
        :placeholder="'Преподаватели'"
        @select-item="scheduleStore.selectTeacher"
      />
    </template>
    <template v-else-if="scheduleStore.selectedList === 'Группы'">
      <ItemsSelection
        :items="scheduleStore.groups.map((group: {group_name: string, faculty: string}) => group.group_name)"
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

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
}

.error-input {
  border-color: red;
}

#error {
  color: red;
}
</style>
