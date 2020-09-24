# Open Science Lens Web Application (OSL WebApp)

The OSL WebApp provides administrative functionality to configure and monitor the operation of the Open Science Lens components as well as the ability to register content providers that want to further enhance their data listings with Open Science information through OpenAIRE. Additionally, the OSL WebApp is the registered entry point within the OpenAIRE Identity Provider to allow for user federation.

## Technology

The OSL WebApp is build as an SPA application using the Angular framework.

(components used and respective licenses)

## Restricted Access

The OSL WebApp is only accessible to authenticated users. No anonymous access is permited since its primary use is to allow for the registration of Science Page content providers who through the OSL WebApp manage the registration of their domains and build the desired configuration to bootstrap the behavior of the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") they integrate with their site.

### Authentication

The OSL WebApp does not perform any user management functionality and is configured to authenticate its users through external, trusted, identity providers. It integrates with these external providers through the [OpenID Connect](https://openid.net/connect/ "OpenID Connect") protocol. It supports the Authorization Code Flow.

Currently, for integration purposes, a development instance of the Keycloak OIDC compatible application is used, pending integration with the OpenAIRE Identity Provider.

### Authorization

With respect to authorization, the following cases can be identified:
* Administrative access
* Authenticated user access

For the **administrative user access**, it is expected that OSL Administrator users will be able to perform actions that require elevated rights. Such actions include the validation and activation of Science Page providers that want to use the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget as described in the respective section. The respective Authorization section of the [OSL API](./docs/osl-api.md "OSL API") also describes the expected access token and required claims. In that section, the required authorization and how it handled for the supporting API endpoints is described.

For the OSL WebApp, the access token claims are required in order to visually assist the users depending on their privileges.

For administrative views and actions to be available, the **OSL_Admin** role is expected to be linked with the authenticated user as part of its JWT claims. An example of an access token containing such a grant is the following:

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

For the **authenticated user access**, no special role needs to be configured. Anyone authenticated by the trusted identity provider can access non-administrative secured views. Such users may interact through the OSL Web App with the [OSL API](./osl-api.md  "OSL API") endpoints, to perform operations such as registeration and management of Science Page Providers.

## Science Page Inventory

The main purpose of the OSL WebApp at this stage is to facilitate the registration and management of the Science Page content providers. The following section describes the process.

### Registration

Any authenticated user by a trusted identity provider can register a new domain as a Science Page content provider. One limitation is that for a given, active, domain, already registered, no new registrations are accepted. During the registration phase, some minimal information is requested so that the user registering the domain provide their contact information and the information about the domain itself.

Upon registration, re request remains at a "pending" state, awaiting for administrative approval.

Any authenticated user, accessing the content provider registration can only see the entries that are linked to his subject id as provided through the access token by which he is logged in. Users that have the **OSL_Admin** role available in their access token, are able to see all Science Page content provider entries available in the system.

### Approval

An OSL Administrator user can filter the available entries to the ones that are in the pending state. The process of reviewing, communicating with the requesting party and any other actions are assumed to happen offline, outside the control and offered functionality of the OSL Web App, at this stage.

Upon successfully reviewing the request, the admin can approve it or reject and invalidate it. In the former case, the generated APIKey is enabled and the Science Page provider can use the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget in his site. 

### Invalidation

A Science Page content provider request can be invalidated either by the OSL Administrator, or by the original user that created the entry. Upon invalidation, the domain is available again to be registered using a new request.

### APIKey

Upon creation of the Science Page content provider entry, the system generates a new APIKey and links it to the domain registration. This APIKey is used to configure the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget so that it can retrieve the required information from the [OSL API](./osl-api.md  "OSL API") endpoints.

### Configuration

While registering and also while later managing an entry for a Science Page content provider, it is possible to select the kind of configuration the user needs to bootstrap the usage of the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer") widget in the integrating page. After the available options are configured, the user can download a json file that contains the configured values, to host locally within their site, and use to control the behavior of the [OSL Science Page Enhancer](./osl-enhancer.md  "OSL Science Page Enhancer"). 

Changing the values on this editor, will not automatically affect the behavior of a deployed / integrated widget. The respective configuration is not directly served by the OSL infrastructure.