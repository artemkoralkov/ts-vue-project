<script lang="ts">
import getDateAndDay from '@/utils/getDateAndDay'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'TeacherLessonsTableBrief',
  props: {
    lessons: {
      type: Object as PropType<Lessons>,
      required: true
    },
    faculty: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      daysAndDates: getDateAndDay(),
      briefRusDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    }
  }
})
</script>
<template>
  <template v-if="lessons">
    <table class="table-brief">
      <thead>
        <tr>
          <th class="table-head">№</th>
        </tr>
        <tr>
          <th v-for="(lesson, dayName, index) in lessons" :key="lesson" class="table-head">
            {{ briefRusDayNames[index] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lesson_number in [0, 1, 2, 3, 4, 5]" :key="lesson_number">
          <td class="lesson-number">
            {{ lesson_number + 1 }}
          </td>
          <template v-for="lesson in lessons" :key="lesson">
            <template v-if="lesson[lesson_number].length === 1">
              <template v-if="lesson[lesson_number][0].numerator">
                <td class="word-break">{{ lesson[lesson_number][0]['faculty'] }} / ---</td>
              </template>
              <template v-else-if="lesson[lesson_number][0].denominator">
                <td class="word-break">--- / {{ lesson[lesson_number][0]['faculty'] }}</td>
              </template>
              <template v-else>
                <td class="word-break">
                  {{ lesson[lesson_number][0]['faculty'] }}
                </td>
              </template>
            </template>
            <template v-else-if="lesson[lesson_number].length === 2">
              <td class="word-break">
                {{ lesson[lesson_number][0]['faculty'] }} /
                {{ lesson[lesson_number][1]['faculty'] }}
              </td>
            </template>
            <template v-else>
              <td>---</td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </template>
</template>
<style>
/* .table-head {
  min-width: 122px;
} */
/* .table {

} */
</style>
