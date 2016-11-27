# Chromeboard
Turn a Chrome installation into a digital signage board. Using a dedicated extension page, the extension will cycle user-selected websites continuously. Intended for wallboards that cycle through pages on display.

![Chromeboard app demonstration](http://i.imgur.com/ua5ieII.gif, "Chromeboard demo gif")

# Installation
The latest version release (0.1) is currently available in the Chrome store. [Click here to install](https://chrome.google.com/webstore/detail/fdnnlgfgjjjfafmdhkfndhnoboajdpom).

To test the latest development build extension, installation is relatively simple:

1. Download the zip of this project and extract where desired.
2. Enable Developer mode (checkbox in Extensions).
3. Click 'Load unpacked extension...'.
4. Navigate the file browser to the extraction location.

This will allow you to test out the unpacked developer version of the app. Please note this software is in alpha and you may experience issues. Please let me know via GitHub issue tracker and I will have a look accordingly.

# How to Use
Once installed, a new icon will appear to the right of the Chrome address bar, called 'Chromeboard'. Clicking this will take you to the page scroller. Hidden at the top right on this page is the settings button (also reached via 'Options' in Extensions). Simply add a line break seperated list of sites to the textarea and save, and Chromeboard will show them in a loop.

# Known Issues
## Some common/popular websites do not show up
Unfortunately this can be a limitation issued by the website. This extension uses iframes to show the corresponding website content in the tab page. However, websites have a right to issue a header request blocking such iframe embeds. As such, the extension will simply display a blank page.

To determine if this is the cause, try refreshing the tab page with inspector console open. If you get "Refused to display <website> in a frame because it set 'X-Frame-Options' to 'SAMEORIGIN'", then this page will unfortunately not allow embedding.

## How can I use this headless (kiosk) on a single-purpose device?
Once the extension is installed, clicking on the icon takes you to the tab rotation page. Drag the app page icon (to the right of 'chrome-extension', a circle with an i in it) to the home button to set it as your homepage, or alternatively copy the address and set it as your homepage in options. Now when you re-open Chrome, it should immediately go to the tab rotation page.

Now for a Linux machine, create a shell script to execute the following command (assumed Chromium, change if necessary).

```bash
chromium-browser -kiosk --disable-session-crashed-bubble --disable-infobars
```

This will open Chrome/Chromium in kiosk mode, and hopefully open the rotation page once loaded. To escape, press ALT-F4. 

___

This project is licensed under MIT, so please feel free to do what you wish. If you would like to see improvements or new features, please feel free to submit an issue, fork or submit a pull request.
