export const USERS_RESOURCE_PATH = '/users';
import {DateUtils} from '../../shared/DateUtils';

export class User {
  name: string;
  email: string;
  updated?: string;
  created?: string;
  enabled: boolean;
  roles?: string[];
  uid?: string;

  public static newDefault(): User {
    const user: User = new User();
    user.created = DateUtils.todayISOString();
    user.enabled = true;
    return user;
  }

}
