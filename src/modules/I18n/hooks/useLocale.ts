import 'dayjs/locale/fr';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);
dayjs().localeData();

export default function useLocale(locale: string) {
  dayjs.locale(locale);
}
