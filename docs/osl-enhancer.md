# Open Science Lens Science Page Enhancer (OSL Science Page Enhancer)

The OSL Science Page Enhancer is the lightweight JavaScript library widget that Science Page Providers can use and embed within their applications to take direct advantage of the OpenAIRE Research Graph and enhance the content they provide to their users. In addition to scanning the content of the page in which the widget is included, the point of interest discovery ability of the widget can be enhanced with explicit markup that the providers can include in their pages.

## Technology

The OSL Science Page Enhancer uses Vanilla Javascript throughout its entirety. It also utilises Shadow-Dom to avoid css overlapping.

## Registration

In order for the OSL Science Page Enhancer to be able to connect and retrieve information from the OSL API, it needs to provide evidence for its identity on each of the invocations with a valid API Key. This allows binding the widget invocations with the specific domain they API Key is generated for.

Before a Science Page provider integrated the widget with it's page, the registration of the specific domain needs to be completed as described in the [Open Science Lens Web Application (OSL WebApp)](./docs/osl-webapp.md  "OSL WebApp").

Given that access to the underpinning OpenAIRE API used to retrieve the data is open, the API Key used is primarily to enable the retrieval of configuration relevant to the specific science page provider rather than block or restrict access. Request origin filtering is applied to validate the proper usage of the API Key, but no further policies are implemented.

## Distribution

The OSL Science Page Enhancer is packaged and distributed as a JavaScript library that can easily be integrated with any compatible science page web page. 

The packaged widget can be retrieved from the following location: <https://github.com/cite-sa/open-science-lens/releases/> by selecting the desired released component version. 

Keep reading to see more details on how to integrate the OSL Science Page Enhancer in your site using the distributed package.

## Configuration

The way the OSL Science Page Enhancer operates, it is meant to be cetnrally configured to meet the provider's requirements and then easily integrated without requiring re-configuration across all the provider's content pages. Still, it is expected that some of the provider's pages may requires different handling to facilitate more streamlined blending of the widget facilities or even extended integration with additional configured options.

To support the needed versatility, the OSL Science Page Enhancer supports the following configuration stack. Each level of the stack is merged with the lower level stack to allow for incremental and progressive changes in configration (higher configuration levels trump lower configuration levels):

1. OSL Science Page Enhancer defaults - The OSL widget comes with a set of defaults that define a base functionality. These defaults can be used for integration without any additional configuration
2. OSL WebApp registration configuration - At the time of registering the science page content provider at the OSL WebApp, the administrator can define a set of options. These options can be downloaded and hosted along the science page environment for direct access
3. Per Page configuration - At the time of integrating the OSL Science Page Enhancer widget with any of the provider's content pages, in the respective widget tag, a set ot attributes can be explicitly defined that will further refine or override previous configuration options

An example configuration document generated during the OSL WebApp registration process, is the following:

