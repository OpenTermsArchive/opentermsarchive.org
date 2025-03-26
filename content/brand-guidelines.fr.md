---
layout: brand-guidelines
hero:
  title: Principes de marque
title: Principes de marque
html_description: Logos, règles de rédaction, police de caractère et styles de titres
slug: principes-de-marque
aliases: /fr/media
---

## Règles de rédaction

### Communes à toutes les langues

- Le nom du produit est « Open Terms Archive ».
- Open Terms Archive est un nom de marque, pas un nom commun. Il n'a pas de déterminant.
- Il est au singulier. Il ne s'agit pas de  « Open Terms Archives ».
- Il comporte des espaces. Il ne s'agit pas de « OpenTermsArchive ».
- À chaque fois que c’est possible, des espaces insécables doivent être utilisés pour séparer les trois mots, afin d'éviter les sauts de ligne au milieu du nom.
-  Si l'abréviation « OTA » peut être utilisée dans les documents et discussions internes, elle n'est pas utilisée publiquement (du moins pas par nous).

### Spécifiques au français

- Open Terms Archive est un nom féminin, car il s'agit de l'archive, la base de données.

### Exemples

Il ne faut **pas écrire** :

```error
OTA permet aux parlementaires de suivre l'application de leurs lois.
L’Open Terms Archive permet aux parlementaires de suivre l'application de leurs lois.
OpenTermsArchive permet aux parlementaires de suivre l'application de leurs lois.
```

Il faut **écrire** :

```success
Open Terms Archive permet aux parlementaires de suivre l'application de leurs lois.
```

## Couleurs

<table>
  <thead>
    <tr>
      <th scope="col" style="width: 160px;">Nom</th>
      <th scope="col" style="width: 120px;">Code (Hex)</th>
      <th scope="col">Couleur</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Primary</b></td>
      <td>#2d63ff</td>
      <td style="background-color: var(--colorPrimary);"></td>
    </tr>
    <tr>
      <td><b>Primary 300</b></td>
      <td class="">#c5d9ff</td>
      <td style="background-color: var(--colorPrimary300);"></td>
    </tr>
    <tr>
      <td><b>Secondary</b></td>
      <td>#0b08a0</td>
      <td style="background-color: var(--colorSecondary);"></td>
    </tr>
    <tr>
      <td><b>Black 900</b></td>
      <td>#010613</td>
      <td style="background-color: var(--colorBlack900);"></td>
    </tr>
    <tr>
      <td><b>Black 850</b></td>
      <td>#171717</td>
      <td style="background-color: var(--colorBlack850);"></td>
    </tr>
    <tr>
      <td><b>Black 800</b></td>
      <td>#333333</td>
      <td style="background-color: var(--colorBlack800);"></td>
    </tr>
    <tr>
      <td><b>Black 700</b></td>
      <td>#454545</td>
      <td style="background-color: var(--colorBlack700);"></td>
    </tr>
    <tr>
      <td><b>Black 600</b></td>
      <td>#5e5e5e</td>
      <td style="background-color: var(--colorBlack600);"></td>
    </tr>
    <tr>
      <td><b>Black 400</b></td>
      <td>#999999</td>
      <td style="background-color: var(--colorBlack400);"></td>
    </tr>
    <tr>
      <td><b>Black 300</b></td>
      <td>#d6d6d6</td>
      <td style="background-color: var(--colorBlack300);"></td>
    </tr>
    <tr>
      <td><b>Black 200</b></td>
      <td>#f5f5f5</td>
      <td style="background-color: var(--colorBlack200);"></td>
    </tr>
    <tr>
      <td><b>Black 100</b></td>
      <td>#fafafa</td>
      <td style="background-color: var(--colorBlack100);"></td>
    </tr>
    <tr>
      <td><b>White</b></td>
      <td>#fefffd</td>
      <td style="background-color: var(--colorWhite);"></td>
    </tr>
    <tr>
      <td><b>Tertiary</b></td>
      <td>#f9dd3f</td>
      <td style="background-color: var(--colorTertiary);"></td>
    </tr>
    <tr>
      <td><b>Error</b></td>
      <td>#ec368d</td>
      <td style="background-color: var(--colorError);"></td>
    </tr>
    <tr>
      <td><b>Success</b></td>
      <td>#11ebc3</td>
      <td style="background-color: var(--colorSuccess);"></td>
    </tr>
  </tbody>
