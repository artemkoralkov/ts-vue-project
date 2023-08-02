<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GroupSelection',
  emits: ['groupSelection'],
  data() {
    return {
      searchTerm: ''
    }
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectGroup(groupName) {
      this.searchTerm = ''
      this.$emit('groupSelection', groupName)
    }
  },
  computed: {
    searchedGroups(): { faculty: string; group_name: string }[] {
      if (this.searchTerm === '') {
        return []
      }
      return this.groups.filter((group: { faculty: string; group_name: string }) =>
        group.group_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  }
})
</script>

<template>
  <input
    id="search"
    :class="$attrs.class"
    v-model="searchTerm"
    type="text"
    placeholder="Группа"
    autocomplete="off"
  />
  <div class="listWrapper">
    <ul v-if="searchTerm">
      <li v-for="group in searchedGroups" :key="group" @click="selectGroup(group.group_name)">
        {{ group.group_name }}
      </li>
      <li v-if="searchTerm !== '' && searchedGroups.length === 0">Ничего не найдно</li>
    </ul>
  </div>
</template>

<style scoped></style>
