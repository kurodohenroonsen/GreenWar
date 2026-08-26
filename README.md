# GREENWAR ASBL — site vitrine

Site statique, sans dépendance ni build : ouvrir `index.html` suffit (fonctionne hors-ligne, depuis une clé USB).

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | La mission — manifeste, constat, modèle symbiosique, quatre forces |
| `analyse-des-piliers.html` | Le diagnostic — critique des trois piliers et des trois conquêtes |
| `action-symbiosique.html` | Solutions & action — levier d'achat, filières, rejoindre l'ASBL |
| `galerie-illustrations.html` | Coulisses — toutes les illustrations avec leur prompt (`noindex`) |

## Structure

```
assets/css/style.css   design system (tokens, composants, thèmes, responsive)
assets/js/app.js       navigation mobile + panneau d'accessibilité
assets/imgs/           *.jpg (secours) + *.webp (1376 px) + *-800.webp (mobile)
captures/              captures d'écran desktop / mobile de référence
RAPPORT-IMAGES.md      audit des visuels et prompts de remplacement
```

## Conventions

- Aucun style inline : tout passe par les classes de `style.css` (`.section`, `.feature`, `.card`, `.callout`, `.cta-band`…).
- Les images passent par `<picture>` avec `width`/`height` renseignés et `loading="lazy"` hors hero.
- Trois thèmes : sombre (défaut), clair, contraste élevé. Le choix est mémorisé en `localStorage` et appliqué avant le premier rendu (script dans `<head>`) pour éviter le flash.
- Le texte de tous les `alt` est une description en français, jamais un prompt.

## Régénérer les variantes WebP

```
python3 -c "from PIL import Image;import glob;[ (lambda im,b:(im.save(b+'.webp','WEBP',quality=78,method=6),im.resize((800,int(800*im.height/im.width))).save(b+'-800.webp','WEBP',quality=76,method=6)))(Image.open(f).convert('RGB'),f[:-4]) for f in glob.glob('assets/imgs/*.jpg') if 'logo' not in f]"
```
