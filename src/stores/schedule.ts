// import { ref, computed } from 'vue'
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
      path: 'http://127.0.0.1:8000',
      // path: 'https://mspu-schedule-server.onrender.com',
      allTeachers: [],
      allGroups: [],
      groups: [],
      selectedGroup: '',
      selectedFaculty: '',
      selectedTeacher: '',
      selectedList: '',
      teachers: [],
      detailedFlag: false,
      teachersLessons: {} as Lessons,
      groupsLessons: {} as Lessons,
      searchTerm: '',
      currentUser: '',
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

    async addTeacherLesson(dayName: Day, lessonNumber: number, lesson: LessonDTO) {
      const newLesson: Lesson = await postRequest(`${this.path}/lessons`, lesson, this.currentUser)
      this.teachersLessons[dayName][lessonNumber].push(newLesson)
    },

    async editTeacherLesson(
      dayName: Day,
      lessonNumber: number,
      lessonId: string,
      editedLesson: LessonDTO
    ) {
      await putRequest(`${this.path}/lessons/${lessonId}`, editedLesson, this.currentUser)
      this.teachersLessons[dayName][lessonNumber] = this.teachersLessons[dayName][lessonNumber].map(
        (obj) => {
          if (obj.id == lessonId) {
            return { id: lessonId, ...editedLesson }
          }
          return obj
        }
      )
    },

    async deleteTeacherLesson(lessonId: string, dayName: Day, lessonNumber: number) {
      await deleteRequest(`${this.path}/lessons/${lessonId}`, this.currentUser)
      this.teachersLessons[dayName][lessonNumber] = this.teachersLessons[dayName][
        lessonNumber
      ].filter((lesson) => lesson.id !== lessonId)
    },

    async addGroupLesson(dayName: Day, lessonNumber: number, lesson: LessonDTO) {
      const newLesson: Lesson = await postRequest(`${this.path}/lessons`, lesson, this.currentUser)
      this.groupsLessons[dayName][lessonNumber].push(newLesson)
    },

    async editGroupLesson(
      dayName: Day,
      lessonNumber: number,
      lessonId: string,
      editedLesson: LessonDTO
    ) {
      await putRequest(`${this.path}/lessons/${lessonId}`, editedLesson, this.currentUser)
      this.groupsLessons[dayName][lessonNumber] = this.groupsLessons[dayName][lessonNumber].map(
        (obj) => {
          if (obj.id == lessonId) {
            return { id: lessonId, ...editedLesson }
          }
          return obj
        }
      )
    },

    async deleteGroupLesson(lessonId: string, dayName: Day, lessonNumber: number) {
      await deleteRequest(`${this.path}/lessons/${lessonId}`, this.currentUser)
      this.groupsLessons[dayName][lessonNumber] = this.groupsLessons[dayName][lessonNumber].filter(
        (lesson) => lesson.id !== lessonId
      )
    },

    async getData() {
      this.allTeachers = await getRequest(`${this.path}/teachers/`)
      this.allGroups = await getRequest(`${this.path}/lessons/groups`)
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
