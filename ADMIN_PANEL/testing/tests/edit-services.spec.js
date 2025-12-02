// Der hstak chi esi karanq automatacnenq te che, karoxa pchacni mi ban
// import { test} from '@playwright/test';
// import { BasePage } from '../src/pages/BasePage';
// import { LoginPage } from '../src/pages/LoginPage';
// import { DashboardPage } from '../src/pages/DashboardPage';
// import { loginConstants } from '../src/utils/login-data';
// import { generalConstants } from '../src/utils/general-data';
// import { dashboardConstants, dashboardLocators } from '../src/utils/dashboard-data';
// import { serviceConstants } from '../src/utils/services-data';
// import { ServicePage } from '../src/pages/ServicePage';

// test('add a valid service', async ({ page }) => {
//      const basePage = new BasePage(page);
//      const loginPage = new LoginPage(page);
//      const dashboardPage = new DashboardPage(page);
//      const servicePage = new ServicePage(page);

//      await basePage.visitURL(generalConstants.admin_panel_url)
//      await loginPage.login(loginConstants.admin_email, loginConstants.admin_password);
//      await basePage.assertURL(dashboardConstants.dashboard_url);
//      await basePage.shouldBeVisible(dashboardLocators.dashboard_title); 
//      await dashboardPage.goToServiceSection(dashboardLocators.add_service_page);
//      await servicePage.addService(
//        serviceConstants.name, serviceConstants.sub_name, serviceConstants.region,
//        serviceConstants.base_fare, serviceConstants.minimum_distance, serviceConstants.per_distance,
//        serviceConstants.per_minute, serviceConstants.waiting_time, serviceConstants.per_minute_wait,
//        serviceConstants.city_per_distance, serviceConstants.city_per_minute, serviceConstants.status,
//        serviceConstants.type, serviceConstants.description, serviceConstants.service_path
//      );
//     await dashboardPage.goToServiceSection(dashboardLocators.add_service_page);

// });