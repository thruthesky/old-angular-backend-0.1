
import { NgModule } from '@angular/core';
import { User } from './user';
import { Base } from './base';
import { Test } from './test';

@NgModule({
    providers: [ Base, User, Test ]
})
export class AngularBackendModule {}
