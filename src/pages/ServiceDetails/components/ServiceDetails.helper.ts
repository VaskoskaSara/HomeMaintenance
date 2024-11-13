export function getPaymentTypeText(paymentType: string): string {
  switch (paymentType) {
    case "Hourly":
      return "$/per hour";

    case "Overall":
      return "$/per day";

    case "ByContract":
        return "By contract";

    default:
      return "by contract";
  }
}
