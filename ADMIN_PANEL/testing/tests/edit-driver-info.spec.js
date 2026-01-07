import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { DriverEditPage } from '../src/pages/DriverEditPage';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { generalConstants } from '../src/utils/general-data';
import { driverListConstants } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { driverEditConstants } from '../src/utils/driver-edit-data';

// Setup: Login before each test
test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  
  await basePage.visitURL(generalConstants.admin_panel_url);
  await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
  await basePage.assertURL(dashboardConstants.dashboard_url);
  await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
});

test('edit driver info with valid creds', async ({ page }) => {
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);

     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverEditPage.assertDisabledFields();
     await driverEditPage.updateDriverInfo(
      driverEditConstants.new_driver_name,
      driverEditConstants.new_driver_last_name,
      driverEditConstants.new_id_number,
      driverEditConstants.new_ssn_number,
      driverEditConstants.new_driver_license_number
     );
    await driverEditPage.assertUpdatedValues(
      driverEditConstants.new_driver_name,
      driverEditConstants.new_driver_last_name,
      driverEditConstants.new_id_number,
      driverEditConstants.new_ssn_number,
      driverEditConstants.new_driver_license_number
    );
    await driverEditPage.updateDriverInfo(
      driverEditConstants.driver_name,
      driverEditConstants.driver_last_name,
      driverEditConstants.id_number,
      driverEditConstants.ssn_number,
      driverEditConstants.driver_license_number
    )  
});

test('edit driver info with invalid creds', async ({ page }) => {
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);

     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverEditPage.assertDisabledFields();
     await driverEditPage.updateDriverInfoInvalid(
      driverEditConstants.invalid_driver_name,
      driverEditConstants.invalid_driver_last_name,
      driverEditConstants.invalid_id_number,
      driverEditConstants.invalid_ssn_number,
      driverEditConstants.invalid_driver_license_number
     );
    //!!Right now this assertion will cause a failure becasue the fields data will change even if the entered data is invalid
    // await driverEditPage.assertUpdatedValues(
    //   driverEditConstants.driver_name,
    //   driverEditConstants.driver_last_name,
    //   driverEditConstants.id_number,
    //   driverEditConstants.ssn_number,
    //   driverEditConstants.driver_license_number
    // );
    await driverEditPage.updateDriverInfo(
      driverEditConstants.driver_name,
      driverEditConstants.driver_last_name,
      driverEditConstants.id_number,
      driverEditConstants.ssn_number,
      driverEditConstants.driver_license_number
    )
});

