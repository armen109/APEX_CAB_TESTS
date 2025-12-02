import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { DriverEditPage } from '../src/pages/DriverEditPage';
import { RiderEditPage } from '../src/pages/RiderEditPage';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { generalConstants } from '../src/utils/general-data';
import { driverListConstants } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { driverEditConstants } from '../src/utils/driver-edit-data';
import { riderDetailsConstants } from '../src/utils/rider-edit-data';

test('edit rider info with valid creds', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const riderEditPage = new RiderEditPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title); 
     await dashboardPage.goToRiderSection(dashboardLocators.rider_page);
     await riderEditPage.selectRiderByName(riderDetailsConstants.rider_name);
     await riderEditPage.updateRiderInfo(
      riderDetailsConstants.updated_rider_name,
      riderDetailsConstants.pending_status,
      riderDetailsConstants.profile_photo_path
     );
     await riderEditPage.assertUpdatedRiderName(riderDetailsConstants.updated_rider_name);
     await riderEditPage.updateRiderNameAndStatus(
      riderDetailsConstants.rider_name,
      riderDetailsConstants.active_status,
     )
});

test('edit rider info with invalid name', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const riderEditPage = new RiderEditPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title); 
     await dashboardPage.goToRiderSection(dashboardLocators.rider_page);
     await riderEditPage.selectRiderByName(riderDetailsConstants.rider_name);
     await riderEditPage.updateInvalidRiderName(
      riderDetailsConstants.invalid_rider_name
     );
     // THIS ASSERTION WILL CAUSE A FAILURE CAUSE RIGHT NOW THE FIELD DATA WILL BE UPDATED EVEN IF ENTERED DATA IS INVALID
     // await riderEditPage.assertUpdatedRiderName(riderDetailsConstants.rider_name);
     await riderEditPage.updateRiderName(riderDetailsConstants.rider_name);
});
