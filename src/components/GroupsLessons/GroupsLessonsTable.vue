<script lang="ts">
import TableHead from '../TableHead.vue'
import GroupLessonNumerator from './GroupLessonNumerator.vue'
import GroupLessonDenominator from './GroupLessonDenominator.vue'
import GroupLesson from './GroupLesson.vue'
import GroupLessonNumeratorDenominator from './GroupLessonNumeratorDenominator.vue'
import GroupLessonFirstGroupSecondGroup from './GroupLessonFirstGroupSecondGroup.vue'
import GroupLessonNumeratorWithGroups from './GroupLessonNumeratorWithGroups.vue'
import GroupLessonDenominatorWithGroups from './GroupLessonDenominatorWithGroups.vue'
import GroupLessonNumeratorDenominatorWithGroups from './GroupLessonNumeratorDenominatorWithGroups.vue'
import GroupLessonFirstGroupNumeratorSecondGroupNumerator from './GroupLessonFirstGroupNumeratorSecondGroupNumerator.vue'
import GroupLessonFirstGroupDenominatorSecondGroupDenominator from './GroupLessonFirstGroupDenominatorSecondGroupDenominator.vue'
import GroupLessonFirstGroupNumeratorDenominatorSecondGroup from './GroupLessonFirstGroupNumeratorDenominatorSecondGroup.vue'
import GroupLessonFirstGroupSecondGroupNumeratorDenominator from './GroupLessonFirstGroupSecondGroupNumeratorDenominator.vue'
import GroupLessonFirstGroupNumeratorSecondGroup from './GroupLessonFirstGroupNumeratorSecondGroup.vue'
import GroupLessonFirstGroupDenominatorSecondGroup from './GroupLessonFirstGroupDenominatorSecondGroup.vue'
import GroupLessonFirstGroupDenominatorSecondGroupNumeratorDenominator from './GroupLessonFirstGroupDenominatorSecondGroupNumeratorDenominator.vue'
import GroupLessonFirstGroupSecondGroupNumerator from './GroupLessonFirstGroupSecondGroupNumerator.vue'
import GroupLessonFirstGroupSecondGroupDenominator from './GroupLessonFirstGroupSecondGroupDenominator.vue'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import CreateLessonButton from '@/components/buttons/CreateLessonButton.vue'
export default defineComponent({
  name: 'GroupsLessonsTable',
  components: {
    CreateLessonButton,
    TableHead,
    GroupLessonNumerator,
    GroupLessonDenominator,
    GroupLesson,
    GroupLessonNumeratorDenominator,
    GroupLessonFirstGroupSecondGroup,
    GroupLessonNumeratorWithGroups,
    GroupLessonDenominatorWithGroups,
    GroupLessonNumeratorDenominatorWithGroups,
    GroupLessonFirstGroupNumeratorSecondGroupNumerator,
    GroupLessonFirstGroupDenominatorSecondGroupDenominator,
    GroupLessonFirstGroupNumeratorDenominatorSecondGroup,
    GroupLessonFirstGroupSecondGroupNumeratorDenominator,
    GroupLessonFirstGroupNumeratorSecondGroup,
    GroupLessonFirstGroupDenominatorSecondGroup,
    GroupLessonFirstGroupDenominatorSecondGroupNumeratorDenominator,
    GroupLessonFirstGroupSecondGroupNumerator,
    GroupLessonFirstGroupSecondGroupDenominator
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
  <table>
    <thead />
    <template v-for="(day, dayName) in lessons" :key="day">
      <TableHead :day="dayName" :colspan="6" />
      <template v-for="(lesson, lessonNumber) in day" :key="lesson">
        <template
          v-if="
            lesson.length &&
            lesson.sort((a, b) =>
              a.denominator > b.denominator ? 1 : b.denominator > a.denominator ? -1 : 0
            )
          "
        >
          <template v-if="lesson.length === 1">
            <template v-if="lesson[0].numerator">
              <GroupLessonNumerator
                :lesson="lesson[0]"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template v-else-if="lesson[0].denominator">
              <GroupLessonDenominator
                :lesson="lesson[0]"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template v-else>
              <GroupLesson
                :lesson="lesson[0]"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
          </template>

          <template v-else-if="lesson.length === 2">
            <template v-if="lesson[0].numerator && lesson[1].denominator">
              <GroupLessonNumeratorDenominator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>

            <template
              v-else-if="
                !lesson[0].numerator &&
                !lesson[1].denominator &&
                !lesson[0].denominator &&
                !lesson[1].numerator
              "
            >
              <GroupLessonFirstGroupSecondGroup
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template v-else-if="lesson[0].numerator && lesson[1].numerator">
              <GroupLessonFirstGroupNumeratorSecondGroupNumerator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                lesson[1].second_group &&
                lesson[0].denominator &&
                lesson[1].denominator
              "
            >
              <GroupLessonFirstGroupDenominatorSecondGroupDenominator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                lesson[0].numerator &&
                lesson[1].second_group &&
                !lesson[1].numerator &&
                !lesson[1].denominator
              "
            >
              <GroupLessonFirstGroupNumeratorSecondGroup
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <!-- GroupLessonFirstGroupDenominatorSecondGroup -->
            <template
              v-else-if="
                (lesson[0].first_group &&
                  lesson[0].denominator &&
                  lesson[1].second_group &&
                  !lesson[1].numerator &&
                  !lesson[1].denominator) ||
                (lesson[1].first_group &&
                  lesson[1].denominator &&
                  lesson[0].second_group &&
                  !lesson[0].numerator &&
                  !lesson[0].denominator)
              "
            >
              <GroupLessonFirstGroupDenominatorSecondGroup
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                !lesson[0].numerator &&
                !lesson[0].denominator &&
                lesson[1].second_group &&
                lesson[1].numerator
              "
            >
              <GroupLessonFirstGroupSecondGroupNumerator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                !lesson[0].numerator &&
                !lesson[0].denominator &&
                lesson[1].second_group &&
                lesson[1].denominator
              "
            >
              <GroupLessonFirstGroupSecondGroupDenominator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template v-else>
              {{ lesson }}
            </template>
          </template>
          <template v-else-if="lesson.length === 3">
            <template
              v-if="
                lesson[0].first_group &&
                lesson[0].numerator &&
                lesson[1].second_group &&
                lesson[1].numerator
              "
            >
              <GroupLessonNumeratorWithGroups
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[1].first_group &&
                lesson[1].denominator &&
                lesson[2].second_group &&
                lesson[2].denominator &&
                !lesson[0].first_group &&
                !lesson[0].second_group
              "
            >
              <GroupLessonDenominatorWithGroups
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="lesson[0].first_group && !lesson[0].numerator && !lesson[0].denominator"
            >
              <GroupLessonFirstGroupSecondGroupNumeratorDenominator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                lesson[0].numerator &&
                lesson[1].second_group &&
                !lesson[1].numerator &&
                !lesson[1].denominator &&
                lesson[2].first_group &&
                lesson[2].denominator
              "
            >
              <GroupLessonFirstGroupNumeratorDenominatorSecondGroup
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].second_group &&
                lesson[0].numerator &&
                lesson[1].first_group &&
                lesson[1].denominator &&
                lesson[2].second_group &&
                lesson[2].denominator
              "
            >
              <GroupLessonFirstGroupDenominatorSecondGroupNumeratorDenominator
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
            <template
              v-else-if="
                lesson[0].first_group &&
                lesson[0].numerator &&
                lesson[1].first_group &&
                lesson[1].denominator &&
                lesson[2].second_group &&
                lesson[2].denominator
              "
            >
              <GroupLessonDenominatorWithGroups
                :lesson="lesson"
                :day-name="dayName"
                :is-admin="scheduleStore.isAdmin"
              />
            </template>
          </template>
          <template v-else-if="lesson.length === 4">
            <GroupLessonNumeratorDenominatorWithGroups
              :lesson="lesson"
              :day-name="dayName"
              :is-admin="scheduleStore.isAdmin"
            />
          </template>
          <template v-else>
            <GroupLesson
              :lesson="lesson[0]"
              :day-name="dayName"
              :is-admin="scheduleStore.isAdmin"
            />
          </template>
        </template>
        <template v-else>
          <tr>
            <td>
              <span class="lesson-number">{{ lessonNumber + 1 }}</span>
            </td>
            <td colspan="3">
              <span class="lesson-name">Пропускная</span>
            </td>
            <td v-if="scheduleStore.isAdmin">
              <CreateLessonButton :day-name="dayName" :lesson-number="lessonNumber" />
            </td>
          </tr>
        </template>
      </template>
    </template>
  </table>
</template>
<style>
.right-border {
  border-right: 1px solid lightgray;
}
</style>
