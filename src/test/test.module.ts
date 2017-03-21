import { BrowserModule } from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdDialogRef } from '@angular/material';
import {RouterModule} from '@angular/router';
import {SharedModule} from "../app/shared/shared.module";

import {SessionService} from '../app/core/firebase/session.service';
import {SessionMockService} from './core/firebase/session-mock.service';
import {BackendService} from '../app/core/firebase/backend.service';
import {BackendMockService} from './core/firebase/backend-mock.service';
import {TraceService} from '../app/core/trace/trace.service';

import {TestModuleMetadata} from '@angular/core/testing';

@NgModule()
export class TestModule {

  static forTest(config: TestModuleMetadata = {}): TestModuleMetadata {
    return {
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        RouterModule.forRoot([]),
        SharedModule,
        ...config.imports
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: SessionService, useClass: SessionMockService},
        {provide: BackendService, useClass: BackendMockService},
        TraceService,
        ...config.providers
      ],
      declarations: [
        ...config.declarations
      ]
    };
  }

}
