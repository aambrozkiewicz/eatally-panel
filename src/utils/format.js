import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export function formatDate(date, formatStr = 'iiii, d MMM') {
    return format(date, formatStr, { locale: pl })
};

export function formatPrice(price) {
    return Math.round(price * 100 + Number.EPSILON) / 100;
}
