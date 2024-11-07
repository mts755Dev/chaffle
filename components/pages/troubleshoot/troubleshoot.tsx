'use client';

import React from 'react';
import Markdown from 'react-markdown';

const markdownText = `

## **Location Troubleshooting**

- Having issues purchasing tickets due to location problems?
- This could be due to browser presets being set to “Never share your location”.
- In order to fix this issue, this must be changed in settings in order to purchase your ticket online.
- Instructions for changing location settings:

### **IOS**:

- 1.Go to Settings.
- 2.Click Privacy.
- 3.Click Location Services.
- 4.Ensure “Location Services” is on by clicking the switch (Green is on. If it is green, go on to the next step).
- 5.Scroll down and click your browser, either “Safari Websites”, “Chrome”, “Edge”, or another browser name.
- 6.Ensure that the option under “Allow Location Access” is set to “While Using the App”.

### **Android**:

- 1.Go to Settings.
- 2.Click on Location and ensure that it is on.
- 3.Go back to the main settings page (click the back arrow).
- 4.Click on “Apps”.
- 5.Go to “Chrome”, “Edge”, or whichever browser you are using.
- 6.Click on Permissions.
- 7.Enable Location for your main browser.

### **On Desktop: Microsoft Edge**

If you are using Windows on your desktop and running into issues while using Microsoft’s “Edge” browser, there are a few potential problems.

The most likely issue is permissions related to geolocation access. This can be fixed by adjusting location permissions in the Windows system settings.

- 1.Access Windows Settings by clicking on the Start menu button and clicking on “Settings” (most likely a gear-shaped button).
- 2.Go to Privacy settings and click “Location” on the sidebar.
- 3.Enable Location access by toggling on the “Allow apps to access your location” switch.
- 4.At this point, you may wish to review and manage app permissions, which should include Microsoft Edge and Maps, and ensure that these are enabled to access your location.

If there is still an issue, this may be due to the browser settings in Microsoft Edge. In this case, follow the steps below.

- 1.Open the Chaffle website in your Microsoft Edge browser.
- 2.Access Edge settings by clicking on the “More” menu or the three horizontal dots at the top right corner of your browser window.
- 3.Click “Settings”.
- 4.Scroll down to “Cookies and site permissions” and click on this tab.
- 5.Under the area that says “Site permissions”, select the Chaffle entry and click on “Reset permissions”.
- 6.Retry accessing the website by refreshing or closing the tab and opening a new tab.
- 7.Try purchasing a ticket again. In some instances, you will be prompted to “Grant Location Permission”; in this case, select the option to “Allow the website to access your location”.

`;
export const Troubleshoot = () => {
  return (
    <div className="container pt-20">
      <Markdown>{markdownText}</Markdown>
    </div>
  );
};
