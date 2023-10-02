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
      type: Object as PropType<Lesson>,
      default: undefined
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
        : 'permanent',
      subgroup: this.previousLesson?.first_group
        ? 'first_group'
        : this.previousLesson?.second_group
        ? 'second_group'
        : 'all_group',
      lessonName: this.previousLesson?.lesson_title || '',
      teacherToSendLesson: this.previousLesson?.teacher_name || '',
      groupToSendLesson: this.previousLesson?.group_name || '',
      isLessonNameErrored: false,
      isGroupNameErrored: false,
      isTeacherNameErrored: false,
      lessonTypes: ['(лк)', '(лб)', '(лз)', '(пз)', '(пр)', '(см)']
    }
  },
  updated() {
    Object.assign(this.$data, this.$options.data.apply(this))
  },
  methods: {
    async sendLesson() {
      const isGroupSelected = this.scheduleStore.selectedList === 'Группы'
      const isTeacherSelected = this.scheduleStore.selectedList === 'Преподаватели'
      this.isLessonNameErrored = !this.lessonName
      this.isGroupNameErrored = isTeacherSelected && !this.groupToSendLesson
      this.isTeacherNameErrored = isGroupSelected && !this.teacherToSendLesson

      if (!this.isLessonNameErrored && !this.isGroupNameErrored && !this.isTeacherNameErrored) {
        const lesson: LessonDTO = {
          lesson_title: this.lessonName,
          group_name: isTeacherSelected ? this.groupToSendLesson : this.scheduleStore.selectedGroup,
          teacher_name: isTeacherSelected
            ? this.scheduleStore.selectedTeacher
            : this.teacherToSendLesson,
          faculty: isTeacherSelected
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
            lesson.numerator = this.previousLesson.numerator
            lesson.denominator = this.previousLesson.denominator
            await this.scheduleStore.editLesson(
              this.dayName,
              this.lessonNumber,
              this.previousLesson.id,
              lesson
            )
          }
        } else {
          await this.scheduleStore.addLesson(this.dayName, this.lessonNumber, lesson)
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
        <h3>{{ previousLesson ? 'Редактирование пары' : 'Создание пары' }}</h3>
      </template>
      <template #body>
        <form>
          <fieldset class="form-group">
            <h3 class="form-group__title">Название предмета</h3>
            <input
              class="form-group__textarea"
              placeholder="Введите текст"
              autofocus
              :class="{ 'errored-input': isLessonNameErrored }"
              v-model="lessonName"
            />
            <br />
            <span class="error" v-if="isLessonNameErrored">Введите название предмета.</span>
          </fieldset>
          <fieldset class="form-group">
            <template v-if="scheduleStore.selectedList === 'Преподаватели'">
              <h3 class="form-group__title">Группа</h3>
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
              <h3 class="form-group__title">Преподаватель</h3>
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
          <fieldset class="form-group">
            <h3 class="form-group__title">Вид занятия</h3>
            <select class="lesson-type-selection" v-model="lessonType">
              <option disabled value="">Выберите тип занятия</option>
              <option v-for="lessonType in lessonTypes" :key="lessonType">
                {{ lessonType }}
              </option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <h3 class="form-group__title">Периодичность пары</h3>
            <div class="lesson-radio">
              <div>
                <input type="radio" id="permanent" value="permanent" v-model="lessonWeek" />
                <label for="permanent">Постоянная</label>
              </div>
              <div>
                <input type="radio" id="numerator" value="numerator" v-model="lessonWeek" />
                <label for="numerator">Числитель</label>
              </div>
              <div>
                <input type="radio" id="denominator" value="denominator" v-model="lessonWeek" />
                <label for="denominator">Знаменатель</label>
              </div>
            </div>
          </fieldset>

          <fieldset class="form-group lesson-radio">
            <h3 class="form-group__title">Подгруппы</h3>
            <div>
              <input type="radio" id="all-group" value="all_group" v-model="subgroup" />
              <label for="all-group">Вся группа</label>
            </div>
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
  flex-direction: column;
  justify-content: flex-start;
}
.errored-input {
  border-color: red;
}
.error {
  color: red;
}
.lesson-type-selection {
  width: 60px;
}
.form-group__title {
  margin: 0 0 10px 0;
}
</style>
