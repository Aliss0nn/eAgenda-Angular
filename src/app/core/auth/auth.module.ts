import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localstorage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthService, LocalStorageService]
})
export class AuthModule { }
