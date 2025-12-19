import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { RiderEditPage } from '../src/pages/RiderEditPage';
import { generalConstants } from '../src/utils/general-data';
import { driverListConstants, driverListLocators } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { driverEditConstants } from '../src/utils/driver-edit-data';
import { riderDetailsLocators, riderDetailsConstants } from '../src/utils/rider-edit-data';

test('verify pending driver section filtration', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);

    await basePage.visitURL(generalConstants.admin_panel_url)
    await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
    await basePage.assertURL(dashboardConstants.dashboard_url);
    await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
    await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
    await driverListPage.doDriverFiltration(
       driverEditConstants.filtration_pending_status,
       driverEditConstants.filtration_pending_name,
       driverEditConstants.filtration_pending_service,
       driverEditConstants.filtration_pending_phone_number,
       driverEditConstants.filtration_pending_service_type
   );
   await driverListPage.assertDriverFiltration(
        driverEditConstants.assertion_pending_phone_number,
   )
});

test('verify active driver section filtration', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);

    console.log(driverEditConstants.assertion_active_phone_number);
   await basePage.visitURL(generalConstants.admin_panel_url)
   await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
   await basePage.assertURL(dashboardConstants.dashboard_url);
   await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
   await dashboardPage.goToDriverSection(dashboardLocators.active_drivers_section);
   await driverListPage.doDriverFiltration(
    null,
    driverEditConstants.filtration_active_first_name,
    driverEditConstants.filtration_active_service,
    driverEditConstants.filtration_active_phone_number,
    driverEditConstants.filtration_pending_service_type
  );
  await driverListPage.assertDriverFiltration(
    driverEditConstants.assertion_active_phone_number,
)
});

test('verify other driver section filtration', async ({ page }) => {
    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);
    const riderEditPage = new RiderEditPage(page);
    
  await basePage.visitURL(generalConstants.admin_panel_url)
   await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
   await basePage.assertURL(dashboardConstants.dashboard_url);
   await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
   await dashboardPage.goToDriverSection(dashboardLocators.other_drivers_section);
   await driverListPage.doDriverFiltration(
    driverEditConstants.filtration_other_status,
    driverEditConstants.filtration_other_first_name,
    null,
    driverEditConstants.filtration_other_phone_number,
    null
  );
  await driverListPage.assertDriverFiltration(
    driverEditConstants.assertion_other_phone_number,
)  
});

test('verify rider section filtration', async ({ page }) =>{
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const riderEditPage = new RiderEditPage(page);

  await basePage.visitURL(generalConstants.admin_panel_url)
  await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
  await basePage.assertURL(dashboardConstants.dashboard_url);
  await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
  await dashboardPage.goToRiderSection(dashboardLocators.rider_page);
  await basePage.shouldBeVisible(riderDetailsLocators.rider_page_title);
  await riderEditPage.doRiderFiltration(
    riderDetailsConstants.first_name_filter,
    riderDetailsConstants.status_filter,
    riderDetailsConstants.filter_phone_number
  );
  await riderEditPage.assertRiderFiltration(
    riderDetailsConstants.filter_phone_number,
  )
});

// TODO
// test('verify all ride requests filtration', async ({ page }) =>{

// });

// test('verify new ride requests filtration', async ({ page }) =>{

// });

// test('verify completed ride requests filtration', async ({ page }) =>{

// });

// test('verify missed ride requests filtration', async ({ page }) =>{

// });

// test('verify cancelled ride requests filtration', async ({ page }) =>{

// });

// test('verify pending ride requests filtration', async ({ page }) =>{

// });

// test('verify support list filtration', async ({ page }) =>{

// });

//TO DO: MAKE A FILTRATION FUNCTION FOR REPORTS