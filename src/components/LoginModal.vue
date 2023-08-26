<script lang="ts">
import { defineComponent } from 'vue'
import Modal from '@/components/Modal.vue'
import { useScheduleStore } from '@/stores/schedule'

export default defineComponent({
  name: 'LoginModal',
  components: { Modal },

  props: {
    showModal: Boolean
  },
  data() {
    return {
      scheduleStore: useScheduleStore(),
      password: '',
      isWrongPassword: false
    }
  },
  emits: ['closeModal'],
  methods: {
    closeModal() {
      this.$emit('closeModal')
      document.body.style.overflow = ''
      this.isWrongPassword = false
      this.password = ''
    },

    async login() {
      await this.scheduleStore.login(this.password)
      if (this.scheduleStore.currentUser) {
        this.closeModal()
      } else {
        this.isWrongPassword = true
        this.password = ''
      }
    }
  },
  created() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && this.showModal) {
        this.login()
      }
    })
  }
})
</script>

<template>
  <Teleport to="body">
    <modal :show="showModal" @close="closeModal">
      <template #header>
        <h3>Введите пароль</h3>
      </template>
      <template #body>
        <fieldset class="password-input-wrapper">
          <input
            id="password"
            ref="modalInput"
            v-model="password"
            :class="{ 'error-input': isWrongPassword }"
          />
          <label v-if="isWrongPassword" class="error" for="password">Неверный пароль</label>
        </fieldset>
      </template>
      <template #footer>
        <button class="modal-default-button" @click="login">Ок</button>
      </template>
    </modal>
  </Teleport>
</template>

<style scoped>
.password-input-wrapper {
  border: 0;
  display: flex;
  flex-direction: column;
}
</style>
