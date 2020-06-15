import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from "@angular/forms";
import { User } from "@app/shared/interfaces";
import { UserService } from "@app/shared/services/admin/user.service";

@Component({
  selector: "app-account-manager",
  templateUrl: "./account-manager.component.html",
  styleUrls: ["../manage.component.scss", "../../dashboard.component.scss"],
})
export class AccountManagerComponent implements OnInit {
  generalLock: Boolean = true;
  passwordLock: Boolean = true;
  emailLock: Boolean = true;
  confirmChanges: Boolean = false;
  invalidForm: Boolean = true;
  submitted: Boolean = false;
  user: User | null = window.user;
  formDefaults = {
    forename: this.user?.forename,
    surname: this.user?.surname,
    email: this.user?.email,
    upgradeToken: null,
    newPassword: null,
    repeatPassword: null,
  };
  constructor(private userService: UserService) {
    this.resetForms();
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get("new");
    return password && control.value !== password.value
      ? {
          passwordMatch: true,
        }
      : null;
  }

  accountForm = new FormGroup({
    forename: new FormControl(null),
    surname: new FormControl(null),
    upgradeToken: new FormControl(null),
  });

  get forename(): AbstractControl {
    return this.accountForm.get("forename")!;
  }

  get surname(): AbstractControl {
    return this.accountForm.get("surname")!;
  }

  get upgradeToken(): AbstractControl {
    return this.accountForm.get("upgradeToken")!;
  }

  newEmailForm = new FormGroup({
    email: new FormControl(null, [Validators.email]),
  });

  get email(): AbstractControl {
    return this.newEmailForm.get("email")!;
  }

  newPasswordForm = new FormGroup({
    new: new FormControl(null, [Validators.required]),
    repeat: new FormControl(null, [
      Validators.required,
      this.passwordsMatchValidator,
    ]),
  });

  get newPassword(): AbstractControl {
    return this.newPasswordForm.get("new")!;
  }

  get repeatPassword(): AbstractControl {
    return this.newPasswordForm.get("repeat")!;
  }

  resetForms() {
    this.forename.setValue(this.formDefaults.forename);
    this.surname.setValue(this.formDefaults.surname);
    this.upgradeToken.setValue(this.formDefaults.upgradeToken);
    this.email.setValue(this.formDefaults.email);
    this.newPassword.setValue(this.formDefaults.newPassword);
    this.repeatPassword.setValue(this.formDefaults.repeatPassword);
    this.accountForm.disable();
    this.newEmailForm.disable();
    this.newPasswordForm.disable();
  }

  checkInvalid() {
    return (
      this.accountForm.invalid ||
      this.newPasswordForm.invalid ||
      this.newEmailForm.invalid
    );
  }

  toggleLock(form: string) {
    if (
      this.accountForm.touched ||
      this.newPasswordForm.touched ||
      this.newPasswordForm.touched
    ) {
      this.confirmChanges = !this.confirmChanges;
    }
    this.invalidForm = this.checkInvalid();
    switch (form) {
      case "password":
        if (this.passwordLock) {
          this.newPasswordForm.enable();
        } else {
          this.newPasswordForm.disable();
        }
        this.passwordLock = !this.passwordLock;
        break;
      case "email":
        if (this.emailLock) {
          this.newEmailForm.enable();
        } else {
          this.newEmailForm.disable();
        }
        this.emailLock = !this.emailLock;
        break;
      default:
        if (this.generalLock) {
          this.accountForm.enable();
        } else {
          this.accountForm.disable();
        }
        this.generalLock = !this.generalLock;
        break;
    }
  }

  updateDetails() {
    this.userService
      .updateUser(
        this.forename.value == this.user?.forename ? null : this.forename.value,
        this.surname.value == this.user?.surname ? null : this.surname.value,
        this.email.value == this.user?.email ? null : this.email.value,
        this.upgradeToken.value,
        this.newPassword.value,
        this.repeatPassword.value
      )
      .subscribe((res) => {
        if (res) {
          window.location.reload();
        }
      });
    this.submitted = true;
  }

  ngOnInit() {}
}
