---
title: Datenqualität
---

Einige Eigenschaften der Metadaten eines Datensatzes können automatisch auf ihre Qualität geprüft werden - beispielsweise, ob Kontaktinformationen hinterlegt sind oder bei bestimmten Feldern das korrekte EU-Vokabular verwendet wurde. Viele dieser automatisch überprüfbaren Konventionen sind im [DCAT-AP.de-Konventionenhandbuch](https://www.dcat-ap.de/def/dcatde/2.0/implRules/) spezifiziert.

Die folgende Liste an Beispielen soll diese Konventionen um ein paar Tipps ergänzen und etwas greifbarer machen.

## Allgemein

Als Faustregeln können folgende Hinweise genutzt werden.

- **Keine Abkürzungen oder interne Bezeichnungen.** Diese bieten für die meisten Nutzer keinen Mehrwert.
- **Keine redundanten Informationen.** Für viele Informationen gibt es spezielle Metadatenfelder; beispielsweise gibt es für ortsbezogene Informationen Felder für die veröffentlichende Stelle, den Datenbereitsteller sowie den Raumbezug. Diese brauchen daher nicht im Titel, den Schlagwörtern oder der Beschreibung wiederholt werden.

## Titel

Der Titel eines Datensatzes ist vermutlich die wichtigste Eigenschaft, um die Auffindbarkeit des Datensatzes zu gewährleisten. Deswegen ist es beim Titel besonders wichtig, dass dieser gewisse Regeln einhält.

- Keine Abkürzungen oder interne Bezeichnungen.
- Keine Ortsinformationen, die über andere Metadaten-Felder wie die veröffentlichende Stelle, den Datenbereitsteller oder den Raumbezug hinterlegt werden können.
- Wenn möglich keine Zeitinformationen - gibt es denselben Satz für verschiedene Jahre, so sollten diese wenn möglich als ein Datensatz mit einer Datei/Distribution pro Jahr veröffentlicht werden. Für komplexere Datensätze kann beispielsweise pro Jahr ein Datensatz angelegt und über das Zeitbezug-Metadatenfeld das jeweilige Jahr angegeben werden.

{% positive %}[Verkehrszeichen](https://www.govdata.de/web/guest/suchen/-/details/verkehrszeichenbbd18){% /positive %}

{% negative %}[Biotope, geschützte Biotope (§ 30 BNatSchG und § 18 BbgNatSchAG) und FFH-Lebensraumtypen im Land Brandenburg](https://www.govdata.de/web/guest/suchen/-/details/biotope-geschutzte-biotope-30-bnatschg-und-18-bbgnatschag-und-ffh-lebensraumtypen-im-land-brand4e134) (besser: "Biotope und FFH-Lebensraumtypen", Land Brandenburg als Raumbezug und Rechtstext in die Beschreibung){% /negative %}

## Schlagwörter

Schlagwörter funktionieren dann am besten, wenn sie von ähnlichen Datensätze verschiedener Quellen benutzt werden. Der [Musterdatenkatalog](/kfod/mdk) gibt hier für Musterdatensätze einige Beispiele für Schlagwörter, die häufiger benutzt wurden.

- Keine Tags ohne Mehrwert (`open-data`, `datenkatalog` - weglassen)
- Keine Tags für den Ortsbezug (`ennepe-ruhr-kreis`, `andernach` - weglassen)
- Keine Tags mit Abkürzungen (`b-plan`, `gaa` - weglassen oder ausschreiben `bebauungsplan`)
- Singular verwenden (`bebauungsplan` statt `bebauungspläne`)
- Keine überflüssigen Prefixe oder Suffixe (weglassen - `gebäude` statt `gebäude-datenbank`)