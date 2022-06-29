// auto figure out => which format we have (locale)
// Intl objec tis the namepsace for the JS internalization API
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "EUR",
  style: "currency", // euro symbol and two decimal places at the end
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
