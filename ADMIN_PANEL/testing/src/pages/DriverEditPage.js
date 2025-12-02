import { Page, expect, Locator, Request } from '@playwright/test';
import { BasePage } from './BasePage';
import { driverListLocators } from '../utils/driver-list-data';
import { driverEditConstants, driverEditLocators } from '../utils/driver-edit-data';
import { driverVehicleDetailsLocators } from '../utils/driver-edit-data';
import { serviceDetailseLocators } from '../utils/driver-edit-data';
import { driverDocumentsLocators, driverDocumentsConstants } from '../utils/driver-edit-data';

export class DriverEditPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
  }

  async assertDisabledFields(){
    await this.base.assertDisabled(driverEditLocators.phone_number_field);
    await this.base.assertDisabled(driverEditLocators.email_field);
    await this.base.assertDisabled(driverEditLocators.citizenship_field);
  }

  async updateName(newName, newLastName){
    await this.base.clearThenType(driverEditLocators.first_name_field, newName);
    await this.base.clearThenType(driverEditLocators.last_name_field, newLastName);
  }

  async updateDriverInfo(name, last_name, id_number, ssn_number, driver_license_number){
    await this.updateName(name, last_name);
    await this.base.clearThenType(driverEditLocators.id_field, id_number);
    await this.base.clearThenType(driverEditLocators.ssn_field, ssn_number);
    await this.base.clearThenType(driverEditLocators.driver_license_field, driver_license_number);
    await this.base.clickButton(driverEditLocators.update_button);
  }

  async assertUpdatedValues(firstName, lastName, idNumber, ssnNumber, driverLicenseNumber){
    await this.base.assertValue(driverEditLocators.first_name_field, firstName);
    await this.base.assertValue(driverEditLocators.last_name_field, lastName);
    await this.base.assertValue(driverEditLocators.id_field, idNumber);
    await this.base.assertValue(driverEditLocators.ssn_field, ssnNumber);
    await this.base.assertValue(driverEditLocators.driver_license_field, driverLicenseNumber);
  }

  async assertErrorMessage(){
    await this.base.shouldBeVisible(driverEditLocators.first_name_error);
    await this.base.shouldBeVisible(driverEditLocators.last_name_error);
    await this.base.shouldBeVisible(driverEditLocators.id_error);
    await this.base.shouldBeVisible(driverEditLocators.ssn_error);
    await this.base.shouldBeVisible(driverEditLocators.driver_license_error);
  }

  async updateDriverInfoInvalid(invalidName, invalidLastName, invalidIdNumber, invalidSsnNumber, invalidDriverLicenseNumber){
    await this.base.realisticClearThenType(driverEditLocators.first_name_field, invalidName);
    await this.base.realisticClearThenType(driverEditLocators.last_name_field, invalidLastName);
    await this.base.realisticClearThenType(driverEditLocators.id_field, invalidIdNumber);
    await this.base.realisticClearThenType(driverEditLocators.ssn_field, invalidSsnNumber);
    await this.base.realisticClearThenType(driverEditLocators.driver_license_field, invalidDriverLicenseNumber);
    // await this.assertErrorMessage();
    await this.base.clickButton(driverEditLocators.update_button);
    await expect(this.page.locator('text=The first name must be at least 2 characters.')).toBeVisible();
  }
}

export class DriverVehicleDetailsPage extends DriverEditPage {

  constructor(page) {
    super(page);
  }

  async goToVehicleDetailsSection(){
    await this.base.clickButton(driverEditLocators.vehicle_details_section);
  }

