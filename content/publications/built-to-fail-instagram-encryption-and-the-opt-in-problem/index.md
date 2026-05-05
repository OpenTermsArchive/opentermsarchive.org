---
title: "Built to fail: Instagram, encryption, and the opt-in problem"
html_description: "Meta is ending end-to-end encryption on Instagram DMs, citing low adoption. But when a privacy feature is opt-in and hard to find, low uptake is a design outcome, not a signal of demand: privacy built as an add-on is privacy built to be removed."
author: Asma Sifaoui
topic: ["Privacy and Surveillance"]
date: 2026-05-05
---

[Meta announced in March 2026 that end-to-end encryption (E2EE) for Instagram direct messages would be discontinued as of May 8, 2026](https://help.instagram.com/491565145294150), citing low user adoption.

## The adoption argument does not hold

Meta's spokesperson stated that "very few people were opting in to end-to-end encrypted messaging in DMs, so we're removing this option" ([Engadget, March 2026](https://www.engadget.com/social-media/meta-is-killing-end-to-end-encryption-in-instagram-dms-195207421.html)). What this account omits is that Instagram's E2EE was opt-in, non-default, and available only in select regions; implementation conditions that structurally suppress uptake regardless of user preference. Low adoption under those conditions is an expected outcome of design choices, not an independent signal of demand. Using it as the primary justification for removal conflates the two.

The contrast with WhatsApp is instructive. E2EE has been the default there since 2016 ([WhatsApp Help Center](https://faq.whatsapp.com/820124435853543)), and removal is neither technically straightforward nor politically viable. On Instagram, where encryption was always peripheral, discontinuation cost Meta a spokesperson statement. That asymmetry is a direct consequence of how each feature was implemented. 

## The decision sits within a broader context

Three factors beyond adoption are relevant to a complete account of this decision.

*Prior commitments.* In 2019, Zuckerberg publicly committed to making encrypted, private communication the future of Meta's products ([Zuckerberg, Facebook, March 2019](https://about.fb.com/news/2019/03/vision-for-social-networking/)). Internal documents from New Mexico litigation subsequently revealed that senior executives privately disputed whether that commitment was operationally feasible, with the head of content policy warning that Zuckerberg was making "gross misstatements of our ability to conduct safety operations" under E2EE ([New Mexico v. Meta Platforms, Inc., reported by Platformer](https://www.platformer.news/instagram-encryption-meta-whatsapp/)). The public commitment and the internal position were not aligned.

*Regulatory timing.* The TAKE IT DOWN Act, signed in May 2025, requires platforms to remove non-consensual intimate imagery within 48 hours of a valid request, with compliance obligations taking effect May 19, 2026,  eleven days after Instagram's encryption cutoff ([TAKE IT DOWN Act, Pub. L. No. 119, May 2025](https://www.congress.gov/bill/119th-congress/senate-bill/146)). E2EE is structurally incompatible with the proactive content scanning that is effectively required. Whether the timing is deliberate is not established, but the overlap is material.

*Commercial considerations.* In December 2025, Meta disclosed that interactions with its AI tools in private conversations may inform targeted advertising ([Meta Privacy Policy, December 2025, reported by Proton](https://proton.me/blog/instagram-end-to-end-encryption)). After May 8, Meta regains the ability to scan DM content, run automated moderation, and respond to law enforcement requests,  capabilities E2EE had precluded ([Platformer, March 2026](https://www.platformer.news/instagram-encryption-meta-whatsapp/)).

## Implications for platform governance

The concerns raised against encryption are worth taking seriously. Law enforcement and child safety organisations have long argued that encrypted messaging makes it harder to detect abuse, and Meta's own internal analysis projected that default E2EE could reduce abuse reporting to NCMEC by around 65% ([New Mexico v. Meta Platforms, Inc., internal documents reported by Platformer, March 2026](https://www.platformer.news/instagram-encryption-meta-whatsapp/) reported by [Reuters, February 2026](https://www.investing.com/news/stock-market-news/meta-executive-warned-facebook-messenger-encryption-plan-was-so-irresponsible-shows-court-filing-4520447)). These are genuine trade-offs, not talking points. But removing encryption from Instagram does not make those problems go away. It just means Meta can see what is being sent. That is not the same as stopping harm.

The deeper issue is about how platforms make privacy commitments in the first place. When a privacy feature is optional and hard to find, almost nobody uses it. And when almost nobody uses it, it becomes easy to remove, as there is no public outcry, no political cost, no data to defend. That is not a coincidence: it is what happens when privacy is treated as an add-on rather than a foundation.

The lesson for anyone watching platforms on privacy is simple: ask whether a feature is on by default. If it is, it is real. If it requires users to go looking for it, it is fragile, and this particular case shows exactly how that fragility plays out when conditions change.
