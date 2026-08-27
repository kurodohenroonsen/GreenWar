# GreenWar Junior — charte graphique, structure et prompts d'illustrations

Version enfants du site GREENWAR ASBL. Public visé : **8 à 12 ans** (fin de primaire), lecture autonome, accompagnement possible par un parent ou un enseignant. Dossier `enfants/`, autonome, lié au site adulte par le lien « Site des grands ».

## 1. Structure

| Page | Titre | Ce qu'elle raconte | Reprend, côté adultes |
|---|---|---|---|
| `index.html` | La Terre, notre maison | La Terre en 3 nombres · le grand secret (la nature se répare) · les 4 équipes · encart parents/profs | Mission, développement symbiosique, quatre forces |
| `pourquoi.html` | Pourquoi la Terre est fatiguée | Il y a 80 ans (après-guerre) · les 3 géants et leurs 3 envies · le voyage d'un jouet | Diagnostic : trois piliers, trois conquêtes, chaîne de surproduction |
| `agir.html` | Ton super-pouvoir | Acheter c'est voter · 3 inventions (larves, passeport, ferme du futur) · 8 défis à cocher · quiz 4 questions · le club des gardiens | Solutions & action : levier d'achat, filières, rejoindre |

Fil rouge : **Pépin**, une petite pousse (tirée du logo) qui commente dans des bulles « Pépin dit : … ». Les défis sont mémorisés dans le navigateur ; le quiz explique chaque réponse, sans score.

Transpositions de vocabulaire :

| Adultes | Enfants |
|---|---|
| Développement symbiosique / régénératif | « La nature se répare si on l'aide » ; symbiose = l'abeille et la fleur |
| Les trois piliers | Les trois géants (usines, grandes associations, pays) |
| Les trois conquêtes : argent, pouvoir, gloire | Leurs trois envies : argent, gloire, pouvoir |
| Le seul droit d'acheter | Ton super-pouvoir : choisir · « Acheter, c'est voter » |
| Citoyens-Consommateurs (8 milliards) | 8 milliards de personnes qui achètent, toi aussi |
| Sarcomusation, *Hermetia illucens* | Les larves qui mangent les restes |
| Traçabilité cryptographique Ed25519 | Le passeport des objets qu'on ne peut pas falsifier |
| Hub bio-agro-industriel | La ferme du futur |
| Chaîne invisible de la surproduction | Le voyage d'un jouet (travail des enfants évoqué sans détails choquants) |
| Rejoindre l'ASBL | Le club des gardiens de la Terre |

## 2. Charte graphique

**Ton.** Clair, rond, chaleureux. Jamais de noir pur ni de fond sombre : les enfants lisent sur fond clair. Pas de peur, pas de culpabilité : le problème est raconté, mais chaque page se termine par une action possible.