```json
{
	"general": {
		"language": "en",
		"scanning": "manual", // manual, auto, onPageLoad, none
		"showBadge": "true",
		"showMarkupBadge": "true",
		"position": "rightDown", // rightDown, rightUp, leftDown, leftUp
		"buttonColor": "blue",
		"theme": "theme1"
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

The list of attributes available for explicit widget instance overrides, are the following. These can be used as attributes at the time of defining the widget tag within the science page provider's page to allow per page overrides:

* general
  * settings-general-language
  * settings-general-scanning
  * settings-general-showBadge
  * settings-general-showMarkupBadge
  * settings-general-position
  * settings-general-buttonColor
  * settings-general-theme
* dataset
  * settings-dataset-showCollectedFrom
  * settings-dataset-showHostedBy
  * settings-dataset-showOpenaireId
  * settings-dataset-showSubTitle
  * settings-dataset-showDateOfAcceptance
  * settings-dataset-showPublisher
  * settings-dataset-showLanguage
  * settings-dataset-showSource
  * settings-dataset-showCreators
  * settings-dataset-showLicense
  * settings-dataset-showTrust
  * settings-dataset-showRelatedGroups
  * settings-dataset-showInstances
  * settings-dataset-showRelationships
  * settings-dataset-showResourceType
  * settings-dataset-showDevice
  * settings-dataset-showSize
  * settings-dataset-showVersion
  * settings-dataset-showLastMetadataUpdate
  * settings-dataset-showMetadataVersionNumber
* publication
  * settings-publication-showCollectedFrom
  * settings-publication-showHostedBy
  * settings-publication-showOpenaireId
  * settings-publication-showSubTitle
  * settings-publication-showDateOfAcceptance
  * settings-publication-showPublisher
  * settings-publication-showLanguage
  * settings-publication-showSource
  * settings-publication-showCreators
  * settings-publication-showLicense
  * settings-publication-showTrust
  * settings-publication-showRelatedGroups
  * settings-publication-showInstances
  * settings-publication-showRelationships
  * settings-publication-showJournal
* software
  * settings-software-showCollectedFrom
  * settings-software-showHostedBy
  * settings-software-showOpenaireId
  * settings-software-showSubTitle
  * settings-software-showDateOfAcceptance
  * settings-software-showPublisher
  * settings-software-showLanguage
  * settings-software-showSource
  * settings-software-showCreators
  * settings-software-showLicense
  * settings-software-showTrust
  * settings-software-showRelatedGroups
  * settings-software-showInstances
  * settings-software-showRelationships
  * settings-software-showContactPerson
  * settings-software-showContactGroup
  * settings-software-showDocumentationUrl
  * settings-software-showCodeRepositoryUrl
  * settings-software-showProgrammingLanguage
  * settings-software-showTool
* project
  * settings-project-showCollectedFrom
  * settings-project-showHostedBy
  * settings-project-showOpenaireId
  * settings-project-showCode
  * settings-project-showAcronym
  * settings-project-showWebsiteUrl
  * settings-project-showStartDate
  * settings-project-showEndDate
  * settings-project-showTrust
  * settings-project-showSubject
  * settings-project-showFundingTree
  * settings-project-showRelationships
* other
  * settings-other-showCollectedFrom
  * settings-other-showHostedBy
  * settings-other-showOpenaireId
  * settings-other-showSubTitle
  * settings-other-showDateOfAcceptance
  * settings-other-showPublisher
  * settings-other-showLanguage
  * settings-other-showSource
  * settings-other-showCreators
  * settings-other-showLicense
  * settings-other-showTrust
  * settings-other-showRelatedGroups
  * settings-other-showInstances
  * settings-other-showRelationships
  * settings-other-showJournal
  * settings-other-showResourceType
  * settings-other-showDevice
  * settings-other-showSize
  * settings-other-showVersion
  * settings-other-showLastMetadataUpdate
  * settings-other-showMetadataVersionNumber
  * settings-other-showContactPerson
  * settings-other-showContactGroup
  * settings-other-showDocumentationUrl
  * settings-other-showCodeRepositoryUrl
  * settings-other-showProgrammingLanguage
  * settings-other-showTool


## Theming

To facilitate smoother visual integration of the OSL Page Enhancer to the provider's pages, the widget supports a theming mechanism. Currently, preconfigured themes are available to allow the selection of a visual look and feel that is more appropriate to the integrating page.

This option is available through the respective configuration value as presented in the sections above.

## Integration

This section covers the integration steps required for a science page provider to make use of the OSL Science Page Enhancer widget within his content pages. These steps assume that the required registration step through the [Open Science Lens Web Application (OSL WebApp)](./docs/osl-webapp.md  "OSL WebApp") has been completed and the API Key has been retrieved.

### Importing the widget to your page

To import the widget in a page, use the following snippet:

```
<script type="text/javascript" src="theWidgetLibrary.js"></script>
```

### Using the widget

After the widget has been imported, you place the widget within your page by adding the following tag:

(Tip: create a ```<div>``` at the end of your ```<body>``` and place the ```<osl-widget>``` tag inside to avoid css ovelapping. If possible place the ```<script>``` inside here too.)

```
<osl-widget></osl-widget>
```

At this point, you can also use any of the respective configuration override attributes you may need to further customize the behavior and visual appearence of the OSL Science Page Enhancer, as presented in the previous sections.

### Scanning

Depending on the OSL Plugin configuration, the scanning process will go through the browser page content, navigating through the page DOM to identify points of interest, highlight them and make them available for further information retrieval. The following sections of the DOM tree are scanned:
* Text Nodes
* Anchor href links

Initial integration to scan also [Schema.org](https://schema.org/ "schema.org"), json-ld script tags has been evaluated. Evaluation of the process in most available science pages indicated that most of the DOI information available through the schema.org script tags were already discoverable through direct DOM scanning, while at the same time, the DOI identifiers were not necessarily handled consistently within the expected identifier fields. For this reason they were not included in the final DOI scanning process, although the decision may be re-evaluated.

The respective nodes are scanned using the following regular expressions to identify DOIs within the text:
```
/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/g
```

The regular expression has been validated, but given the free form of some DOIs, it is possible to extend the matching process with additional regular expressions for better results.

#### Auto

Under this scanning configuration, the scanning component will periodically scan the page DOM to identify points of interest. This configuration aims to achieve a technology agnostic approach to handle in-page DOM updates, being as less intrusive as possible to the framework used from the page provider to manipulate and handle the DOM.

#### Manual

Under this scanning configuration, the scanning component will only traverse the DOM after explicit user interaction. It is expected to be primarily an evaluation stage facility to be discontinued further down the component lifetime

#### OnPageLoad

Under this scanning configuration, the scanning component will only traverse the DOM on initial page load. This is mostly suiting for non-SPA pages as it will aleviate also unessecary utilization of browser resources.

#### none

Under this scanning configuration, the scanning component will traverse the DOM only on initial load but will not try to automatically detect DOIs. It will only look for explicit markup as described in later sections.

### Additonal Integration

Another possibility offered, should the content providers choose to customize their rendering process to allow further integration with the OSL Science Page Enhancer, is to add additional markup in their pages that direct the OSL Science Page Enhancer to bind visual badges to selected page areas.

Through relative markup, the content providers can identify points of interest within their content that can enhance the discovery capabilities of the OSL Science Page Enhancer and provide additional hooks into the data retrieval and integration process.

This additional integration happens through explicit markup that can wrap the specific point of interest so that is is further enhanced with additional information retrieved through OSL. An example of this could be:

```
<span osl-project="name">NEANIAS</span>
```

In case of wrapping an element that does not directly offer as a text element the value of the property term you want to be enhancing, the following syntax can also be used:

```
<span osl-project="name" osl-value="NEANIAS">a very cool project</span>
```

To control the placement of visual anchor that the user can click on to retrieve additional information, an additional attribute is available to define the div that you want to place the anchor at. If this is not specific, the widget will place the visual anchor next to the span element

```
<span osl-project="name" osl-value="NEANIAS" osl-anchor="mydiv1">...</span>
......
<div id="mydiv1"/>
```

The available qualifiers for term based lookup through this functionality are the following:

* generic
  * osl-identifier:doi
* datasets
  * osl-dataset:doi
  * osl-dataset:openaireDatasetID
  * osl-dataset:title
  * osl-dataset:author
  * osl-dataset:openaireProviderID
  * osl-dataset:openaireProjectID
  * osl-dataset:projectID
  * osl-dataset:country
  * osl-dataset:funder
  * osl-dataset:fundingStream
* publications
  * osl-publication:doi
  * osl-publication:openairePublicationID
  * osl-publication:title
  * osl-publication:author
  * osl-publication:openaireProviderID
  * osl-publication:openaireProjectID
  * osl-publication:projectID
  * osl-publication:country
  * osl-publication:funder
  * osl-publication:fundingStream
* software
  * osl-software:doi
  * osl-software:openaireSoftwareID
  * osl-software:title
  * osl-software:author
  * osl-software:openaireProviderID
  * osl-software:openaireProjectID
  * osl-software:projectID
  * osl-software:country
  * osl-software:funder
  * osl-software:fundingStream
* project
  * osl-project:doi
  * osl-project:grantID
  * osl-project:openairePublicationID
  * osl-project:name
  * osl-project:acronym
  * osl-project:callID
  * osl-project:participantCountries
  * osl-project:participantAcronyms
  * osl-project:funder
  * osl-project:fundingStream
* other
  * osl-other:doi
  * osl-other:openaireOtherID
  * osl-other:title
  * osl-other:author
  * osl-other:openaireProviderID
  * osl-other:openaireProjectID
  * osl-other:projectID
  * osl-other:country
  * osl-other:funder
  * osl-other:fundingStream
