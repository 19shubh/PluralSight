import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: "",
    emailOffers: false,
    interfaceStyle: "dark",
    subscriptionType: "Lifetime",
    notes: "Add a note..."
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMsg = "";
  subscriptionTypes: Observable<string[]> | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMsg = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log(form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe({
        next: result => console.log("success", result),
        error: error => this.onHttpError(error)
      });
    } else {
      this.postError = true;
      this.postErrorMsg = "Please fix the above errors."
    }
  }

}