**Couleurs**

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Fond | Feuille pâle | `#f6fbf2` | fond de page |
| Texte | Vert forêt | `#1f3a2c` | titres et texte (jamais #000) |
| Texte secondaire | Mousse | `#4f6a5b` | paragraphes |
| Principal | Feuille | `#2fb36b` | boutons, liens, mots-clés, menu actif |
| Accent chaud | Soleil | `#ffc83d` | boutons secondaires, badges « kicker » |
| Accent froid | Ciel | `#48b5e6` | sections « comment ça marche », quiz |
| Alerte douce | Corail | `#ff7a59` | le problème, les géants (jamais rouge vif) |
| Surprise | Raisin | `#9b7bea` | les équipes, le quiz |

Chaque couleur a une version pastel (`-soft`) pour les fonds de section et de carte. Une section = une couleur de fond maximum, en alternance avec le fond de page.

**Typographie.** Titres en **Baloo 2** (800), ronde et joyeuse ; texte en **Nunito** (400/700), lisible et douce. Corps 18 px minimum, interligne 1,6, lignes de 48 caractères maximum dans les paragraphes principaux. Repli système : Arial Rounded / Segoe UI. Les polices Google ne se chargent pas hors-ligne : le site reste lisible avec le repli.

**Formes.** Coins très arrondis (22 px), boutons en pilule avec une ombre « plateau » de 5 px qui s'enfonce au clic, images avec bordure blanche de 5 px comme une photo collée. Cases à cocher de 28 px, boutons de 48 px minimum : tout est cliquable au doigt.

**Icônes.** Émojis dans des pastilles rondes pour les cartes (🏠 🤝 🏭 🏛️ 💰 🏆 👑) : universels, sans téléchargement. À remplacer par des pictos dessinés dans le même style que les illustrations si vous voulez une identité plus forte.

**Illustrations.** Un seul style pour les 12 images (voir prompts). Aucun texte dans les images. Personnages d'origines variées, filles et garçons à égalité, pas de marques ni de logos réels.

## 3. Prompts d'illustrations (12)

Style commun à coller au début de chaque prompt :

> **STYLE :** Children's picture-book illustration, flat vector with soft grainy texture, rounded friendly shapes, thick clean outlines, warm and bright palette (leaf green #2fb36b, sunny yellow #ffc83d, sky blue #48b5e6, coral #ff7a59, lavender #9b7bea, cream background #f6fbf2), gentle lighting, joyful and reassuring mood, diverse children, no scary elements. Aspect ratio 3:2, 1200×800 minimum. **No text, no letters, no numbers, no logos, no watermark.**

Générer d'abord la mascotte (01), puis la réutiliser comme référence d'image (image-to-image / character reference) pour 06, 07, 09, 12 afin qu'elle reste identique.

### 01 — `01-pepin-mascotte.jpg` · Pépin, la mascotte
Utilisée dans toutes les bulles « Pépin dit ». Prévoir un fond uni pour un détourage rond.
> STYLE + Character design sheet of a cute sprout mascot named Pépin: a small green seedling with two round leaves as arms, a tiny brown seed body, big friendly eyes, a happy smile, standing on a little patch of soil. Front view, centered, plain cream background, plenty of margin around the character.

### 02 — `02-terre-maison.jpg` · La Terre, notre maison (hero accueil)
> STYLE + Planet Earth drawn as a cozy round house floating in a soft blue sky: a little red roof on top, a door and windows on the continents, tiny trees, a whale in the ocean, birds around it, and four children of different origins holding hands around the planet as if hugging it. Fluffy clouds, a smiling sun in the corner.

### 03 — `03-jardin-fatigue.jpg` · Le jardin fatigué (pourquoi)
> STYLE + A wide garden split softly down the middle: the left half lush and blooming with flowers, bees and a bird bath; the right half grey, dry and tired with drooping plants and cracked soil, but not frightening. A thoughtful child with a watering can stands in the middle looking at the tired side, ready to help. Gentle morning light.

### 04 — `04-trois-geants.jpg` · Les trois géants
> STYLE + Three tall, round, clumsy but friendly giants walking through a vegetable garden without looking at their feet: the first wears a factory chimney as a hat and carries bags of coins, the second wears a shiny medal and a big smile, the third wears a small crown and holds a rolled-up scroll. Below them, tiny children point at the flowers they are about to step on. Comic, not scary.

### 05 — `05-voyage-jouet.jpg` · Le voyage d'un jouet
> STYLE + A winding dotted path across a stylised map: it starts at a small workshop under a grey sky on the far left, crosses the sea on a cargo ship, and ends at a bright toy shop with a happy child in front of the window on the right. Along the path, a single toy castle appears at three stages. Bird's-eye view, cheerful colours, the workshop is simply dim and tired, never frightening.

### 06 — `06-terre-se-soigne.jpg` · La nature se répare (accueil)
> STYLE + A hillside coming back to life: on the left a few stumps, then young saplings, then a thriving young forest on the right. Children water the saplings, an earthworm and a mushroom peek out of the rich dark soil in the foreground, birds and a deer return. Pépin the sprout mascot cheers from a rock. Time seems to flow from left to right.

### 07 — `07-quatre-equipes.jpg` · Les quatre équipes
> STYLE + Four friendly characters pulling together on one rope to straighten a leaning young tree: a parent with a child (family), a person with a clipboard and a whistle (association), a person in overalls with a toolbox (business), and a person with a small sash and a fair scale (state). All smiling, all pulling the same direction, the tree already standing up. Pépin the sprout holds the tip of the rope.

### 08 — `08-super-pouvoir-caddie.jpg` · Ton super-pouvoir (hero agir)
> STYLE + A child wearing a small green cape pushes a little shopping cart in a bright market and confidently picks a glowing, shining apple from a wooden crate, while a dull plastic-wrapped item on the other shelf is left behind. Sparkles around the apple, proud pose, a friendly market seller in the background.

### 09 — `09-larves-magiques.jpg` · Les larves qui mangent les restes
> STYLE + A cheerful cutaway of a little wooden box: on top, vegetable peelings and bread crusts fall in; inside, a row of chubby, smiling cream-coloured larvae with tiny eyes happily munch; at the bottom, rich dark soil comes out into a flower pot where a plant blooms, and a happy hen pecks some larvae beside it. A circular arrow of leaves suggests the loop. Cute, never gross.

### 10 — `10-passeport-scan.jpg` · Le passeport des objets
> STYLE + A child holds a smartphone over a red tomato on a market stall; from the tomato rises a friendly floating illustrated card showing a small map path with three stops: a smiling farmer in a field, a little truck, and the market stall. A big green check mark shines above the card. Keep the phone screen blank except for a simple green glow.

### 11 — `11-ferme-du-futur.jpg` · La ferme du futur
> STYLE + An isometric, colourful farm of the future: round glass greenhouses, a small barn with solar panels on the roof, a windmill, a pond, vegetable rows, and clear pipes with little arrows connecting a compost box, a larvae hut and the greenhouses in a loop. A group of children on a school visit follows a farmer. Everything is tidy, sunny and alive, with no chimneys or smoke.

### 12 — `12-club-des-gardiens.jpg` · Le club des gardiens
> STYLE + A group portrait of eight children of different origins and abilities (one in a wheelchair, one with glasses, one with a hijab) standing proudly in front of a young tree they have just planted, each wearing a round green badge with a sprout symbol. Pépin the sprout mascot stands in the front row. Golden afternoon light, hands dirty with soil, big smiles.

## 4. Après génération

1. Enregistrer chaque image en JPEG 1200×800 sous le nom indiqué dans `enfants/assets/imgs/` (les fichiers actuels sont des gabarits à remplacer).
2. Pour 01, détourer la mascotte sur fond transparent et l'enregistrer aussi en `01-pepin-mascotte.png` ; remplacer `.jpg` par `.png` dans les bulles si vous le souhaitez.
3. Vérifier qu'aucune lettre n'est apparue dans les images ; sinon régénérer avec « no text » renforcé.
4. Optionnel : produire des variantes WebP comme sur le site adulte (voir `README.md` à la racine).
