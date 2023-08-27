---
title: Was ist Open Data?
---

Eine offizielle Definition von Open Data gibt es nicht, das Transparenzportal von Bremen fasst es aber gut zusammen:

> Daten sind offen, wenn sie durch jedermann und für jegliche Zwecke weiterverwendet und weiterverbreitet werden können {% see no=1 / %}.

## Prinzipien Open Data

Als etabliert gelten die sogenannten 10 Prinzipien für Open Data, die ursprünglich von der Sunlight Foundation veröffentlicht wurden {% see no=2 / %}. Adaptiert für Kommunen lassen sich diese zusammenfassen:

### Primärdaten

Daten sind so vollständig wie möglich zu veröffentlichen. Sie werden im höchstmöglichen Feinheitsgrad gesammelt/veröffentlicht und nicht in aggregierten oder modifizierten Formen.

{% positive %}Veröffentlichung des Landschaftsmodells auf höchster verfügbarer Detailstufe{% /positive %}

{% negative %}Veröffentlichung des Landschaftsmodells nur im Maßstab 1:250.000{% /negative %}

### Aktualität

Daten werden so bald wie möglich nach ihrer Erhebung veröffentlicht. Veröffentlichte Daten werden versioniert und nicht gelöscht.

{% positive %}Veröffentlichung aller verfügbaren Ausgaben des Amtsblatts{% /positive %}

{% negative %}Veröffentlichung des Amtsblatts auf das aktuelle Jahr beschränkt{% /negative %}

### Zugänglichkeit

Daten sollten jederzeit von jeder Person so einfach wie möglich bezogen werden können. Insbesondere ist keine Anmeldung oder Zahlung erforderlich.

### Maschinenlesbarkeit

Daten sollten wann immer möglich in Formaten veröffentlicht werden, die maschinenlesbar sind.

{% positive %}Veröffentlichung in offenen Formaten wie CSV oder JSON{% /positive %}

{% negative %}Veröffentlichung tabellarischer Daten als PDF{% /negative %}

### Lizenzierung

Daten werden ohne Restriktionen oder Auferlegung von Nutzungsbedingungen veröffentlicht. Hierfür werden existierende offizielle Lizenzen verwendet (z.B. Datenlizenz Deutschland - Zero {% see no=3 / %}).

{% callout title="Hinweis!" %}
[OpenStreetMap](https://www.openstreetmap.org/) ist nicht mit [`dl-de/by-2-0`](https://www.govdata.de/dl-de/by-2-0) (Datenlizenz Deutschland - Namensnennung) kompatibel {% see no=4 / %}. Für Geodaten ist daher `dl-de/zero-2-0` empfehlenswert. Alternativ kann für OpenStreetMap eine explizite Ausnahme eingeräumt werden (siehe z.B. Geodatenzentrum BKG {% see no=5 / %}).
{% /callout %}

---

## Verweise

{% ref no=1 %}[Transparenzportal Bremen](https://www.transparenz.bremen.de/hilfe-infos/hilfe-fuer-anwenderinnen-und-anwender-des-transparenzportals/hilfe-allgemein/offene-daten-3588){% /ref %}
{% ref no=2 %}[Sunlight Foundation - Open Data Principles](https://sunlightfoundation.com/policy/documents/ten-open-data-principles/){% /ref %}
{% ref no=3 %}[`dl-de/zero-2-0`](https://www.govdata.de/dl-de/zero-2-0){% /ref %}
{% ref no=4 %}[Rechtliches Kurzgutachten open.nrw](https://open.nrw/system/files/media/document/file/opennrw_rechtl_gutachten_datenlizenzen_lowres_web.pdf){% /ref %}
{% ref no=5 %}[Geodatenzentrum BKG - Ergänzung zu `dl-de/by-2-0`](https://sg.geodatenzentrum.de/web_public/gdz/lizenz/deu/Datenlizenz_Deutschland_Erg%C3%A4nzungstext_Namensnennung.pdf){% /ref %}