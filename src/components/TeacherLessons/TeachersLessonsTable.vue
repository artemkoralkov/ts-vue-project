<script lang="ts">
import TeacherLessonNumeratorDenominator from './TeacherLessonNumeratorDenominator.vue'
import TeacherLesson from './TeacherLesson.vue'
import TeacherLessonNumerator from './TeacherLessonNumerator.vue'
import TeacherLessonDenominator from './TeacherLessonDenominator.vue'
import TableHead from '../TableHead.vue'
import { useScheduleStore } from '@/stores/schedule'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TeachersLessonsTable',
  components: {
    TableHead,
    TeacherLesson,
    TeacherLessonNumerator,
    TeacherLessonDenominator,
    TeacherLessonNumeratorDenominator
  },
  props: {
    lessons: {
      type: Object as PropType<Lessons>,
      required: true
    }
  },
  data() {
    return {
      scheduleStore: useScheduleStore()
    }
  }
})
</script>
<template>
  <div>
    <template v-if="lessons">
      <table class="">
        <thead />
        <template v-for="(day, dayName) in lessons" :key="day">
          <TableHead :day="dayName" />
          <template v-for="(lesson, lessonNumber) in day" :key="lesson">
            <template v-if="lesson.length">
              <template v-if="lesson[0].numerator && lesson.length === 1">
                <TeacherLessonNumerator
                  :lesson="lesson[0]"
                  :day-name="dayName"
                  @open-modal="scheduleStore.openLessonModal"
                  @delete-lesson="scheduleStore.deleteTeacherLesson"
                />
              </template>
              <template v-else-if="lesson[0].denominator && lesson.length === 1">
                <TeacherLessonDenominator
                  :lesson="lesson[0]"
                  :day-name="dayName"
                  @open-modal="scheduleStore.openLessonModal"
                  @delete-lesson="scheduleStore.deleteTeacherLesson"
                />
              </template>
              <template v-else-if="lesson.length > 1">
                <TeacherLessonNumeratorDenominator
                  :lesson="
                    lesson.sort((a, b) =>
                      a.denominator > b.denominator ? 1 : b.denominator > a.denominator ? -1 : 0
                    )
                  "
                  :day-name="dayName"
                  @open-modal="scheduleStore.openLessonModal"
                  @delete-lesson="scheduleStore.deleteTeacherLesson"
                />
              </template>
              <template v-else>
                <TeacherLesson
                  :lesson="lesson[0]"
                  :day-name="dayName"
                  @open-modal="scheduleStore.openLessonModal"
                  @delete-lesson="scheduleStore.deleteTeacherLesson"
                />
              </template>
            </template>
            <template v-else>
              <tr>
                <td class="lesson-number">
                  <span>{{ lessonNumber + 1 }}</span>
                </td>
                <td>
                  <span class="lesson-name">Пропускная</span>
                </td>

                <td v-if="true">
                  <button
                    class="button"
                    @click="scheduleStore.openLessonModal(dayName, lessonNumber)"
                  >
                    <span class="material-icons"> add </span>
                  </button>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </table>
    </template>
  </div>
</template>
