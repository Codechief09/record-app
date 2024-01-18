import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordappComponent } from './recordapp/recordapp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  // path: main, component: MainComponent
  { path: '', component: RecordappComponent },
];