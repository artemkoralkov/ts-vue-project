<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ItemsSelection',
  emits: ['selectItem'],
  data() {
    return {
      searchTerm: ''
    }
  },
  props: {
    items: {
      type: Array as PropType<string[]>,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  methods: {
    selectItem(itemName: string) {
      this.searchTerm = ''
      this.$emit('selectItem', itemName)
    }
  },
  computed: {
    searchedItems() {
      if (this.searchTerm === '') {
        return []
      }
      return this.items.filter((item) => item.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  }
})
</script>

<template>
  <input
    class="search"
    :class="$attrs.class"
    v-model="searchTerm"
    type="text"
    :placeholder="placeholder"
    autocomplete="off"
  />
  <div class="listWrapper">
    <ul v-if="searchTerm">
      <li v-for="item in searchedItems" :key="item" @click="selectItem(item)">
        {{ item }}
      </li>
      <li v-if="searchTerm !== '' && searchedItems.length === 0">Ничего не найдно</li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  width: 25%;
  min-height: 30px;
  min-width: 130px;
  border-radius: 5px;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listWrapper {
  max-height: 100px;
  overflow-y: auto;
  text-align: center;
}

.listWrapper li:hover {
  background: lightgray;
}
</style>
