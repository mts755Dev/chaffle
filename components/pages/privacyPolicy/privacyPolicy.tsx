'use client';

import React from 'react';
import Markdown from 'react-markdown';

const markdownText = `
# Privacy Policy

This Privacy Policy explains how Chaffle Limited Liability Company (doing business as Chaffle) and its affiliates (collectively referred to as "we," "our," or "us") handle information when operating our websites and any other online services that link to this Privacy Policy (together referred to as our "Services").

By using our Services, you agree to the practices outlined in this Privacy Policy. If you have any questions, please reach out to us through the "Contact Us" tab on [www.chaffle.org](http://www.chaffle.org), and include "Privacy" in the email subject line.

## Information We Collect and Receive

### Information You Provide Directly

When you use our Services, we collect information that you voluntarily provide. This may include details you submit when you register, bid on or purchase products, sign up for communications, enter contests, comment on articles, post on forums, interact with customer service, or complete surveys. This information can include your name, username, company name, address, phone number, date of birth, email address, payment information (if applicable), and details about your use of our Services.

If you use features like "share with a friend" or "invite a friend," we may collect your name and email address, as well as the recipient’s contact details. We only use this information to send the email on your behalf unless we have your or the recipient’s consent for other purposes.

### Information Collected When You Use Our Services

We also gather information automatically through cookies, web beacons, and other technologies. This data may be combined with information you provide directly to personalize content and ads. Depending on your interactions with our Services, we may collect:

- **Log Information**: Includes details about your use of our Services, such as content viewed, products bid on or purchased, time spent on our Services, dates of access, and data from cookies.
- **Device Information**: Details about the device you use, such as device type, unique identifiers, your internet service provider, and, with your permission, content stored on your device.
- **Location Information**: Data from GPS, Bluetooth, or WiFi signals to determine your location. This includes information about nearby networks and beacons when using location-enabled services.
- **Information from Third Parties**: Data from business partners, publicly available sources, and social networking services when you connect your accounts or interact with our Services.

## How We Use the Information We Collect

We use the information for several purposes:

- **To Provide Our Services**: This includes creating accounts, processing transactions, offering technical support, sending tailored communications, managing promotions, notifying about updates, and preventing fraud.
- **To Improve Our Services**: We use the information to enhance user experience, solicit feedback, address technical issues, and customize content based on your activities and location.

## How We Share Information

We may share your information in the following ways:

- **With Service Providers**: We may share your information with third-party vendors and service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.

- **In Business Transfers**: If we are involved in a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Services of any such change in ownership or control of your personal information.

- **With Affiliates**: We may share your information with our affiliates to perform services for you on our behalf or to help us improve our Services.

- **For Legal Reasons**: We may share your information if required to do so by law or in the good-faith belief that such action is necessary to comply with legal obligations, protect and defend our rights or property, or protect the safety of our users or the public.

- **With Your Consent**: We may share your information in other ways if you give us your consent to do so.

## Your Choices and Rights

You have the right to access, correct, update, or request the deletion of your personal information. You may also object to the processing of your personal information, ask us to restrict processing, or request portability of your personal information. If you wish to exercise any of these rights, please contact us using the details provided under the "Contact Us" section.

You can also unsubscribe from our marketing communications by following the unsubscribe instructions in each email we send. You may also update your marketing preferences by logging into your account on our Services.

## Cookies and Tracking Technologies

We and our third-party partners use cookies and similar tracking technologies to collect and use information about you, including to serve interest-based advertising. For more information about the types of cookies we use, why we use them, and how you can control cookies, please see our [Cookie Policy](#).

## Security

We take reasonable measures to protect the information we collect from or about you from unauthorized access, use, or disclosure. However, no method of transmitting information over the internet or storing information is completely secure. We encourage you to use caution when transmitting personal information online.

## Data Retention

We retain the information we collect for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.

## Children's Privacy

Our Services are not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13 without verification of parental consent, we will delete that information as quickly as possible.

## International Data Transfers

We may transfer your personal information to countries other than the one in which you live, including to the United States, where our servers are located. These countries may have data protection laws that are different from those of your country. We take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. If we make material changes to this Privacy Policy, we will notify you by posting the updated Privacy Policy on our Services and updating the "Last Updated" date at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:

Chaffle Limited Liability Company
Attn: Privacy
[www.chaffle.org](http://www.chaffle.org)

`;
export const PrivacyPolicy = () => {
  return (
    <div className="container pt-20">
      <Markdown>{markdownText}</Markdown>
    </div>
  );
};
