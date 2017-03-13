export abstract class Model {
}

export class ModelFactory {
  public static toClass(clazz: any, json: any): any {
    const newObj = Object.assign(new clazz(), json);

    // Make shure Angularfire properties are also copied
    if (!newObj['$key'] && json['$key']) {
      newObj['$key'] = json['$key'];
    }

    return newObj;
  }
}
