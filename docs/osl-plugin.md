# Open Science Lens Browser Plugin (OSL Plugin)

The OSL Plugin is the browser component developed and which end users are able to download and deploy in their browser to take advantage of the offered functionality and direct insight into the OpenAIRE Research Graph data. Browser Plugin development is highly relevant to the hosting browser and no single solution can be offered to be applied across all browsers. The Plugin is responsible to collect the points of interest from the content that the user is browsing, collect relevant information from the OpenAIRE Research Graph through the OSL API and present it in a coherent and concise fashion to the end user, allowing further exploration.

## Technology

The OSL Plugin available is targeting the Chrome browser although it is build in a generic way to allow for easier migration between different browser APIs.

The OSL Plugin uses Vanilla Javascript and utilises the Chrome.api for all its extension-related features. (https://developer.chrome.com/extensions/api_index)
It also uses Bootstrap icons which are open sourced (MIT). 

## Distribution

The OSL Plugin is packaged and distributed as a Chrome extension bundle that can easily be loaded through the respective Chrome settings tab. This method of distribution is primarily targeting the evaluation stage of the plugin lifecycle. Once deemed satisfactory, it can be registered with the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions "Chrome Web Store").

The packaged plugin can be retrieved from the following location: <https://github.com/cite-sa/open-science-lens/releases/> by selecting the desired released component version. 

After downloading the .zip file, extract its contents. Place the plugin folder in your desired destination. Open the Extension Management page by navigating to chrome://extensions. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions. Enable Developer Mode by clicking the toggle switch next to Developer mode. Click the LOAD UNPACKED button and select the plugin folder. (Warning: you have to pick the extension folder that includes the manifest.json file)

