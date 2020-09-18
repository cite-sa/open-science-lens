# Open Science Lens

Open Science Lens delivers an innovative technological approach to empower Open Science and bring the information residing on OpenAIRE data infrastructure at reach of scientists and citizens. Its components deliver a set of instruments that allow web users to easily locate and explore information of relevance to Open Science when navigating in the web.

Additionally, it allows site owners to easily integrate such information in their offerings, enriching user experience with easy to consume information coming from one of the flagship infrastructures of Open Science, the one of OpenAIRE. To do so, Open Science Lens exploits the modern rich [APIs](https://api.openaire.eu/api.html "OpenAIRE Public API") of OpenAIRE infrastructure, and relies on common browser and web technologies to assure wide reach of its offering. 

As an overview of the high-level components and respective functionality each brings into the Open Science Lens (OSL) solution, the following can be highlighted:

## [Open Science Lens API (OSL API)](./docs/osl-api.md "OSL API")
The OSL API provides the backbone functionality of the proxy services that Open Science Lens provides to mediate between user-facing components and the underpinning OpenAIRE API and data. It is responsible to aggregate and abstract a set of value adding operations on top of the OpenAIRE infrastructure and services. An indicative but not complete list includes:
* Enforce Authentication and Authorization where required
* Perform Logging and Accounting as applicable
* Accelerate access to data through extensive caching
* Transform and aggregate relevant information from possibly multiple backend calls

## [Open Science Lens Web Application (OSL WebApp)](./docs/osl-webapp.md  "OSL WebApp")
The OSL WebApp provides administrative functionality to configure and monitor the operation of the Open Science Lens components as well as the ability to register content providers that want to further enhance their data listings with Open Science information through OpenAIRE. Additionally, the OSL WebApp is the registered entry point within the OpenAIRE Identity Provider to allow for user federation.

## [Open Science Lens Browser Plugin (OSL Plugin)](./docs/osl-plugin.md  "OSL Plugin")
The OSL Plugin is the browser component developed and which end users are able to download and deploy in their browser to take advantage of the offered functionality and direct insight into the OpenAIRE Research Graph data. Browser Plugin development is highly relevant to the hosting browser and no single solution can be offered to be applied across all browsers. The Plugin is responsible to collect the points of interest from the content that the user is browsing, collect relevant information from the OpenAIRE Research Graph through the OSL API and present it in a coherent and concise fashion to the end user, allowing further exploration.

## [Open Science Lens Science Page Enhancer (OSL Science Page Enhancer)](./docs/osl-enhancer.md  "OSL Science Page Enhancer")
The OSL Science Page Enhancer is the lightweight JavaScript library widget that Science Page Providers can use and embed within their applications to take direct advantage of the OpenAIRE Research Graph and enhance the content they provide to their users. In addition to scanning the content of the page in which the widget is included, the point of interest discovery ability of the widget can be enhanced with explicit markup that the providers can include in their pages.