import { defineStore } from 'pinia'
import { deleteRequest, getRequest, postRequest, putRequest } from '@/utils'

export const useScheduleStore = defineStore('schedule', {
  state: () => {
    return {
      count: 0,
      FACULTIES: {
        ФИФ: 'fif',
        ФФК: 'ffk',
        ФФ: 'ff',
        'ТБФ (биология)': 'tbfb',
        'ТБФ (технология)': 'tbft',
        ДиНО: 'dino'
      },
      // path: 'http://127.0.0.1:8000',
      path: 'https://mspu-schedule-server.onrender.com',
      allTeachers: [] as Teacher[],
      allGroups: [] as Group[],
      groups: [] as Group[],
      selectedGroup: '',
      selectedFaculty: '',
      selectedTeacher: '',
      selectedList: '',
      teachers: [] as Teacher[],
      detailedFlag: false,
      teachersLessons: {} as Lessons,
      groupsLessons: {} as Lessons,
      searchTerm: '',
      currentUser: '',
      isAdmin: false,
      editingLesson: {},
      showModal: false,
      lessonFor: '',
      previousLesson: {} as Lesson | undefined,
      dayName: '' as Day,
      lessonNumber: 0
    }
  },

  getters: {
    searchedTeachers(state): { faculty: string; teacher_name: string }[] {
      if (state.searchTerm === '') {
        return []
      }
      return state.teachers.filter((teacher: { faculty: string; teacher_name: string }) =>
        teacher.teacher_name.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    },

    searchedGroups(state): { faculty: string; group_name: string }[] {
      if (state.searchTerm === '') {
        return []
      }
      return state.groups.filter((group: { faculty: string; group_name: string }) =>
        group.group_name.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }
  },

  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async selectTeacher(teacher_name: string) {
      this.selectedTeacher = teacher_name
      this.teachersLessons = await getRequest(
        `${this.path}/lessons/?teacher_name=${this.selectedTeacher}`
      )
      this.selectedGroup = ''
      this.searchTerm = ''
      window.scrollTo(0, 0)
    },

    async selectGroup(group_name: string) {
      this.selectedGroup = group_name
      this.groupsLessons = await getRequest(
        `${this.path}/lessons/?group_name=${this.selectedGroup}`
      )
      this.selectedTeacher = ''
      this.searchTerm = ''
      window.scrollTo(0, 0)
    },

    selectFaculty() {
      this.teachers = this.allTeachers.filter(
        (teacher: { faculty: string; teacher_name: string }) =>
          teacher.faculty === this.selectedFaculty
      )
      this.groups = this.allGroups.filter(
        (group: { faculty: string; group_name: string }) => group.faculty === this.selectedFaculty
      )
    },

    async addLesson(dayName: Day, lessonNumber: number, lesson: LessonDTO) {
      const newLesson: Lesson = await postRequest(`${this.path}/lessons`, lesson, this.currentUser)
      if (this.selectedList === 'Преподаватели') {
        this.teachersLessons[dayName][lessonNumber].push(newLesson)
      } else {
        this.groupsLessons[dayName][lessonNumber].push(newLesson)
      }
    },

    async editLesson(
      dayName: Day,
      lessonNumber: number,
      lessonId: string,
      editedLesson: LessonDTO
    ) {
      await putRequest(`${this.path}/lessons/${lessonId}`, editedLesson, this.currentUser)
      if (this.selectedList === 'Преподаватели') {
        this.teachersLessons[dayName][lessonNumber] = this.teachersLessons[dayName][
          lessonNumber
        ].map((obj) => {
          if (obj.id == lessonId) {
            return { id: lessonId, ...editedLesson }
          }
          return obj
        })
      } else {
        this.groupsLessons[dayName][lessonNumber] = this.groupsLessons[dayName][lessonNumber].map(
          (obj) => {
            if (obj.id == lessonId) {
              return { id: lessonId, ...editedLesson }
            }
            return obj
          }
        )
      }
    },

    async deleteLesson(lessonId: string, dayName: Day, lessonNumber: number) {
      if (lessonId.includes(', ')) {
        for (const id of lessonId.split(', ')) {
          await deleteRequest(`${this.path}/lessons/${id}`, this.currentUser)
        }
      } else {
        await deleteRequest(`${this.path}/lessons/${lessonId}`, this.currentUser)
      }
      if (this.selectedList === 'Преподаватели') {
        this.teachersLessons[dayName][lessonNumber] = this.teachersLessons[dayName][
          lessonNumber
        ].filter((lesson) => lesson.id !== lessonId)
      } else {
        this.groupsLessons[dayName][lessonNumber] = this.groupsLessons[dayName][
          lessonNumber
        ].filter((lesson) => lesson.id !== lessonId)
      }
    },

    async getData() {
      this.allTeachers = await getRequest(`${this.path}/teachers/`)
      this.allGroups = await getRequest(`${this.path}/lessons/groups`)
    },

    async login(password: string) {
      this.currentUser = await postRequest(`${this.path}/users/login`, { password })
      if (this.currentUser) {
        localStorage.setItem('password', password)
      }
      this.isAdmin = this.isAdminAllowed()
    },

    isAdminAllowed() {
      const adminData: AdminData = {
        admin: null, // null означает, что у администратора нет ограничения по факультету
        fif_admin: ['ФИФ'],
        ff_admin: ['ФФ'],
        dino_admin: ['ДиНО'],
        tbf_admin: ['ТБФ (технология)', 'ТБФ (биология)'],
        ffk_admin: ['ФФК']
      }

      // Проверяем, есть ли текущий пользователь в словаре adminData
      if (Object.prototype.hasOwnProperty.call(adminData, this.currentUser)) {
        const allowedFaculty = adminData[this.currentUser]

        // Проверяем, соответствует ли выбранный факультет ограничению (если есть)
        if (!allowedFaculty || allowedFaculty.includes(this.selectedFaculty)) {
          return true
        }
      }
      return false
    },

    openLessonModal(dayName: Day, lessonNumber: number, lesson: Lesson | undefined = undefined) {
      this.lessonFor =
        this.selectedList === 'Преподаватели' ? this.selectedTeacher : this.selectedGroup
      this.dayName = dayName
      this.previousLesson = lesson
      this.lessonNumber = lessonNumber
      this.showModal = true
    },
    closeLessonModal() {
      this.showModal = false
    }
  }
})
