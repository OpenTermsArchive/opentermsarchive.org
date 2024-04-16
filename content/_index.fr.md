---
title: Open Terms Archive
html_description: Open Terms Archive enregistre publiquement chaque version des conditions d'utilisation des services en ligne pour en permettre le contrôle démocratique.
hero:
  title: <span>Les Big Tech bénéficient de l'opacité de leurs conditions d'utilisation.</span><br /> Nous les rendons transparentes.
  subtitle: Open Terms Archive enregistre publiquement chaque version des conditions d'utilisation des services en ligne pour en permettre le contrôle démocratique.
  link: "[Découvrez comment →]({{< relref path=\"/impact\" >}})"
collections:
  title: Nous établissons des partenariats pour suivre les conditions d'utilisation de nombreuses industries, dans plusieurs langues et juridictions
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
        "documents": {
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
      2024-01-18 08:26.12: Record new changes of Facebook Privacy Policy with id b091d16
  step3:
    title: 3. Analyse
    subtitle: Lorsque des modifications sont repérées, elles sont enregistrées et exposées pour analyse humaine.
    exemple: "Reconnaissance faciale : si vous l'avez activé, nous utilisons la technologie de reconnaissance faciale pour vous reconnaître sur les photos, les vidéos et les expériences de l'appareil photo. Les modèles de reconnaissance faciale que nous créons <span class=\"code--removed\">peuvent constituer</span><span class=\"code--added\">sont</span> des données bénéficiant de protections spéciales en vertu <span class=\"code--removed\">des lois de votre pays</span><span class=\"code--added\">de la législation européenne</span>."
  step4:
    title: 4. Diffusion
    subtitle: Nous publions toutes les versions dans des jeux de données pour soutenir leur réutilisation et la recherche.
    exemple: |
      ↳ 📂 Facebook
        ↳ 📂 Privacy Policy
            📄 2024-02-20--31-15.md
            📄 2023-12-05--25-25.md
            📄 2023-10-17--18-23.md
            📄 2023-10-31--07-23.md
        ↳ 📂 Terms of Service
            📄 2024-03-12--30-16.md
            📄 2024-01-20--15-42.md
            📄 2023-12-08--26-16.md
            📄 2023-12-26--01-16.md
---
