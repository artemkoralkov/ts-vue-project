interface Lesson {
  day: Number
  denominator: Boolean
  faculty: String
  first_group: Boolean
  group_name: String
  id: String
  lesson_number: Number
  lesson_title: String
  lesson_type: String
  numerator: Boolean
  second_group: Boolean
  teacher_name: String
}

interface Lessons {
  Monday: Lesson[][]
  Tuesday: Lesson[][]
  Wednesday: Lesson[][]
  Thursday: Lesson[][]
  Friday: Lesson[][]
  Saturday: Lesson[][]
}
