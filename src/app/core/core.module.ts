import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionService} from "./firebase/session.service";
import {RegistrationService} from "./firebase/registration.service";
import {BackendService} from "./firebase/backend.service";
import {YoutubeService} from "./youtube/youtube.service";
import {SpotifyService} from "./spotify/spotify.service";
import {ContentService} from "./content/content.service";

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
    ContentService
  ]
})
export class CoreModule { }
