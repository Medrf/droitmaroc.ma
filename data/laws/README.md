# Guide d'ajout d'articles de loi | دليل إضافة مواد القانون

## Structure des fichiers

```
data/laws/
├── constitution.json          # دستور 2011
├── code_penal.json            # القانون الجنائي
├── code_travail.json          # مدونة الشغل
├── code_famille.json          # مدونة الأسرة
├── code_commerce.json         # مدونة التجارة
├── code_procedure_penale.json # قانون المسطرة الجنائية
└── doc.json                   # قانون الالتزامات والعقود
```

## Format d'un article

Chaque article doit suivre ce format JSON :

```json
{
  "number": 123,
  "text_fr": "Le texte complet de l'article en français",
  "text_ar": "النص الكامل للمادة بالعربية",
  "keywords": ["mot-clé1", "كلمة1", "mot-clé2", "كلمة2"]
}
```

## Comment ajouter un nouvel article

### Option 1 : Modifier directement le fichier JSON

1. Ouvrez le fichier du code concerné (ex: `data/laws/code_penal.json`)
2. Ajoutez l'article dans le tableau `articles` :

```json
{
  "articles": [
    // ... articles existants ...
    {
      "number": 999,
      "text_fr": "Votre nouveau texte...",
      "text_ar": "النص الجديد...",
      "keywords": ["keyword", "كلمة"]
    }
  ]
}
```

### Option 2 : Créer un nouveau code

Créez un nouveau fichier JSON dans `data/laws/` avec cette structure :

```json
{
  "code_id": "nouveau_code",
  "code_name_fr": "Nom du code en français",
  "code_name_ar": "اسم المدونة بالعربية",
  "total_articles": 100,
  "source": "Dahir n° X-XX-XXX du JJ/MM/AAAA",
  "articles": [
    {
      "number": 1,
      "text_fr": "Premier article...",
      "text_ar": "المادة الأولى...",
      "keywords": ["keyword1", "كلمة1"]
    }
  ]
}
```

## Bonnes pratiques

1. **Mots-clés bilingues** : Toujours inclure des mots-clés en français ET en arabe
2. **Mots-clés pertinents** : Choisir des termes que les utilisateurs rechercheront
3. **Texte exact** : Copier le texte officiel du Bulletin Officiel
4. **Sources officielles** :
   - SGG : https://www.sgg.gov.ma
   - ADALA : https://adala.justice.gov.ma
   - Legifrance Maroc : https://www.legifrance.gouv.fr (historique)

## Statistiques actuelles

| Code | Articles chargés | Total officiel |
|------|------------------|----------------|
| Constitution | ~40 | 180 |
| Code Pénal | ~23 | 612 |
| Code du Travail | ~18 | 589 |
| Code de la Famille | ~18 | 400 |
| Code de Commerce | ~13 | 734 |
| D.O.C | ~21 | 1250 |
| Code de Procédure | ~16 | 757 |

## API Endpoints

- GET `/api/search?q=vol` - Recherche
- GET `/api/search?q=vol&code=code_penal` - Recherche dans un code
- GET `/api/search?stats=true` - Statistiques
- GET `/api/search?codes=true` - Liste des codes
