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
import { DriverServiceDetailsPage } from '../src/pages/DriverEditPage';
import { serviceDetailsConstants } from '../src/utils/driver-edit-data';

test('add service details', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const driverServiceDetailsPage = new DriverServiceDetailsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverServiceDetailsPage.goToServiceDetailsSection();
     await driverServiceDetailsPage.addServiceDetails(serviceDetailsConstants.service_detail);
     await driverServiceDetailsPage.assertAddedServiceDetails(serviceDetailsConstants.service_detail);
});

test('remove service details', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const driverServiceDetailsPage = new DriverServiceDetailsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverServiceDetailsPage.goToServiceDetailsSection();
     await driverServiceDetailsPage.removeServiceDetails(serviceDetailsConstants.service_detail);
});