export class DateUtils {

  static today(): Date {
    return new Date();
  }

  static yesterday(): Date {
    let today = DateUtils.today();
    return new Date(today.setDate(today.getDate() - 1))
  }

  static toISOString(date: Date): string {
    return date.toISOString().substr(0,10);
  }

  static todayISOString(): string {
    return DateUtils.toISOString(DateUtils.today());
  }

}
