# Open Science Lens API (OSL API)

The OSL API provides the backbone functionality of the proxy services that Open Science Lens provides to mediate between user-facing components and the underpinning OpenAIRE API and data. It is responsible to aggregate and abstract a set of value adding operations on top of the OpenAIRE infrastructure and services. An indicative but not complete list includes:
* Enforce Authentication and Authorization where required
* Perform Logging and Accounting as applicable
* Accelerate access to data through extensive caching
* Transform and aggregate relevant information from possibly multiple backend calls

## Technology

The OSP API is build as a Spring Boot Web API application. It exposes its API through appropriate RESTful endpoints, exchanging json format messages. The following sections detail furhter technologies, endpoints, message models, data stores and additional technical information.

(components used and respective licenses)

## Authentication

To secure its endpoints, a Bearer Authentication scheme is implemented in the OSL API. Each of the secured ednpoints expect to find a relevant header containing the appropriate authorizatioon header:

```
Authorization: Bearer <ACCESS_TOKEN>
```

The access token is expected to be a [JWT[(https://tools.ietf.org/html/rfc7519 "JSON Web Token") token, generated and signed by the configured trusted identity provider.

### Pseudo Identification

As is described in the respective [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") sections, for reasons of central settings maintenance, it is possible for the respective components to store and retrieve settings documents, governing the configuration of respective component instances through the use of externally generated identifiers. This process is not cryptographically secured and it supplementary to the main component functionality.

## Authorization

With respect to authorization, the following cases can be identified:
* Adminitrative access
* Authenticated user access
* Anonymous

For the **administrative user access**, it is expected that OSL Administrator users will be able to perform actions that require elevated rights. Such actions include the validation and activation of Science Page providers that want to use the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget as described in the respective section. For such administrative actions to be permitted, the **OSL_Admin** role is expected to be linked with the authenticated user as part of its JWT claims. An example of an access token containing such a grant is the following:

```json
{
  "exp": <EPOCH>,
  "iat": <EPOCH>,
  "jti": "<UUID>",
  "iss": "<ISSUER URL>",
  "aud": "<TOKEN AUDIENCE>",
  "sub": "<SUBJECT ID>",
  "typ": "Bearer",
  "azp": "<OSL WebApp Client Id>",
  "session_state": "<UUID>",
  "allowed-origins": [
    "<ORIGIN URL>"
  ],
  "realm_access": {
    "roles": [
      "OSL_Admin"
    ]
  },
  "scope": "openid profile email",
  "name": "<SUBJECT NAME>",
  "preferred_username": "<SUBJECT USERNAME>",
  "given_name": "<SUBJECT NAME>",
  "family_name": "<SUBJECT LASTNAME>",
  "email": "<SUBJECT EMAIL>"
}
```

For the **authenticated user access**, no special role needs to be configured. Anyone authenticated by the trusted identity provider can access non-administrative secured endpoints. Such users may interact through the OSL API endpoints, through the [OSL Web App](./osl-webapp.md  "OSL WebApp"), to perform operations such as registeration and management of Science Page Providers.

For the **anonymous user access**, the available endpoints are the ones that expose content retrieval based on the underpinning OpenAIRE endpoints for content lookup. Such calls may contain information on the acting party such as the ones described in the [Pseudo Identification](./osl-api.md#Pseudo_Identification) section.

## API

The API offered through the OSL API can be categorized by its servising clients under the following broad categories:
* OSL Web App
* OSL Science Page Enhancer
* OSL Plugin

The [OSL Web App](./osl-webapp.md  "OSL WebApp") facing API is primarily directed at facilitating the functional and operational requirments of the OSL WebApp. It is protected, and all invocations must be authenticated. It is primarily focused on administrative operations and has limited usage scope.

The [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") facing API is common in its operation, but the OSL Page Enhancer is able to consume a wider range of the API endpoints.

### Endpoints

In this section we list some of endpoints made available through the OSL API. We focus primarily on the endpoints that are serving the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") components, allowing the retrieval of OpenAIRE hosted informatiopn with respect to data lookup and retrieval. The endpoints that are more targeted to the internal workings of the Open Science Lens application and the interactions required for the [OSL Web App](./osl-webapp.md  "OSL WebApp") are not detailed.

#### DOI Lookup

The following endpoint retrieves information on a single DOI:

```
GET https://<API DOMAIN>/search?doi=<DOI IDENTIFIER>
```
for example, in a development environment:
```
GET http://localhost:8080/search?doi=10.5281/zenodo.194087
```

In case the caller knowns the type of the item to be retrieved, the following syntax can be used:
```
GET https://<API DOMAIN>/search?doi=<DOI IDENTIFIER>&type=<TYPE>
```
for example, in a development environment:
```
GET  http://localhost:8080/search?doi=10.5281/zenodo.194087&type=publications
```

The type of the qualified type can be one of:
* publication
* dataset
* software
* project
* other

#### Text Lookup

The following endpoint retrieves information based on a free text lookup:

```
GET https://<API DOMAIN>/search?keywords=<FREE TEXT>
```
for example, in a development environment:
```
GET http://localhost:8080/search?keywords=aanalysis%20europe%20life
```

#### Qualified Term Lookup

The following endpoint retrieves information based on a qualified term lookup:

```
GET https://<API DOMAIN>/search?type=<TYPE>&<PROPERTY>=<VALUE>&<PROPERTY>=<VALUE>
```
for example, in a development environment:
```
GET http://localhost:8080/search?type=publications&type=datasets&author=Rana%20Shakil&title=Biological%20Activities
```

With respect to available properties based on the type of asset beeing retrieved, the following terms are available:

* datasets
  * doi
  * openaireDatasetID
  * title
  * author
  * openaireProviderID
  * openaireProjectID
  * projectID
  * country
  * funder
  * fundingStream
* publications
  * doi
  * openairePublicationID
  * title
  * author
  * openaireProviderID
  * openaireProjectID
  * projectID
  * country
  * funder
  * fundingStream
* software
  * doi
  * openaireSoftwareID
  * title
  * author
  * openaireProviderID
  * openaireProjectID
  * projectID
  * country
  * funder
  * fundingStream
* project
  * doi
  * grantID
  * openairePublicationID
  * name
  * acronym
  * callID
  * participantCountries
  * participantAcronyms
  * funder
  * fundingStream
* other
  * doi
  * openaireOtherID
  * title
  * author
  * openaireProviderID
  * openaireProjectID
  * projectID
  * country
  * funder
  * fundingStream

#### Projection

It is possible to include additional parameters to the invocation of each lookup endpoint to control what kind of information it is required to be retrieved. Since the [OpenAIRE Research Graph Data Model](https://zenodo.org/record/2643199#.X2jlkGgzYYo "OpenAIRE Research Graph Data Model") is used to retrieve the relevant information through the [OpenAIRE APIs](https://api.openaire.eu/api.html "OpenAIRE Public API"), the amount of information retrieved, as well as the schema of the responses, may be overwhelming for the retrieval and visualization purposes of the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") components. 

For this reason, it is possible to include explicit **include** and **exclude** invocation parameters based on the OSL API response model. 

An example of using these parameters to only include the doi, title and journal of a publication is the following:

```
GET  http://localhost:8080/search?doi=10.5281/zenodo.194087&type=publications&include=doi&include=title&include=journal
```

Respectively, if we want to retrieve all information except for a publication's relationships, we can achieve it in the following way:
```
GET  http://localhost:8080/search?doi=10.5281/zenodo.194087&type=publications&exclude=relationships
```

The available property names to be used in either an include or an exclude list, based on the type of information retrieved, is the following:

* publication
  * openaireId
  * doi
  * title
  * subTitle
  * dateOfAcceptance
  * String publisher
  * description
  * language
  * source
  * license
  * trust
  * relatedGroups
  * instances
  * relationships
  * journal
* dataset
  * openaireId
  * doi
  * title
  * subTitle
  * dateOfAcceptance
  * String publisher
  * description
  * language
  * source
  * license
  * trust
  * relatedGroups
  * instances
  * relationships
  * resourceType
  * device
  * size
  * version
  * lastMetadataUpdate
  * metadataVersionNumber
* software
  * openaireId
  * doi
  * title
  * subTitle
  * dateOfAcceptance
  * String publisher
  * description
  * language
  * source
  * license
  * trust
  * relatedGroups
  * instances
  * relationships
  * contactPerson
  * contactGroup;
  * documentationUrl
  * codeRepositoryUrl
  * programmingLanguage
  * tool
* other
  * openaireId
  * doi
  * title
  * subTitle
  * dateOfAcceptance
  * String publisher
  * description
  * language
  * source
  * license
  * trust
  * relatedGroups
  * instances
  * relationships
  * journal
  * resourceType
  * device
  * size
  * version
  * lastMetadataUpdate
  * metadataVersionNumber
  * contactPerson
  * contactGroup;
  * documentationUrl
  * codeRepositoryUrl
  * programmingLanguage
  * tool
* project
  * openaireId
  * code
  * title
  * acronym
  * websiteUrl
  * startDate
  * endDate
  * trust
  * subject
  * fundingTree
  * relationships

### OSL Response Model

The response model of the [OpenAIRE APIs](https://api.openaire.eu/api.html "OpenAIRE Public API") used is defined by the [OpenAIRE Format (oaf)](https://www.openaire.eu/schema/latest/doc/oaf.html "OpenAIRE Format (oaf)"). Part of the process made available through the OSL API, is to transform the OpenAIRE API response model to a simplified, aggregated model, more suitable for the visualization purposes of the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") components. 

The following snippets show examples of the respons model retrieved through the OSL API for lookup operations, for items of the respective types. The completness of the example models with respect to the available properties listed in the sections above are subject to availability of respective data.

### Publication Response Model Example

**TBD**

### Dataset Response Model Example

**TBD**

### Software Response Model Example

**TBD**

### Project Response Model Example

**TBD**

### Other Response Model Example

**TBD**

## Caching

To facilitate quick response times and to aleviate some of the request load from the bakcing OpenAIRE APIs, the OSL API employes a caching scheme that enables it to respond to consecutive requests for the same response without contacting the OpenAIRE APIs.

The kind of data that are being served are not critical or oftenly updated, so this allows for a policy that defines high TTL values and not aggresive cache invalidation techniques. The Cache is orthogonal to the main functionality of the OSL API, and even if there are issues contacting the cache provider, or it is not configured, the API can still serve  incoming requests, withouyt making use of the cahcing functionaloity.

The OSL API can be configured to use a [Redis](https://redis.io/ "Redis") data store. To control the caching policies, the following configuration is available for the API:

```yml
cache:
    host : <HOST>
    port : <PORT>
    enable-total-cache: true/false
    types:
        doi:
          enable-cache: true/false
          time-to-live: <TTL IN SECONDS>
        keywords:
          enable-cache-full: true/false
          time-to-live-full: <TTL IN SECONDS>
          enable-cache-split: true/false
        qualified-term:
          enable-cache-full: true
          time-to-live-full: <TTL IN SECONDS>
          enable-cache-split: true/false
```
One can completly disable or enable the cache functionality, and then per individual type of lookup, further control the behavior. For *keywords* and *term* based lookups, it is possible to control if the full list of results will be cached based on the searched terms, and if the the result list can be split and cached individually based on their DOI identifiers. In this case, the *doi* based configuration will control if and under which TTL these individual results will be cached.

The cache keys generated depend on the kind of result being cached:

* DOI
```
doi:<THE DOI>
```
e.g.
```
doi:10.5281/zenodo.194087
```
* keywoards
```
keywords:<COMMA SEPARATED KEYWOARD>
```
e.g.
```
 keywords:analysis,europe,life
```
* qualified terms
```
type:<COMMA SEPARATED TYPES>#kind:<COMMA SEPARATED QUALIFYING PROPERTIES>#value:<COMMA SEPARATED VALUES>
```
e.g.
```
type:publications#kind:title#value:combination,of,peptide,radionuclide,receptor,therapy
```

## Logging

The OSL API uses logging to track troubleshooting events. The Logback library is used for the purpose and the respective logger is configured through an external configuration file to control the logger output, message format, log file retention policy etc.

In addition to troubleshooting logs, audit logs are also maintained to track high level actions performed through the OSL API. These are also tracked through the same logging mechanism.

## Data Store

To store operational data that primarily facilitate the functionality offered through the [OSL Web App](./osl-webapp.md  "OSL WebApp") and backed by the OSL API, a persistent data store is used. This data store is based on [MongoDB](https://www.mongodb.com/ "MongoDB").

Two collections are maintained:

The DataProvider collection maintains documents that register the Science Page Providers that are using the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget. An example of such a document is the following:

```json
{
    "_id": {
        "$oid": "<DOCUMENT ID>"
    },
    "domain": "<THE DOMAIN REGISTERED>",
    "status": <DOMAIN REGISTRATION STATUS>,
    "userId": "<SUBJECT ID ADMINISTERING THE DOMAIN>",
    "apiKey": "<GENERATED API KEY FOR THE DOMAIN>",
    "email": "<CONTACT EMAIL>"
}
```

The UserProfile collection maintains focuments that store setting configurations used by the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") to store centrally configuration settings that cover their behavor and result visualization. En example of such a document is the following:

```json
{
    "_id": {
        "$oid": "<DOCUMENT ID>"
    },
    "clientId": "<CLIENT / PLUGIN INSTALLATION ID>",
    "userId": "<SUBJECT ID USING THE PLUGIN>",
    "apiKey": "<GENERATED API KEY FOR THE WIDGET>",
    "settings": {
		//widget / plugin specific settings
		//...
        "showDateOfAcceptance": "undefined",
        "showPublisher": "undefined",
		"showSource": "undefined"
		//...
    }
}
```

## Underpinning OpenAIRE API

Currentlt, the data lookup and retrieval that are beeing proxied by the OSL API are the ones that are offered through the **OpenAIRE APIs**. This [OpenAIRE APIs](https://api.openaire.eu/api.html "OpenAIRE Public API") exposes its responses through the [OpenAIRE Format (oaf)](https://www.openaire.eu/schema/latest/doc/oaf.html "OpenAIRE Format (oaf)") which the OSL API components then transform into the desired OSL response model. Currently, this API, as described in the related documentation section, imposes some rate limits which the OSL API is also subject to. At this time, these limits are:
* no more than 30 concurrent connections from single IP to any APIs
* no more than 67 concurrent requests in total
* no more then 37 concurrent request in total (max 30 per single IP) to the HTTP API for selective access
* no more than 15 requests/second to the HTTP API for selective access (in total, not per IP. If this limit is reached, requests will be delayed).

It is expected that once the Open Science Lens reaches the desired integration stage, it will be considered part of the OpenAIRE ecosystem of services and these limits will be reconsidered, or a different data access endpoint will be made available.

Other than the Public API, OpenAIRE has a **data store** available that exposes its model in a **relational** fashion. This allows more elaborate linking between the entities and is accessible through a JDBC interface. Usage of this data store was originally evaluated but it is currently not utilized. Making use of this data store will allow further linking and a deeper model to be made available to the end user, including performant aggregations and in-depth traversal. Still, making use of it would also mean that:
* The deployment of the OSL API would be governed by possible networking restrictions to allow the required connectivity, although this is something that could be handled through the collaboration with the OpenAIRE team
* It would require putting additional burden on the Public API endpoints to perform the actual data retrieval of the linked entities
  * The relational model primarily keeps the linking between entitites and few additional information
  * The Public API would need to be contacted to perform lookup operations on the identified linked entities
  * The Public API rate limits would be easier to be reached and it would detriment performance and operation of the overall solution

For these reasons, this approach, althrough still possible, has not been initially pursued.

In addition to the available APIs, OpenAIRE also makes available a **full dump** of its model. This dump could be restored periodically and custom APIs could be build around it to offer a tailored solution to the OSL querying needs. This approach was not favored as the base of the solution is primarily to build on top of the existing OpenAIRE services, while on the other hand it would require considerable resources to be allocatted to host the data model anew.