  async updateVehicleDetails(registrationNumber, carMake, carModel, carYear, carColor, plateNumber, numberSeats){
    await this.base.clearThenType(driverVehicleDetailsLocators.vehicle_registration_field, registrationNumber);
    await this.base.clickButton(driverVehicleDetailsLocators.car_make_field);
    await this.base.clickContainingButtonFirst(driverVehicleDetailsLocators.car_select_option, carMake);
    await this.base.clickButton(driverVehicleDetailsLocators.car_model_field);
    await this.base.clickContainingButtonFirst(driverVehicleDetailsLocators.car_select_option, carModel);
    await this.base.clickButton(driverVehicleDetailsLocators.car_production_year_field);
    await this.base.clickContainingButtonFirst(driverVehicleDetailsLocators.car_select_option, carYear);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_color_field, carColor);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_plate_number_field, plateNumber);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_seats_field, numberSeats);
    await this.base.clickButton(driverVehicleDetailsLocators.update_button);
  }

  async assertUpdatedVehicleDetails(registrationNumber, carMake, carModel, carYear, carColor, plateNumber, numberSeats){
    await this.base.assertValue(driverVehicleDetailsLocators.vehicle_registration_field, registrationNumber);
    await this.base.assertTitle(driverVehicleDetailsLocators.car_make_field, carMake);
    await this.base.assertTitle(driverVehicleDetailsLocators.car_model_field, carModel);
    await this.base.assertTitle(driverVehicleDetailsLocators.car_production_year_field, carYear);
    await this.base.assertValue(driverVehicleDetailsLocators.car_color_field, carColor);
    await this.base.assertValue(driverVehicleDetailsLocators.car_plate_number_field, plateNumber);
    await this.base.assertValue(driverVehicleDetailsLocators.car_seats_field, numberSeats);
  }

  async updateInvalidVehicleDetails(invalid_vehicle, invalid_color, invalid_plate, invalid_seat){
    await this.base.clearThenType(driverVehicleDetailsLocators.vehicle_registration_field, invalid_vehicle);
    await this.base.clickFirstButton(driverVehicleDetailsLocators.car_make_cross);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_color_field, invalid_color);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_plate_number_field, invalid_plate);
    await this.base.clearThenType(driverVehicleDetailsLocators.car_seats_field, invalid_seat);
    await this.base.clickButton(driverVehicleDetailsLocators.update_button);
  }
}

export class DriverServiceDetailsPage extends DriverEditPage {

  constructor(page) {
    super(page);
  }

  async goToServiceDetailsSection(){
    await this.base.clickButton(driverEditLocators.service_details_section);
  }

  async addServiceDetails(service_details){
    await this.base.clickButton(serviceDetailseLocators.service_details_field);
    await this.page
    .locator(serviceDetailseLocators.service_option)
    .filter({ hasText: service_details })
    .locator('input[type="checkbox"]')
    .check();
    await this.base.clickButton(driverVehicleDetailsLocators.update_button);
  }

  async removeServiceDetails(serviceDetail){
    await this.page
      .locator(serviceDetailseLocators.service_tag)
      .filter({ hasText: serviceDetail })
      .locator(serviceDetailseLocators.cross_icon)
      .click();
    await this.base.clickButton(driverVehicleDetailsLocators.update_button);
  }

  async assertAddedServiceDetails(serviceDetail){
    await this.base.containingShouldNotBeVisible('h5', serviceDetail);
  }

  async assertRemovedServiceDetails(serviceDetail){ 
    await this.page
      .locator(serviceDetailseLocators.service_tag)
      .filter({ hasText: serviceDetail })
      .locator(serviceDetailseLocators.cross_icon).not.toBeVisible(); 
  }
}

export class DriverDocumentsPage extends DriverEditPage {
  constructor(page) {
    super(page);
  }

  async goToDriverDocumentsSection(){
    await this.base.clickButton(driverEditLocators.driver_documents_section);
  }

  // async changeDocumentStatus(documentType, status){
  //   await this.base.clickButton(documentType);
  //   await this.base.closestElementClick(documentType, 'option', status);
  // }

  async updateDocuments(status){
    await this.base.clickButton(driverDocumentsLocators.id_type_document);
    await this.base.selectOptionByText(driverDocumentsLocators.profile_photo_document, status);
    await this.base.selectOptionByText(driverDocumentsLocators.id_passport_document, status);
    await this.base.selectOptionByText(driverDocumentsLocators.driver_license_document, status);
    await this.base.selectOptionByText(driverDocumentsLocators.vehicle_details_document, status);
    await this.base.selectOptionByText(driverDocumentsLocators.car_photos_document, status);
    await this.base.selectOptionByText(driverDocumentsLocators.ssn_document, status);
    await this.base.clickButton(driverVehicleDetailsLocators.update_button);
  }

  async assertUpdatedDocumentStatuses(expectedStatus){
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.profile_photo_document, expectedStatus);
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.id_passport_document, expectedStatus);
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.driver_license_document, expectedStatus);
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.vehicle_details_document, expectedStatus);
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.car_photos_document, expectedStatus);
    await this.base.assertOptionHasSelectedAttribute(driverDocumentsLocators.ssn_document, expectedStatus);
  }
}