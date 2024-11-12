---
title: Open Terms Archive
html_description: Open Terms Archive publicly records every version of the terms of digital services to enable democratic oversight.
hero:
  anchor: mission-statement
  title: <span>Big Tech services benefit from the opaqueness of their terms.</span><br />We make them transparent.
  subtitle: Open Terms Archive publicly records every version of the terms of digital services to enable democratic oversight.
  link: "[Discover how that makes a difference →]({{< relref path=\"/impact\" >}})"
collections:
  title: Featured collections
  subtitle: We establish partnerships and structure them in collections to track the terms of many industries, in several languages and jurisdictions.
reuses:
  title: Built with Open Terms Archive
  subtitle: Tools created by the community to shift the power balance from big tech towards end users.
how_it_works:
  title: How it works
  step1:
    title: 1. Targeting
    subtitle: The terms of use of a service are targeted by contributors.
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
    title: 2. Tracking
    subtitle: Several times a day, our robots download and publicly archive the targeted documents.
    exemple: |
      2024-02-22 06:31:03: Record new changes of Facebook Terms of Service with id a2f5b02
      2024-01-18 08:26:12: Record new changes of Facebook Privacy Policy with id b091d16
  step3:
    title: 3. Analysing
    subtitle: When changes are spotted, they are recorded and exposed for human analysts.
    exemple: "Face recognition: If you have it turned on, we use face recognition technology to recognise you in photos, videos and camera experiences. The face recognition templates that we create <del class=\"code--removed\">may constitute</del><ins class=\"code--added\">are</ins> data with special protections under <del class=\"code--removed\">the laws of you country</del><ins class=\"code--added\">EU Law</ins>."
  step4:
    title: 4. Disseminating
    subtitle: We publish all versions in datasets enabling reuse and research.
    exemple: |
      ↳ 📂 Facebook
        ↳ 📂 Privacy Policy
            📄 2024-04-14T12-31-35Z.md
            📄 2024-03-21T00-12-06Z.md
            📄 2024-02-19T00-26-02Z.md
            📄 2024-02-03T14-59-59Z.md
        ↳ 📂 Terms of Service
            📄 2024-01-12T18-23-40Z.md
            📄 2023-12-19T00-36-37Z.md
            📄 2023-09-26T15-01-48Z.md
            📄 2023-04-25T06-34-24Z.md
---
