import { Injectable } from '@angular/core';
import {BackendService} from "../../core/firebase/backend.service";
import {ObjectCache} from "../../core/firebase/ObjectCache";
import {User} from "./user.model";
import {SessionService} from "../../core/firebase/session.service";

@Injectable()
export class UserService {

  object: ObjectCache<User> = new ObjectCache<User>();

  constructor(private backendService: BackendService) { }



}
