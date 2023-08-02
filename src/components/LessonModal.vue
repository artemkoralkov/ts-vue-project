<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import Modal from '@/components/Modal.vue'
import { useScheduleStore } from '@/stores/schedule'
import ItemsSelection from '@/components/ItemsSelection.vue'
import { isLessonsDTOsEqual } from '@/utils'

const dayNumbers = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}
export default defineComponent({
  name: 'LessonModal',
  components: {
    ItemsSelection,
    Modal
  },
  props: {
    lessonFor: {
      type: String,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    },
    previousLesson: {
      type: Object as PropType<Lesson>
    },
    dayName: {
      type: String as PropType<Day>,
      required: true
    },
    lessonNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      scheduleStore: useScheduleStore(),
      lessonType: this.previousLesson?.lesson_type || '',
      lessonWeek: this.previousLesson?.numerator
        ? 'numerator'
        : this.previousLesson?.denominator
        ? 'denominator'
        : '',
      subgroup: this.previousLesson?.first_group
        ? 'first_group'
        : this.previousLesson?.second_group
        ? 'second_group'
        : '',
      lessonName: this.previousLesson?.lesson_title || '',
      teacherToSendLesson: this.previousLesson?.teacher_name || '',
      groupToSendLesson: this.previousLesson?.group_name || '',
      isLessonNameErrored: false,
      isGroupNameErrored: false,
      isTeacherNameErrored: false
    }
  },
  updated() {
    Object.assign(this.$data, this.$options.data.apply(this))
  },
  methods: {
    async sendLesson() {
      this.isLessonNameErrored = !this.lessonName
      if (this.scheduleStore.selectedList === 'Преподаватели' && !this.groupToSendLesson) {
        this.isGroupNameErrored = true
      } else if (this.scheduleStore.selectedList === 'Группы' && !this.teacherToSendLesson) {
        this.isTeacherNameErrored = true
      } else {
        this.isTeacherNameErrored = false
        this.isGroupNameErrored = false
      }
      if (!this.isLessonNameErrored && !this.isGroupNameErrored && !this.isTeacherNameErrored) {
        const lesson: LessonDTO = {
          lesson_title: this.lessonName,
          group_name:
            this.scheduleStore.selectedList === 'Преподаватели'
              ? this.groupToSendLesson
              : this.scheduleStore.selectedGroup,
          teacher_name:
            this.scheduleStore.selectedList === 'Преподаватели'
              ? this.scheduleStore.selectedTeacher
              : this.teacherToSendLesson,
          faculty:
            this.scheduleStore.selectedList === 'Преподаватели'
              ? this.scheduleStore.allGroups.find(
                  (group) => group.group_name === this.groupToSendLesson
                ).faculty
              : this.scheduleStore.selectedFaculty,
          lesson_type: this.lessonType,
          numerator: this.lessonWeek === 'numerator',
          denominator: this.lessonWeek === 'denominator',
          first_group: this.subgroup === 'first_group',
          second_group: this.subgroup === 'second_group',
          lesson_number: this.lessonNumber,
          day: dayNumbers[this.dayName]
        }
        if (this.previousLesson) {
          const { id, ...previousLessonWithoutId } = this.previousLesson
          if (!isLessonsDTOsEqual(previousLessonWithoutId as LessonDTO, lesson)) {
            if (this.scheduleStore.selectedList === 'Группы') {
              await this.scheduleStore.editGroupLesson(
                this.dayName,
                this.lessonNumber,
                this.previousLesson.id,
                lesson
              )
            } else {
              await this.scheduleStore.editTeacherLesson(
                this.dayName,
                this.lessonNumber,
                this.previousLesson.id,
                lesson
              )
            }
          }
        } else {
          if (this.scheduleStore.selectedList === 'Группы') {
            await this.scheduleStore.addGroupLesson(this.dayName, this.lessonNumber, lesson)
          } else {
            await this.scheduleStore.addTeacherLesson(this.dayName, this.lessonNumber, lesson)
          }
        }
        this.scheduleStore.closeLessonModal()
      }
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
  <Teleport to="body">
    <modal :show="showModal" @close="scheduleStore.closeLessonModal()">
      <template #header>
        <h3>Редактирование</h3>
        {{ groupToSendLesson }}
      </template>
      <template #body>
        <form>
          <fieldset class="form-group">
            <label class="form-group__title" for="lesson-name"> Название предмета </label>
            <input
              class="form-group__textarea"
              id="lesson-name"
              placeholder="Введите текст"
              :class="{ 'errored-input': isLessonNameErrored }"
              v-model="lessonName"
            />
            <br />
            <span class="error" v-if="isLessonNameErrored">Введите название предмета.</span>
          </fieldset>
          <fieldset class="form-group">
            <template v-if="scheduleStore.selectedList === 'Преподаватели'">
              <label class="form-group__title" for="lesson-name"> Группа </label>
              <label class="form-group__title" for="lesson-name">
                {{ groupToSendLesson }}
              </label>
              <br />
              <ItemsSelection
                :class="{ 'errored-input': isLessonNameErrored }"
                :items="scheduleStore.allGroups.map((group) => group.group_name)"
                :placeholder="'Группа'"
                @select-item="selectGroupToSendLesson"
              />
              <span class="error" v-if="isGroupNameErrored">Выберите группу.</span>
            </template>
            <template v-else-if="scheduleStore.selectedList === 'Группы'">
              <label class="form-group__title" for="lesson-name"> Преподаватель </label>
              <label class="form-group__title" for="lesson-name">
                {{ teacherToSendLesson }}
              </label>
              <br />
              <ItemsSelection
                :class="{ 'errored-input': isLessonNameErrored }"
                :items="scheduleStore.allTeachers.map((teacher) => teacher.teacher_name)"
                @select-item="selectTeacherToSendLesson"
                :placeholder="'Преподаватель'"
              />
              <span class="error" v-if="isTeacherNameErrored">Выберите преподавателя.</span>
            </template>
          </fieldset>
          <h3>Вид занятия</h3>
          <fieldset class="form-group lesson-radio">
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
          <fieldset class="form-group lesson-radio">
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
          <fieldset class="form-group lesson-radio">
            <div>
              <input type="radio" id="first-group" value="first_group" v-model="subgroup" />
              <label for="first-group">Первая подгруппа</label>
            </div>
            <div>
              <input type="radio" id="second-group" value="second_group" v-model="subgroup" />
              <label for="second-group">Вторая подгруппа</label>
            </div>
          </fieldset>
        </form>
      </template>
      <template #footer>
        <button class="modal-default-button" @click="sendLesson">Ок</button>
      </template>
    </modal>
  </Teleport>
</template>

<style scoped>
.form-group {
  border: 0;
}
.lesson-radio {
  display: flex;
  justify-content: space-evenly;
}
errored-input {
  border-color: red;
}
.error {
  color: red;
}
</style>
