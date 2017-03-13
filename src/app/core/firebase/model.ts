export abstract class Model {
  $key: string = null;
  $exists: any = null;
}

export class ModelFactory {
  public static toClass(clazz: any, json: any): any {
    const newObj = Object.assign(new clazz(), json);

    // Make shure Angularfire properties are also copied
    if (!newObj['$key']) {
      newObj['$key'] = json['$key'];
    }

    return newObj;
  }
}