(https://developer.chrome.com/extensions/getstarted#manifest)

## Authentication

The OSL Plugin aims to assist the web browsing user, while navigating the web, to retrieve available information, if any, from the OpenAIRE archives. Access to the OpenAIRE resources and indices are not currently accounted to restrict user information retreival through the provided [Public APIs](https://api.openaire.eu/api.html "OpenAIRE Public API") (usage throttling policies aside). Additionally, it is not required for a user to be registered with OpenAIRE in order to browse and explore the content offered through the respective services.

The OSL Plugin does not impose additional restrictions on top of the base service offered by OpenAIRE. Therefore, it is not required that a user of the OSL Plugin is registered and authenticated prior to using the plugin functionality. Still, in order to facilitate possible future needs to furhter track the usage and behavior of the service consumers, the following sceme has been made available:

* Anonymous user - For users of the OSL Plugin that never authenticate themselves through any supporting identity provider, the plugin generates a unique identifier upon installation to the user browser. All requests made to the OSL API, add this unique identifier in their headers. Plugin settings are persisted and linked to the specific deployment identifier to allow for easy retrieval
* Authenticated user - The option is available for the OSL Plugin user to authenticate themselves through the supported OpenAIRE identity provider. The retrieved subject identifier is linked to the user's plugin settings so that in all devices that he has the plugin installed and login to, his settings will follow him

No personal or sensitive information is tied to the specific installation, or user identifier and they are only used in order to persist and maintain non-critical, plugin presentation settings. No specific authentication enforcement is put into place to validate authenticity of request header identifiers, other than the transport level security applied to safeguard the information while in transit.

## Configuration

The way the OSL Plugin operates, it aims to assist the end users, within their web browsers, to easily locate and explore additional information that is available from OpenAIRE and relevant to the content they are browsing. The available configuration options allow them to control the behavior of the plugin, the visuazation of the retrieved information and the amount of information they will be accessing.

To support the needed ease of use, the OSL Plugin supports the following configuration stack. Each level of the stack is merged with the lower level stack to allow for incremental and progressive changes in configration (higher configuration levels trump lower configuration levels):

1. OSL Plugin defaults - The OSL Plugin comes with a set of defaults that define a base functionality. These defaults can be used for integration without any additional configuration
2. OSL Plugin user registration configuration - At the time of using the plugin, the user from within his browser can configure a set of options that are made available directly through the plugin

An example configuration document, not directly visible to the user, but indicating the properties that are made visually available to the user throw the respective settings view, is the following:

```json
{
	"general": {
		"language": "en",
		"scanning": "manual", // manual, auto, onPageLoad
		"showBadge": "true"
	},
	"dataset": {
		"showCollectedFrom": "true",
		"showHostedBy": "true",
		"showOpenaireId": "true",
		"showSubTitle": "true",
		"showDateOfAcceptance": "true",
		"showPublisher": "true",
		"showLanguage": "true",
		"showSource": "true",
		"showCreators": "true",
		"showLicense": "true",
		"showTrust": "true",
		"showRelatedGroups": "true",
		"showInstances": "true",
		"showRelationships": "true",
		"showResourceType": "true",
		"showDevice": "true",
		"showSize": "true",
		"showVersion": "true",
		"showLastMetadataUpdate": "true",
		"showMetadataVersionNumber": "true"
	},
	"publication": {
		"showCollectedFrom": "true",
		"showHostedBy": "true",
		"showOpenaireId": "true",
		"showSubTitle": "true",
		"showDateOfAcceptance": "true",
		"showPublisher": "true",
		"showLanguage": "true",
		"showSource": "true",
		"showCreators": "true",
		"showLicense": "true",
		"showTrust": "true",
		"showRelatedGroups": "true",
		"showInstances": "true",
		"showRelationships": "true",
		"showJournal": "true"
	},
	"software": {
		"showCollectedFrom": "true",
		"showHostedBy": "true",
		"showOpenaireId": "true",
		"showSubTitle": "true",
		"showDateOfAcceptance": "true",
		"showPublisher": "true",
		"showLanguage": "true",
		"showSource": "true",
		"showCreators": "true",
		"showLicense": "true",
		"showTrust": "true",
		"showRelatedGroups": "true",
		"showInstances": "true",
		"showRelationships": "true",
		"showContactPerson": "true",
		"showContactGroup": "true",
		"showDocumentationUrl": "true",
		"showCodeRepositoryUrl": "true",
		"showProgrammingLanguage": "true",
		"showTool": "true"
	},
	"project": {
		"showCollectedFrom": "true",
		"showHostedBy": "true",
		"showOpenaireId": "true",
		"showCode": "true",
		"showAcronym": "true",
		"showWebsiteUrl": "true",
		"showStartDate": "true",
		"showEndDate": "true",
		"showTrust": "true",
		"showSubject": "true",
		"showFundingTree": "true",
		"showRelationships": "true"
	},
	"other": {
		"showCollectedFrom": "true",
		"showHostedBy": "true",
		"showOpenaireId": "true",
		"showSubTitle": "true",
		"showDateOfAcceptance": "true",
		"showPublisher": "true",
		"showLanguage": "true",
		"showSource": "true",
		"showCreators": "true",
		"showLicense": "true",
		"showTrust": "true",
		"showRelatedGroups": "true",
		"showInstances": "true",
		"showRelationships": "true",
		"showJournal": "true",
		"showResourceType": "true",
		"showDevice": "true",
		"showSize": "true",
		"showVersion": "true",
		"showLastMetadataUpdate": "true",
		"showMetadataVersionNumber": "true",
		"showContactPerson": "true",
		"showContactGroup": "true",
		"showDocumentationUrl": "true",
		"showCodeRepositoryUrl": "true",
		"showProgrammingLanguage": "true",
		"showTool": "true"
	}
}
```

## Scanning

Depending on the OSL Plugin configuration, the scanning process will go through the browser page content, navigating through the page DOM to identify points of interest, highlight them and make them available for further information retrieval. The following sections of the DOM tree are scanned:
* Text Nodes
* Anchor href links

Initial integration to scan also [Schema.org](https://schema.org/ "schema.org"), json-ld script tags has been evaluated. Evaluation of the process in most available science pages indicated that most of the DOI information available through the schema.org script tags were already discoverable through direct DOM scanning, while at the same time, the DOI identifiers were not necessarily handled consistently within the expected identifier fields. For this reason they were not included in the final DOI scanning process, although the decision may be re-evaluated.

The respective nodes are scanned using the following regular expressions to identify DOIs within the text:
```
/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/g
```

The regular expression has been validated, but given the free form of some DOIs, it is possible to extend the matching process with additional regular expressions for better results.

### Auto

Under this scanning configuration, the scanning component will periodically scan the page DOM to identify points of interest. This configuration aims to achieve a technology agnostic approach to handle in-page DOM updates, being as less intrusive as possible to the framework used from the page provider to manipulate and handle the DOM.

### Manual

Under this scanning configuration, the scanning component will only traverse the DOM after explicit user interaction. It is expected to be primarily an evaluation stage facility to be discontinued further down the component lifetime

### OnPageLoad

Under this scanning configuration, the scanning component will only traverse the DOM on initial page load. This is mostly suiting for non-SPA pages as it will aleviate also unessecary utilization of browser resources.
