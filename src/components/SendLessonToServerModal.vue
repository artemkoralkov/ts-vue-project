<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/Modal.vue'
import { useScheduleStore } from '@/stores/schedule'
import GroupSelection from '@/components/GroupSelection.vue'
import TeacherSelection from '@/components/TeacherSelection.vue'
export default defineComponent({
  name: 'SendLessonToServerModal',
  components: {
    TeacherSelection,
    GroupSelection,
    Modal
  },
  props: {
    lessonFor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showModal: false,
      scheduleStore: useScheduleStore(),
      lessonType: '',
      lessonWeek: '',
      subgroup: '',
      lessonName: '',
      teacherToSendLesson: '',
      groupToSendLesson: ''
    }
  },
  methods: {
    async sendLesson() {
      const lesson = {
        lesson_title: this.lessonName,
        group_name:
          this.scheduleStore.selectedList === 'Преподаватели'
            ? this.scheduleStore.groupToSendLesson
            : this.scheduleStore.selectedGroup,
        teacher_name:
          this.scheduleStore.selectedList === 'Преподаватели'
            ? this.scheduleStore.selectedTeacher
            : this.scheduleStore.teacherToSendLesson,
        faculty: this.scheduleStore.selectedFaculty,
        lesson_type: this.lessonType,
        numerator: this.lessonWeek === 'numerator',
        denominator: this.lessonWeek === 'denominator',
        first_group: this.subgroup === 'first_group',
        second_group: this.subgroup === 'second_group'
      }
      this.showModal = false
      console.log(lesson)
    },
    selectGroupToSendLesson(groupName: string) {
      this.groupToSendLesson = groupName
    },
    selectTeacherToSendLesson(teacherName: string) {
      this.teacherToSendLesson = teacherName
    }
  }
})
</script>

<template>
  <button @click="showModal = true">Жми</button>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Редактирование</h3>
      </template>
      <template #body>
        <form>
          <div class="form-group">
            <label class="form-group__title" for="lesson-name"> Название предмета </label>
            <input
              class="form-group__textarea"
              id="lesson-name"
              placeholder="Введите текст"
              v-model="lessonName"
            />
          </div>
          <div class="form-group">
            <template v-if="scheduleStore.selectedList === 'Преподаватели'">
              <label class="form-group__title" for="lesson-name"> Группа </label>
              <label class="form-group__title" for="lesson-name">
                {{ groupToSendLesson }}
              </label>
              <br />
              <GroupSelection @group-selection="selectGroupToSendLesson" />
            </template>
            <template v-else-if="scheduleStore.selectedList === 'Группы'">
              <label class="form-group__title" for="lesson-name"> Преподаватель </label>
              <label class="form-group__title" for="lesson-name">
                {{ teacherToSendLesson }}
              </label>
              <br />
              <TeacherSelection @teacher-selection="selectTeacherToSendLesson" />
            </template>
            <h3>Вид занятия</h3>
            <fieldset class="lesson-radio">
              <div>
                <input type="radio" id="lecture" value="лк" v-model="lessonType" />
                <label for="lecture">лк</label>
              </div>
              <div>
                <input type="radio" id="laboratory" value="лб" v-model="lessonType" />
                <label for="laboratory">лб</label>
              </div>
              <div>
                <input type="radio" id="practice" value="пз" v-model="lessonType" />
                <label for="practice">пз</label>
              </div>
            </fieldset>
            <h3>Периодичность пары</h3>
            <fieldset class="lesson-radio">
              <div>
                <input type="radio" id="numerator" value="numerator" v-model="lessonWeek" />
                <label for="numerator">Числитель</label>
              </div>
              <div>
                <input type="radio" id="denominator" value="denominator" v-model="lessonWeek" />
                <label for="denominator">Знаменатель</label>
              </div>
            </fieldset>
            <h3>Подгруппы</h3>
            <fieldset class="lesson-radio">
              <div>
                <input type="radio" id="first-group" value="first-group" v-model="subgroup" />
                <label for="first-group">Первая подгруппа</label>
              </div>
              <div>
                <input type="radio" id="second-group" value="second-group" v-model="subgroup" />
                <label for="second-group">Вторая подгруппа</label>
              </div>
            </fieldset>
          </div>
        </form>
      </template>
      <template #footer>
        <button class="modal-default-button" @click="sendLesson">Ок</button>
      </template>
    </modal>
  </Teleport>
</template>

<style scoped>
.lesson-radio {
  border: 0;
  display: flex;
  justify-content: space-evenly;
}
</style>
