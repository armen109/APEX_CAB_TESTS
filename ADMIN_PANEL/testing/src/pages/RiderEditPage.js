import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { riderDetailsLocators } from '../utils/rider-edit-data';
import { driverListLocators } from '../utils/driver-list-data';
import { profile } from 'console';
import { BaseComplicatedPage } from '../pages/BaseComplicatedPage';
import { Filtration } from '../pages/DashboardPage';

export class RiderEditPage {
  constructor(page) {
    this.page = page;
    this.filtration = new Filtration(page);
    this.base = new BasePage(page);
    this.baseComplicated = new BaseComplicatedPage(page);
  }

  async selectRiderByName(riderName){
    await this.base.typeData(driverListLocators.search_field, riderName);
    // Wait for search results to appear and edit icon to be available
    await this.page.locator(riderDetailsLocators.rider_edit_icon).first().waitFor({ state: 'visible' });
    await this.page.locator(riderDetailsLocators.rider_edit_icon).first().click({ force: true });
  }

  async updateRiderInfo(newName, newStatus, profilePath){
    await this.base.clearThenType(riderDetailsLocators.rider_name_field, newName);
    await this.base.clickButton(newStatus);
    await this.base.clickButton(riderDetailsLocators.profile_photo_upload);
    await this.base.uploadFile(profilePath);
    await this.base.clickButton(riderDetailsLocators.update_button);
  }

  async updateRiderNameAndStatus(newName, newStatus){
    await this.base.clearThenType(riderDetailsLocators.rider_name_field, newName);
    await this.base.clickButton(newStatus);
    await this.base.clickButton(riderDetailsLocators.update_button);
  }

  async assertUpdatedRiderName(expectedName){
    await this.base.assertValue(riderDetailsLocators.rider_name_field, expectedName);
  }

  async updateInvalidRiderName(invalidName){
    await this.base.realisticClearThenType(riderDetailsLocators.rider_name_field, invalidName);
    // await this.base.shouldBeVisible(riderDetailsLocators.rider_name_error);
    await this.base.clickButton(riderDetailsLocators.update_button);
  }

  async updateRiderName(name){
    await this.base.clearThenType(riderDetailsLocators.rider_name_field, name);
    await this.base.clickButton(riderDetailsLocators.update_button);
  }

 async doRiderFiltrations(name = true, status = true, phone_number = true) {
    await this.base.shouldBeVisibleFirst('td');
    const fields = [];
    if (name) fields.push('name');
    if (status) fields.push('status');
    if (phone_number) fields.push('contact number'); 
  
    const data = await this.baseComplicated.getDataFromTable(fields);
    
    console.log('Retrieved data:', data);
    console.log('Fields to filter:', fields);
  
    let applied = false;
  
    if (fields.includes('name') && data.name) {
      await this.filtration.selectFiltrationBySearching(
        driverListLocators.first_name_filter,
        driverListLocators.filter_search,
        data.name
      );
      applied = true;
    }
  
    if (fields.includes('status') && data.status) {
      await this.filtration.selectFiltrationLink(
        driverListLocators.status,
        data.status
      );
      applied = true;
    }
  
    if (fields.includes('contact number') && data['contact number']) { 
      await this.base.typeData(
        driverListLocators.filter_phone_number,
        data['contact number']
      );
      applied = true;
    }
  
    if (applied) {
      await this.base.clickButton(driverListLocators.apply_button);
      const assertionValue = data['contact number'] || data.status || data.name;
      await this.filtration.assertFiltration(assertionValue);
    } else {
      throw new Error(
        'No valid fields found to apply filters in Rider section'
      );
    }
  }

  async doRiderFiltration(name, status, phone_number){
    await this.filtration.selectFiltrationBySearching(
      driverListLocators.first_name_filter,
      driverListLocators.filter_search,
      name
    );
    await this.filtration.selectFiltrationLink(
      driverListLocators.status,
      status
    );
    await this.base.typeData(
      driverListLocators.filter_phone_number,
      phone_number
    );    
    await this.base.clickButton(driverListLocators.apply_button);
  }
  
  async assertRiderFiltration( phone_number=null, status=null, first_name=null){
    if (phone_number) { await this.filtration.assertFiltration(phone_number) }
    if(status) { await this.filtration.assertFiltration(status) }
    if (first_name) { await this.filtration.assertFiltration(first_name)  }
  }

}
