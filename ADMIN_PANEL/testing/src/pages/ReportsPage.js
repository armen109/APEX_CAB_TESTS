import {expect} from '@playwright/test';
import { BasePage } from '../../src/pages/BasePage';
import { Filtration } from './DashboardPage';
import { BaseComplicatedPage } from './BaseComplicatedPage';
import { rideRequestsConstants, rideRequestsLocators } from '../utils/ride_requests-data';
import { generalLocators, generalConstants } from '../utils/general-data';
import { driverListLocators } from '../utils/driver-list-data';
import { reportsLocators } from '../utils/report-data';

export class ReportPage {
  constructor(page) {
    this.page = page;
    this.base = new BasePage(page);
    this.filtration =  new Filtration(page);
    this.complicatedBase = new BaseComplicatedPage(page);
  }

//   async doReportsFiltration(driver_report=true){
//     await this.base.shouldBeVisibleFirst('.text-left.sorting_1');
//     await this.base.waitingFixedTime(5000)
//     // await this.base.shouldBeVisibleFirst('[role="row"]');
//     // await this.base.waitUntilNotVisible(generalLocators.processing_state);
//     // await this.base.shouldBeVisibleFirst('.text-left.sorting_1');
//     if(await this.base.shouldNotBeVisible(generalLocators.empty_data_tables_text)){
//         throw new Error('No data in table');
//     }else {
//         let fields;
//         if(driver_report){
//           fields = ['type', 'payment method'];
//         }else {
//           fields = ['driver'];
//         }
//         console.log(fields);
//         const data = this.complicatedBase.getDataFromTable(fields);
        
//         console.log('Retrieved data:', data);
//         let applied = false;
        
//         console.log(data.rider);
//         if (fields.includes('rider') && data.rider) {
//             await this.filtration.selectFiltrationBySearching(
//                 reportsLocators.rider_filtration,
//                 rideRequestsLocators.filter_search,
//                 data.rider
//             );
//             applied = true;
//         }

//         console.log(data.driver);
//         if (fields.includes('driver') && data.driver) {
//             await this.filtration.selectFiltrationBySearching_include(
//                 reportsLocators.driver_filtration,
//                 rideRequestsLocators.filter_search,
//                 data.driver
//             );
//             applied = true;
//         }
//         console.log(data['payment method']);

//         if (fields.includes('payment method') && data['payment method']) {
//             await this.filtration.selectFiltrationBySearching(
//                 reportsLocators.payment_method_filtration,
//                 rideRequestsLocators.filter_search,
//                 data['payment method']
//             );
//             applied = true;
//         }
//         console.log(data.type);
//         if (fields.includes('type') && data.type) {
            // await this.filtration.selectFiltrationBySearching(
            //     rideRequestsLocators.type_filtration,
            //     rideRequestsLocators.filter_search,
            //     data.type
            // );
//             applied = true;
//         }

        // if (applied) {
        //     await this.base.clickButton(driverListLocators.apply_button);
        //     let assertionValue;
        //     if(driver_report){ assertionValue = data.type;}else{assertionValue = data.rider || data.driver;}
        //     await this.filtration.assertFiltration(assertionValue);
        // } else {
        //     throw new Error(
        //         'No valid fields found to apply filters in Support Chat section'
        //     );
        // }
//     }
//   }

    async allReportFiltration(driver=null, rider=null, type=null){
        let applied = false
        if(driver){
            await this.filtration.selectFiltrationBySearching_include(
                reportsLocators.driver_filtration,
                rideRequestsLocators.filter_search,
                driver
            );
            applied = true;
        }
        if(rider){
            await this.filtration.selectFiltrationBySearching(
                reportsLocators.rider_filtration,
                rideRequestsLocators.filter_search,
                rider
            );
            applied = true;
        }
        if(type){
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.type_filtration,
                rideRequestsLocators.filter_search,
                type
            );
            applied = true
        }
        if (applied) {
            await this.base.clickButton(driverListLocators.apply_button);
            // Wait for table processing to complete
            await this.page.waitForSelector(generalLocators.processing_state, { state: 'hidden' });
            await this.page.waitForSelector('.text-left.sorting_1', { state: 'visible' });
            if(driver){await this.filtration.assertFiltration(driver)}
            if(rider){await this.filtration.assertFiltration(rider)}
            if(type){await this.filtration.assertFiltration(type)}
        } else {
            throw new Error(
                'No valid fields found to apply filters in Report section'
            );
        }

    }

    async driverReportFiltration(type=null, payment_method=null){
        let applied = false;
        console.log(type, payment_method)
        if(type){
            await this.filtration.selectFiltrationBySearching(
                rideRequestsLocators.type_filtration,
                rideRequestsLocators.filter_search,
                type
            );
            applied = true;
        }
        if(payment_method){
            await this.filtration.selectFiltrationBySearching(
                reportsLocators.payment_method_filtration,
                rideRequestsLocators.filter_search,
                payment_method  
            );
            applied = true;
        }
        if (applied) {
            await this.base.clickButton(driverListLocators.apply_button);
            // Wait for table processing to complete
            await this.page.waitForSelector(generalLocators.processing_state, { state: 'hidden' });
            await this.page.waitForSelector('.text-center.sorting_1', { state: 'visible' });
            // if(type){await this.filtration.assertFiltration(type)}
            if(payment_method){await this.filtration.assertFiltration(payment_method)}
        } else {
            throw new Error(
                'No valid fields found to apply filters in Report section'
            );
        }
    }

    async taxReportFiltration(driver=null, service=null){
        let applied = false
        if(driver){
            await this.filtration.selectFiltrationBySearching_include(
                reportsLocators.driver_filtration,
                rideRequestsLocators.filter_search,
                driver
            );
            applied = true;
        }
        if(service){
            await this.filtration.selectFiltrationBySearching(
                reportsLocators.service_filtration,
                rideRequestsLocators.filter_search,
                service
            );
            applied = true
        }
        if (applied) {
            await this.base.clickButton(driverListLocators.apply_button);
            // Wait for table processing to complete
            await this.page.waitForSelector(generalLocators.processing_state, { state: 'hidden' });
            await this.page.waitForSelector('.text-left.sorting_1', { state: 'visible' });
            if(driver){await this.filtration.assertFiltration(driver)}
            // if(service){await this.filtration.assertFiltration(service)}
        } else {
            throw new Error(
                'No valid fields found to apply filters in Report section'
            );
        }
    }

    async earningsReportFiltration(){   
    }
}
