export function isLessonsDTOsEqual(firstLesson: LessonDTO, secondLesson: LessonDTO): boolean {
  for (const key of Object.keys(firstLesson)) {
    if (firstLesson[key as keyof LessonDTO] !== secondLesson[key as keyof LessonDTO]) {
      return false
    }
  }
  return true
}
