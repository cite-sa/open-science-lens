# Open Science Lens API (OSL API)

The OSL API provides the backbone functionality of the proxy services that Open Science Lens provides to mediate between user-facing components and the underpinning OpenAIRE API and data. It is responsible to aggregate and abstract a set of value adding operations on top of the OpenAIRE infrastructure and services. An indicative but not complete list includes:
* Enforce Authentication and Authorization where required
* Perform Logging and Accounting as applicable
* Accelerate access to data through extensive caching
* Transform and aggregate relevant information from possibly multiple backend calls

## Technology

The OSP API is build as a Spring Boot Web API application. It exposes its API through appropriate RESTful endpoints, exchanging json format messages. The following sections detail further technologies, endpoints, message models, data stores and additional technical information.

(components used and respective licenses)

## Authentication

To secure its endpoints, a Bearer Authentication scheme is implemented in the OSL API. Each of the secured endpoints expect to find a relevant header containing the appropriate authorization header:

```
Authorization: Bearer <ACCESS_TOKEN>
```

The access token is expected to be a [JWT](https://tools.ietf.org/html/rfc7519 "JSON Web Token") token, generated and signed by the configured trusted identity provider.

### Pseudo Identification

As is described in the respective [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") sections, for reasons of central settings maintenance, it is possible for the respective components to store and retrieve settings documents, governing the configuration of respective component instances through the use of externally generated identifiers. This process is not cryptographically secured and it supplementary to the main component functionality.

## Authorization

With respect to authorization, the following cases can be identified:
* Administrative access
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
* publications
* datasets
* software
* projects
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
GET  http://localhost:8080/search?doi=10.1002/jmri.25769&type=publications&include=doi&include=title&include=journal
```

Respectively, if we want to retrieve all information except for a publication's relationships, we can achieve it in the following way:
```
GET  http://localhost:8080/search?doi=10.1002/jmri.25769&type=publications&exclude=relationships
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

The following snippets show examples of the response model retrieved through the OSL API for lookup operations, for items of the respective types. The completness of the example models with respect to the available properties listed in the sections above are subject to availability of respective data.

### Publication Response Model Example

```json
{
            "collectedFrom": [
                {
                    "id": "opendoar____::eda80a3d5b344bc40f3bc04f65b7a357",
                    "name": "PubMed Central"
                },
                {
                    "id": "driver______::bee53aa31dc2cbb538c10c2b65fa5824",
                    "name": "DOAJ-Articles"
                },
                {
                    "id": "openaire____::081b82f96300b6a6e3d282bad31cb6e2",
                    "name": "Crossref"
                },
                {
                    "id": "openaire____::8ac8380272269217cb09a928c8caa993",
                    "name": "UnpayWall"
                },
                {
                    "id": "openaire____::806360c771262b4d6770e7cdf04b5c5a",
                    "name": "ORCID"
                },
                {
                    "id": "openaire____::5f532a3fc4f1ea403f37070f59a7a53a",
                    "name": "Microsoft Academic Graph"
                },
                {
                    "id": "opendoar____::8b6dd7db9af49e67306feb59a8bdc52c",
                    "name": "Europe PubMed Central"
                }
            ],
            "openaireId": "dedup_wf_001::cb79c7b17fefed496f02bd2db4419710",
            "doi": [
                "10.1371/journal.pone.0075871"
            ],
            "title": "The Broken MLL Gene Is Frequently Located Outside the Inherent Chromosome Territory in Human Lymphoid Cells Treated with DNA Topoisomerase II Poison Etoposide",
            "dateOfAcceptance": "2018-11-13",
            "publisher": "Public Library of Science",
            "description": [
                "The mixed lineage leukaemia (MLL) gene is frequently rearranged in secondary leukaemias, in which it could fuse to a variety of different partners. Breakage in the MLL gene preferentially occurs within a ~8 kb region that possesses a strong DNA topoisomerase II cleavage site. It has been proposed that DNA topoisomerase II-mediated DNA cleavage within this and other regions triggers translocations that occur due to incorrect joining of broken DNA ends. To further clarify a possible mechanism for MLL rearrangements, we analysed the frequency of MLL cleavage in cells exposed to etoposide, a DNA topoisomerase II poison commonly used as an anticancer drug, and positioning of the broken 3’-end of the MLL gene in respect to inherent chromosomal territories. It was demonstrated that exposure of human Jurkat cells to etoposide resulted in frequent cleavage of MLL genes. Using MLL-specific break-apart probes we visualised cleaved MLL genes in ~17% of nuclei. Using confocal microscopy and 3D modelling, we demonstrated that in cells treated with etoposide and cultivated for 1 h under normal conditions, ~9% of the broken MLL alleles were present outside the chromosome 11 territory, whereas in both control cells and cells inspected immediately after etoposide treatment, virtually all MLL alleles were present within the chromosomal territory. The data are discussed in the framework of the “breakage first” model of juxtaposing translocation partners. We propose that in the course of repairing DNA topoisomerase II-mediated DNA lesions (removal of stalled DNA topoisomerase II complexes and non-homologous end joining), DNA ends acquire additional mobility, which allows the meeting and incorrect joining of translocation partners."
            ],
            "language": "English",
            "source": [
                "Crossref",
                "",
                "PLoS ONE, Vol 8, Iss 9, p e75871 (2013)",
                "PLoS ONE"
            ],
            "creators": [
                {
                    "value": "Glukhov Sergey I."
                },
                {
                    "value": "Rubtsov Mikhail A."
                },
                {
                    "value": "Alexeyevsky Daniil A."
                },
                {
                    "value": "Alexeevski Andrei V."
                },
                {
                    "value": "Razin Sergey V."
                },
                {
                    "value": "Iarovaia Olga V."
                }
            ],
            "license": "Open Access",
            "trust": 0.8,
            "instances": [
                {
                    "id": "opendoar____::8b6dd7db9af49e67306feb59a8bdc52c",
                    "webResource": [
                        {
                            "url": "http://europepmc.org/articles/PMC3783379"
                        }
                    ]
                },
                {
                    "id": "doajarticles::830e55b42c4aaa815c19cfa4f2e5855e",
                    "webResource": [
                        {
                            "url": "http://europepmc.org/articles/PMC3783379?pdf=render"
                        },
                        {
                            "url": "https://doaj.org/toc/1932-6203"
                        }
                    ]
                },
                {
                    "id": "doajarticles::830e55b42c4aaa815c19cfa4f2e5855e",
                    "webResource": [
                        {
                            "url": "http://dx.plos.org/10.1371/journal.pone.0075871"
                        },
                        {
                            "url": "http://dx.doi.org/10.1371/journal.pone.0075871"
                        }
                    ]
                },
                {
                    "id": "doajarticles::830e55b42c4aaa815c19cfa4f2e5855e",
                    "webResource": [
                        {
                            "url": "https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0075871&type=printable"
                        }
                    ]
                },
                {
                    "id": "doajarticles::830e55b42c4aaa815c19cfa4f2e5855e",
                    "webResource": [
                        {
                            "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3783379/"
                        },
                        {
                            "url": "http://europepmc.org/articles/PMC3783379"
                        },
                        {
                            "url": "http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0075871"
                        },
                        {
                            "url": "https://istina.msu.ru/publications/article/4698635/"
                        },
                        {
                            "url": "https://academic.microsoft.com/#/detail/1971848766"
                        }
                    ]
                },
                {
                    "id": "openaire____::55045bd2a65019fd8e6741a755395c8c",
                    "webResource": [
                        {
                            "url": "https://dx.doi.org/10.1371/journal.pone.0075871"
                        }
                    ]
                }
            ],
            "relationships": [
                {
                    "trust": 0.9,
                    "type": "organization",
                    "openaireId": "dedup_wf_001::f0fd8e43c08c5ca1864e6ec8637dc626",
                    "legalName": "Moscow State University",
                    "legalShortName": "Moscow State University"
                },
                {
                    "trust": 0.9,
                    "type": "organization",
                    "openaireId": "dedup_wf_001::d69178593701d7044dfb680c641f70b2",
                    "legalName": "M.V. Lomonosov Moscow State University",
                    "legalShortName": "M.V. Lomonosov Moscow State University"
                }
            ],
            "journal": {
                "value": "PLoS ONE",
                "eissn": "1932-6203"
            }
        }
```

### Dataset Response Model Example

```json
{
            "collectedFrom": [
                {
                    "id": "openaire____::9e3be59865b2c1c335d32dae2fe7b254",
                    "name": "Datacite"
                },
                {
                    "id": "re3data_____::db814dc656a911b556dba42a331cebe9",
                    "name": "Mendeley Data"
                },
                {
                    "id": "re3data_____::84e123776089ce3c7a33db98d9cd15a8",
                    "name": "EASY"
                }
            ],
            "openaireId": "dedup_wf_001::c461b4b8f133de1b7f1bba2a08f6de55",
            "doi": [
                "10.17632/7gfp2y9mjf.1",
                "10.17632/7gfp2y9mjf"
            ],
            "title": "GO Enrichment Analysis, KEGG Pathway analysis, and STRING analysis of PFAS associated proteins",
            "dateOfAcceptance": "2019-03-24",
            "publisher": "Mendeley",
            "description": [
                "This research sought to identify more possible substrates that PFAS can deamidate by mass spectrometry. We purified PFAS associated proteins using anti-FLAG M2 magnetic beads and identified 441 proteins. We analyzed the data set using bioinformatic tools including GO annotation, KEGG pathway analysis, and STRING analysis. We confirm predicted protein interaction of PFAS with four proteins by co-immunoprecipitation and western blotting."
            ],
            "language": "UNKNOWN",
            "creators": [
                {
                    "value": "Disoma, Cyrollah"
                }
            ],
            "license": "Open Access",
            "trust": 0.8,
            "relatedGroups": [
                {
                    "id": "dh-ch",
                    "label": "Digital Humanities and Cultural Heritage",
                    "type": "community"
                }
            ],
            "instances": [
                {
                    "id": "re3data_____::db814dc656a911b556dba42a331cebe9",
                    "webResource": [
                        {
                            "url": "http://dx.doi.org/10.17632/7gfp2y9mjf.1"
                        }
                    ]
                },
                {
                    "id": "re3data_____::db814dc656a911b556dba42a331cebe9",
                    "webResource": [
                        {
                            "url": "http://dx.doi.org/10.17632/7gfp2y9mjf"
                        }
                    ]
                },
                {
                    "id": "re3data_____::db814dc656a911b556dba42a331cebe9",
                    "webResource": [
                        {
                            "url": "http://dx.doi.org/10.17632/7GFP2Y9MJF"
                        }
                    ]
                },
                {
                    "id": "re3data_____::db814dc656a911b556dba42a331cebe9",
                    "webResource": [
                        {
                            "url": "http://dx.doi.org/10.17632/7GFP2Y9MJF.1"
                        }
                    ]
                },
                {
                    "id": "re3data_____::84e123776089ce3c7a33db98d9cd15a8",
                    "webResource": [
                        {
                            "url": "http://dx.doi.org/10.17632/7gfp2y9mjf.1"
                        }
                    ]
                }
            ],
            "resourceType": [
                "dataset"
            ],
            "version": "None"
        }
```

### Software Response Model Example

```json
{
            "collectedFrom": [
                {
                    "id": "openaire____::d3b7c913cd04ebfec0e9ec32cb6fd58c",
                    "name": "GitHub"
                },
                {
                    "id": "openaire____::dbfd07503aaa1ed31beed7dec942f3f4",
                    "name": "Software Heritage"
                }
            ],
            "openaireId": "openaire____::c4ec955d31900027451c55a22c818a7b",
            "title": "u-of-pitt-SPL-drug-NER software on GitHub",
            "language": "Undetermined",
            "license": "Open Source",
            "trust": 0.9,
            "instances": [
                {
                    "id": "openaire____::d3b7c913cd04ebfec0e9ec32cb6fd58c",
                    "webResource": [
                        {
                            "url": "https://github.com/dbmi-pitt/u-of-pitt-SPL-drug-NER"
                        }
                    ]
                },
                {
                    "id": "openaire____::dbfd07503aaa1ed31beed7dec942f3f4",
                    "webResource": [
                        {
                            "url": "https://archive.softwareheritage.org/browse/origin/https://github.com/dbmi-pitt/u-of-pitt-SPL-drug-NER"
                        }
                    ]
                }
            ],
            "relationships": [
                {
                    "trust": 0.72,
                    "type": "publication",
                    "openaireId": "dedup_wf_001::5e492d37d6d77aec4bf12a25cf1bbcb3",
                    "title": "Using Nonexperts for Annotating Pharmacokinetic Drug-Drug Interaction Mentions in Product Labeling: A Feasibility Study"
                }
            ],
            "codeRepositoryUrl": "https://github.com/dbmi-pitt/u-of-pitt-SPL-drug-NER"
        }
```

### Project Response Model Example

```json
{
            "openaireId": "arc_________::5dd2fd5f26bf18725ab69fc47614edfd",
            "code": "LP140100495",
            "title": "Linkage Projects - Grant ID: LP140100495",
            "websiteUrl": "http://purl.org/au-research/grants/arc/LP140100495",
            "startDate": "2014-01-01",
            "endDate": "2017-12-31",
            "trust": 0.9,
            "fundingTree": {
                "funder": {
                    "id": "arc_________::ARC",
                    "shortName": "ARC",
                    "name": "Australian Research Council (ARC)",
                    "jurisdiction": "AU"
                },
                "fundingLevel0": {
                    "id": "arc_________::ARC::Linkage Projects",
                    "description": "Linkage Projects",
                    "name": "Linkage Projects",
                    "class": "arc:fundingStream"
                }
            }
        }
```

### Other Response Model Example

```json
{
            "collectedFrom": [
                {
                    "id": "re3data_____::f5b9831893a8aae2371f829870c149e8",
                    "name": "NAKALA"
                }
            ],
            "openaireId": "dedup_wf_001::23464eb2a779b8df81b2004f3fd6a8df",
            "title": "Paleographical analysis of letter N",
            "publisher": "DU",
            "description": [
                "vue 6",
                "Morphological study on the letter N: collection of samples from inscriptions and papyri, and analysis of paleographical aspects."
            ],
            "language": "fre##lat",
            "creators": [
                {
                    "value": "Marichal, Robert"
                }
            ],
            "license": "not available",
            "trust": 0.8,
            "instances": [
                {
                    "id": "re3data_____::f5b9831893a8aae2371f829870c149e8"
                }
            ],
            "resourceType": [
                "texts ## images"
            ]
        }
```

## Caching

To facilitate quick response times and to aleviate some of the request load from the bakcing OpenAIRE APIs, the OSL API employes a caching scheme that enables it to respond to consecutive requests for the same response without contacting the OpenAIRE APIs.

The kind of data that are being served are not critical or oftenly updated, so this allows for a policy that defines high TTL values and not aggresive cache invalidation techniques. The Cache is orthogonal to the main functionality of the OSL API, and even if there are issues contacting the cache provider, or it is not configured, the API can still serve  incoming requests, without making use of the caching functionality.

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
          enable-cache-full: true/false
          time-to-live-full: <TTL IN SECONDS>
          enable-cache-split: true/false
```
One can completly disable or enable the cache functionality, and then per individual type of lookup, further control the behavior. For *keywords* and *term* based lookups, it is possible to control if the full list of results will be cached based on the searched terms, and if the result list can be split and cached individually based on their DOI identifiers. In this case, the *doi* based configuration will control if and under which TTL these individual results will be cached.

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
keywords:<WHITE-SPACE SEPARATED KEYWOARD>
```
e.g.
```
 keywords:analysis,europe,life
```
* qualified terms
```
type:<TYPE>#kind:<WHITE-SPACE SEPARATED QUALIFYING PROPERTIES>#value:<WHITE-SPACE SEPARATED VALUES>
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

The UserProfile collection maintains documents that store setting configurations used by the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") and [OSL Plugin](./osl-plugin.md  "OSL Plugin") to store centrally configuration settings that cover their behavor and result visualization. An example of such a document is the following:

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

Currently, the data lookup and retrieval that are beeing proxied by the OSL API are the ones that are offered through the **OpenAIRE APIs**. This [OpenAIRE APIs](https://api.openaire.eu/api.html "OpenAIRE Public API") exposes its responses through the [OpenAIRE Format (oaf)](https://www.openaire.eu/schema/latest/doc/oaf.html "OpenAIRE Format (oaf)") which the OSL API components then transform into the desired OSL response model. Currently, this API, as described in the related documentation section, imposes some rate limits which the OSL API is also subject to. At this time, these limits are:
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
