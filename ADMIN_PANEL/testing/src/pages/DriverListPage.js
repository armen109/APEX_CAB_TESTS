import { BasePage } from '../../src/pages/BasePage';
import { driverListLocators } from '../../src/utils/driver-list-data';
import { Filtration } from './DashboardPage';

export class DriverListPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.filtration = new Filtration(page);
  }

  async selectDriverByName(driverName){
    await this.base.typeData(driverListLocators.search_field, driverName);
    await this.base.waitingFixedTime(2500); 
    await this.base.clickButtonForced(driverListLocators.edit_driver_button);
  }
   
  // async veifyDriverFiltration(status=null, first_name=null, service=null, phone_number=null, service_type=null){
  //   if(status) { this.filtration.selectFiltration(driverListLocators.status, status) }
  //   if (first_name) { this.filtration.selectFiltrationBySearching(driverListLocators.first_name_filter, driverListLocators.filter_search, first_name) } 
  //   if (service) {this.filtration.selectFiltrationLink(driverListLocators.filter_service, service)}
  //   if (phone_number) { this.base.typeData(driverListLocators.filter_phone_number, phone_number)}
  //   if (service_type) { this.filtration.selectFiltrationLink(driverListLocators.filter_service_type, service_type)}
  //   this.base.clickButton(driverListLocators.apply_button)
  // }

  async doDriverFiltration(status=null, first_name=null, service=null, phone_number=null, service_type=null){
    if(status) { await this.filtration.selectFiltrationLink(driverListLocators.status, status) }
    if (first_name) { await this.filtration.selectFiltrationBySearching(driverListLocators.first_name_filter, driverListLocators.filter_search, first_name)  }
    if (service) { await this.filtration.selectFiltrationLink(driverListLocators.filter_service, service) }
    if (phone_number) { await this.base.typeData(driverListLocators.filter_phone_number, phone_number) }
    if (service_type) { await this.filtration.selectFiltrationLink(driverListLocators.filter_service_type, service_type) }
    await this.base.clickButton(driverListLocators.apply_button)
  }

  async assertDriverFiltration(status=null, first_name=null, service=null, phone_number=null, service_type=null){
    if(status) { await this.filtration.assertFiltration(status) }
    if (first_name) { await this.filtration.assertFiltration(first_name)  }
    if (service) { await this.filtration.assertFiltration(service) }
    if (phone_number) { await this.filtration.assertFiltration(phone_number) }
    if (service_type) { await this.filtration.assertFiltration(service_type) }
  }
}
