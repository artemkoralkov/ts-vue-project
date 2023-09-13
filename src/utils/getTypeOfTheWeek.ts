import moment from 'moment'

export function getTypeOfTheWeek() {
  return Number(moment().format('W')) % 2 === 0 ? 'Числитель' : 'Знаменатель'
}
