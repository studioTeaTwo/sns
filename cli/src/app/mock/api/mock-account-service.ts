import { Observable } from 'rxjs/Observable';

export class MockAccountService {
  login() {
    return Observable.of();
  }

  logout() {
    return Observable.of();
  }

  isLoggedIn() {
    return Promise.resolve(true);
  }

  get() {
    return Observable.of();
  }

  saveSignupdataName() {
  }

  saveSignupdataSymptom() {
  }

  saveSignupdataClassification() {
  }

  saveSignupdataEmail() {
  }

  saveSignupdataPassword() {
  }

  verifyEmail() {
    return Observable.of();
  }

  emailValidator() {
    return true;
  }

  passwordValidator() {
    return true;
  }
}
