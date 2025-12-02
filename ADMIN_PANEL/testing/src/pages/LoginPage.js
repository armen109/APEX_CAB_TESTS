import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { loginLocators } from '../../src/utils/login-data';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async login(email, password) {
    await this.base.typeData(loginLocators.email_field, email);
    await this.base.typeData(loginLocators.password_field, password);
    await this.base.clickButton(loginLocators.submit_button);
  }
   
}
