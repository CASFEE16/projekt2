import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionService} from './firebase/session.service';
import {RegistrationService} from './firebase/registration.service';
import {BackendService} from './firebase/backend.service';
import {YoutubeService} from './youtube/youtube.service';
import {SpotifyService} from './spotify/spotify.service';
import {ContentService} from './content/content.service';
import {TraceService} from './trace/trace.service';
import {AuthGuard} from './auth/AuthGuard';
import {NotAuthGuard} from './auth/NotAuthGuard';
import {StartedGuard} from './auth/StartedGuard';
import {EventService} from './event/event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SessionService,
    RegistrationService,
    BackendService,
    YoutubeService,
    SpotifyService,
    ContentService,
    TraceService,
    AuthGuard,
    NotAuthGuard,
    StartedGuard,
    EventService
  ]
})
export class CoreModule { }
