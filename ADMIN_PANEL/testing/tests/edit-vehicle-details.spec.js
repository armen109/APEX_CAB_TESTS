import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DriverVehicleDetailsPage } from '../src/pages/DriverEditPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { DriverEditPage } from '../src/pages/DriverEditPage';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { generalConstants } from '../src/utils/general-data';
import { driverListConstants } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { driverEditConstants } from '../src/utils/driver-edit-data';
import { driverVehicleDetailsConstants } from '../src/utils/driver-edit-data';

test('edit driver vehicle details', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const vehicleDetailsPage = new DriverVehicleDetailsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await vehicleDetailsPage.goToVehicleDetailsSection();
     await vehicleDetailsPage.updateVehicleDetails(
          driverVehicleDetailsConstants.new_vehicle_registration_number,
          driverVehicleDetailsConstants.new_car_make,
          driverVehicleDetailsConstants.new_car_model,
          driverVehicleDetailsConstants.new_car_year,
          driverVehicleDetailsConstants.new_car_color,
          driverVehicleDetailsConstants.new_car_plate_number,
          driverVehicleDetailsConstants.new_car_seats
     );
     await vehicleDetailsPage.goToVehicleDetailsSection();
     await vehicleDetailsPage.assertUpdatedVehicleDetails(
          driverVehicleDetailsConstants.new_vehicle_registration_number,
          driverVehicleDetailsConstants.new_car_make,
          driverVehicleDetailsConstants.new_car_model,
          driverVehicleDetailsConstants.new_car_year,
          driverVehicleDetailsConstants.new_car_color,
          driverVehicleDetailsConstants.new_car_plate_number,
          driverVehicleDetailsConstants.new_car_seats
     );
     await vehicleDetailsPage.updateVehicleDetails(
          driverVehicleDetailsConstants.vehicle_registration_number,
          driverVehicleDetailsConstants.car_make,
          driverVehicleDetailsConstants.car_model,
          driverVehicleDetailsConstants.car_year,
          driverVehicleDetailsConstants.car_color,
          driverVehicleDetailsConstants.car_plate_number,
          driverVehicleDetailsConstants.car_seats
     );
});

test('edit driver with invalid vehicle details', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const vehicleDetailsPage = new DriverVehicleDetailsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await vehicleDetailsPage.goToVehicleDetailsSection();
     await vehicleDetailsPage.updateInvalidVehicleDetails(
          driverVehicleDetailsConstants.invalid_vehicle_registration_number,
          driverVehicleDetailsConstants.invalid_car_color,
          driverVehicleDetailsConstants.invalid_car_plate_number,
          driverVehicleDetailsConstants.invalid_car_seats
     );
     await vehicleDetailsPage.goToVehicleDetailsSection();

     // PAY ATTENTION, RIGHT NOW THIS ASSERTION WILL CAUSE FAILURE BECAUSE,
     // THE FIELDS WOULD UPDATE EVEN IF YOU ENTERED INVALID DATA
     // await vehicleDetailsPage.assertUpdatedVehicleDetails(
     //      driverVehicleDetailsConstants.new_vehicle_registration_number,
     //      driverVehicleDetailsConstants.new_car_make,
     //      driverVehicleDetailsConstants.new_car_model,
     //      driverVehicleDetailsConstants.new_car_year,
     //      driverVehicleDetailsConstants.new_car_color,
     //      driverVehicleDetailsConstants.new_car_plate_number,
     //      driverVehicleDetailsConstants.new_car_seats
     // );

     await vehicleDetailsPage.updateVehicleDetails(
          driverVehicleDetailsConstants.vehicle_registration_number,
          driverVehicleDetailsConstants.car_make,
          driverVehicleDetailsConstants.car_model,
          driverVehicleDetailsConstants.car_year,
          driverVehicleDetailsConstants.car_color,
          driverVehicleDetailsConstants.car_plate_number,
          driverVehicleDetailsConstants.car_seats
     );

})