import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { serviceLocators } from '../../src/utils/services-data';

export class ServicePage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async addService(
    service_name, service_sub_name, service_region, 
    base_fare, minimum_distance, per_distance, 
    per_minute, waiting_time, per_minute_wait, 
    city_per_distance, city_per_minute, status, type, 
    description, service_path){
    await this.base.typeData(serviceLocators.name_field, service_name);
    await this.base.typeData(serviceLocators.sub_name_field, service_sub_name);
    await this.base.clickButton(serviceLocators.region_field);
    await this.base.clickContainingButtonFirst(serviceLocators.select_option, service_region);
    await this.base.typeData(serviceLocators.base_fare_field, base_fare);
    await this.base.typeData(serviceLocators.minimum_distance_field, minimum_distance);
    await this.base.typeData(serviceLocators.per_distance_field, per_distance);
    await this.base.typeData(serviceLocators.per_minute_field, per_minute);
    await this.base.typeData(serviceLocators.waiting_time_field, waiting_time);
    await this.base.typeData(serviceLocators.per_minute_wait_field, per_minute_wait);
    await this.base.typeData(serviceLocators.city_per_distance_field, city_per_distance);
    await this.base.typeData(serviceLocators.city_per_minute_field, city_per_minute);
    await this.base.clickButton(serviceLocators.status_field);
    await this.base.clickContainingButtonFirst(serviceLocators.select_option, status);
    await this.base.clickButton(serviceLocators.type_field);
    await this.base.clickContainingButtonFirst(serviceLocators.select_option, type);
    await this.base.uploadFile(service_path);
    await this.base.typeData(serviceLocators.description_field, description);
    await this.base.clickButton(serviceLocators.save_button);
}

     
}
