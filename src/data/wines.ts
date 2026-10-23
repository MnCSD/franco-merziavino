import type { Wine } from '@/types/wine';

/**
 * Single source of truth for the catalogue (generated from the design's wines.js — 64 wines that have both a data sheet and a bottle photo).
 * Add a wine: append an object here and drop its bottle PNG (transparent background)
 * into /public/images/bottles/<slug>.png (`npm run dev`/`build` turn it into the WebP the site serves). Set `featured: true` to include it in the
 * home-page hero ring and collection story. `body: 0` = no body rating on the data sheet.
 * Every `en` field holds English copy; the headline `award` string is Greek and is
 * translated for English pages in lib/wines.ts.
 */
export const WINES: Wine[] = [
  {
    "slug": "bacio-della-luna",
    "short": "Bacio della Luna",
    "name": "Bacio della Luna Prosecco Conegliano Valdobbiadene DOCG Extra Brut",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOCG",
    "grapes": "Glera",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "featured": true,
    "notes": {
      "el": "",
      "en": ""
    },
    "pairsShort": {
      "el": "",
      "en": ""
    },
    "profile": {
      "el": "",
      "en": ""
    },
    "pairing": {
      "el": "",
      "en": ""
    },
    "awards": []
  },
  {
    "slug": "fiano",
    "short": "Fiano",
    "name": "Fiano del Salento",
    "maker": "Masso Antico",
    "type": "white",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Fiano",
    "abv": "13,5%",
    "serve": "10–12°C",
    "body": 2,
    "pairings": [
      "fish",
      "cheese",
      "white"
    ],
    "featured": true,
    "notes": {
      "el": "Φρούτα, αμύγδαλο, εσπεριδοειδή, τροπικές νότες",
      "en": "Fruit, almond, citrus, tropical notes"
    },
    "pairsShort": {
      "el": "Οστρακοειδή, ελαφριές σάλτσες, τυριά, sushi",
      "en": "Shellfish, light sauces, cheeses, sushi"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με κομψά αρώματα από φρούτα και αμύγδαλα, εσπεριδοειδή και τροπικές νότες, φρέσκο στο στόμα και αρμονικό, με μακρά και ευχάριστη επίγευση.",
      "en": "Straw yellow with elegant aromas of fruit and almond, citrus and tropical notes. Fresh and harmonious on the palate with a long, pleasant finish."
    },
    "pairing": {
      "el": "Συνδυάζεται τέλεια με όλα τα πιάτα, ιδανικό με ωμά ή μαγειρεμένα οστρακοειδή, ελαφριές σάλτσες και τυριά. Τέλειο με πιάτα σούσι.",
      "en": "Pairs with almost any dish; ideal with raw or cooked shellfish, light sauces and cheeses. Perfect with sushi."
    },
    "making": {
      "el": "Η συλλογή γίνεται με το χέρι και τα σταφύλια τοποθετούνται σε μικρά ξύλινα τελάρα. Στο κελάρι, μέρος της συγκομιδής ξηραίνεται σε ελεγχόμενο περιβάλλον θερμοκρασίας και υγρασίας για να ενισχυθούν τα επίπεδα σακχάρου και τα αρώματα. Η οινοποίηση γίνεται σε ανοξείδωτες δεξαμενές και μέρος του κρασιού παλαιώνει για 3 μήνες σε δρύινα βαρέλια. Στη συνέχεια αναμειγνύονται τα δύο μείγματα, δίνοντας πολυπλοκότητα και δομή.",
      "en": "Hand-harvested into small wooden crates. Part of the harvest is dried in a temperature- and humidity-controlled room to concentrate sugars and aromas. Fermented in stainless steel; part of the wine ages 3 months in oak before the two are blended for complexity and structure."
    },
    "award": "Luca Maroni 97",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "97 βαθμοί",
          "en": "97 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      },
      {
        "who": "IWC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "amicone",
    "short": "Amicale Bianco",
    "name": "Amicale Bianco Veneto IGT",
    "maker": "Amicale – Cantine di Ora",
    "type": "white",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "IGT",
    "grapes": "Chardonnay, Pinot Bianco, Gewürztraminer",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 3,
    "pairings": [
      "aperitif",
      "fish",
      "white"
    ],
    "featured": true,
    "notes": {
      "el": "Τροπικά φρούτα, βερίκοκο, βανίλια",
      "en": "Tropical fruit, apricot, vanilla"
    },
    "pairsShort": {
      "el": "Ορεκτικά, ψάρι, λαχανικά, λευκό κρέας",
      "en": "Starters, fish, vegetables, white meat"
    },
    "profile": {
      "el": "Λαμπερό αχυροκίτρινο με πράσινες ανταύγειες. Έντονο μπουκέτο ώριμων φρούτων, όπως τροπικά φρούτα και βερίκοκο, με νότες βανίλιας. Στο στόμα πικάντικο και γεμάτο, με τη σωστή οξύτητα.",
      "en": "Brilliant straw yellow with green reflections. An intense bouquet of ripe fruit such as tropical fruit and apricot, with notes of vanilla. Spicy and full-bodied on the palate, with just the right acidity."
    },
    "pairing": {
      "el": "Ιδανικό με ορεκτικά, πρώτα πιάτα με ψάρι, λαχανικά και λευκά κρέατα.",
      "en": "Ideal with starters, fish first courses, vegetables and white meat."
    },
    "making": {
      "el": "Τα σταφύλια υποβάλλονται σε ψυχρή εκχύλιση για περίπου 8 ώρες πριν από την πίεση, για φρουτώδες μπουκέτο. Μέρος ζυμώνεται σε ελεγχόμενη θερμοκρασία 16°C, ενώ το υπόλοιπο ωριμάζει σε δρύινα βαρέλια barrique. Ακολουθεί παλαίωση στη φιάλη για τουλάχιστον 3 μήνες.",
      "en": "The grapes are cold-macerated for about 8 hours before pressing for a fruity bouquet. Part ferments at a controlled 16°C while the rest matures in oak barriques; the wine then rests in bottle for at least 3 months."
    },
    "awards": []
  },
  {
    "slug": "leanfore",
    "short": "Le Anfore",
    "name": "Le Anfore Rosso Salento",
    "maker": "Masso Antico",
    "type": "red",
    "organic": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT · BIO",
    "abv": "14,5%",
    "serve": "16–18°C",
    "body": 5,
    "pairings": [
      "red",
      "cheese"
    ],
    "featured": true,
    "notes": {
      "el": "Βανίλια, σοκολάτα, ουίσκι, καφές",
      "en": "Vanilla, chocolate, whisky, coffee"
    },
    "pairsShort": {
      "el": "Κόκκινο κρέας, κυνήγι, παλαιωμένα τυριά",
      "en": "Red meat, game, aged cheeses"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα, με αρώματα βανίλιας και σοκολάτας, ουίσκι και καφέ. Γεμάτο σώμα με πολύ μαλακές ταννίνες και μακρά επίγευση.",
      "en": "Deep ruby red with aromas of vanilla and chocolate, whisky and coffee. Full-bodied with very soft tannins and a long finish."
    },
    "pairing": {
      "el": "Ταιριάζει τέλεια με κόκκινο κρέας και κυνήγι, ψητά ή μαγειρευτά και με παλαιωμένα τυριά.",
      "en": "A perfect match for red meat and game, grilled or braised, and for aged cheeses."
    },
    "making": {
      "el": "Τα σταφύλια καλλιεργούνται στον αμπελώνα του Tenute Masso Antico σύμφωνα με τις μεθόδους της βιολογικής καλλιέργειας και συγκομίζονται με το χέρι. Μετά την οινοποίηση, το κρασί παλαιώνει με διπλό πέρασμα σε αμφορείς και σε γαλλικά και αμερικανικά δρύινα βαρέλια. Οι αμφορείς εγγυώνται ελεγχόμενη μικροοξυγόνωση και αναδεικνύουν τον φρουτένιο χαρακτήρα του.",
      "en": "Grown organically at Tenute Masso Antico and harvested by hand. After vinification the wine ages twice: in amphorae and in French and American oak. The amphorae give controlled micro-oxygenation and bring out its fruit."
    },
    "award": "Luca Maroni 98",
    "awards": [
      {
        "who": "Gilbert et Gaillard",
        "what": {
          "el": "Double Gold",
          "en": "Double Gold"
        }
      },
      {
        "who": "Luca Maroni",
        "what": {
          "el": "98 βαθμοί",
          "en": "98 points"
        }
      }
    ]
  },
  {
    "slug": "amarone",
    "short": "Amarone",
    "name": "Amarone della Valpolicella",
    "maker": "Amicale – Cantine di Ora",
    "type": "red",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOCG",
    "grapes": "Corvina, Corvinone, Rondinella",
    "abv": "15,5%",
    "serve": "20–22°C",
    "body": 5,
    "pairings": [
      "red"
    ],
    "featured": true,
    "notes": {
      "el": "Κεράσι, φρούτα του δάσους, βανίλια, σταφίδες",
      "en": "Cherry, forest fruit, vanilla, raisins"
    },
    "pairsShort": {
      "el": "Κυνήγι, αρνί, κοκκινιστό μοσχάρι",
      "en": "Game, lamb, braised beef"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα γρανάτη. Σύνθετο φρουτώδες μπουκέτο με νότες από κεράσι, φρούτα του δάσους, μούρα, βανίλια, σταφίδες και τροπικά φρούτα. Γεμάτο σώμα, πλούσιο, απαλό και βελούδινο με μακρά παρατεταμένη επίγευση.",
      "en": "Intense garnet ruby. A complex, fruity bouquet of cherry, forest fruit, berries, vanilla, raisins and tropical fruit. Full-bodied, rich, smooth and velvety with a long, lingering finish."
    },
    "pairing": {
      "el": "Ιδανικό συνοδευτικό για κυνήγι και αρνί, παϊδάκια, συκώτι και κοκκινιστό μοσχαρίσιο κρέας. Εξαιρετικό και ως κρασί διαλογισμού.",
      "en": "Ideal with game and lamb, chops, liver and braised beef. Also excellent on its own as a meditation wine."
    },
    "making": {
      "el": "Τα σταφύλια μαζεύονται με το χέρι και τοποθετούνται σε παραδοσιακά ράφια, σε καλά αεριζόμενο δωμάτιο με σταθερή θερμοκρασία και υγρασία. Κατά την ξήρανση χάνουν περίπου το 35% του βάρους τους, ενισχύοντας αρώματα και γεύσεις. Το αποτέλεσμα είναι ένα εξαιρετικό κόκκινο κρασί με σημαντική δομή, κατάλληλο για παλαίωση.",
      "en": "Hand-picked grapes are laid on traditional racks in a well-ventilated room at steady temperature and humidity. While drying they lose about 35% of their weight, concentrating aromas and flavours. The result is an exceptional red with real structure, built for ageing."
    },
    "tip": {
      "el": "Ανοίξτε το σε καράφα τουλάχιστον μία ώρα πριν το σερβίρισμα.",
      "en": "Decant at least one hour before serving."
    },
    "awards": []
  },
  {
    "slug": "prosecco",
    "short": "Prosecco",
    "name": "Prosecco Spumante Extra Dry",
    "maker": "Francesca Mara",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOC",
    "grapes": "Glera",
    "abv": "11%",
    "serve": "5–6°C",
    "body": 3,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Πράσινο μήλο, ροδάκινο, άνθη ακακίας",
      "en": "Green apple, peach, acacia blossom"
    },
    "pairsShort": {
      "el": "Απεριτίφ, σαλάτες με mozzarella, sushi",
      "en": "Aperitif, salads with mozzarella, sushi"
    },
    "profile": {
      "el": "Ανοιχτό αχυροκίτρινο χρώμα, αριστοκρατικό και ζωηρό perlage. Έντονο και ισορροπημένο άρωμα, με νότες πράσινου μήλου, ροδάκινου και άνθη ακακίας. Πλούσια, έντονη, απαλή και φρέσκια γεύση. Μέτριο σώμα με ζωηρή οξύτητα.",
      "en": "Pale straw yellow with a fine, lively perlage. An intense, balanced nose of green apple, peach and acacia blossom. Rich, soft and fresh on the palate, medium-bodied with lively acidity."
    },
    "pairing": {
      "el": "Ιδανικό απεριτίφ αλλά μπορεί να συνοδεύσει και ελαφριά, κρύα πιάτα όπως prosciutto με πεπόνι, carpaccio λαβράκι και δροσερές σαλάτες με mozzarella. Επιπλέον συνδυάζεται τόσο με sushi όσο και με φρουτοσαλάτες και ζελέ.",
      "en": "An ideal aperitif that also suits light, cold dishes such as prosciutto with melon, sea bass carpaccio and fresh salads with mozzarella. It also pairs with sushi, fruit salads and jellies."
    },
    "awards": []
  },
  {
    "slug": "amicone-rosso",
    "short": "Amicale Rosso",
    "name": "Amicale Rosso Veneto IGT",
    "maker": "Amicale – Cantine di Ora",
    "type": "red",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "IGT",
    "grapes": "Κόκκινες ποικιλίες Βένετο",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Σμέουρο, βύσσινο, μπαχαρικά, σοκολάτα",
      "en": "Raspberry, sour cherry, spice, chocolate"
    },
    "pairsShort": {
      "el": "Πρώτα πιάτα, κόκκινο κρέας, κυνήγι, τυριά",
      "en": "First courses, red meat, game, cheese"
    },
    "profile": {
      "el": "Ρουμπινί χρώμα με λεπτό, οινώδες μπουκέτο και έντονα αρώματα σμέουρου και βύσσινου. Στο στόμα γεμάτο, μαλακό και βελούδινο, με γλυκές νότες μπαχαρικών και σοκολάτας από την αργή ωρίμαση σε tonneaux.",
      "en": "Ruby red with a delicate, vinous bouquet and intense aromas of raspberry and sour cherry. Full-bodied, soft and velvety, with sweet notes of spice and chocolate from slow ageing in tonneaux."
    },
    "pairing": {
      "el": "Εξαιρετικό με πρώτα πιάτα, κόκκινα κρέατα, κυνήγι, ψητά και τυριά.",
      "en": "Excellent with first courses, red meat, game, roasts and cheese."
    },
    "making": {
      "el": "Προσεκτική επιλογή κόκκινων σταφυλιών του Βένετο. Μέρος τους αποξηραίνεται (appassimento) σε τελάρα σε χώρους ελεγχόμενης θερμοκρασίας, ενώ άλλο μέρος ωριμάζει στο αμπέλι. Μετά την παραδοσιακή οινοποίηση, μέρος του κρασιού ωριμάζει σε tonneaux για περίπου 12 μήνες.",
      "en": "A careful selection of red grapes grown in Veneto. Part are dried (appassimento) in crates in temperature-controlled rooms, another part ripens on the vine. After traditional vinification, part of the wine matures in tonneaux for about 12 months."
    },
    "awards": []
  },
  {
    "slug": "langhe-bianco",
    "short": "Langhe Bianco",
    "name": "Langhe DOC Bianco",
    "maker": "Casali del Barone",
    "type": "white",
    "region": {
      "el": "Πιεμόντε",
      "en": "Piedmont"
    },
    "appellation": "DOC",
    "grapes": "Chardonnay, Arneis",
    "abv": "13%",
    "serve": "10–12°C",
    "body": 0,
    "pairings": [
      "fish",
      "white",
      "cheese"
    ],
    "notes": {
      "el": "Λουλούδια και φρούτα",
      "en": "Flowers and fruit"
    },
    "pairsShort": {
      "el": "Τυριά, ψάρι, λαχανικά, δημητριακά",
      "en": "Cheese, fish, vegetables, grains"
    },
    "profile": {
      "el": "Έντονο αχυροκίτρινο χρώμα με χρυσές ανταύγειες και νότες από λουλούδια και φρούτα.",
      "en": "Intense straw yellow with golden reflections and notes of flowers and fruit."
    },
    "pairing": {
      "el": "Ιδανικό με τυριά, πιάτα με βάση τα ψάρια, λαχανικά και δημητριακά.",
      "en": "Ideal with cheese, fish dishes, vegetables and grains."
    },
    "making": {
      "el": "ο μούστος ζυμώνεται σε ελεγχόμενη θερμοκρασία μεταξύ 14°C και 16° C για περίπου 3 εβδομάδες και στη συνέχεια ωριμάζει για 2 μήνες πριν από την εμφιάλωση.",
      "en": "The must ferments at a controlled 14–16°C for about 3 weeks, then matures for 2 months before bottling."
    },
    "award": "Luca Maroni · 96 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      },
      {
        "who": "Decanter 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "barolo",
    "short": "Barolo",
    "name": "Barolo DOCG",
    "maker": "Casali del Barone",
    "type": "red",
    "region": {
      "el": "Πιεμόντε",
      "en": "Piedmont"
    },
    "appellation": "DOCG",
    "grapes": "Nebbiolo",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 0,
    "pairings": [
      "white",
      "red"
    ],
    "notes": {
      "el": "Δαμάσκηνο, κόκκινα φρούτα, ξύλο, καπνός",
      "en": "Plum, red fruit, wood, smoke"
    },
    "pairsShort": {
      "el": "Ριζότο με μανιτάρια, κόκκινο κρέας, κυνήγι, τρούφα",
      "en": "Mushroom risotto, red meat, game, truffle"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα γρανάτη, πλούσιο και γεμάτο μπουκέτο με δαμάσκηνα, κόκκινα φρούτα και νότες μαρμελάδας. Πολύπλοκα αρώματα από ξύλο, ευκάλυπτο, καπνό, ορυκτές νότες και δέρμα. Στο στόμα, η γλυκιά ταννική γεύση είναι καθαρή και επίμονη με μακρά επίγευση.",
      "en": "Deep garnet red with a rich, full bouquet of plum, red fruit and jam. Complex aromas of wood, eucalyptus, smoke, minerals and leather. On the palate the sweet tannins are clean and persistent, with a long finish."
    },
    "pairing": {
      "el": "Ιδανικό με ριζότο με μανιτάρια, κόκκινο κρέας και κυνήγι, εξαιρετικό με φιλέτο με τρούφα.",
      "en": "Ideal with mushroom risotto, red meat and game; excellent with fillet and truffle."
    },
    "making": {
      "el": "Η συγκομιδή των σταφυλιών αποκλειστικά και μόνο Nebbiolo γίνεται με το χέρι. Η ζύμωση λαμβάνει χώρα σε ελεγχόμενη θερμοκρασία μεταξύ 25°C και 30°C για περίπου 3 εβδομάδες. Το κρασί παλαιώνει για 38 μήνες εκ των οποίων οι 18 είναι σε δρύινα βαρέλια. Καθώς οι ταννίνες μαλακώνουν με την πάροδο του χρόνου, η πολυπλοκότητα εμφανίζεται με νότες γης, τρούφας και μαύρης σοκολάτας.",
      "en": "Only Nebbiolo grapes, harvested by hand. Fermentation at a controlled 25–30°C for about 3 weeks. The wine ages 38 months, 18 of them in oak barrels."
    },
    "tip": {
      "el": "Δυνατότητα παλαίωσης σε φιάλη για 8-10 έτη.",
      "en": "Can age in bottle for 8–10 years."
    },
    "awards": []
  },
  {
    "slug": "barbera",
    "short": "Barbera",
    "name": "Piemonte DOC Barbera",
    "maker": "Casali del Barone",
    "type": "red",
    "region": {
      "el": "Πιεμόντε",
      "en": "Piedmont"
    },
    "appellation": "DOC",
    "grapes": "Barbera, Nebbiolo",
    "abv": "13,5%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "white",
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Λουλούδια, κόκκινα φρούτα, μαύρη σοκολάτα",
      "en": "Flowers, red fruit, dark chocolate"
    },
    "pairsShort": {
      "el": "Αλλαντικά, ώριμα τυριά, ζυμαρικά, μοσχάρι",
      "en": "Charcuterie, mature cheese, pasta, beef"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα και λουλουδάτα αρώματα μαζί με ελαφρώς ωριμασμένες αποχρώσεις κόκκινων φρούτων. Γεμάτο σώμα και στρογγυλό. Επίμονη και ελαφρώς πικάντικη επίγευση μαύρης σοκολάτας, λόγω του φυσικού επιπέδου σακχάρου περίπου 6 γρ.",
      "en": "Deep ruby red with floral aromas and slightly ripe red-fruit tones. Full-bodied and round, with a persistent, lightly spicy dark-chocolate finish from its natural sugar of about 6 g."
    },
    "pairing": {
      "el": "Είναι ιδανικό με αλλαντικά, ώριμα τυριά, ζυμαρικά, ριζότο και μοσχάρι. Τέλειο με επιδόρπια σοκολάτας.",
      "en": "Ideal with charcuterie, mature cheeses, pasta, risotto and beef. Perfect with chocolate desserts."
    },
    "making": {
      "el": "Τα σταφύλια επιλέγονται προσεκτικά και συγκομίζονται με το χέρι. Η ζύμωση λαμβάνει χώρα σε ελεγχόμενη θερμοκρασία με διαβροχή για 10 ημέρες σε περιστροφικούς οινοποιητές. Το κρασί στη συνέχεια παλαιώνεται σε δρύινα βαρέλια για 3 μήνες.",
      "en": "Carefully selected, hand-harvested grapes. Fermentation at controlled temperature with 10 days of maceration in rotary fermenters, then 3 months in oak barrels."
    },
    "tip": {
      "el": "Δυνατότητα παλαίωσης για 3-5 χρόνια.",
      "en": "Can age for 3–5 years."
    },
    "awards": []
  },
  {
    "slug": "barbaresco",
    "short": "Barbaresco",
    "name": "Barbaresco DOCG",
    "maker": "Casali del Barone",
    "type": "red",
    "region": {
      "el": "Πιεμόντε",
      "en": "Piedmont"
    },
    "appellation": "DOCG",
    "grapes": "Nebbiolo",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 0,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Βιολέτα, κόκκινα φρούτα",
      "en": "Violet, red fruit"
    },
    "pairsShort": {
      "el": "Ψητό, βραστό ή κοκκινιστό κόκκινο κρέας",
      "en": "Roast, boiled or braised red meat"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα με ανταύγειες γρανάτη, κομψό και πολύπλοκο μπουκέτο με νότες βιολέτας και κόκκινων φρούτων. Στο στόμα έντονο με υπέροχα αρώματα, αρμονικό και βελούδινο, με μακρά, επίμονη και ελαφρώς πικάντικη επίγευση.",
      "en": "Deep ruby red with garnet reflections; an elegant, complex bouquet of violet and red fruit. Intense and harmonious on the palate, velvety, with a long, persistent, lightly spicy finish."
    },
    "pairing": {
      "el": "Ιδανικό με ψητό, βραστό ή κοκκινιστό κόκκινο κρέας.",
      "en": "Ideal with roast, boiled or braised red meat."
    },
    "making": {
      "el": "Τα σταφύλια επιλέγονται προσεκτικά και συγκομίζονται με το χέρι. Ακολουθεί ζύμωση, η οποία πραγματοποιείται σε ελεγχόμενη θερμοκρασία μεταξύ 25° και 30° για περίπου 3 εβδομάδες. Το κρασί ωριμάζει για 26 μήνες σε μεγάλα δρύινα βαρέλια με αποτέλεσμα την αύξηση της αρωματικής και γευστικής του πολυπλοκότητας.",
      "en": "Carefully selected, hand-harvested grapes ferment at 25–30°C for about 3 weeks. The wine matures 26 months in large oak barrels, adding aromatic complexity."
    },
    "tip": {
      "el": "Δυνατότητα παλαίωσης στη φιάλη 6-8 χρόνια.",
      "en": "Can age in bottle for 6–8 years."
    },
    "award": "Gilbert et Gaillard 2021 · Χρυσό",
    "awards": [
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2019)",
      "en": "(2019 vintage)"
    }
  },
  {
    "slug": "greco-di-tufo",
    "short": "Greco di Tufo",
    "name": "Greco di Tufo DOCG",
    "maker": "Corte del Golfo",
    "type": "white",
    "region": {
      "el": "Καμπανία",
      "en": "Campania"
    },
    "appellation": "DOCG",
    "grapes": "Greco",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "fish",
      "white",
      "red"
    ],
    "notes": {
      "el": "Βερίκοκο, αχλάδι, μήλο, ορυκτότητα",
      "en": "Apricot, pear, apple, minerality"
    },
    "pairsShort": {
      "el": "Ψάρι, λευκά κρέατα, μοτσαρέλα, ψητά λαχανικά",
      "en": "Fish, white meat, mozzarella, grilled veg"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με απαλές χρυσαφένιες ανταύγειες και έντονη προσωπικότητα. Μακρά επίγευση και καλά δομημένη, φρέσκια με νότες από βερίκοκο, αχλάδι, μήλο, εξωτικά φρούτα και μια ξεχωριστή ορυκτότητα από το ηφαιστειακό έδαφος.",
      "en": "Straw yellow with soft golden reflections and strong personality. Fresh and well structured, with notes of apricot, pear, apple and exotic fruit and a distinctive minerality from volcanic soil, and a long finish."
    },
    "pairing": {
      "el": "Εξαιρετικό με ψάρι και ελαφριά πιάτα. Συνδυάζεται ιδανικά με λευκά κρέατα, μοτσαρέλα και ψητά λαχανικά.",
      "en": "Excellent with fish and light dishes; pairs well with white meat, mozzarella and grilled vegetables."
    },
    "making": {
      "el": "Τα σταφύλια επιλέγονται και συγκομίζονται με το χέρι και υποβάλλονται σε μαλακή πίεση. Στη συνέχεια ακολουθεί ζύμωση σε ελεγχόμενη θερμοκρασία 16°με 18°C σε ανοξείδωτες δεξαμενές. Τέλος ακολουθεί παλαίωση με οινολάσπες για περίπου 1 μήνα.",
      "en": "Hand-selected, hand-harvested grapes are softly pressed, fermented at 16–18°C in stainless steel and aged on the lees for about 1 month."
    },
    "award": "IWSC 2021 · Χάλκινο",
    "awards": [
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      },
      {
        "who": "IWC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      },
      {
        "who": "Decanter 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "falanghina",
    "short": "Falanghina",
    "name": "Falanghina Irpinia DOC",
    "maker": "Corte del Golfo",
    "type": "white",
    "region": {
      "el": "Καμπανία",
      "en": "Campania"
    },
    "appellation": "DOC",
    "abv": "12,5%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "fish",
      "white"
    ],
    "notes": {
      "el": "Αχλάδι, ροδάκινο, τροπικά φρούτα, βότανα",
      "en": "Pear, peach, tropical fruit, herbs"
    },
    "pairsShort": {
      "el": "Θαλασσινά, ψάρι, λευκό κρέας",
      "en": "Seafood, fish, white meat"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με χρυσαφένιες ανταύγειες και νότες αχλαδιού, ροδάκινου, τροπικών φρούτων και βοτάνων. Φρέσκο στο στόμα με εκλεπτυσμένο άρωμα και έντονη αίσθηση ορυκτότητας.",
      "en": "Straw yellow with golden reflections and notes of pear, peach, tropical fruit and herbs. Fresh on the palate, with a refined aroma and a strong sense of minerality."
    },
    "pairing": {
      "el": "Εξαιρετικό με θαλασσινά, πιάτα με βάση το ψάρι και το λευκό κρέας.",
      "en": "Excellent with seafood, fish dishes and white meat."
    },
    "making": {
      "el": "Τα σταφύλια επιλέγονται και συγκομίζονται με το χέρι και υποβάλλονται σε μαλακή πίεση. Στη συνέχεια ακολουθεί ζύμωση σε ελεγχόμενη θερμοκρασία 16°με 18°C και παλαίωση σε ανοξείδωτες δεξαμενές για περίπου 6 μήνες.",
      "en": "Hand-selected, hand-harvested grapes are softly pressed, fermented at 16–18°C and aged in stainless steel for about 6 months."
    },
    "award": "Gilbert et Gaillard 2021 · Χρυσό",
    "awards": [
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      },
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "coda-di-volpe",
    "short": "Coda di Volpe",
    "name": "Coda di Volpe",
    "maker": "Corte del Golfo",
    "type": "white",
    "region": {
      "el": "Καμπανία",
      "en": "Campania"
    },
    "appellation": "",
    "grapes": "Coda di Volpe",
    "abv": "12,5%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "fish",
      "white",
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Εσπεριδοειδή, χαμομήλι, αχλάδι, κυδώνι",
      "en": "Citrus, chamomile, pear, quince"
    },
    "pairsShort": {
      "el": "Όστρακα, σούσι, ψάρι, πουλερικά",
      "en": "Shellfish, sushi, fish, poultry"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με χρυσές ανταύγειες και νότες εσπεριδοειδών, χαμομηλιού και λευκών φρούτων (αχλάδι, κυδώνι, ροδάκινο). Εκλεπτυσμένη οξύτητα, με εντυπωσιακή επίγευση και έντονη αίσθηση ορυκτότητας.",
      "en": "Straw yellow with golden reflections and notes of citrus, chamomile and white fruit (pear, quince, peach). Refined acidity, a striking finish and a strong sense of minerality."
    },
    "pairing": {
      "el": "Συνοδεύει ιδανικά όστρακα, θαλασσινά, σούσι και φρέσκο ψάρι. Συνδυάζεται επίσης με πουλερικά, αρνί ή κατσίκι, ζυμαρικά και με λιπαρά τυριά.",
      "en": "Ideal with shellfish, seafood, sushi and fresh fish. Also pairs with poultry, lamb or kid, pasta and rich cheeses."
    },
    "making": {
      "el": "Τα σταφύλια συγκομίζονται και επιλέγονται με το χέρι και υποβάλλονται σε ήπια πίεση. Ακολουθεί διαδικασία ζύμωσης και ωρίμανσης για περίπου 6 μήνες σε ανοξείδωτες δεξαμενές σε ελεγχόμενη θερμοκρασία 16°C - 18°C.",
      "en": "Hand-picked, hand-selected grapes are gently pressed, then fermented and matured for about 6 months in stainless steel at 16–18°C."
    },
    "award": "Gilbert et Gaillard 2021 · Χρυσό",
    "awards": [
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      },
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      },
      {
        "who": "IWC 2021",
        "what": {
          "el": "Ασημένιο",
          "en": "Silver"
        }
      },
      {
        "who": "Decanter 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ]
  },
  {
    "slug": "grillo",
    "short": "Grillo",
    "name": "Grillo Sicilia DOC BIO",
    "maker": "Gergenti",
    "type": "white",
    "organic": true,
    "region": {
      "el": "Σικελία",
      "en": "Sicily"
    },
    "appellation": "DOC · BIO",
    "grapes": "Grillo",
    "abv": "12,5%",
    "serve": "10–12°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white",
      "red"
    ],
    "notes": {
      "el": "Φρουτώδες, εσπεριδοειδή Σικελίας",
      "en": "Fruity, Sicilian citrus"
    },
    "pairsShort": {
      "el": "Ζυμαρικά, ψάρι, λαχανικά, απεριτίφ",
      "en": "Pasta, fish, vegetables, aperitif"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα, φρουτώδες με φινίρισμα εσπεριδοειδών Σικελίας. Απαλό στο στόμα με καλό επίπεδο οξύτητας.",
      "en": "Straw yellow, fruity, with a finish of Sicilian citrus. Soft on the palate with good acidity."
    },
    "pairing": {
      "el": "Εξαιρετικό με ζυμαρικά, ψάρι και βραστά ή ψητά λαχανικά. Τέλειο ως απεριτίφ ή απλά μόνο του.",
      "en": "Excellent with pasta, fish and boiled or grilled vegetables. Perfect as an aperitif or on its own."
    },
    "making": {
      "el": "Η συγκομιδή γίνεται με το χέρι, τη δεύτερη εβδομάδα του Αυγούστου. Η αλκοολική ζύμωση λαμβάνει χώρα σε ελεγχόμενη θερμοκρασία 15°C για περίπου 15 με 20 ημέρες και μετά από σύντομη παραμονή στις δεξαμενές, το κρασί παλαιώνεται στη φιάλη για 3 μήνες.",
      "en": "Hand-harvested in the second week of August. Fermented at a controlled 15°C for 15–20 days; after a short rest in tank the wine ages 3 months in bottle."
    },
    "award": "Luca Maroni · 95 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "95 βαθμοί",
          "en": "95 points"
        }
      },
      {
        "who": "Concours Mondial de Bruxelles 2021",
        "what": {
          "el": "Ασημένιο",
          "en": "Silver"
        }
      },
      {
        "who": "The Global Organic Masters 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "frappato",
    "short": "Frappato",
    "name": "Frappato Terre Siciliane IGT BIO",
    "maker": "Gergenti",
    "type": "red",
    "organic": true,
    "region": {
      "el": "Σικελία",
      "en": "Sicily"
    },
    "appellation": "IGT · BIO",
    "grapes": "Frappato",
    "abv": "13%",
    "serve": "18–20°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "white",
      "cheese"
    ],
    "notes": {
      "el": "Βατόμουρο, κόκκινα μούρα",
      "en": "Blackberry, red berries"
    },
    "pairsShort": {
      "el": "Τυριά, ορεκτικά, λευκό κρέας, απεριτίφ",
      "en": "Cheese, starters, white meat, aperitif"
    },
    "profile": {
      "el": "Έντονο κόκκινο ρουμπινί χρώμα με άρωμα φρέσκο, φρουτώδες με νότες από βατόμουρα και κόκκινα μούρα. Απαλό και αρμονικό στο στόμα.",
      "en": "Bright ruby red with a fresh, fruity nose of blackberry and red berries. Soft and harmonious on the palate."
    },
    "pairing": {
      "el": "Εξαιρετικό με τυριά, ορεκτικά, ελαφριά πιάτα και με λευκό κρέας. Τέλειο ως απεριτίφ.",
      "en": "Excellent with cheese, starters, light dishes and white meat. Perfect as an aperitif."
    },
    "making": {
      "el": "Η συγκομιδή γίνεται με το χέρι στις αρχές Αυγούστου. Μετά την συγκομιδή τα σταφύλια μουλιάζουν για 6 ημέρες. Η αλκοολική ζύμωση λαμβάνει χώρα σε ελεγχόμενη θερμοκρασία σε ανοξείδωτες δεξαμενές. Στην συνέχεια, το κρασί παλαιώνεται στη φιάλη για έναν ακόμη μήνα.",
      "en": "Hand-harvested in early August, then macerated for 6 days. Fermented at controlled temperature in stainless steel and aged a further month in bottle."
    },
    "award": "Luca Maroni · 96 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      },
      {
        "who": "The Global Organic Masters 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "vero-siciliano",
    "short": "Il Vero Siciliano",
    "name": "Il Vero Siciliano IGT",
    "maker": "Gergenti",
    "type": "red",
    "region": {
      "el": "Σικελία",
      "en": "Sicily"
    },
    "appellation": "IGT",
    "grapes": "Nero d'Avola, Nerello Mascalese, Frappato",
    "abv": "15%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Κόκκινα φρούτα, βελούδινο",
      "en": "Red fruit, velvety"
    },
    "pairsShort": {
      "el": "Κρεατικά, τυριά, αλλαντικά",
      "en": "Meat dishes, cheese, charcuterie"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα. Απαλό, βελούδινο με γεμάτο σώμα και νότες κόκκινων φρούτων στον ουρανίσκο.",
      "en": "Deep ruby red. Soft and velvety, full-bodied, with notes of red fruit on the palate."
    },
    "pairing": {
      "el": "Εξαιρετικό με πιάτα κρεατικών καθώς επίσης και με τυριά και αλλαντικά.",
      "en": "Excellent with meat dishes, cheeses and charcuterie."
    },
    "making": {
      "el": "Τα σταφύλια του Il Vero Siciliano καλλιεργούνται στους λόφους της Σικελίας. Όταν ωριμάσουν αφήνονται για λίγες ημέρες στον αμπελώνα για να αποκτήσουν υψηλό αλκοολικό βαθμό και συγκέντρωση. Η παλαίωση λαμβάνει χώρα σε μεγάλα δρύινα βαρέλια για 6 μήνες, πράγμα το οποίο επιτρέπει στο κρασί να ωριμάσει και να αποκτήσει την πολυπλοκότητα που το κάνει μοναδικό.",
      "en": "Grown on Sicilian hillsides; ripe grapes are left on the vine a few extra days for concentration. The wine ages 6 months in large oak barrels."
    },
    "award": "Berliner Wein Trophy 2021 · Χρυσό",
    "awards": [
      {
        "who": "Berliner Wein Trophy 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "fm-pinot-grigio",
    "short": "Pinot Grigio",
    "name": "Pinot Grigio delle Venezie DOC",
    "maker": "Francesca Mara",
    "type": "white",
    "region": {
      "el": "Delle Venezie",
      "en": "Delle Venezie"
    },
    "appellation": "DOC",
    "grapes": "Pinot Grigio",
    "abv": "12%",
    "serve": "6–8°C",
    "body": 0,
    "pairings": [
      "white"
    ],
    "notes": {
      "el": "Ροδάκινο, πράσινο μήλο",
      "en": "Peach, green apple"
    },
    "pairsShort": {
      "el": "Πάστα, σαλάτες, carpaccio, κοτόπουλο",
      "en": "Pasta, salads, carpaccio, chicken"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με χάλκινες ανταύγειες. Φρουτώδες με ντελικάτο άρωμα, μπουκέτο με νότες ροδάκινου και πράσινου μήλου. Γεύση απαλή, ευχάριστα ντελικάτη, με αρμονική και επίμονη επίγευση.",
      "en": "Straw yellow with copper reflections. Fruity with a delicate nose of peach and green apple. Soft and pleasantly delicate, with a harmonious, persistent finish."
    },
    "pairing": {
      "el": "Απίθανο passpartout για συνδυασμούς με φαγητό, από πάστα μέχρι σαλάτες και από carpaccio μέχρι κοτόπουλο.",
      "en": "A great all-rounder at the table, from pasta to salads and from carpaccio to chicken."
    },
    "awards": []
  },
  {
    "slug": "fm-montepulciano",
    "short": "Montepulciano d'Abruzzo",
    "name": "Montepulciano d'Abruzzo DOC Riserva",
    "maker": "Francesca Mara",
    "type": "red",
    "region": {
      "el": "Αμπρούτσο",
      "en": "Abruzzo"
    },
    "appellation": "DOC Riserva",
    "grapes": "Montepulciano d'Abruzzo",
    "abv": "13,5%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Λουλούδια, μαύρο πιπέρι, μπαχαρικά, αμύγδαλο",
      "en": "Flowers, black pepper, spice, almond"
    },
    "pairsShort": {
      "el": "Κόκκινο και ψητό κρέας, παλαιωμένα τυριά",
      "en": "Red and grilled meat, aged cheese"
    },
    "profile": {
      "el": "Ρουμπινί με ελαφριές βιολετί ανταύγειες. Έντονο λουλουδάτο μπουκέτο με γήινες νότες μαύρου πιπεριού και μπαχαρικών. Ζεστή, τανική, ισορροπημένη γεύση , γεμάτο σώμα με επίγευση αμυγδάλου.",
      "en": "Ruby with light violet reflections. An intense floral bouquet with earthy notes of black pepper and spice. Warm, tannic and balanced, full-bodied with an almond finish."
    },
    "pairing": {
      "el": "Ιδανικό για πιάτα με κόκκινο και ψητό κρέας, εξαιρετικό με παλαιωμένα τυριά και αλλαντικά",
      "en": "Ideal with red and grilled meat; excellent with aged cheeses and charcuterie."
    },
    "making": {
      "el": "Μετά από προσεκτική επιλογή, τα σταφύλια ξεφλουδίζονται και συμπιέζονται, οι φλούδες αφήνονται σε επαφή με τον μούστο του κρασιού για 10 έως 15 ημέρες σε σταθερή θερμοκρασία 20-22°C. Στην συνέχεια το κρασί τοποθετείται σε μεγάλα βαρέλια για περίπου 12 μήνες και μετά παλαιώνεται σε ανοξείδωτες δεξαμενές.",
      "en": "From hillside vineyards at 400–450 m. Skins stay in contact with the must for 10–15 days at 20–22°C; the wine then spends about 12 months in large barrels before ageing in stainless steel."
    },
    "awards": []
  },
  {
    "slug": "amicale-corvina",
    "short": "Amicale Corvina",
    "name": "Amicale Corvina IGT Limited Edition",
    "maker": "Amicale – Cantine di Ora",
    "type": "red",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "IGT",
    "grapes": "Corvina",
    "abv": "15%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Φράουλα, βατόμουρο, βανίλια, σοκολάτα",
      "en": "Strawberry, blackberry, vanilla, chocolate"
    },
    "pairsShort": {
      "el": "Νιόκι με κρέας, κόκκινες σάλτσες, κυνήγι",
      "en": "Gnocchi with meat, red sauces, game"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα και μπουκέτο κόκκινων φρούτων όπως φράουλα και βατόμουρο, που συνοδεύονται από πικάντικες νότες πράσινου πιπεριού και γαρύφαλλου. Γεμάτο στο στόμα, με νότες βανίλιας και σοκολάτας που αναδύονται από το ξύλου και νότες γλυκάνισου και αμυγδάλου στο τελείωμα.",
      "en": "Deep ruby red with a bouquet of red fruit such as strawberry and blackberry, with spicy notes of green pepper and clove. Full on the palate, with vanilla and chocolate from the wood and anise and almond on the finish."
    },
    "pairing": {
      "el": "Ιδανικό με τα πρώτα πιάτα που βασίζονται σε νιόκι πατάτας και κρέας, κόκκινες σάλτσες, δεύτερα πιάτα με βάση το κυνήγι και γευστικά συνοδευτικά πιάτα. Επίσης, εξαιρετικό ως κρασί διαλογισμού.",
      "en": "Ideal with first courses of potato gnocchi and meat, red sauces, game-based main courses and flavourful sides. Also excellent as a meditation wine."
    },
    "making": {
      "el": "Τα σταφύλια επιλέγονται και συγκομίζονται με το χέρι. Στην συνέχεια υποβάλλονται σε διαδικασία ξήρανσης – αφυδάτωσης, γνωστή ως μέθοδος \"appassimento\", η οποία συνίσταται στην τοποθέτηση των σταφυλιών σε ειδικά κιβώτια, μέσα σε χώρο σταθερής θερμοκρασίας και υγρασίας. Κατά τη διάρκεια αυτής της διαδικασία, τα σταφύλια χάνουν το 35% του βάρους τους και το ΄καθοριστικό αυτό στάδιο είναι που δίνει τον πλούτο και καθορίζει το στιβαρό, πληθωρικό και συναρπαστικό χαρακτήρα του κρασιού αυτού . Ακολουθεί οινοποίηση σε ανοξείδωτες δεξαμενές. Στη συνέχεια μέρος των σταφυλιών παλαιώνεται σε δρύινα και ακατέργαστα νέα βαρέλια για περίοδο 12 μηνών, ενώ το υπόλοιπο διατηρείται σε ατσάλι, προκειμένου να διατηρηθούν τα πικάντικα χαρακτηριστικά της Corvina. Μετά την παλαίωση, τα δύο συστατικά αναμειγνύονται και εμφιαλώνονται, ολοκληρώνοντας την παραμονή τους στη φιάλη για 3 μήνες ακόμη.",
      "en": "Hand-picked grapes are dried using the appassimento method, losing about 35% of their weight, which gives the wine its richness and robust character. Vinified in stainless steel; part then ages in wood."
    },
    "tip": {
      "el": "Μεταγγίστε τουλάχιστον μία ώρα πριν από το σερβίρισμα.",
      "en": "Decant at least one hour before serving."
    },
    "awards": []
  },
  {
    "slug": "amicale-pg-rose",
    "short": "Amicale Rosé",
    "name": "Amicale Pinot Grigio Rosé",
    "maker": "Amicale – Cantine di Ora",
    "type": "rose",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "",
    "grapes": "Pinot Grigio",
    "abv": "12,5%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white"
    ],
    "notes": {
      "el": "Κεράσι, μύρτιλο, βατόμουρο",
      "en": "Cherry, blueberry, blackberry"
    },
    "pairsShort": {
      "el": "Ορεκτικά, σούσι, μπακαλιάρος, πίτσα",
      "en": "Starters, sushi, cod, pizza"
    },
    "profile": {
      "el": "Ανοιχτό ροζ χρώμα με χάλκινες ανταύγειες και νότες κόκκινων φρούτων, κερασιού, μύρτιλλου και βατόμουρου. Μακρά επίγευση με χαρακτηριστική μεταλλικότητα και γεύση.",
      "en": "Pale pink with copper reflections and notes of red fruit, cherry, blueberry and blackberry. A long finish with characteristic minerality."
    },
    "pairing": {
      "el": "Συνδυάζεται τέλεια με ελαφριά ορεκτικά, σούσι, ψαρόσουπα, μπακαλιάρο και λευκό κρέας. Εξαιρετικό με πίτσες.",
      "en": "Pairs perfectly with light starters, sushi, fish soup, cod and white meat. Excellent with pizza."
    },
    "making": {
      "el": "Η συγκομιδή γίνεται με το χέρι στις αρχές Σεπτεμβρίου. Τα σταφύλια υποβάλλονται σε μαλακή έκθλιψη και ο μούστος αφήνεται σε επαφή με τις φλούδες για περίπου 8 ώρες για να επιτευχθεί το κατάλληλο χρώμα και άρωμα. Ακολουθεί αλκοολική ζύμωση με επιλεγμένες ζύμες σε ελεγχόμενη θερμοκρασία 16°-18° C. Το κρασί παλαιώνεται για περίπου 2 μήνες με την ίδια ζύμη για να αποκτήσει γεμάτο σώμα και απαλή γεύση.",
      "en": "Hand-harvested in early September. After soft pressing the must stays on the skins for about 8 hours for colour and aroma, ferments at 16–18°C and ages about 2 months on its lees."
    },
    "awards": []
  },
  {
    "slug": "casato-pinot-grigio",
    "short": "Il Casato Pinot Grigio",
    "name": "Il Casato Pinot Grigio Valdadige",
    "maker": "Il Casato",
    "type": "white",
    "region": {
      "el": "Valdadige",
      "en": "Valdadige"
    },
    "appellation": "",
    "grapes": "Pinot Grigio",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white",
      "cheese"
    ],
    "notes": {
      "el": "Χρυσό μήλο, λίτσι, αποξηραμένο χόρτο",
      "en": "Golden apple, lychee, dried grass"
    },
    "pairsShort": {
      "el": "Απεριτίφ, τυριά, ριζότο, θαλασσινά",
      "en": "Aperitif, cheese, risotto, seafood"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα, με έντονη και μακράς διαρκείας φρουτώδη και λουλουδάτη μύτη, με νότες χρυσού μήλου, λίτσι και αποξηραμένου χόρτου. Στο στόμα, ξηρό, με έντονο χαρακτήρα και κομψότητα, προσφέροντας ισορροπία μεταξύ σώματος και οξύτητας.",
      "en": "Straw yellow with an intense, long-lasting fruity and floral nose of golden apple, lychee and dried grass. Dry on the palate with strong character and elegance, balancing body and acidity."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ και συνοδευτικό σε πιάτα με μέτρια ένταση στη γεύση αλλά ελαφρώς λιπαρά, όπως τυριά και αλλαντικά, ριζότο, καλά καρυκευμένα θαλασσινά και λευκό κρέας.",
      "en": "Ideal as an aperitif and with medium-flavoured, slightly rich dishes such as cheese and charcuterie, risotto, well-seasoned seafood and white meat."
    },
    "making": {
      "el": "Τα σταφύλια υπόκεινται σε ήπια πίεση για να ληφθεί ο μούστος, ο οποίος στη συνέχεια υφίσταται λευκή οινοποίηση σε ανοξείδωτες δεξαμενές με ελεγχόμενη θερμοκρασία 16°-18° C. Ακολουθούν διαδικασίες παλαίωσης και σταθεροποίησης πριν την ψυχρή εμφιάλωση.",
      "en": "Gently pressed; the must is fermented as a white wine in stainless steel at 16–18°C, then aged and stabilised before cold bottling."
    },
    "awards": []
  },
  {
    "slug": "casato-pg-rose",
    "short": "Il Casato Rosé",
    "name": "Il Casato Pinot Grigio delle Venezie Rosé",
    "maker": "Il Casato",
    "type": "rose",
    "region": {
      "el": "Τρεντίνο · Βένετο",
      "en": "Trentino · Veneto"
    },
    "appellation": "",
    "grapes": "Pinot Grigio",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white"
    ],
    "notes": {
      "el": "Κεράσι, μύρτιλο, βατόμουρο",
      "en": "Cherry, blueberry, blackberry"
    },
    "pairsShort": {
      "el": "Ορεκτικά, σούσι, λευκό κρέας, μπακαλιάρος",
      "en": "Starters, sushi, white meat, cod"
    },
    "profile": {
      "el": "Απαλό ροζ χρώμα με χάλκινες ανταύγειες και ευχάριστα αρώματα κόκκινων φρούτων όπως κεράσι, μύρτιλο και βατόμουρο. Μακρά επίγευση με χαρακτηριστική ορυκτότητα.",
      "en": "Soft pink with copper reflections and pleasant aromas of red fruit such as cherry, blueberry and blackberry. A long finish with characteristic minerality."
    },
    "pairing": {
      "el": "Εξαιρετικό με ελαφριά ορεκτικά, σούσι, ψαρόσουπα, λευκό κρέας και μπακαλιάρο.",
      "en": "Excellent with light starters, sushi, fish soup, white meat and cod."
    },
    "making": {
      "el": "Τα σταφύλια καλλιεργούνται στο νότιο τμήμα του Trentino και του Βένετο. Η συγκομιδή γίνεται χειρωνακτικά στις αρχές Σεπτεμβρίου. Τα αμπέλια καλλιεργούνται τόσο στην κοιλάδα όσο και στις πλαγιές της περιοχής, όπου η μεγάλη διαφορά θερμοκρασίας ημέρας και νύχτας συμβάλλει στην εξαιρετική ωρίμανση των σταφυλιών. Τα σταφύλια υποβάλλονται σε ήπια πίεση και ο μούστος παραμένει σε επαφή με τις φλούδες για περίπου 8 ώρες, ώστε να αποκτήσει το επιθυμητό χρώμα και άρωμα. Στη συνέχεια ακολουθεί αλκοολική ζύμωση με επιλεγμένες ζύμες σε ελεγχόμενη θερμοκρασία 16°-18° C. Το κρασί παλαιώνει για περίπου 2 μήνες στις ίδιες ζύμες, αποκτώντας πλούσια και βελούδινη υφή.",
      "en": "Grown in southern Trentino and Veneto and hand-harvested in early September. The must stays on the skins for about 8 hours, ferments at 16–18°C and ages about 2 months on its lees."
    },
    "awards": []
  },
  {
    "slug": "casato-sauvignon",
    "short": "Il Casato Sauvignon",
    "name": "Il Casato Sauvignon Blanc Friuli",
    "maker": "Il Casato",
    "type": "white",
    "region": {
      "el": "Φρίουλι",
      "en": "Friuli"
    },
    "appellation": "",
    "grapes": "Sauvignon Blanc",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "fish",
      "white"
    ],
    "notes": {
      "el": "Φρούτα, φασκόμηλο, σαμπούκος",
      "en": "Fruit, sage, elderflower"
    },
    "pairsShort": {
      "el": "Λαχανικά, θαλασσινά, ριζότο με μύδια, ψάρι",
      "en": "Vegetables, seafood, mussel risotto, fish"
    },
    "profile": {
      "el": "Κιτρινοπράσινο χρώμα, με ορυκτό και αρωματικό μπουκέτο που συνδυάζει νότες φρούτων, φασκόμηλου και ανθέων σαμπούκου. Γεύση πλούσια και εκλεπτυσμένη με μακρά επίγευση.",
      "en": "Greenish yellow with a mineral, aromatic bouquet of fruit, sage and elderflower. Rich and refined, with a long finish."
    },
    "pairing": {
      "el": "Ιδανικό συνοδευτικό για λαχανικά και θαλασσινά, όπως ριζότο με μύδια και ψητό ψάρι.",
      "en": "Ideal with vegetables and seafood, such as mussel risotto and grilled fish."
    },
    "making": {
      "el": "Μετά την συγκομιδή στα μέσα Σεπτεμβρίου, τα σταφύλια απορραγίζονται και υφίστανται ήπια πίεση και στη συνέχεια ψυχρή εκχύλιση. Η ζύμωση πραγματοποιείται σε ανοξείδωτες δεξαμενές με ελεγχόμενη θερμοκρασία 12°C – 14°C. Μετά τη ζύμωση, το κρασί παραμένει στις δεξαμενές για ένα διάστημα ωρίμανσης πριν την εμφιάλωση.",
      "en": "Harvested in mid-September, destemmed, gently pressed and cold-macerated. Fermented in stainless steel at 12–14°C, then matured in tank before bottling."
    },
    "awards": []
  },
  {
    "slug": "casato-teroldego",
    "short": "Il Casato Teroldego",
    "name": "Il Casato Teroldego IGT",
    "maker": "Il Casato",
    "type": "red",
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "IGT",
    "grapes": "Teroldego",
    "abv": "",
    "serve": "",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Κόκκινα φρούτα, γρανάτης",
      "en": "Red fruit, garnet"
    },
    "pairsShort": {
      "el": "Ψητό κόκκινο κρέας, παλαιωμένα τυριά",
      "en": "Grilled red meat, aged cheese"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα με ανταύγειες γρανάτη. Φρουτώδες μπουκέτο με ξεκάθαρες νότες κόκκινων φρούτων. Στον ουρανίσκο γεμάτο, με εξαιρετική δομή και επίμονη επίγευση.",
      "en": "Deep red with garnet reflections. A fruity bouquet with clear notes of red fruit. Full on the palate, with excellent structure and a persistent finish."
    },
    "pairing": {
      "el": "Ιδανικό για ψητό κόκκινο κρέας και παλαιωμένα τυριά.",
      "en": "Ideal with grilled red meat and aged cheeses."
    },
    "making": {
      "el": "Για την παραγωγή ενός αυθεντικού Teroldego, χρησιμοποιούμε σταφύλια υψηλής ποιότητας και μια προσεκτική διαδικασία οινοποίησης, ικανή να διατηρεί τα χαρακτηριστικά του. Η ζύμωση πραγματοποιείται σε ανοξείδωτες δεξαμενές σε θερμοκρασία 22 - 24°C.",
      "en": "High-quality grapes and careful vinification; fermentation in stainless steel at 22–24°C."
    },
    "awards": []
  },
  {
    "slug": "il-potere",
    "short": "Il Potere",
    "name": "Il Potere Rosso Puglia IGT",
    "maker": "Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "abv": "",
    "serve": "16°C",
    "body": 5,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Τανικό, γεμάτο σώμα, βελούδινο",
      "en": "Tannic, full-bodied, velvety"
    },
    "pairsShort": {
      "el": "Πικάντικο κρέας, κυνήγι, αρνί",
      "en": "Spicy meat, game, lamb"
    },
    "profile": {
      "el": "Ρουμπινί έντονο χρώμα με πινελιές γρανάτη, τανικό αλλά ταυτόχρονα με γεμάτο σώμα και μαλακή και βελούδινη γεύση.",
      "en": "Intense ruby red with garnet hints; tannic yet full-bodied, with a soft, velvety taste."
    },
    "pairing": {
      "el": "Ιδανικό με πικάντικο κρέας, κυνήγι και αρνί. Προτείνεται και ως κρασί διαλογισμού.",
      "en": "Ideal with spicy meat, game and lamb. Also a meditation wine."
    },
    "making": {
      "el": "Ακολουθείται η αρχαία παράδοση της οινοποίησης της Απουλίας (Alberello Pugliese). Η συγκομιδή των υπερώριμων σταφυλιών γίνεται με το χέρι και στη συνέχεια το κρασί παλαιώνεται για μερικούς μήνες σε γαλλικά δρύινα βαρέλια.",
      "en": "Made following Apulia's ancient alberello tradition. Overripe grapes are hand-picked and the wine ages a few months in French oak."
    },
    "award": "Luca Maroni · 98 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "98 βαθμοί",
          "en": "98 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2019)",
      "en": "(2019 vintage)"
    }
  },
  {
    "slug": "moscato-premium",
    "short": "Moscato Premium",
    "name": "Moscato Premium",
    "maker": "Cavatina",
    "type": "sparkling",
    "region": {
      "el": "Τριβενέτο",
      "en": "Triveneto"
    },
    "appellation": "",
    "grapes": "Moscato",
    "abv": "8,5%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [],
    "notes": {
      "el": "Λεπτό, αρωματικό, γλυκό",
      "en": "Delicate, aromatic, sweet"
    },
    "pairsShort": {
      "el": "Φρούτα, επιδόρπια",
      "en": "Fruit, desserts"
    },
    "profile": {
      "el": "Έντονο αχυροκίτρινο χρώμα, με ένα λεπτό και αρωματικό μπουκέτο. Γλυκιά γεύση στον ουρανίσκο.",
      "en": "Intense straw yellow with a delicate, aromatic bouquet. Sweet on the palate."
    },
    "pairing": {
      "el": "Τέλειο με φρούτα και επιδόρπια.",
      "en": "Perfect with fruit and desserts."
    },
    "making": {
      "el": "Τα σταφύλια πιέζονται απαλά και ο μούστος αποθηκεύεται στους 0°C. Η ζύμωση γίνεται σε χαλύβδινες δεξαμενές σε ελεγχόμενη θερμοκρασία και ακολουθεί η δεύτερη ζύμωση με τη μέθοδο Charmat.",
      "en": "Gently pressed; the must is stored at 0°C, fermented in steel at controlled temperature, then given a second fermentation by the Charmat method."
    },
    "awards": []
  },
  {
    "slug": "spritz",
    "short": "Spritz 0,0%",
    "name": "Rivani 0% Spritz",
    "maker": "Rivani",
    "type": "sparkling",
    "alcoholFree": true,
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "abv": "0,0%",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif"
    ],
    "notes": {
      "el": "Πορτοκάλι, άνθη πορτοκαλιάς, ευχάριστη πικράδα",
      "en": "Orange, orange blossom, pleasant bitterness"
    },
    "pairsShort": {
      "el": "Απεριτίφ, βάση για κοκτέιλ",
      "en": "Aperitif, cocktail base"
    },
    "profile": {
      "el": "Λαμπερό πορτοκαλί χρώμα με λεπτές φυσαλίδες. Πολύ φρουτώδες, έντονο, φρέσκο, θυμίζει άνθη πορτοκαλιάς με μια ευχάριστη πικρή νότα.",
      "en": "Bright orange with fine bubbles. Very fruity, intense and fresh, recalling orange blossom with a pleasant bitter note."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ, αλλά και ως βάση για κοκτέιλ.",
      "en": "Ideal as an aperitif and as a cocktail base."
    },
    "making": {
      "el": "Μεσογειακά σταφύλια ζυμώνονται στους 16°C και στη συνέχεια το κρασί αποαλκοολοποιείται με τη μέθοδο των περιστρεφόμενων κώνων, που διατηρεί τα αρώματα και τη δομή του.",
      "en": "Mediterranean grapes are fermented at 16°C, then dealcoholised with the spinning-cone method, which keeps the aromas and structure."
    },
    "awards": []
  },
  {
    "slug": "negroamaro-bio",
    "short": "Negroamaro BIO",
    "name": "Negroamaro del Salento IGT BIO",
    "maker": "Masso Antico",
    "type": "red",
    "organic": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT · BIO",
    "grapes": "Negroamaro",
    "abv": "",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Βατόμουρο, δαμάσκηνο",
      "en": "Blackberry, plum"
    },
    "pairsShort": {
      "el": "Κόκκινο και πρόβειο κρέας, πικάντικα τυριά",
      "en": "Red meat and lamb, spicy cheese"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα με μωβ ανταύγειες και έντονο άρωμα με νότες βατόμουρου και δαμάσκηνου. Κρασί με σώμα, ισορροπημένη γεύση και έντονη επίγευση.",
      "en": "Intense red with purple reflections and a strong nose of blackberry and plum. Full-bodied and balanced with an intense finish."
    },
    "pairing": {
      "el": "Ιδανικό για πιάτα με βάση το κόκκινο και το πρόβειο κρέας. Συνδυάζεται τέλεια με ώριμα και πικάντικα τυριά.",
      "en": "Ideal with red meat and lamb dishes; pairs perfectly with mature, spicy cheeses."
    },
    "making": {
      "el": "Βιολογική καλλιέργεια Guyot, συγκομιδή αποκλειστικά με το χέρι. Ζύμωση περίπου 20 ημερών σε ανοξείδωτες δεξαμενές στους 24–28°C.",
      "en": "Organic Guyot vines, harvested by hand only. About 20 days of fermentation in stainless steel at 24–28°C."
    },
    "award": "Luca Maroni · 96 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "bdl-zero-white",
    "short": "BdL 0,0% White",
    "name": "Bacio della Luna Sparkling White 0.0%",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "alcoholFree": true,
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "grapes": "Glera",
    "abv": "0,0%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "cheese"
    ],
    "notes": {
      "el": "Τροπικά φρούτα, μάνγκο, ανανάς",
      "en": "Tropical fruit, mango, pineapple"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ψάρι, όστρακα, φρέσκα τυριά",
      "en": "Aperitif, fish, shellfish, fresh cheese"
    },
    "profile": {
      "el": "Λαμπερό κίτρινο με πράσινες ανταύγειες και μπουκέτο τροπικών φρούτων: φρούτο του πάθους, μάνγκο, ανανάς. Ζωηρό, με απαλή, κρεμώδη αφρώδη υφή και ελαφρώς γλυκιά, φρέσκια επίγευση.",
      "en": "Radiant yellow with green highlights and a bouquet of passion fruit, mango and pineapple. Bright and lively, with a delicate, creamy fizz and a lightly sweet yet fresh finish."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ, αλλά και με ψάρι, όστρακα ή ελαφριά ορεκτικά με φρέσκα λαχανικά. Ταιριάζει επίσης με φρέσκα τυριά.",
      "en": "Ideal as an aperitif, and with fish, shellfish or light starters of fresh vegetables. Also pairs well with fresh cheeses."
    },
    "awards": []
  },
  {
    "slug": "bdl-zero-rose",
    "short": "BdL 0,0% Rosé",
    "name": "Bacio della Luna Sparkling Rosé 0.0%",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "alcoholFree": true,
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "grapes": "Glera",
    "abv": "0,0%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Φράουλα, κόκκινα φρούτα",
      "en": "Strawberry, red fruit"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ψάρι, θαλασσινά",
      "en": "Aperitif, fish, seafood"
    },
    "profile": {
      "el": "Λαμπερό κερασί με βιολετί ανταύγειες και λεπτές φυσαλίδες. Φρουτώδες και ζωηρό, με φρέσκιες φράουλες και κόκκινα φρούτα, κρεμώδη αφρό και ελαφρώς γλυκιά, δροσερή επίγευση.",
      "en": "Bright cherry with violet highlights and delicate bubbles. Fruity and vibrant, with fresh strawberries and red fruit, a creamy mousse and a subtly sweet, fresh finish."
    },
    "pairing": {
      "el": "Τέλειο ως απεριτίφ και με κάθε είδους ψάρι και θαλασσινά.",
      "en": "Perfect as an aperitif and with all kinds of fish and seafood."
    },
    "awards": []
  },
  {
    "slug": "bdl-doc-brut",
    "short": "Prosecco DOC Brut",
    "name": "Bacio della Luna Prosecco DOC Brut",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOC",
    "grapes": "Glera",
    "abv": "11%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Λευκά λουλούδια, μήλο, ροδάκινο",
      "en": "White flowers, apple, peach"
    },
    "pairsShort": {
      "el": "Απεριτίφ, θαλασσινά",
      "en": "Aperitif, seafood"
    },
    "profile": {
      "el": "Λαμπερό αχυροκίτρινο με πράσινες ανταύγειες και λεπτό, επίμονο perlage. Λεπτή, φρουτώδης μύτη με λευκά λουλούδια· στο στόμα ώριμο μήλο και ροδάκινο με δροσερή επίγευση.",
      "en": "Brilliant straw yellow with green hints and a fine, persistent perlage. A delicate, fruity nose of white flowers; ripe apple and peach on the palate with a refreshing finish."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ και εξαιρετικό με θαλασσινά.",
      "en": "Ideal as an aperitif and an excellent match with seafood."
    },
    "awards": []
  },
  {
    "slug": "bdl-docg-brut",
    "short": "Prosecco DOCG Brut",
    "name": "Bacio della Luna Prosecco Valdobbiadene Superiore DOCG Brut",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOCG",
    "grapes": "Glera",
    "abv": "",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "celebration"
    ],
    "notes": {
      "el": "Λουλούδια, φρέσκα φρούτα",
      "en": "Flowers, fresh fruit"
    },
    "pairsShort": {
      "el": "Απεριτίφ, λευκό κρέας",
      "en": "Aperitif, white meat"
    },
    "profile": {
      "el": "Λεπτό και ισορροπημένο, με λαμπερό αχυροκίτρινο χρώμα. Ξεχωρίζει για το λουλουδάτο μπουκέτο και το άρωμα φρέσκων φρούτων· στο στόμα αρμονικό, με μοναδική φρεσκάδα.",
      "en": "Delicate and balanced, with a bright straw-yellow colour. It stands out for its floral bouquet and fresh-fruit aroma; harmonious on the palate, with a unique freshness."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ ή με λευκό κρέας. Το σωστό κρασί για κάθε ξεχωριστή περίσταση.",
      "en": "Ideal as an aperitif or with white meat. The right wine for every special occasion."
    },
    "making": {
      "el": "Τα σταφύλια καλλιεργούνται στους λόφους του Valdobbiadene, τρυγιούνται σε μικρά κιβώτια και πιέζονται απαλά. Ζύμωση σε ανοξείδωτες δεξαμενές στους 18–22°C και δεύτερη ζύμωση με τη μέθοδο Charmat.",
      "en": "The grapes are grown on the hills of Valdobbiadene, harvested into small crates and gently pressed. Fermented in stainless-steel tanks at 18–22°C, followed by a second fermentation using the Charmat method."
    },
    "awards": []
  },
  {
    "slug": "bdl-cartizze",
    "short": "Cartizze",
    "name": "Bacio della Luna Valdobbiadene Superiore di Cartizze DOCG",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "DOCG",
    "grapes": "Glera",
    "abv": "",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "celebration"
    ],
    "notes": {
      "el": "Ακακία, λευκά λουλούδια, φρέσκα φρούτα",
      "en": "Acacia, white flowers, fresh fruit"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ξεχωριστές περιστάσεις",
      "en": "Aperitif, special occasions"
    },
    "profile": {
      "el": "Κομψό, λεπτό και επίμονο perlage με αχυροκίτρινο χρώμα. Λεπτό μπουκέτο από ακακία και λευκά λουλούδια με άρωμα φρέσκων φρούτων· ζωηρή και χαρούμενη αίσθηση στο στόμα.",
      "en": "Elegant, with a fine and persistent perlage and a straw-yellow colour. A delicate bouquet of acacia and white flowers with a fresh-fruit aroma; lively and joyful on the palate."
    },
    "pairing": {
      "el": "Ιδανικό ως απεριτίφ, για κάθε ξεχωριστή περίσταση.",
      "en": "Ideal as an aperitif, for every special occasion."
    },
    "making": {
      "el": "Τα σταφύλια προέρχονται από τον λόφο του Cartizze, στην περιοχή του Valdobbiadene. Τρυγιούνται σε κιβώτια και πιέζονται απαλά· ζύμωση σε ανοξείδωτες δεξαμενές στους 18–22°C και αφρώδης οινοποίηση με τη μέθοδο Charmat. Dry.",
      "en": "The grapes come from the Cartizze hill in the Valdobbiadene area. Harvested into crates and gently pressed; fermented in stainless-steel tanks at 18–22°C and made sparkling by the Charmat method. Dry."
    },
    "awards": []
  },
  {
    "slug": "bdl-cuvee-bianco",
    "short": "Cuvée Bianco",
    "name": "Bacio della Luna Spumante Bianco",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "",
    "grapes": "Glera και άλλες ποικιλίες της Βόρειας Ιταλίας",
    "abv": "",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif"
    ],
    "notes": {
      "el": "Πράσινο μήλο, γλυσίνα, ροδάκινο",
      "en": "Green apple, wisteria, peach"
    },
    "pairsShort": {
      "el": "Απεριτίφ, κάθε περίσταση",
      "en": "Aperitif, any occasion"
    },
    "profile": {
      "el": "Λαμπερό αχυροκίτρινο χρώμα με λεπτό perlage. Έντονο και γοητευτικό μπουκέτο, με φρέσκο πράσινο μήλο, γλυσίνα και ροδάκινο· στο στόμα πλούσιο και έντονο.",
      "en": "Bright straw yellow with a fine perlage. An intense, charming bouquet of fresh green apple, wisteria and peach; rich and intense on the palate."
    },
    "pairing": {
      "el": "Ιδανικό για κάθε περίσταση, τέλειο ως απεριτίφ ή με ελαφριά πιάτα.",
      "en": "Ideal for any occasion, perfect as an aperitif or with light dishes."
    },
    "making": {
      "el": "Μετά τον τρύγο τα σταφύλια πιέζονται απαλά για τον «Mosto Fiore». Μετά την καθίζηση και το φιλτράρισμα, ζύμωση με επιλεγμένες ζύμες σε ελεγχόμενη θερμοκρασία· η cuvée αναμειγνύεται πριν από τη δεύτερη ζύμωση σε δεξαμενή πίεσης. Brut.",
      "en": "After harvest the grapes are gently pressed to obtain the “Mosto Fiore”. After settling and filtering, it is fermented with selected yeasts at a controlled temperature; the cuvée is blended before the second fermentation in a pressure tank. Brut."
    },
    "awards": []
  },
  {
    "slug": "bdl-cuvee-rose",
    "short": "Cuvée Rosé",
    "name": "Bacio della Luna Spumante Rosato",
    "maker": "Bacio della Luna",
    "type": "sparkling",
    "region": {
      "el": "Βένετο",
      "en": "Veneto"
    },
    "appellation": "",
    "grapes": "Glera, Pinot Nero",
    "abv": "",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif"
    ],
    "notes": {
      "el": "Φρουτώδες, νότες βιολέτας",
      "en": "Fruity, hints of violet"
    },
    "pairsShort": {
      "el": "Ορεκτικά, πρώτα πιάτα",
      "en": "Starters, first courses"
    },
    "profile": {
      "el": "Πολύ φρέσκο και ισορροπημένο, με ροζ χρώμα και λεπτό, επίμονο perlage. Φρουτώδες άρωμα με διακριτικές νότες βιολέτας· στο στόμα φρέσκο και αφρώδες, με καλό σώμα και τη σωστή αλμυράδα.",
      "en": "Very fresh and balanced, with a pink colour and a fine, persistent perlage. A fruity aroma with subtle hints of violet; fresh and sparkling on the palate, with good body and just the right savouriness."
    },
    "pairing": {
      "el": "Ιδανικό με ορεκτικά, πρώτα πιάτα και ήπιας γεύσης φαγητά.",
      "en": "Ideal with starters, first courses and mildly flavoured dishes."
    },
    "making": {
      "el": "Τα λευκά σταφύλια πιέζονται απαλά, ενώ τα κόκκινα κάνουν σύντομη εκχύλιση. Ο λευκός μούστος αναμειγνύεται με μικρό ποσοστό κόκκινου κρασιού και ζυμώνεται σε ειδικές δεξαμενές· η ζύμωση σταματά με ψύξη και ακολουθεί παραμονή στις οινολάσπες. Brut.",
      "en": "The white grapes are gently pressed while the red grapes undergo a short maceration. The white must is blended with a small share of red wine and fermented in special tanks; fermentation is stopped by chilling, followed by a rest on the lees. Brut."
    },
    "awards": []
  },
  {
    "slug": "nebbiolo",
    "short": "Langhe Nebbiolo",
    "name": "Langhe DOC Nebbiolo",
    "maker": "Casali del Barone",
    "type": "red",
    "region": {
      "el": "Πιεμόντε",
      "en": "Piedmont"
    },
    "appellation": "DOC",
    "grapes": "Nebbiolo",
    "abv": "13,5%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Κεράσι, βιολέτα, ξύλο",
      "en": "Cherry, violet, wood"
    },
    "pairsShort": {
      "el": "Κρέας Πιεμόντε, ώριμα και μπλε τυριά",
      "en": "Piedmont mains, mature and blue cheese"
    },
    "profile": {
      "el": "Κόκκινο με ανταύγειες γρανάτη. Στη μύτη κόκκινα φρούτα, κεράσι, βύσσινο, βιολέτα και τριτογενή αρώματα ξύλου. Στο στόμα γεμάτο, πλούσιο σε τανίνες, με επιστροφή κόκκινων φρούτων.",
      "en": "Red with garnet hints. On the nose red fruit (cherry, black cherry), violet and tertiary wood notes. Full and rich in tannins, with red fruit returning on the palate."
    },
    "pairing": {
      "el": "Ιδανικό με παραδοσιακά κυρίως πιάτα του Πιεμόντε και με ώριμα και μπλε τυριά.",
      "en": "Ideal with traditional Piedmont main courses and with seasoned and blue cheeses."
    },
    "awards": []
  },
  {
    "slug": "lagrein",
    "short": "Lagrein",
    "name": "Lagrein Alto Adige DOC",
    "maker": "Kellerei Auer",
    "type": "red",
    "region": {
      "el": "Άλτο Άντιτζε",
      "en": "Alto Adige"
    },
    "appellation": "DOC",
    "grapes": "Lagrein",
    "abv": "13%",
    "serve": "14–16°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Βιολέτα, βατόμουρο",
      "en": "Violet, blackberry"
    },
    "pairsShort": {
      "el": "Κόκκινο και κοκκινιστό κρέας, κυνήγι, πικάντικα τυριά",
      "en": "Red and braised meat, game, spicy cheese"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα με ευχάριστο μπουκέτο βιολέτας και βατόμουρου. Στο στόμα γεμάτο και αρμονικό, με απαλές τανίνες.",
      "en": "Intense ruby red with a pleasant violet and blackberry bouquet. Full-bodied and harmonious, with soft tannins."
    },
    "pairing": {
      "el": "Εξαιρετικό με κόκκινο και κοκκινιστό κρέας, κυνήγι, ώριμα και πικάντικα τυριά.",
      "en": "Excellent with red and braised meat, game, and matured and spicy cheeses."
    },
    "awards": []
  },
  {
    "slug": "ma-chardonnay",
    "short": "Chardonnay BIO",
    "name": "Masso Antico Chardonnay Salento IGT BIO",
    "maker": "Masso Antico",
    "type": "white",
    "organic": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT · BIO",
    "grapes": "Chardonnay",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "cheese"
    ],
    "notes": {
      "el": "Μήλο, αχλάδι, άνθη σπάρτου, ορυκτότητα",
      "en": "Apple, pear, broom, minerality"
    },
    "pairsShort": {
      "el": "Απεριτίφ, οστρακοειδή, ψάρι, φρέσκα τυριά",
      "en": "Aperitif, shellfish, fish, fresh cheese"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα. Στη μύτη λευκόσαρκα φρούτα, όπως μήλο και αχλάδι, με άνθη σπάρτου. Στο στόμα καλή δομή και όγκος, με φυσική ορυκτότητα στην επίγευση.",
      "en": "Straw yellow. White-fleshed fruit such as apple and pear on the nose, with broom blossom. Good structure and breadth on the palate, with a natural mineral finish."
    },
    "pairing": {
      "el": "Εξαιρετικό ως απεριτίφ, ιδανικό με οστρακοειδή και ωμά λαχανικά. Συνοδεύει πρώτα και κύρια πιάτα με ψάρι και φρέσκα τυριά.",
      "en": "Excellent as an aperitif; ideal with shellfish and raw vegetables. Pairs with fish starters and mains and with fresh cheeses."
    },
    "awards": []
  },
  {
    "slug": "ma-verdeca",
    "short": "Verdeca Chardonnay",
    "name": "Masso Antico Verdeca Chardonnay Puglia IGT BIO",
    "maker": "Masso Antico",
    "type": "white",
    "organic": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT · BIO",
    "grapes": "Verdeca, Chardonnay",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "fish",
      "white",
      "cheese"
    ],
    "notes": {
      "el": "Εξωτικά φρούτα, ροδάκινο, τριαντάφυλλο",
      "en": "Exotic fruit, peach, rose"
    },
    "pairsShort": {
      "el": "Θαλασσινά, λαχανικά, φρέσκα τυριά",
      "en": "Seafood, vegetables, fresh cheese"
    },
    "profile": {
      "el": "Κιτρινοπράσινο με πράσινες ανταύγειες. Εκλεπτυσμένο αρωματικό προφίλ με εξωτικά φρούτα, ροδάκινο και διακριτικό τριαντάφυλλο. Δροσερό και αρμονικό, με ευχάριστη αλμυρότητα.",
      "en": "Greenish yellow with green reflections. A refined nose of exotic fruit, peach and a hint of rose. Fresh and harmonious, with a pleasant salinity and good balance."
    },
    "pairing": {
      "el": "Ιδανικό με πιάτα θαλασσινών, λαχανικών και φρέσκων τυριών.",
      "en": "Ideal with seafood, vegetable dishes and fresh cheeses."
    },
    "awards": []
  },
  {
    "slug": "ma-ice",
    "short": "Masso Antico ICE",
    "name": "Masso Antico ICE Salento IGT",
    "maker": "Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "abv": "",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "cheese",
      "white",
      "red"
    ],
    "notes": {
      "el": "Φράουλα, βύσσινο, δαμάσκηνο",
      "en": "Strawberry, sour cherry, plum"
    },
    "pairsShort": {
      "el": "Τυριά, ζυμαρικά με κόκκινη σάλτσα, ψητά κρέατα",
      "en": "Cheese, pasta with red sauce, grilled meat"
    },
    "profile": {
      "el": "Κόκκινο ρουμπινί με βιολετί ανταύγειες· μπουκέτο φράουλας, βύσσινου και αποξηραμένου δαμάσκηνου. Φτιαγμένο για το καλοκαίρι και σερβίρεται δροσερό.",
      "en": "Ruby red with violet reflections and a bouquet of strawberry, sour cherry and dried plum. Made for summer and served chilled."
    },
    "pairing": {
      "el": "Συνδυάζεται με πολλά πιάτα: τυριά, μακαρονάδες ή gnocchi με κόκκινη σάλτσα και ψητά κρέατα.",
      "en": "Pairs with a wide range of dishes: cheese, pasta or gnocchi with red sauce, and grilled meat."
    },
    "tip": {
      "el": "Το λογότυπο της ετικέτας γίνεται μπλε όταν το κρασί φτάσει στους 8°C.",
      "en": "The label logo turns blue when the wine reaches 8°C."
    },
    "awards": []
  },
  {
    "slug": "ma-negroamaro-ice",
    "short": "Negroamaro ICE",
    "name": "Masso Antico Negroamaro ICE Sparkling",
    "maker": "Masso Antico",
    "type": "sparkling",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "",
    "grapes": "Negroamaro",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Ροδάκινο, εξωτικά φρούτα, άγριο τριαντάφυλλο",
      "en": "Peach, exotic fruit, wild rose"
    },
    "pairsShort": {
      "el": "Απεριτίφ, θαλασσινά, ελαφριά ζυμαρικά",
      "en": "Aperitif, seafood, light pasta"
    },
    "profile": {
      "el": "Ανοιχτό αχυροκίτρινο με πρασινωπές ανταύγειες και λεπτό, επίμονο perlage. Στη μύτη ροδάκινο, εξωτικά φρούτα, αβοκάντο και ντελικάτα αρώματα άγριου τριαντάφυλλου. Φρέσκο και ισορροπημένο, με ζωηρές φυσαλίδες, ελαφριά γλυκύτητα και μακρά, αλμυρή επίγευση.",
      "en": "Pale straw yellow with greenish reflections and a fine, persistent perlage. On the nose, peach, exotic fruit, avocado and delicate wild-rose aromas. Fresh and balanced, with lively bubbles, a light sweetness and a long, savoury finish."
    },
    "pairing": {
      "el": "Τέλειο σε όλο το γεύμα, από απεριτίφ με θαλασσινά, τραγανά λαχανικά και φρέσκα τυριά μέχρι ελαφριά πιάτα ζυμαρικών όπως ντομάτα και βασιλικό.",
      "en": "Perfect throughout the meal, from an aperitif with seafood, crunchy vegetables and fresh cheeses to light pasta dishes such as tomato and basil."
    },
    "making": {
      "el": "Τα σταφύλια συλλέγονται με το χέρι στις αρχές Σεπτεμβρίου και πιέζονται απαλά, χωρίς εκχύλιση χρώματος και ταννινών. Αλκοολική ζύμωση στους 16°C με επιλεγμένες ζύμες, παλαίωση σε ανοξείδωτο χάλυβα και δευτερογενής ζύμωση 30 ημερών.",
      "en": "The grapes are hand-picked in early September and gently pressed, without extracting colour or tannins. Alcoholic fermentation at 16°C with selected yeasts, ageing in stainless steel and a 30-day secondary fermentation."
    },
    "awards": []
  },
  {
    "slug": "ma-primitivo",
    "short": "Primitivo",
    "name": "Masso Antico Primitivo del Salento IGT",
    "maker": "Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Primitivo",
    "abv": "13%",
    "serve": "16–18°C",
    "body": 5,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Ώριμα φρούτα, βανίλια",
      "en": "Ripe fruit, vanilla"
    },
    "pairsShort": {
      "el": "Ψητά και μαγειρευτά κρέατα, παλαιωμένα τυριά",
      "en": "Roast and braised meat, aged cheese"
    },
    "profile": {
      "el": "Ρουμπινί χρώμα και περίπλοκο μπουκέτο, από ώριμα φρούτα έως πικάντικες νότες βανίλιας στο τελείωμα.",
      "en": "Ruby red with a complex bouquet, from ripe fruit to spicy vanilla notes on the finish."
    },
    "pairing": {
      "el": "Ταιριάζει τέλεια με ψητά και μαγειρευτά κρέατα και παλαιωμένα τυριά.",
      "en": "Perfect with roast and braised meat and aged cheeses."
    },
    "award": "Luca Maroni · 99 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "99 βαθμοί",
          "en": "99 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "Berlin Wine Trophy 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "IWSC 2021",
        "what": {
          "el": "Χάλκινο",
          "en": "Bronze"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "ma-primitivo-rose",
    "short": "Primitivo Rosato",
    "name": "Masso Antico Primitivo Salento IGT Rosato",
    "maker": "Masso Antico",
    "type": "rose",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Primitivo",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Φράουλα, φρούτο του πάθους, λάιμ",
      "en": "Strawberry, passion fruit, lime"
    },
    "pairsShort": {
      "el": "Απεριτίφ, εξωτικά φρούτα, ψάρι",
      "en": "Aperitif, exotic fruit, fish"
    },
    "profile": {
      "el": "Κομψό ροζ χρώμα με αρώματα φράουλας, φρούτου του πάθους, λάιμ και πικάντικες μεσογειακές νότες. Γεμάτο, φρέσκο, με εξαιρετική οξύτητα και μακρά επίγευση.",
      "en": "Elegant pink with aromas of strawberry, passion fruit, lime and spicy Mediterranean notes. Full, fresh, with excellent acidity and a long, persistent finish."
    },
    "pairing": {
      "el": "Τέλειο ως απεριτίφ, συνδυάζεται με εξωτικά φρούτα και πιάτα με ψάρι.",
      "en": "Perfect as an aperitif; pairs with exotic fruit and fish dishes."
    },
    "award": "Luca Maroni · 97 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "97 βαθμοί",
          "en": "97 points"
        }
      },
      {
        "who": "Gilbert et Gaillard 2021",
        "what": {
          "el": "Χρυσό",
          "en": "Gold"
        }
      },
      {
        "who": "Global Rosé Masters 2021",
        "what": {
          "el": "Ασημί",
          "en": "Silver"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2020)",
      "en": "(2020 vintage)"
    }
  },
  {
    "slug": "ma-primitivo-bio",
    "short": "Primitivo Single Estate BIO",
    "name": "Masso Antico Primitivo Single Estate BIO",
    "maker": "Masso Antico",
    "type": "red",
    "organic": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "BIO",
    "grapes": "Primitivo",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [
      "meat"
    ],
    "notes": {
      "el": "Δαμάσκηνο, ώριμο κεράσι",
      "en": "Plum, ripe cherry"
    },
    "pairsShort": {
      "el": "Κόκκινο κρέας, ώριμα τυριά",
      "en": "Red meat, aged cheeses"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα, με φρουτώδεις νότες δαμάσκηνου και ώριμου κερασιού στη μύτη. Στον ουρανίσκο εξαιρετικά πλούσιο, αλλά ταυτόχρονα απαλό και βελούδινο, με μακρά επίγευση.",
      "en": "Intense ruby red, with fruity notes of plum and ripe cherry on the nose. Exceptionally rich on the palate yet soft and velvety, with a long finish."
    },
    "pairing": {
      "el": "Ταιριάζει τέλεια με μακαρονάδες με κόκκινη σάλτσα, κόκκινο κρέας, ρολά χοιρινού bombette pugliesi και ώριμα τυριά.",
      "en": "Pairs perfectly with pasta in red sauce, red meat, bombette pugliesi pork rolls and aged cheeses."
    },
    "making": {
      "el": "Τα σταφύλια καλλιεργούνται βιολογικά στον αμπελώνα Tenute Masso Antico, στην καρδιά του Salento. Οινοποίηση σε ανοξείδωτες δεξαμενές με ελεγχόμενη θερμοκρασία και, μετά τη μηλογαλακτική ζύμωση, παλαίωση 4 μηνών σε γαλλικά δρύινα βαρέλια (tonneaux).",
      "en": "The grapes are grown organically at the Tenute Masso Antico vineyard, in the heart of Salento. Vinified in temperature-controlled stainless-steel tanks and, after malolactic fermentation, aged for 4 months in French oak barrels (tonneaux)."
    },
    "awards": []
  },
  {
    "slug": "ma-rosso-zero",
    "short": "Rosso 0% αλκοόλ",
    "name": "Masso Antico Rosso Zero Alcohol",
    "maker": "Masso Antico",
    "type": "red",
    "alcoholFree": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "",
    "grapes": "Primitivo",
    "abv": "0%",
    "serve": "",
    "body": 0,
    "pairings": [
      "red",
      "white",
      "cheese"
    ],
    "notes": {
      "el": "Φράουλα, κεράσι, λεπτές τανίνες",
      "en": "Strawberry, cherry, fine tannins"
    },
    "pairsShort": {
      "el": "Ψητά κρέατα, ζυμαρικά με ντομάτα, τυριά",
      "en": "Grilled meat, tomato pasta, aged cheese"
    },
    "profile": {
      "el": "Στη μύτη κόκκινα φρούτα όπως φράουλα και κεράσι· στον ουρανίσκο καλή δομή με λεπτές τανίνες και μακρά επίγευση.",
      "en": "Red fruit such as strawberry and cherry on the nose; good structure on the palate with fine tannins and a long finish."
    },
    "pairing": {
      "el": "Συνοδεύει ψητά κρέατα, ζυμαρικά με σάλτσα ντομάτας και παλαιωμένα τυριά.",
      "en": "Pairs with grilled meat, pasta with tomato sauce and aged cheeses."
    },
    "awards": []
  },
  {
    "slug": "ma-bianco-zero",
    "short": "Bianco 0% αλκοόλ",
    "name": "Masso Antico Bianco Zero Alcohol",
    "maker": "Masso Antico",
    "type": "white",
    "alcoholFree": true,
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "",
    "grapes": "Fiano",
    "abv": "0%",
    "serve": "",
    "body": 0,
    "pairings": [
      "fish"
    ],
    "notes": {
      "el": "Τριαντάφυλλο, άνθη πορτοκαλιάς",
      "en": "Rose, orange blossom"
    },
    "pairsShort": {
      "el": "Θαλασσινά, λευκά κρέατα, σαλάτες",
      "en": "Seafood, white meat, salads"
    },
    "profile": {
      "el": "Στη μύτη λουλουδένιες νότες όπως τριαντάφυλλο και άνθη πορτοκαλιάς· στον ουρανίσκο καλή οξύτητα με διακριτική γλυκύτητα. Η επίγευση είναι καθαρή και μακράς διάρκειας.",
      "en": "Floral notes of rose and orange blossom on the nose; good acidity with a subtle sweetness on the palate. The finish is clean and long."
    },
    "pairing": {
      "el": "Ιδανικό με θαλασσινά finger foods, σαλάτα ρυζιού, λευκά κρέατα και φρέσκες σαλάτες.",
      "en": "Ideal with seafood finger food, rice salad, white meat and fresh salads."
    },
    "making": {
      "el": "Τα σταφύλια Fiano από τους αμπελώνες του Masso Antico στην Απουλία οινοποιούνται με την παραδοσιακή μέθοδο λευκής οινοποίησης. Η αποαλκοολοποίηση γίνεται με τεχνολογία μεμβρανών, που διατηρεί τη δομή και τα αρώματα· το νερό επανενσωματώνεται στο κρασί.",
      "en": "Fiano grapes from Masso Antico’s vineyards in Apulia are vinified by the traditional white-wine method. Dealcoholisation uses membrane technology, which preserves structure and aromas; the water is returned to the wine."
    },
    "awards": []
  },
  {
    "slug": "negroamaro-appassite",
    "short": "Negroamaro Appassite",
    "name": "Masso Antico Negroamaro Salento Appassite",
    "maker": "Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Negroamaro",
    "abv": "",
    "serve": "",
    "body": 5,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Ώριμα κόκκινα φρούτα, λουλούδια, μπαχαρικά",
      "en": "Ripe red fruit, flowers, spice"
    },
    "pairsShort": {
      "el": "Ψητό αρνί, κεφτεδάκια με σάλτσα, κόκκινο κρέας",
      "en": "Roast lamb, meatballs in sauce, red meat"
    },
    "profile": {
      "el": "Έντονο κόκκινο με μωβ ανταύγειες. Έντονα αρωματικό με ώριμα κόκκινα φρούτα, λουλούδια και μπαχαρικά. Στον ουρανίσκο ζεστό, βελούδινο και φρέσκο.",
      "en": "Intense red with purple reflections. Highly aromatic with ripe red fruit, flowers and spice. Warm, velvety and fresh on the palate."
    },
    "pairing": {
      "el": "Συνδυάζεται τέλεια με ψητό αρνί, κεφτεδάκια σε σάλτσα και κόκκινο κρέας.",
      "en": "Pairs perfectly with roast lamb, meatballs in sauce and red meat."
    },
    "awards": []
  },
  {
    "slug": "moscato-spumante",
    "short": "Moscato Spumante",
    "name": "Moscato Spumante Dolce",
    "maker": "Cavatina",
    "type": "sparkling",
    "region": {
      "el": "Τριβενέτο",
      "en": "Triveneto"
    },
    "appellation": "",
    "grapes": "Moscato",
    "abv": "8,5%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [],
    "notes": {
      "el": "Αρωματικό, γλυκό, αρμονικό",
      "en": "Aromatic, sweet, harmonious"
    },
    "pairsShort": {
      "el": "Φρούτα, επιδόρπια",
      "en": "Fruit, desserts"
    },
    "profile": {
      "el": "Έντονο αχυροκίτρινο χρώμα με λεπτό, αρωματικό μπουκέτο. Γλυκιά και αρμονική γεύση.",
      "en": "Intense straw yellow with a delicate, aromatic bouquet. Sweet and harmonious on the palate."
    },
    "pairing": {
      "el": "Τέλειο με φρούτα και επιδόρπια.",
      "en": "Perfect with fruit and desserts."
    },
    "awards": []
  },
  {
    "slug": "moscato-premium-rose",
    "short": "Moscato Premium Rosé",
    "name": "Moscato Premium Rosé",
    "maker": "Cavatina",
    "type": "sparkling",
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "grapes": "Moscato",
    "abv": "",
    "serve": "",
    "body": 0,
    "pairings": [],
    "notes": {
      "el": "Κεράσι, φρέσκα φρούτα",
      "en": "Cherry, fresh fruit"
    },
    "pairsShort": {
      "el": "Φρούτα, επιδόρπια",
      "en": "Fruit, desserts"
    },
    "profile": {
      "el": "Απαλό ροζ, διαυγές και λαμπερό, με ζωηρό perlage. Αρώματα κερασιού και φρέσκων φρούτων· γλυκιά, δροσερή γεύση με επίμονη επίγευση.",
      "en": "Soft, clear, bright pink with a lively perlage. Aromas of cherry and fresh fruit; sweet and fresh on the palate with a persistent finish."
    },
    "pairing": {
      "el": "Εξαιρετικό με φρούτα και επιδόρπια.",
      "en": "Excellent with fruit and desserts."
    },
    "awards": []
  },
  {
    "slug": "zero-sparkling-rose",
    "short": "Rivani Zero Rosé",
    "name": "Rivani Zero Alcohol Sparkling Rosé",
    "maker": "Rivani",
    "type": "sparkling",
    "alcoholFree": true,
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "abv": "0,0%",
    "serve": "4°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Κεράσι, φράουλα, κρεμώδης αφρός",
      "en": "Cherry, strawberry, creamy mousse"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ψάρι, θαλασσινά",
      "en": "Aperitif, fish, seafood"
    },
    "profile": {
      "el": "Έντονο κερασί με βιολετί αποχρώσεις και λεπτές φυσαλίδες. Πολύ φρουτώδες και φρέσκο, θυμίζει φράουλα, με κρεμώδη αφρό και ελαφρώς γλυκιά, δροσερή γεύση.",
      "en": "Intense cherry with violet hues and fine bubbles. Very fruity and fresh, recalling strawberry, with a creamy mousse and a slightly sweet but fresh taste."
    },
    "pairing": {
      "el": "Τέλειο ως απεριτίφ και με κάθε είδους ψάρι και θαλασσινά.",
      "en": "Perfect as an aperitif and with all kinds of fish and seafood."
    },
    "awards": []
  },
  {
    "slug": "rivani-pinot-rose",
    "short": "Pinot Rosé",
    "name": "Rivani Pinot Rosé",
    "maker": "Rivani",
    "type": "sparkling",
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "grapes": "Pinot Bianco, Pinot Nero",
    "abv": "11%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "celebration"
    ],
    "notes": {
      "el": "Μούρα",
      "en": "Berries"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ψάρι, πουλερικά",
      "en": "Aperitif, fish, poultry"
    },
    "profile": {
      "el": "Λεπτό ροζ χρώμα με χάλκινες ανταύγειες. Έντονο μπουκέτο με λεπτές νότες μούρων· πλούσια, καλά ισορροπημένη γεύση με ευχάριστη και επίμονη επίγευση.",
      "en": "Delicate pink with coppery reflections. An intense bouquet with delicate notes of berries; a rich, well-balanced taste with a pleasant, persistent finish."
    },
    "pairing": {
      "el": "Ιδανικό για ξεχωριστές στιγμές, ως απεριτίφ και με ντελικάτα πιάτα ή ελαφριά γεύματα από ψάρια και πουλερικά.",
      "en": "Ideal for special moments, as an aperitif and with delicate dishes or light meals of fish and poultry."
    },
    "making": {
      "el": "Cuvée από Pinot Bianco και Pinot Nero οινοποιημένο ροζέ. Διαβροχή 6–8 ωρών, απαλή πίεση και ζύμωση σε ανοξείδωτες δεξαμενές στους 16–18°C· αφρώδης οινοποίηση με τη μέθοδο Charmat. Extra Dry.",
      "en": "A cuvée of Pinot Bianco and Pinot Nero vinified as a rosé. 6–8 hours of maceration, gentle pressing and fermentation in stainless-steel tanks at 16–18°C; made sparkling by the Charmat method. Extra Dry."
    },
    "award": "Concours Mondial de Bruxelles 2021 – Ασημένιο",
    "awards": [
      {
        "what": {}
      },
      {
        "what": {}
      }
    ]
  },
  {
    "slug": "strawberry",
    "short": "Strawberry",
    "name": "Cavatina Premium Strawberry",
    "maker": "Cavatina",
    "type": "sparkling",
    "region": {
      "el": "",
      "en": ""
    },
    "appellation": "",
    "abv": "7,5%",
    "serve": "5–6°C",
    "body": 0,
    "pairings": [
      "dessert"
    ],
    "notes": {
      "el": "Φράουλα",
      "en": "Strawberry"
    },
    "pairsShort": {
      "el": "Γλυκά, μπισκότα, φρέσκα φρούτα",
      "en": "Desserts, biscuits, fresh fruit"
    },
    "profile": {
      "el": "Ροζέ χρώμα με λεπτό και επίμονο perlage. Ευχάριστο άρωμα φράουλας με στόμα ελαφρώς γλυκό και ισορροπημένο.",
      "en": "Rosé in colour with a fine, persistent perlage. A pleasant strawberry aroma, with a slightly sweet, balanced palate."
    },
    "pairing": {
      "el": "Ιδανικό με γλυκά επιδόρπια, μπισκότα και φρέσκα φρούτα.",
      "en": "Ideal with sweet desserts, biscuits and fresh fruit."
    },
    "making": {
      "el": "Λευκή οινοποίηση από σταφύλια λευκών ποικιλιών και ζύμωση με τη μέθοδο Charmat. Το φυσικό άρωμα φράουλας προστίθεται πριν την εμφιάλωση και παραμένει για ένα μήνα.",
      "en": "White vinification of white grape varieties and fermentation by the Charmat method. Natural strawberry flavour is added before bottling and left to rest for one month."
    },
    "awards": []
  },
  {
    "slug": "i-clasti",
    "short": "I Clasti",
    "name": "I Clasti Primitivo Susumaniello Salento IGT",
    "maker": "Tenute Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Primitivo, Susumaniello",
    "abv": "14,5%",
    "serve": "16–18°C",
    "body": 5,
    "pairings": [
      "red",
      "cheese",
      "white"
    ],
    "notes": {
      "el": "Κόκκινα φρούτα, μπαχαρικά, ζεστό",
      "en": "Red fruit, spice, warm"
    },
    "pairsShort": {
      "el": "Πρώτα πιάτα, ψητό κρέας, παλαιωμένα τυριά",
      "en": "First courses, grilled meat, aged cheese"
    },
    "profile": {
      "el": "Σκούρο κόκκινο χρώμα με βιολετί αποχρώσεις. Σύνθετο μπουκέτο με αρώματα κόκκινων φρούτων και νότες μπαχαρικών. Στο στόμα ζεστό και έντονο.",
      "en": "Deep red with violet hues. A complex bouquet of red fruit and spicy notes. Warm and intense on the palate."
    },
    "pairing": {
      "el": "Ιδανικό με πρώτα πιάτα, κρέας στη σχάρα και παλαιωμένα τυριά.",
      "en": "Ideal with first courses, grilled meat and aged cheeses."
    },
    "making": {
      "el": "Αποτέλεσμα προσεκτικής καλλιέργειας στο αμπέλι, με τις αρχές της παραδοσιακής γεωργίας και τρύγο με το χέρι. Το έδαφος, με κλαστικά θραύσματα, δίνει στο κρασί αυθεντικότητα δεμένη με τον τόπο του. Στο στόμα η γεμάτη δομή του δένει αρμονικά.",
      "en": "The result of careful work in the vineyard following traditional farming principles, with hand harvesting. Soil rich in clastic fragments gives the wine an authenticity tied to its place; its full body comes together harmoniously on the palate."
    },
    "awards": []
  },
  {
    "slug": "manduria-doc",
    "short": "Primitivo di Manduria",
    "name": "Primitivo di Manduria DOC",
    "maker": "Tenute Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "DOC",
    "grapes": "Primitivo",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Ώριμα φρούτα, μπαχαρικά, ισορροπημένο",
      "en": "Ripe fruit, spice, balanced"
    },
    "pairsShort": {
      "el": "Ψητό κρέας, κυνήγι",
      "en": "Grilled meat, game"
    },
    "profile": {
      "el": "Ρουμπινί χρώμα με μπουκέτο ώριμων φρούτων και νότες μπαχαρικών. Λεπτό και ισορροπημένο.",
      "en": "Ruby red with a bouquet of ripe fruit and spicy notes. Delicate and balanced."
    },
    "pairing": {
      "el": "Εξαιρετικό με ψητά κρέατα και κυνήγι.",
      "en": "Excellent with grilled meat and game."
    },
    "making": {
      "el": "Μόνο σταφύλια Primitivo, που συλλέγονται με το χέρι στα τέλη Αυγούστου από πρέμνα με το παραδοσιακό σύστημα alberello. Η ζύμωση γίνεται σε ελεγχόμενη θερμοκρασία 33°C για 25 ημέρες και το κρασί παλαιώνει σε δρύινα βαρέλια για περίπου 4 μήνες.",
      "en": "Only Primitivo grapes, hand-picked in late August from traditional alberello vines. Fermented at a controlled 33°C for 25 days, then aged in oak barrels for about 4 months."
    },
    "awards": []
  },
  {
    "slug": "manduria-riserva",
    "short": "Manduria Riserva",
    "name": "Primitivo di Manduria DOC Riserva",
    "maker": "Tenute Masso Antico",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "DOC Riserva",
    "grapes": "Primitivo",
    "abv": "15%",
    "serve": "16–18°C",
    "body": 5,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Ώριμα φρούτα, μπαχαρικά, βελούδινο",
      "en": "Ripe fruit, spice, velvety"
    },
    "pairsShort": {
      "el": "Πιάτα Απουλίας, ψητό ή κοκκινιστό κρέας, μαύρη σοκολάτα",
      "en": "Apulian dishes, grilled or braised meat, dark chocolate"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα με βιολετί ανταύγειες και μπουκέτο ώριμων φρούτων με νότες μπαχαρικών. Η ωρίμαση σε barrique το κάνει μαλακό και δομημένο.",
      "en": "Intense red with violet reflections and a bouquet of ripe fruit and spice. Barrique ageing makes it soft and structured."
    },
    "pairing": {
      "el": "Τέλειο με γευστικά παραδοσιακά πιάτα της Απουλίας και κρέατα στη σχάρα, ψητά ή κοκκινιστά. Αξίζει να δοκιμαστεί και με μαύρη σοκολάτα.",
      "en": "Perfect with flavourful traditional Apulian dishes and grilled, roast or braised meat. Also worth trying with extra-dark chocolate."
    },
    "making": {
      "el": "Τα αμπέλια Primitivo καλλιεργούνται με το παραδοσιακό σύστημα alberello και τρυγούνται με το χέρι στα τέλη Αυγούστου. Ζύμωση σε ελεγχόμενη θερμοκρασία 33°C για 25 ημέρες και παλαίωση σε barrique για τουλάχιστον 12 μήνες.",
      "en": "Primitivo vines trained in the traditional alberello system, hand-harvested in late August. Fermented at a controlled 33°C for 25 days and aged in barrique for at least 12 months."
    },
    "awards": []
  },
  {
    "slug": "boccantino",
    "short": "Boccantino",
    "name": "Boccantino Nero di Troia Primitivo Puglia IGT",
    "maker": "Boccantino",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "IGT",
    "grapes": "Nero di Troia, Primitivo",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 4,
    "pairings": [
      "red",
      "cheese"
    ],
    "notes": {
      "el": "Μπαχαρικά, φρουτώδες, βελούδινο",
      "en": "Spice, fruity, velvety"
    },
    "pairsShort": {
      "el": "Κόκκινο και ψητό κρέας, τυριά, αλλαντικά",
      "en": "Red and grilled meat, cheese, charcuterie"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα με φρέσκο και έντονο μπουκέτο από πικάντικες και φρουτώδεις νότες. Στρογγυλή, απαλή και βελούδινη γεύση.",
      "en": "Intense red with a fresh, vivid bouquet of spicy and fruity notes. Round, soft and velvety on the palate."
    },
    "pairing": {
      "el": "Συνδυάζεται τέλεια με κόκκινο και ψητό κρέας, εξαιρετικό με παλαιωμένα τυριά και αλλαντικά.",
      "en": "Pairs perfectly with red and grilled meat; excellent with aged cheeses and charcuterie."
    },
    "making": {
      "el": "Η συγκομιδή γίνεται με το χέρι στις αρχές Σεπτεμβρίου. Ζύμωση σε ελεγχόμενη θερμοκρασία 20–22°C· μέρος του κρασιού παλαιώνει σε ανοξείδωτες δεξαμενές και μέρος σε μεγάλα δρύινα βαρέλια, και το χαρμάνι ωριμάζει τελικά 3 μήνες σε ανοξείδωτες δεξαμενές.",
      "en": "Hand-harvested in early September. Fermented at a controlled 20–22°C; part of the wine ages in stainless steel and part in large oak barrels, and the blend then matures a final 3 months in stainless steel."
    },
    "award": "Luca Maroni · 96 βαθμοί",
    "awards": [
      {
        "who": "Luca Maroni",
        "what": {
          "el": "96 βαθμοί",
          "en": "96 points"
        }
      }
    ],
    "awardsNote": {
      "el": "(σοδειά 2019)",
      "en": "(2019 vintage)"
    }
  },
  {
    "slug": "bdm-salice",
    "short": "Salice Salentino Riserva",
    "name": "Salice Salentino DOC Riserva",
    "maker": "Brunilde di Menzione",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "DOC Riserva",
    "grapes": "Negroamaro και άλλες ερυθρές ποικιλίες του Ιονίου τόξου",
    "abv": "13,5%",
    "serve": "18–20°C",
    "body": 0,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Άγρια μούρα, μαρμελάδα βατόμουρο, βανίλια, μαύρη σοκολάτα",
      "en": "Wild berries, blackberry jam, vanilla, dark chocolate"
    },
    "pairsShort": {
      "el": "Πιάτα Απουλίας, ζυμαρικά με λουκάνικο και μανιτάρια, αρνί",
      "en": "Apulian dishes, pasta with sausage and mushrooms, lamb"
    },
    "profile": {
      "el": "Κόκκινο κρασί με ρουμπινί χρώμα και γρανατί ανταύγειες. Ευχάριστο, φρουτώδες μπουκέτο που θυμίζει άγρια μούρα και μαρμελάδα βατόμουρο. Στο στόμα σύνθετη, γεμάτη δομή με το αποτύπωμα του ξύλου, νότες βανίλιας και μαύρης σοκολάτας, χωρίς να υπερβάλλει στο ξύλο, και μια διακριτική επιστροφή μπαχαρικών στην επίγευση.",
      "en": "Ruby red with garnet reflections and a pleasant, fruity bouquet of wild berries and blackberry jam. On the palate a complex, enveloping structure marked by wood, with notes of vanilla and dark chocolate, never overly oaky, and a slight return of spice on the finish."
    },
    "pairing": {
      "el": "Εξαιρετικό με παραδοσιακά πιάτα της Απουλίας, όπως trofie στον φούρνο και cavatelli με λουκάνικο και μανιτάρια. Ταιριάζει επίσης με κύρια πιάτα όπως κοκκινιστά ρολά κρέατος ή αρνί με αρωματικά βότανα.",
      "en": "Excellent with typical Apulian dishes such as baked trofie and cavatelli with sausage and mushrooms. Also pairs well with stewed meat rolls or lamb with aromatic herbs."
    },
    "making": {
      "el": "Μετά τον τρύγο και τη ζύμωση, το κρασί ξεκουράζεται για αρκετούς μήνες σε ανοξείδωτες δεξαμενές και ωριμάζει για 24 μήνες, από τους οποίους 6 σε ξύλο. Στη συνέχεια εμφιαλώνεται και παλαιώνει λίγους μήνες ακόμη στη φιάλη.",
      "en": "After harvest and fermentation the wine rests for several months in steel, then matures for 24 months, 6 of them in wood. It is then bottled and aged for a few more months in bottle."
    },
    "awards": []
  },
  {
    "slug": "bdm-manduria",
    "short": "Primitivo di Manduria",
    "name": "Primitivo di Manduria DOC",
    "maker": "Brunilde di Menzione",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "DOC",
    "grapes": "Primitivo",
    "abv": "14%",
    "serve": "16–18°C",
    "body": 0,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Ώριμα φρούτα, μπαχαρικά, ισορροπημένο",
      "en": "Ripe fruit, spice, balanced"
    },
    "pairsShort": {
      "el": "Κυνήγι, κρέας στη σχάρα",
      "en": "Game, grilled meat"
    },
    "profile": {
      "el": "Έντονο ρουμπινί χρώμα με μπουκέτο ώριμων φρούτων και νότες μπαχαρικών. Στο στόμα λεπτό, ισορροπημένο και αρμονικό.",
      "en": "Intense ruby red with a bouquet of ripe fruit and spicy notes. Delicate, well balanced and harmonious on the palate."
    },
    "pairing": {
      "el": "Τέλειο με κυνήγι και κρέας στη σχάρα.",
      "en": "Perfect with game and grilled meat."
    },
    "making": {
      "el": "Αποκλειστικά από Primitivo, από αμπέλια με το παραδοσιακό σύστημα alberello, που τρυγούνται με το χέρι στα τέλη Αυγούστου. Ζύμωση σε ελεγχόμενη θερμοκρασία 33°C για περίπου 25 ημέρες και ωρίμαση σε barrique για περίπου 4 μήνες.",
      "en": "Made only from Primitivo grown with the traditional alberello method and hand-harvested at the end of August. Fermented at a controlled 33°C for about 25 days, then aged in oak barriques for about 4 months."
    },
    "awards": []
  },
  {
    "slug": "bdm-manduria-riserva",
    "short": "Manduria Riserva",
    "name": "Primitivo di Manduria DOC Riserva",
    "maker": "Brunilde di Menzione",
    "type": "red",
    "region": {
      "el": "Απουλία",
      "en": "Apulia"
    },
    "appellation": "DOC Riserva",
    "grapes": "Primitivo",
    "abv": "15%",
    "serve": "16–18°C",
    "body": 0,
    "pairings": [
      "red"
    ],
    "notes": {
      "el": "Ώριμα φρούτα, μπαχαρικά, μαλακό",
      "en": "Ripe fruit, spice, smooth"
    },
    "pairsShort": {
      "el": "Πιάτα Απουλίας, ψητό ή κοκκινιστό κρέας, μαύρη σοκολάτα",
      "en": "Apulian dishes, roast or stewed meat, dark chocolate"
    },
    "profile": {
      "el": "Έντονο κόκκινο χρώμα με βιολετί ανταύγειες και μπουκέτο ώριμων φρούτων με νότες μπαχαρικών. Η ωρίμαση σε barrique το κάνει καλοδομημένο και μαλακό.",
      "en": "Intense red with purple reflections and a bouquet of ripe fruit and spicy notes. Ageing in barrique makes it well structured and smooth."
    },
    "pairing": {
      "el": "Ταιριάζει με γευστικά παραδοσιακά πιάτα της Απουλίας και με κρέας ψητό, στη σχάρα ή κοκκινιστό. Αξίζει να δοκιμαστεί και με πολύ μαύρη σοκολάτα.",
      "en": "Pairs with savoury traditional Apulian dishes and roasted, grilled and stewed meat. Also worth trying with extra-dark chocolate."
    },
    "making": {
      "el": "Τα αμπέλια Primitivo καλλιεργούνται με το παραδοσιακό σύστημα alberello και τρυγούνται με το χέρι στα τέλη Αυγούστου. Ζύμωση σε ελεγχόμενη θερμοκρασία 33°C για περίπου 25 ημέρες και ωρίμαση σε barrique για τουλάχιστον 12 μήνες.",
      "en": "Primitivo vines grown with the traditional alberello method, hand-harvested at the end of August. Fermented at a controlled 33°C for about 25 days, then aged in barrique for at least 12 months."
    },
    "awards": []
  },
  {
    "slug": "auer-aurora",
    "short": "Aurora Passito",
    "name": "Aurora Vigneti delle Dolomiti IGT Passito",
    "maker": "Kellerei Auer",
    "type": "white",
    "region": {
      "el": "Άλτο Άντιτζε",
      "en": "Alto Adige"
    },
    "appellation": "IGT",
    "grapes": "Sauvignon Blanc",
    "abv": "11%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "dessert",
      "cheese"
    ],
    "notes": {
      "el": "Μέλι, κερί μέλισσας, βερίκοκο, ροδάκινο κομπόστα",
      "en": "Honey, beeswax, apricot, peach in syrup"
    },
    "pairsShort": {
      "el": "Επιδόρπια, μπισκότα, γλυκά, μπλε τυριά",
      "en": "Desserts, biscuits, pastries, blue cheese"
    },
    "profile": {
      "el": "Χρυσαφένιο χρώμα με κεχριμπαρένιες ανταύγειες. Στη μύτη έντονα αρώματα μελιού, κεριού μέλισσας, βερίκοκου και ροδάκινου κομπόστα. Στο στόμα γεμάτο, με ζωηρή εσπεριδοειδή οξύτητα που ισορροπεί τη γλυκύτητα του μελιού.",
      "en": "Golden with amber reflections. Intense aromas of honey, beeswax, apricot and peach in syrup. Full and satisfying on the palate, with a vibrant citrus acidity that balances the sweetness of the honey."
    },
    "pairing": {
      "el": "Ταιριάζει τέλεια με επιδόρπια, μπισκότα και γλυκά, καθώς και με μπλε τυριά.",
      "en": "Pairs perfectly with desserts, biscuits and pastries, as well as blue cheeses."
    },
    "making": {
      "el": "Τα ώριμα σταφύλια τρυγούνται με το χέρι και αφήνονται να λιαστούν σε μικρά τελάρα, σε χώρους με ελεγχόμενο αερισμό, ώστε να συμπυκνωθούν τα σάκχαρα και τα αρώματα. Η ευγενής σήψη ενισχύει τη συμπύκνωση. Το πολύ γλυκό γλεύκος ζυμώνεται με επιλεγμένες ζύμες και το κρασί ωριμάζει σε δρύινα tonneaux πριν εμφιαλωθεί.",
      "en": "Ripe grapes are hand-harvested and dried in small crates in rooms with controlled ventilation, concentrating sugars and aromas; noble rot adds to the concentration. The sugar-rich must is fermented with selected yeasts and the wine is aged in oak tonneaux before bottling."
    },
    "awards": []
  },
  {
    "slug": "auer-gewurz",
    "short": "Gewürztraminer",
    "name": "Gewürztraminer Alto Adige DOC",
    "maker": "Kellerei Auer",
    "type": "white",
    "region": {
      "el": "Άλτο Άντιτζε",
      "en": "Alto Adige"
    },
    "appellation": "DOC",
    "grapes": "Gewürztraminer",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white"
    ],
    "notes": {
      "el": "Εξωτικά φρούτα, τριαντάφυλλο, πορτοκάλι, μέντα, πιπέρι",
      "en": "Exotic fruit, rose, orange, mint, pepper"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ορεκτικά, ψάρι, λευκό κρέας, λαχανικά",
      "en": "Aperitif, starters, fish, white meat, vegetables"
    },
    "profile": {
      "el": "Έντονο αχυροκίτρινο χρώμα με χρυσαφένιες ανταύγειες. Αρωματικό και πλούσιο μπουκέτο, γεμάτο και έντονο, με νότες εξωτικών φρούτων, λουλουδιών, εσπεριδοειδών και μπαχαρικών, όπως τριαντάφυλλο, πορτοκάλι, μέντα και πιπέρι. Στο στόμα σύνθετο, με επίμονη, αρωματική και ορυκτή επίγευση.",
      "en": "Intense straw yellow with golden hints. An aromatic, rich, full and intense bouquet of exotic fruit, flowers, citrus and spice, such as rose, orange, mint and pepper. Complex on the palate with a persistent, aromatic and mineral finish."
    },
    "pairing": {
      "el": "Τέλειο ως απεριτίφ ή με ορεκτικά, ψάρι, λευκό κρέας και λαχανικά.",
      "en": "Perfect as an aperitif, or with starters, fish, white meat and vegetables."
    },
    "making": {
      "el": "Τα σταφύλια τρυγούνται σε μικρά τελάρα και αφήνονται σε εκχύλιση 6–8 ωρών. Ακολουθεί ήπια πίεση και οινοποίηση με επιλεγμένες ζύμες σε ανοξείδωτες δεξαμενές σε ελεγχόμενη θερμοκρασία 14–16°C.",
      "en": "Grapes are harvested into small boxes and macerated for 6–8 hours, then softly pressed. The must is fermented with selected yeasts in stainless steel at a controlled 14–16°C."
    },
    "awards": []
  },
  {
    "slug": "auer-pinot-bianco",
    "short": "Pinot Bianco",
    "name": "Pinot Bianco Alto Adige DOC",
    "maker": "Kellerei Auer",
    "type": "white",
    "region": {
      "el": "Άλτο Άντιτζε",
      "en": "Alto Adige"
    },
    "appellation": "DOC",
    "grapes": "Pinot Bianco",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish"
    ],
    "notes": {
      "el": "Μήλο, αχλάδι, γλυσίνα, ορυκτό",
      "en": "Apple, pear, wisteria, mineral"
    },
    "pairsShort": {
      "el": "Ελαφριά ορεκτικά, ψάρι γλυκού νερού, κρέμες οστρακοειδών, σούσι",
      "en": "Light starters, freshwater fish, shellfish creams, sushi"
    },
    "profile": {
      "el": "Αχυροκίτρινο χρώμα με πρασινωπές ανταύγειες, με φρουτώδεις νότες μήλου και αχλαδιού και ανθικές νότες γλυσίνας. Στο στόμα φρέσκο, μαλακό και κομψό, με καλή οξύτητα και επίμονη, διακριτική ορυκτή επίγευση.",
      "en": "Straw yellow with greenish hints, with fruity notes of apple and pear and floral wisteria. Fresh, soft and elegant on the palate, with good acidity and a persistent, delicate mineral finish."
    },
    "pairing": {
      "el": "Τέλειο με ελαφριά ορεκτικά, ιδιαίτερα με ψάρι γλυκού νερού, κρέμες οστρακοειδών και σούσι.",
      "en": "Perfect with light starters, especially freshwater fish, shellfish creams and sushi."
    },
    "making": {
      "el": "Μετά τον τρύγο τα σταφύλια πιέζονται απαλά και οινοποιούνται ως λευκό σε ανοξείδωτες δεξαμενές σε ελεγχόμενη θερμοκρασία 16–18°C, χωρίς μηλογαλακτική ζύμωση.",
      "en": "After harvest the grapes are gently pressed and vinified as a white wine in stainless steel at a controlled 16–18°C, without malolactic fermentation."
    },
    "awards": []
  },
  {
    "slug": "auer-chardonnay",
    "short": "Chardonnay",
    "name": "Chardonnay Alto Adige DOC",
    "maker": "Kellerei Auer",
    "type": "white",
    "region": {
      "el": "Άλτο Άντιτζε",
      "en": "Alto Adige"
    },
    "appellation": "DOC",
    "grapes": "Chardonnay",
    "abv": "13%",
    "serve": "8–10°C",
    "body": 0,
    "pairings": [
      "aperitif",
      "fish",
      "white"
    ],
    "notes": {
      "el": "Βανίλια, τροπικά φρούτα, κίτρινα άνθη",
      "en": "Vanilla, tropical fruit, yellow blossom"
    },
    "pairsShort": {
      "el": "Απεριτίφ, ζυμαρικά, ψάρι, λευκό κρέας",
      "en": "Aperitif, pasta, fish, white meat"
    },
    "profile": {
      "el": "Ανοιχτό αχυροκίτρινο χρώμα με τα κλασικά αρώματα του Chardonnay: βανίλια, τροπικά φρούτα και κίτρινα άνθη. Στο στόμα πλούσιο και επίμονο, με καλή ισορροπία ανάμεσα σε σώμα και οξύτητα.",
      "en": "Pale straw yellow with classic Chardonnay aromas of vanilla, tropical fruit and yellow blossom. Rich and long on the palate, with a well-balanced interplay of body and acidity."
    },
    "pairing": {
      "el": "Εξαιρετικό ως απεριτίφ και ταιριάζει με ζυμαρικά, πιάτα με ψάρι και λευκό κρέας.",
      "en": "Excellent as an aperitif and well suited to pasta, fish courses and white meat."
    },
    "making": {
      "el": "Τα σταφύλια πιέζονται απαλά και το γλεύκος οινοποιείται ως λευκό σε ανοξείδωτες δεξαμενές σε ελεγχόμενη θερμοκρασία 16–18°C. Ακολουθεί ωρίμαση και σταθεροποίηση πριν από την εμφιάλωση σε χαμηλή θερμοκρασία.",
      "en": "The grapes are gently pressed and the must is vinified as a white wine in stainless steel at a controlled 16–18°C, then aged and stabilised before cold bottling."
    },
    "awards": []
  }
];
