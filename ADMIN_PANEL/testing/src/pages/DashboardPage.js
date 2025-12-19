import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { dashboardLocators } from '../utils/dashboard-data';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async logOut(){
    await this.base.clickButton(dashboardLocators.profile_photo)
    await this.base.clickContainingButton('span', 'Log Out');
  }

  async changeLanguage(language){
    await this.base.clickButton(dashboardLocators.language_icon);
    await this.base.clickContainingButton('a', language);
  }

  async verifyLanguageChange(expectedText){
    await expect(this.page.getByRole('link', { name: expectedText })).toBeVisible();
  }

  async goToDriverSection(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButton(dashboardLocators.driver_section);
    await this.page.getByRole('link', { name: section }).click();
  }

  async goToRiderSection(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButton(dashboardLocators.rider_section);
    await this.page.getByRole('link', { name: section }).click();
  }

  async goToServiceSection(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButton(dashboardLocators.service_section);
    await this.page.getByRole('link', { name: section }).click();
  }

  async goToSupportChatSection(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButton(dashboardLocators.support_chat_section);
    await this.page.getByRole('link', { name: section }).click();
  }
   
}

export class Filtration {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async selectFiltration(locator, select_option){
    await this.base.clickButton(locator);
    await this.base.clickButton(select_option);
    // this.base.clickContainingButton('li', select_option);
  }

  async selectFiltrationLink(locator, select_option){
    await this.base.clickButton(locator);
    await this.base.clickContainingButtonOnly('li', select_option);
  }

  async selectFiltrationBySearching(locator, search_locator, searched_word, select_option=null){
    if(select_option==null){
      select_option = searched_word;
    }
    await this.base.clickButton(locator);
    await this.base.typeData(search_locator, searched_word);
    await this.base.clickContainingButtonOnly('li', select_option)
  }

  async assertFiltration(data){
    await this.base.containgingShouldBeVisibleOnly('td', data);
  }
}
