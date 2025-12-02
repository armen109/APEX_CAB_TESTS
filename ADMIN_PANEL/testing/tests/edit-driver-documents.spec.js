import { test} from '@playwright/test';
import { BasePage } from '../src/pages/BasePage';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { DriverEditPage } from '../src/pages/DriverEditPage';
import { driverEditConstants } from '../src/utils/driver-edit-data';
import { loginConstants } from '../src/utils/login-data';
import { DriverListPage } from '../src/pages/DriverListPage';
import { generalConstants } from '../src/utils/general-data';
import { driverListConstants } from '../src/utils/driver-list-data';
import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
import { DriverDocumentsPage } from '../src/pages/DriverEditPage';
import { driverDocumentsConstants, driverDocumentsLocators } from '../src/utils/driver-edit-data';

test('approve driver documents', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const driverDocumentsPage = new DriverDocumentsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverDocumentsPage.goToDriverDocumentsSection();
     await driverDocumentsPage.updateDocuments(driverDocumentsLocators.approved_status);
     await driverDocumentsPage.goToDriverDocumentsSection();
     await driverDocumentsPage.assertUpdatedDocumentStatuses(driverDocumentsLocators.approved_status);
     await driverDocumentsPage.updateDocuments(driverDocumentsLocators.under_review);
});

test('reject driver documents', async ({ page }) => {
     const basePage = new BasePage(page);
     const loginPage = new LoginPage(page);
     const dashboardPage = new DashboardPage(page);
     const driverListPage = new DriverListPage(page);
     const driverEditPage = new DriverEditPage(page);
     const driverDocumentsPage = new DriverDocumentsPage(page);

     await basePage.visitURL(generalConstants.admin_panel_url)
     await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
     await basePage.assertURL(dashboardConstants.dashboard_url);
     await basePage.shouldBeVisible(dashboardLocators.dashboard_title);
     await dashboardPage.goToDriverSection(dashboardLocators.pending_drivers_section);
     await driverListPage.selectDriverByName(driverListConstants.driver_name);
     await driverDocumentsPage.goToDriverDocumentsSection();
     await driverDocumentsPage.updateDocuments(driverDocumentsLocators.rejected_status);
     await driverDocumentsPage.goToDriverDocumentsSection();
     await driverDocumentsPage.assertUpdatedDocumentStatuses(driverDocumentsLocators.rejected_status);
     await driverDocumentsPage.updateDocuments(driverDocumentsLocators.under_review);
});