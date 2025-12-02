import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { riderDetailsLocators } from '../utils/rider-edit-data';
import { driverListLocators } from '../utils/driver-list-data';
import { profile } from 'console';

export class RiderEditPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async selectRiderByName(riderName){
    await this.base.typeData(driverListLocators.search_field, riderName);
    await this.base.waitingFixedTime(2500); 
    await this.page.locator(riderDetailsLocators.rider_edit_icon).first().click({ force: true });
    // await this.base.clickButtonForced(riderDetailsLocators.rider_edit_icon);
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

}
