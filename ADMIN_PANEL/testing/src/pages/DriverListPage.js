import { BasePage } from '../../src/pages/BasePage';
import { driverListLocators } from '../../src/utils/driver-list-data';

export class DriverListPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async selectDriverByName(driverName){
    await this.base.typeData(driverListLocators.search_field, driverName);
    await this.base.waitingFixedTime(2500); 
    await this.base.clickButtonForced(driverListLocators.edit_driver_button);
  }
   
}
