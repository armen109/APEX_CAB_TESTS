import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { BaseComplicatedPage } from './BaseComplicatedPage';
import { dashboardLocators } from '../utils/dashboard-data';
import { generalLocators, generalConstants } from '../utils/general-data';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.complicatedBase = new BaseComplicatedPage(page);
  }

  async logOut(){
    await this.base.clickButton(dashboardLocators.profile_photo)
    await this.base.clickContainingButton('span', 'Log Out');
    // await this.base.waitingFixedTime(5000);
    await this.base.clickContainingButton('button', dashboardLocators.submit_log_out)
    await this.base.assertURL(generalConstants.admin_panel_url);
  }

  async changeLanguage(language){
    await this.base.clickButton(dashboardLocators.language_icon);
    await this.base.clickContainingButton('a', language);
  }

  async verifyLanguageChange(expectedText){
    await expect(this.page.getByRole('link', { name: expectedText })).toBeVisible();
  }

  async goToSection(locator, section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButtonForced(locator);
    await this.page.getByRole('link', { name: section }).click();
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

  async  goToRideRequestsSection(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.base.clickButton(dashboardLocators.ride_requests_section);
    await this.page.getByRole('link', { name: section }).click();
  }

  async goToReportPage(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.complicatedBase.scrollNotMainScroll('.scroll-content', -174);
    await this.base.clickButtonForced(dashboardLocators.report_section);
    await this.page.getByRole('link', { name: section }).click();
  }

  async goToReportPageWithScroll(section){
    await this.base.clickButton(dashboardLocators.collapsed_menu);
    await this.complicatedBase.scrollNotMainScroll('.scroll-content', -174);
    await this.base.clickButtonForced(dashboardLocators.report_section);
    await this.complicatedBase.scrollNotMainScroll('.scroll-content', -389);
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
    await this.base.clickContainingButtonOnlyFirst('li', select_option)
  }

  async selectFiltrationBySearching_include(locator, search_locator, searched_word, select_option=null){
    if(select_option==null || select_option != searched_word){
      select_option = searched_word;
    }
    await this.base.clickButton(locator);
    await this.base.typeData(search_locator, searched_word);
    await this.base.clickContainingButtonFirst('li', select_option)
  }

    async selectFiltrationBySearching_tb(locator, text, search_locator, searched_word, select_option=null){
      if(select_option==null){
        select_option = searched_word;
      }
      await this.base.clickContainingButton(locator, text);
      await this.base.typeData(search_locator, searched_word);
      await this.base.clickContainingButtonOnlyFirst('li', select_option)
  }

  async assertFiltration(data){
    await this.base.containgingShouldBeVisibleOnlyFirst('td', data);
  }

  async selectEntries(entries, entries_locator=generalLocators.entries){
    let allowedValues = ['10', '50', '100', '500', 'All', '-1']
    if(allowedValues.includes(entries)){
      if(entries=='All'){
        entries = '-1';
      }
      await this.base.selectOptionByText(entries_locator, entries);
      await this.base.shouldBeVisible(generalLocators.processing_state);
      await this.base.waitUntilNotVisible(generalLocators.processing_state);
    }else {
      throw new Error('Invalid entries value! Allowed values: 10, 50, 100, 500, All');
    }

  }
}

export class Search{
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.complicatedBase = new BaseComplicatedPage(page);
    this.filtration = new Filtration(page);
  }

  async verifySearching(searched_fields){
    await this.base.shouldBeVisible('.text-left.sorting_1');
    for(const searched_field of searched_fields){
      const data = await this.complicatedBase.getDataFromTable(searched_field);
      console.log(data);
      await this.base.typeData(data);
      // Wait for table to update after search
      await this.page.waitForSelector(generalLocators.processing_state, { state: 'hidden' });
      await this.filtration.assertFiltration(data);
    }
  }
}