</table>

## Police

### Inter

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper, ligula sed imperdiet volutpat, erat nibh dapibus ex, vitae tincidunt mauris lectus id nisi. Nullam auctor est sit amet urna tincidunt ullamcorper. Fusce malesuada gravida fermentum. Nulla tristique convallis semper.

```
font-family: Inter, sans-serif;
font-weight: normal;
```

### Inter bold

<p class="font__inter--bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper, ligula sed imperdiet volutpat, erat nibh dapibus ex, vitae tincidunt mauris lectus id nisi. Nullam auctor est sit amet urna tincidunt ullamcorper. Fusce malesuada gravida fermentum. Nulla tristique convallis semper.</p>

```
font-family: Inter, sans-serif;
font-weight: bold;
```

### Inter thin

<p class="font__inter--thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper, ligula sed imperdiet volutpat, erat nibh dapibus ex, vitae tincidunt mauris lectus id nisi. Nullam auctor est sit amet urna tincidunt ullamcorper. Fusce malesuada gravida fermentum. Nulla tristique convallis semper.</p>

```
font-family: Inter, sans-serif;
font-weight: 300;
```

## Styles de titres

# Titre 1 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 80px;
font-weight: bold;
line-height: 1.25;
color: #010613;
letter-spacing: -1.5px;
```

## Titre 2 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 61px;
font-style: normal;
font-weight: bold;
line-height: 1.4;
color: #010613;
letter-spacing: -0.4px;
```

## Titre 2 thin {.mb--s .h2--thin}
```
font-weight: normal;
```

## Titre 2 ultra thin {.mb--s .h2--ultrathin}
```
font-weight: 300;
```

### Titre 3 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 48px;
font-style: normal;
font-weight: bold;
line-height: 1.4;
color: #010613;
letter-spacing: -0.4px;
```

### Titre 3 thin {.mb--s .h3--thin}
```
font-weight: normal;
```

### Titre 3 ultra thin {.mb--s .h3--ultrathin}
```
font-weight: 300;
```

#### Titre 4 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 38px;
font-style: normal;
font-weight: bold;
line-height: 1.4;
color: #010613;
letter-spacing: -0.4px;
```

#### Titre 4 thin {.mb--s .h4--thin}
```
font-weight: normal;
```

#### Titre 4 ultra thin {.mb--s .h4--ultrathin}
```
font-weight: 300;
```

##### Titre 5 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 32px;
font-style: normal;
font-weight: bold;
line-height: 1.4;
color: #010613;
letter-spacing: -0.2px;
```

##### Titre 5 thin {.mb--s .h5--thin}
```
font-weight: normal;
```

##### Titre 5 ultra thin {.mb--s .h5--ultrathin}
```
font-weight: 300;
```

###### Titre 6 {.mb--s}
```
font-family: Inter, sans-serif;
font-size: 29px;
font-style: normal;
font-weight: bold;
line-height: 1.25;
color: #010613;
letter-spacing: 0;
```

###### Titre 6 thin {.mb--s .h6--thin}
```
font-weight: normal;
```

###### Titre 6 ultra thin {.mb--s .h6--ultrathin}
```
font-weight: 300;
```

## Crédits

Merci aux [auteur·trices du projet Inter](https://github.com/rsms/inter) pour la police de caractères et aux [contributeur·trices de Lucide](https://lucide.dev) pour les icônes.
