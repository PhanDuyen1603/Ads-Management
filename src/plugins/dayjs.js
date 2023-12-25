import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime)
  dayjs.extend(localizedFormat)
  dayjs.locale('vi')
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault(dayjs.tz.guess());
  return {
    provide: {
      dayjs
    }
  }
})