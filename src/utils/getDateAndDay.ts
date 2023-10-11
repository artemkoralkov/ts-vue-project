import moment from 'moment'

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

const rusDayNames = ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.']

const engDayNames = moment.weekdays()

export default function getDateAndDay() {
  const daysWithDate: { [index: string]: { day: string; date: string } } = {
    Monday: { day: '', date: '' },
    Tuesday: { day: '', date: '' },
    Wednesday: { day: '', date: '' },
    Thursday: { day: '', date: '' },
    Friday: { day: '', date: '' },
    Saturday: { day: '', date: '' }
  }
  for (let i = 1; i < 7; i += 1) {
    const date = moment(moment().startOf('week').toDate()).add(i, 'd')

    daysWithDate[engDayNames[i]] = {
      day: rusDayNames[date.day()],
      date: `${date.date()} ${monthNames[date.month()]}`
    }
  }
  return daysWithDate
}
