import { Observable } from 'rxjs/Observable';
import 'app/core/rxjs-operators';

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
    return Observable.of({
      id: 1,
      atopic: true,
      asthma: true,
      pollen: false,
      rhinitis: false,
      gastroenteritis: false,
      conjunctivitis: false,
    });
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
