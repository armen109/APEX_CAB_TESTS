import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { loginLocators } from '../../src/utils/login-data';
import { generalConstants, generalLocators } from '../utils/general-data';
import { driverListLocators } from '../utils/driver-list-data';
import { BaseComplicatedPage } from './BaseComplicatedPage';
import { Filtration } from './DashboardPage';
import { rideRequestsConstants, rideRequestsLocators } from '../utils/ride_requests-data';

export class RideRequestsPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.complicatedBase = new BaseComplicatedPage(page);
    this.filtration = new Filtration(page)
  }

 async doRideRequestsFiltration(missedRides=false){
    await this.base.shouldBeVisibleFirst(rideRequestsLocators.ride_requests_table);
    if(await this.base.shouldNotBeVisible(generalLocators.empty_data_tables_text)){
        throw new Error('No data in table');
    }else {
        let fields;
        if(!missedRides){
            fields = ['rider', 'driver', 'type', 'payment', 'status', 'payment method'];
        }else {
            fields = ['rider', 'driver', 'type'];
        }
        const data = await this.complicatedBase.getDataFromTable(fields);
        
        console.log('Retrieved data:', data);
        let applied = false;
        
        if (fields.includes('rider') && data.rider) {
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.rider_filtration,
                rideRequestsLocators.filter_search,
                data.rider
            );
            applied = true;
        }

        if (fields.includes('driver') && data.driver) {
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.driver_filtration,
                rideRequestsLocators.filter_search,
                data.driver
            );
            applied = true;
        }

        if (fields.includes('type') && data.type) {
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.type_filtration,
                rideRequestsLocators.filter_search,
                data.type
            );
            applied = true;
        }

        if (fields.includes('payment') && data.payment) {
            if(data.payment == 'Cancelled') {
                data.payment = 'cancelled'
            }
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.payment_status_filtration,
                rideRequestsLocators.filter_search,
                data.payment
            );
            applied = true;
        }

        if (fields.includes('status') && data.status) {
            if(data.status == 'Cancelled') {
                data.status = 'cancelled'
            }
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.status_filtration,
                rideRequestsLocators.filter_search,
                data.status
            );
            applied = true;
        }

        if (fields.includes('payment method') && data['payment method']) {
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.payment_method_filtration,
                rideRequestsLocators.filter_search,
                data['payment method']
            );
            applied = true;
        }

        if (applied) {
            await this.base.clickButton(driverListLocators.apply_button);
            const assertionValue = data.rider || data.driver;
            await this.filtration.assertFiltration(assertionValue);
        } else {
            throw new Error(
                'No valid fields found to apply filters in Ride Requests section'
            );
        }
    }
}
   
}
