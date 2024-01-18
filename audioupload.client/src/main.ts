import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {RecordappComponent} from './app/recordapp/recordapp.component';

bootstrapApplication(RecordappComponent, appConfig)
  .catch((err) => console.error(err));
