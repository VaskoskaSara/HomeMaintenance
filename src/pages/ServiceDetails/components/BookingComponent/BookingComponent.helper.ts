import dayjs from "dayjs";
import { PaymentType } from "src/pages/RegisterPage/components/Register/RegisterForm.props";

export const calculatePrice = (
  selectedDates: any,
  selectedTimes: any,
  paymentType: any,
  price: any,
  setCalculatedPrice: any
) => {
  var calculated: number = 0;

  const differenceInTime =
    new Date(selectedDates[1]).getTime() - new Date(selectedDates[0]).getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)) + 1;

  const firstTime = new Date(`1970-01-01T${selectedTimes[0]}:00`);
  const secondTime = new Date(`1970-01-01T${selectedTimes[1]}:00`);

  const differenceInMilliseconds = secondTime.getTime() - firstTime.getTime();

  const differenceInHours = differenceInMilliseconds / (1000 * 3600);

  if (paymentType === PaymentType[PaymentType.Hourly]) {
    calculated = differenceInDays * price! * differenceInHours;
  } else if (paymentType === PaymentType[PaymentType.Overall]) {
    calculated = differenceInDays * price!;
  }

  setCalculatedPrice(calculated);
};

export const IsDisabledTime = () => {
  return {
    disabledHours: () => {
      const hours = [];
      for (let i = 0; i < 24; i++) {
        if (i < 6 || i > 23) {
          hours.push(i);
        }
      }
      return hours;
    },
    disabledMinutes: () => {
      return [];
    },
    disabledSeconds: () => {
      return [];
    },
  };
};

export const IsDisabledDate = (current: dayjs.Dayjs, disabledDates: any) => {
  const today = dayjs().endOf("day");

  if (current < today) {
    return true;
  }

  if (disabledDates.some((date: any) => dayjs(date).isSame(current, "day"))) {
    return true;
  }

  return false;
};
