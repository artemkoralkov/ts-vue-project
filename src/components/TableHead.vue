<script lang="ts">
import { defineComponent } from 'vue'
import getDateAndDay from '@/utils/getDateAndDay'

export default defineComponent({
  name: 'TableHead',
  props: {
    day: {
      type: String,
      default: ''
    },
    colspan: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      daysAndDates: getDateAndDay()
    }
  }
})
</script>
<template>
  <template v-if="daysAndDates">
    <tr class="day-and-date">
      <th class="day-name">
        {{ daysAndDates[day].day }}
      </th>
      <th :colspan="colspan">
        {{ daysAndDates[day].date }}
      </th>
    </tr>
  </template>
</template>
<style>
.day-and-date {
  border-bottom: 2px solid black;
  font-size: 150%;
}

.day-name {
  text-align: left;
}
</style>
