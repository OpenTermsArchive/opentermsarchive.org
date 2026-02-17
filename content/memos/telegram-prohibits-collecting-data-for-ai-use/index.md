---
html_description: Telegram prohibits data scraping for AI use, targeting all users, businesses, and third-party services accessing the platform, including via developer APIs.
title: Telegram prohibits collecting data for AI use
service: Telegram
terms_types: ["Terms of Service", "Developer Terms"]
dates: ["2026-02-03"]
author: ["tam kien duong"]
related_collections: ["vlopses-us", "pga"]
---

Telegram [added](https://github.com/OpenTermsArchive/vlopses-us-versions/commit/f9660a25976c8004851087560a33412cd2854f3f) a warning against data scraping that applies to ‘all users, businesses, and third-party services accessing the platform’. The text refers to the *Content Licensing and AI Scraping Terms* which explicitly [targets](https://telegram.org/tos/content-licensing) data acquisition to ‘train, fine-tune, validate or otherwise engage in the development, enhancement, benchmarking or deployment of artificial intelligence, machine learning models and similar technologies’.

[Telegram](https://en.wikipedia.org/wiki/Telegram_\(software\)) is a messaging app founded by Pavel Durov and his brother Nikolai. It was marketed as a privacy-focused and secure app. However, this change also serves as a reminder that [group chats are not end-to-end encrypted](https://www.eff.org/deeplinks/2024/08/french-detention-why-were-watching-telegram-situation-closely). For example, bot developers [can access](https://core.telegram.org/bots/api#getupdates) chat histories and ongoing conversations in order to provide their services. Chatbots can use user interactions to gather data and improve their services in a way that is indirectly related to the user (such as training data and fine-tuning). This may lead to the unintentional disclosure of sensitive information further along the AI pipeline. Despite security concerns and the availability of [official alternatives](https://interoperable-europe.ec.europa.eu/collection/open-source-observatory-osor/news/france-officials-use-open-source-alternative-olvid), Telegram was notoriously popular with [French officials](https://www.politico.eu/article/telegram-pavel-durov-arrest-emmanuel-macron-france-social-media/).

A similar modification has also been [detected](https://github.com/OpenTermsArchive/pga-versions/commit/52d1e90047a0fe83107347d04f508ad40b7debce) in the *developer terms*.
