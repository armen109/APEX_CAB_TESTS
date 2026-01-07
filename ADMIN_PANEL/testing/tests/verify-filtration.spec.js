import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { RiderEditPage } from '../src/pages/RiderEditPage';
import { RideRequestsPage } from '../src/pages/RideRequestsPage';
import { SupportChatPage } from '../src/pages/SupportChatPage';
import { ReportPage } from '../src/pages/ReportsPage';
import { Filtration } from '../src/pages/DashboardPage';
import { BaseComplicatedPage } from '../src/pages/BaseComplicatedPage';
import { generalConstants, generalLocators } from '../src/utils/general-data';
import { driverListConstants, driverListLocators } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { driverEditConstants } from '../src/utils/driver-edit-data';
import { riderDetailsLocators, riderDetailsConstants } from '../src/utils/rider-edit-data';
import { rideRequestsConstants, rideRequestsLocators } from '../src/utils/ride_requests-data';
import { supportChatConstants } from '../src/utils/support-chat-data';
import { reportsConstants, reportsLocators } from '../src/utils/report-data';

// Setup: Login before each test
test.beforeEach(async ({ page }) => {
  const basePage = new BasePage(page);
  const loginPage = new LoginPage(page);
  
  await basePage.visitURL(generalConstants.admin_panel_url);
  await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
  await basePage.assertURL(dashboardConstants.dashboard_url);
  await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
});

test('verify pending driver section filtration', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);

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
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);

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
    const dashboardPage = new DashboardPage(page);
    const driverListPage = new DriverListPage(page);
    
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
  const dashboardPage = new DashboardPage(page);
  const riderEditPage = new RiderEditPage(page);
  const filtration = new Filtration(page);
  await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
  await basePage.assertURL(dashboardConstants.dashboard_url);
  await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
  await dashboardPage.goToRiderSection(dashboardLocators.rider_page);
  await basePage.shouldBeVisible(riderDetailsLocators.rider_page_title);
  await filtration.selectEntries('100')
  await riderEditPage.doRiderFiltrations()
});

test('verify all ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.all_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration()
});

test('verify new ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.new_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration()
});

test('verify completed ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.completed_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration()
});

test('verify missed ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.missed_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration(true)
});

test('verify cancelled ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.cancelled_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration()
});

test('verify pending ride requests filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToRideRequestsSection(dashboardLocators.pending_ride_requests_page);
  //as ther are too many ride requests sometimes the entries filtration is not working
  // await filtration.selectEntries('100', rideRequestsLocators.ride_requests_entries)
  await rideRequestsPage.doRideRequestsFiltration()
});

test('verify support list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const supportChatPage = new SupportChatPage(page);
  const rideRequestsPage = new RideRequestsPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToSupportChatSection(dashboardLocators.room_list_page);
  await filtration.selectEntries('100')
  await supportChatPage.doSupportChatFiltration()
});

test('verify ride reports list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const reportsPage = new ReportPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToReportPage(dashboardLocators.ride_report_page);
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await reportsPage.allReportFiltration(
    reportsConstants.filtration_driver, 
    reportsConstants.filtration_rider, 
    reportsConstants.fltration_type
  );
});

test('verify earnings reports list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const reportsPage = new ReportPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToReportPageWithScroll(dashboardLocators.earnings_report_page);
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await reportsPage.driverReportFiltration(
      reportsConstants.fltration_type,
      reportsConstants.filtration_payment_method
  );
});

test('verify driver top-up reports list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const reportsPage = new ReportPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToReportPageWithScroll(dashboardLocators.top_up_report_page);
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await reportsPage.allReportFiltration(
    reportsConstants.filtration_driver, 
  );
});

test('verify ride tax service reports list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const reportsPage = new ReportPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToReportPageWithScroll(dashboardLocators.tax_report_page);
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await reportsPage.taxReportFiltration(
    reportsConstants.filtration_driver,
    reportsConstants.fltration_type 
  );
});

test('verify truck tax service reports list filtration', async ({ page }) =>{
  const dashboardPage = new DashboardPage(page);
  const reportsPage = new ReportPage(page);
  const filtration = new Filtration(page);

  await dashboardPage.goToReportPageWithScroll(dashboardLocators.truck_tax_report_page);
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  await reportsPage.taxReportFiltration(
    reportsConstants.filtration_driver,
    reportsConstants.filtration_truck_service 
  );
});

