
export function getPaymentTypeText(paymentType: string | number): string {
  switch (paymentType) {
    case "Hourly":
    case 1:
      return "$/per hour";

    case "Overall":
    case 2:
      return "$/per day";

    case "ByContract":
    case 3:
      return "By contract";

    default:
      return "by contract";
  }
}
