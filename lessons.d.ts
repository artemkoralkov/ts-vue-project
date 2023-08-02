type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
interface LessonDTO {
  day: number
  denominator: boolean
  faculty: string
  first_group: boolean
  group_name: string
  lesson_number: number
  lesson_title: string
  lesson_type: string
  numerator: boolean
  second_group: boolean
  teacher_name: string
}

interface Lesson extends LessonDTO {
  id: string
}

interface Lessons {
  Monday: Lesson[][]
  Tuesday: Lesson[][]
  Wednesday: Lesson[][]
  Thursday: Lesson[][]
  Friday: Lesson[][]
  Saturday: Lesson[][]
}
