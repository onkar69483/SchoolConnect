import mongoose from 'mongoose';
import { Notice } from '../../backend/models/notice';

interface AgendaItem {
  title: string;
  data: {
    hour: string;
    title: string;
    notice: string;
  }[];
}

interface NoticeType {
  date: Date;
  time: string;
  title: string;
  notice: string;
}

const today = new Date().toISOString().split("T")[0];
const pastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [pastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
    const array: string[] = [];
    for (let index = 1; index <= numberOfDays; index++) {
        let d = Date.now();
        if (index > 8) {
            // set dates on the next month
            const newMonth = new Date(d).getMonth() + 1;
            d = new Date(d).setMonth(newMonth);
        }
        const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split("T")[0];
        array.push(dateString);
    }
    return array;
}
function getPastDate(numberOfDays: number) {
    return new Date(Date.now() - 864e5 * numberOfDays)
        .toISOString()
        .split("T")[0];
}

export async function getAgendaItems() {
  // Ensure database connection
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }

  const notices = await Notice.find().sort({ date: 1 });

  const agendaItems = notices.reduce((acc: AgendaItem[], notice: NoticeType) => {
    const dateString = notice.date.toISOString().split('T')[0];
    const existingDate = acc.find((item) => item.title === dateString);

    if (existingDate) {
      existingDate.data.push({
        hour: notice.time,
        title: notice.title,
        notice: notice.notice
      });
    } else {
      acc.push({
        title: dateString,
        data: [{
          hour: notice.time,
          title: notice.title,
          notice: notice.notice
        }]
      });
    }

    return acc;
  }, []);

  return agendaItems;
}

export async function getMarkedDates() {
  const agendaItems = await getAgendaItems();
  const marked: Record<string, { marked?: boolean, disabled?: boolean }> = {};

  agendaItems.forEach((item: AgendaItem) => {
    if (item.data && item.data.length > 0) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });

  return marked;
}

export const ITEMS = [
  // Your items array
];
