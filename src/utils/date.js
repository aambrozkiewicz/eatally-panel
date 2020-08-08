import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export default function (date, formatStr = 'iiii, d MMM') {
    return format(date, formatStr, { locale: pl })
};
