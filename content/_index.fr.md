---
title: Open Terms Archive
html_description: Open Terms Archive enregistre publiquement chaque version des conditions d'utilisation des services en ligne pour en permettre le contrôle démocratique.
aliases:
  - /fr/accessibilite/
hero:
  anchor: mission
  title: <span>Les Big Tech bénéficient de l'opacité de leurs conditions d'utilisation.</span><br /> Nous les rendons transparentes.
  subtitle: Open Terms Archive enregistre publiquement chaque version des conditions d'utilisation des services en ligne pour en permettre le contrôle démocratique.
  link: "[Découvrez comment →]({{< relref path=\"/impact\" >}})"
collections:
  title: Les collections sont créées par des groupes ayant un intérêt commun pour les conditions d'utilisation de services dans des industries, langues et juridictions spécifiques. En voici quelques exemples.
reuses:
  title: Construit avec Open Terms Archive
  subtitle: Des outils créés par la communauté pour rééquilibrer le rapport de force face aux grandes plateformes numériques.
how_it_works:
  title: Fonctionnement
  step1:
    title: 1. Ciblage
    subtitle: Plusieurs fois par jour, nos robots téléchargent et archivent publiquement les documents ciblés.
    exemple: |
      {
        "name": "Facebook",
        "terms": {
          "Terms of Service": {
            "fetch": "https://facebook.com/legal/terms",
            "select": "body > article > .main_content"
          },
          "Privacy Policy": {
            "fetch": "https://facebook.com/privacy",
            "select": "div > .fb_content"
          }
        }
      }
  step2:
    title: 2. Suivi
    subtitle: Plusieurs fois par jour, nos robots téléchargent et archivent publiquement les documents ciblés.
    exemple: |
      2024-02-22 06:31:03: Record new changes of Facebook Terms of Service with id a2f5b02
      2024-01-18 08:26:12: Record new changes of Facebook Privacy Policy with id b091d16
  step3:
    title: 3. Analyse
    subtitle: Lorsque des modifications sont repérées, elles sont enregistrées et exposées pour analyse humaine.
    exemple: "Reconnaissance faciale : si vous l'avez activée, nous utilisons la technologie de reconnaissance faciale pour vous reconnaître sur les photos et les vidéos. Les modèles de reconnaissance faciale que nous créons <del class=\"code--removed\">peuvent constituer</del><ins class=\"code--added\">sont</ins> des données bénéficiant de protections spéciales en vertu <del class=\"code--removed\">des lois de votre pays</del><ins class=\"code--added\">de la législation européenne</ins>."
  step4:
    title: 4. Diffusion
    subtitle: Nous publions toutes les versions dans des jeux de données pour soutenir leur réutilisation et la recherche.
    exemple: |
      ↳ 📂 Facebook
        ↳ 📂 Privacy Policy
            📄 2024-04-14T12-31-35Z.md
            📄 2024-03-21T00-12-06Z.md
            📄 2024-02-19T00-26-02Z.md
            📄 2024-02-03T14-59-59Z.md
        ↳ 📂 Terms of Service
            📄 2024-01-12T18-30-05Z.md
            📄 2023-12-19T10-14-19Z.md
            📄 2023-09-26T00-30-04Z.md
            📄 2023-04-25T18-30-06Z.md
---
