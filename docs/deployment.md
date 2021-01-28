# Deployment example

The following sections present an <b>example</b> setup to deploy and configure the Open Science Lens applications. 

<b>DISCLAIMER</b>: Depending on the environment, needs and scope of the deployment, the following configuration must be <b>revisited</b>.

## Docker config

Docker configuration to setup / connect: 
* OSL API
* OSL WebApp
* MongoDB - A MongoDB instance is expected to be already available externally
* Redis

### docker-compose.yml
```yml
version: "2.4"

services:
  open-science-lens-api:
    image: <DOCKER REGISTRY>open-science-lens-api:1.0.0

  open-science-lens-web-app:
    image: <DOCKER REGISTRY>open-science-lens-web-app:1.0.0

  redis:
    image: redis:6.0.8-alpine
    command: [ "redis-server", "--appendonly", "yes" ]
```

### docker-compose.override.yml
```yml
version: "2.4"

services:
  open-science-lens-api:
    mem_limit: 512M
    restart: unless-stopped
    depends_on:
      - redis
    environment:
      - SERVER_PORT=<PORT>
      - SPRING_PROFILES_ACTIVE=stage
    ports:
      - "<PORT>:<PORT>"
    volumes:
      - ${OSL_VOLUME_ROOT}/config:/config
      - ${OSL_VOLUME_ROOT}/logs:/logs
    networks:
      - opensciencelens-backend-network
      - opensciencelens-redis-network

  open-science-lens-web-app:
    mem_limit: 512M
    restart: unless-stopped
    expose:
      - "<PORT>"
    ports:
      - "<PORT>:<PORT>"
    volumes:
      - ${OSL_VOLUME_ROOT}/widget:/usr/share/nginx/html/widget

  redis:
    mem_limit: 512m
    restart: unless-stopped
    hostname: redis
    expose:
      - "<PORT>"
    volumes:
      - ${OSL_VOLUME_ROOT}/redis1/data:/data
    networks:
      - opensciencelens-redis-network

networks:
  opensciencelens-redis-network:
  opensciencelens-backend-network:
```

## Widget

Hosting the widget assets within the OSL WebApp web server

### ${OSL_VOLUME_ROOT}/widget
```
./logo
./logo/osl_logo_20.png
./logo/osl_logo_24.png
./logo/binoculars_48.png
./logo/osl_logo_16.png
./logo/binoculars_20.png
./logo/osl_logo_128.png
./logo/osl_logo_no_border_20.png
./logo/osl_logo_48.png
./css
./css/osl-popup1.css
./css/osl-badge-popup.css
./css/osl-widget1.css
./css/osl-widget2.css
./css/osl-popup2.css
./open-science-lens-widget.js
```

## OSL API

OSL API configuration

### ${OSL_VOLUME_ROOT}/config
```
./application-stage.yml
./logging
./logging/logback-stage.xml
```

### application-stage.yml
```
server:
  port: <PORT>
  servlet:
    context-path: /

logging:
  config: /config/logging/logback-${spring.profiles.active}.xml

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: <OIDC IDP URL>
          jwk-set-uri: <OIDC IDP URL>/protocol/openid-connect/certs

endpoint:
    publications: http://api.openaire.eu/search/publications
    datasets : http://api.openaire.eu/search/datasets
    software : http://api.openaire.eu/search/software
    other : http://api.openaire.eu/search/other
    projects : http://api.openaire.eu/search/projects

#time-to-live in SECONDS
cache:
    host : redis
    port : <PORT>
    enable-total-cache: false
    redis-cache-name: openaire-redis
    types:
        doi:
          enable-cache: true
          time-to-live: 3600
        keywords:
          enable-cache-full: true
          time-to-live-full: 3600
          enable-cache-split: true
        qualified-term:
          enable-cache-full: true
          time-to-live-full: 3600
          enable-cache-split: true

mongodb:
    host : <HOST>
    port : <PORT>
    database : <DB>
    username: <USER>
    password: <PASS>

auth:
    redirect-uri: <INSTALLATION URL>/osl/home
    redirect-uri-plugin: <INSTALLATION URL>/osl/plugin
    client-id: <OIDC Client ID>
    client-secret: <OIDC Client Secret>
    access-token-url: <OIDC IDP URL>/protocol/openid-connect/token/introspect
    token-endpoint: <OIDC IDP URL>/protocol/openid-connect/token
    user-info-url: <OIDC IDP URL>/protocol/openid-connect/userinfo
```

### logback-stage.xml
```
<configuration debug="true">
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    <!--<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>-->

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOGS}/openScienceLens.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>${LOGS}/openScienceLens-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!-- each archived file, size max 10MB -->
            <maxFileSize>100MB</maxFileSize>
            <!-- total size of all archived files, if total size > 20GB, it will delete old archived file -->
            <totalSizeCap>20GB</totalSizeCap>
            <!-- 60 days to keep -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>

        <encoder>
            <pattern>${FILE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <appender name="AUDIT-LOGGER" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOGS}/auditLogs/openScienceLensAudit.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>${LOGS}/auditLogs/openScienceLensAudit-%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <!-- each archived file, size max 10MB -->
            <maxFileSize>100MB</maxFileSize>
            <!-- total size of all archived files, if total size > 20GB, it will delete old archived file -->
            <totalSizeCap>20GB</totalSizeCap>
            <!-- 60 days to keep -->
            <maxHistory>60</maxHistory>
        </rollingPolicy>

        <encoder>
            <pattern>${FILE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <logger name="eu.openaire.opensciencelens" level="DEBUG" additivity="false">
        <appender-ref ref="FILE"/>
    </logger>

    <logger name="eu.openaire.opensciencelens.utils" level="INFO" additivity="false">
        <appender-ref ref="AUDIT-LOGGER"/>
    </logger>

    <root level="INFO" additivity="false">
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```