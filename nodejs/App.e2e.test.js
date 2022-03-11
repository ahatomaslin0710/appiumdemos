import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 4723;

// const config = {
//     platformName: "iOS",
//     platformVersion: "14.4",
//     deviceName: "iPhone 11",
//     app: "path/to/your.apk or yourapp.ipa",
//     automationName: "XCUITest",// UiAutomator2, Espresso, or UiAutomator1 for Android
// };
const config = {
  platformName: 'Android',
  platformVersion: '6',
  deviceName: 'Android Emulator',
  app: '../demo.apk',
  automationName: 'UiAutomator2',
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(3000);
});

test('Test Accessibilty Id', async () => {
  expect(await driver.hasElementByAccessibilityId('email')).toBe(true);
  expect(await driver.hasElementByAccessibilityId('password')).toBe(true);
});

test('Test input set value', async () => {
  const beforeMessageElement = await driver.elementByAccessibilityId('message');
  expect(await beforeMessageElement.text()).toBe('unAuthorization')

  const emailElement = await driver.elementByAccessibilityId('email');
  await emailElement.sendKeys('horsekit1982@gmail.com');
  const passwordElement = await driver.elementByAccessibilityId('password');
  await passwordElement.sendKeys('aA$12345678');
  const buttonElement = await driver.elementByAccessibilityId('loginButton');
  await buttonElement.click();

  await driver.sleep(2000);
  
  const afterMessageElement = await driver.elementByAccessibilityId('message');
  expect(await afterMessageElement.text()).not.toBe('unAuthorization')
});1
