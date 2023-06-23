<template>
  <template v-if="daysAndDates">
    <thead class="thead">
      <tr>
        <th class="day-name" scope="col" colspan="1">
          {{ daysAndDates[day].day }}
        </th>
        <th scope="col" colspan="3">
          {{ daysAndDates[day].date }}
        </th>
      </tr>
    </thead>
  </template>
</template>
<script lang="ts">
import getDateAndDay from '@/utils/getDateAndDay'
export default {
  name: 'TableHead',
  props: {
    day: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      daysAndDates: getDateAndDay()
    }
  }
}
</script>
<style>
.thead {
  border-bottom: 2px solid black;
  font-size: 150%;
}

.day-name {
  text-align: left;
}
</style>
