# Open Science Lens Browser Web App User Manual

## Login:

<img src="./images-webapp/login.PNG" width="30%" height="50%">
<img src="./images-webapp/original.PNG" width="40%" height="50%">

## Scientific Pages:

By clicking the "Scientific Pages" button you are redirected to the main scientific page list.

Logging in can be done two ways:

* As a general user. The general user can only see the requests he is responsible for.
<img src="./images-webapp/scientific-pages-general-user.PNG" width="40%" height="50%">

* As an administrator. The administrator can do more things than the general user:
  * See all the requests and take certain actions (approve, reject).
<img src="./images-webapp/scientific-page-pending.PNG" width="60%" height="50%">

  * Clear the cache.  
<img src="./images-webapp/scientific-page-clear-cache.PNG" width="60%" height="50%">

There is also a search function on the top of the list:
* Search by text  
<img src="./images-webapp/scientific-page-search.PNG" width="40%" height="50%">

* Search by status  
<img src="./images-webapp/scientific-page-status.PNG" width="40%" height="50%">

## New Registration

By clicking on "Add Registration" you can make a new Scientific Page.  
<img src="./images-webapp/scientific-page-add-registration.PNG" width="60%" height="50%">

When adding a new registration you have certain fields to fill out:  
<img src="./images-webapp/scientific-page-add-registration-original.PNG" width="40%" height="50%">

* Domain (has to be a certain type ex: https://www.madgik.di.uoa.gr):  
<img src="./images-webapp/scientific-page-add-registration-domain.PNG" width="40%" height="50%">

* Email (has to be a certain type ex: thisisafakeemail@fake.fake):  
<img src="./images-webapp/scientific-page-add-registration-email.PNG" width="40%" height="50%">

* Settings:
  * General:  
<img src="./images-webapp/scientific-page-add-registration-settings-general.PNG" width="70%" height="50%">

	* Language (Dropdown)
	* Button Color (Dropdown)
	* Position (Dropdown)
	* Scanning (Dropdown)
	  * manual
	  * auto
	  * on page load
	  * none  
	    <img src="./images-webapp/scientific-page-add-registration-settings-general-scanning.PNG" width="40%" height="50%">
	* Theme (Dropdown)
	* Max Size
	* Deactivate Plugin (Checkbox)
	* Badge (Checkbox)
	* Markup Badge (Checkbox)
	* Additional Markup Info (Checkbox)
	* Additional DOI Info (Checkbox)
	* Additional DOI Info Title (Checkbox)

  * Others:  
	The rest of the settings are checkboxes controlling what to show for each different type of result. You can access these settings by clicking on the buttons to the left.  
	<img src="./images-webapp/scientific-page-add-registration-settings-general-others.PNG" width="70%" height="50%">  
    * Dataset
	* Publication
	* Software
	* Project
	* Other

After saving, the request is pending and you have to wait for it to be approved by an administrator. Even before being approved you can download the settings you have selected as a JSON file or even copy the API key you will be using.  
<img src="./images-webapp/scientific-page-single-pending.PNG" width="70%" height="50%">  
After being approved you can also edit the details you have input or ask for a new API key.  
<img src="./images-webapp/scientific-page-single.PNG" width="60%" height="50%">
<img src="./images-webapp/scientific-page-single-edit.PNG" width="60%" height="50%">
