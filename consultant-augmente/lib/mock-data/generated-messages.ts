import type { GeneratedEngagement } from "../types";

export const mockGeneratedEngagements: GeneratedEngagement[] = [
  // Marc Leblanc / Allianz (c1)
  {
    contactId: "c1",
    messages: [
      {
        tone: "professional",
        body: "Marc,\n\nFélicitations pour ton nouveau rôle de Head of Sales chez Allianz ! J'ai vu qu'Allianz vient d'annoncer un partenariat stratégique avec Salesforce sur l'IA. Je repensais à notre échange de septembre dernier sur l'automatisation des processus commerciaux.\n\nJe serais curieux d'échanger sur comment vous envisagez d'intégrer l'IA dans vos processus sales. J'accompagne justement plusieurs directions commerciales sur ces sujets.\n\nDispo pour un café virtuel de 20 min la semaine prochaine ?\n\nBravo encore,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Marc !\n\nJ'ai vu passer la news de ta promo — bravo, c'est mérité ! Et super timing avec le partenariat Allianz × Salesforce sur l'IA que j'ai vu cette semaine.\n\nÇa m'intéresserait vraiment de savoir comment tu vois l'évolution du rôle sales avec ces nouvelles technos. J'imagine que tu as plein d'insights là-dessus vu ton nouveau poste.\n\nOn en discute autour d'un call rapide ?\n\nÀ bientôt,\nPaul",
      },
    ],
    nba: "Liker et commenter le post LinkedIn d'Allianz annonçant le partenariat Salesforce",
    whyThis: "Marc vient d'être promu et son entreprise lance une initiative IA majeure. C'est le moment idéal pour reconnexion avec proposition de valeur sur l'automatisation commerciale.",
    sources: [
      "https://lesechos.fr/allianz-salesforce-ia-2026",
      "https://linkedin.com/posts/allianz-marc-promotion",
    ],
    conversationAngles: [
      "Comment Allianz prévoit d'implémenter l'IA dans les processus de vente ?",
      "Quels sont les défis du scale d'une équipe commerciale dans l'assurance ?",
    ],
  },

  // Sarah Dupont / TechCorp (c2)
  {
    contactId: "c2",
    messages: [
      {
        tone: "professional",
        body: "Sarah,\n\nFélicitations pour la Série C de TechCorp — 45M€, c'est un beau signal de confiance ! Et bravo pour ta nomination dans le classement Women in Tech.\n\nJ'ai suivi avec intérêt le lancement d'AutoFlow AI. Chez CGI, nous accompagnons justement des scale-ups en hypercroissance sur leurs enjeux de structuration tech et organisationnelle.\n\nAvec le tripling des effectifs R&D prévu, je serais ravi d'échanger sur les challenges d'industrialisation que vous anticipez.\n\nDispo pour un call de 20 min ?\n\nCordialement,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Sarah !\n\n45M€ en Série C, classement Women in Tech ET un nouveau produit IA — quelle période ! Bravo à toi et à toute l'équipe TechCorp.\n\nJe suis super curieux de savoir comment vous gérez cette phase de scaling côté tech. Tripler la R&D c'est un sacré défi (et un bon problème à avoir 😄).\n\nOn prend un café un de ces jours pour que tu me racontes ?\n\nÀ très vite,\nPaul",
      },
    ],
    nba: "Commenter le post LinkedIn de TechCorp sur la levée de fonds Série C avec un message de félicitations",
    whyThis: "TechCorp vient de lever 45M€ et triple sa R&D. Sarah est en pleine phase de scaling — c'est le moment parfait pour proposer un accompagnement structurant.",
    sources: [
      "https://techcrunch.com/techcorp-serie-c-2026",
      "https://usinenouvelle.com/women-in-tech-2026",
    ],
    conversationAngles: [
      "Comment TechCorp gère-t-elle le passage à l'échelle de sa R&D après la Série C ?",
      "Quelle est la stratégie de déploiement d'AutoFlow AI en Europe ?",
    ],
  },

  // Thomas Moreau / BNP Paribas (c3)
  {
    contactId: "c3",
    messages: [
      {
        tone: "professional",
        body: "Thomas,\n\nSuite à notre réunion du 20 février, j'ai suivi l'annonce du partenariat BNP × Google Cloud. 200M€ sur 5 ans, c'est un engagement fort qui confirme l'ambition de transformation que tu m'avais décrite.\n\nJe pense que notre expertise en migration cloud et en accompagnement du changement serait particulièrement pertinente pour les phases d'exécution. Je peux te préparer un plan d'intervention détaillé si cela t'intéresse.\n\nQuand pourrions-nous planifier un point pour en discuter ?\n\nCordialement,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Thomas !\n\nLe deal BNP × Google Cloud, c'est du lourd ! 200M€ et 60% des workloads à migrer, ça va être un chantier passionnant. Ça confirme exactement ce dont on avait discuté le mois dernier.\n\nSi tu as besoin d'un coup de main sur la partie change management ou structuration des équipes, n'hésite pas. Je connais bien les enjeux de migration à cette échelle.\n\nOn se fait un point la semaine prochaine ?\n\nÀ bientôt,\nPaul",
      },
    ],
    nba: "Envoyer à Thomas un cas d'étude CGI sur une migration cloud réussie dans le secteur bancaire",
    whyThis: "BNP Paribas vient de signer un contrat cloud majeur avec Google. Thomas est en première ligne de cette transformation — c'est le moment de proposer un accompagnement concret.",
    sources: [
      "https://silicon.fr/bnp-google-cloud-2026",
      "https://lesechos.fr/bnp-transformation-digitale-2026",
    ],
    conversationAngles: [
      "Comment BNP Paribas gère la conduite du changement pour une migration de cette envergure ?",
      "Quel est le rôle du lab IA conformité dans la stratégie globale de transformation ?",
    ],
  },

  // Camille Roux / Société Générale (c6)
  {
    contactId: "c6",
    messages: [
      {
        tone: "professional",
        body: "Camille,\n\nJ'ai vu que vous intervenez au sommet AI Paris 2026 — félicitations, c'est une belle reconnaissance de votre travail sur la stratégie Data & IA de la Société Générale.\n\nJe suis très intéressé par le projet SG Copilot pour les conseillers bancaires. Chez CGI, nous développons des solutions similaires d'assistance IA pour les métiers de la banque.\n\nJe serais ravi de pouvoir échanger avec vous en marge du sommet, ou avant si vous êtes disponible.\n\nCordialement,\nPaul Clark — CGI Business Consulting",
      },
      {
        tone: "friendly",
        body: "Bonjour Camille,\n\nJ'ai repéré votre intervention prévue à AI Paris — le sujet de l'IA en production dans la banque est passionnant et je serai dans l'audience !\n\nLe projet SG Copilot m'a particulièrement intrigué. Comment les conseillers ont-ils accueilli l'outil au quotidien ?\n\nJ'adorerais en discuter avec vous. Un café avant ou après le sommet ?\n\nBien à vous,\nPaul",
      },
    ],
    nba: "S'inscrire au sommet AI Paris 2026 et planifier une rencontre avec Camille en marge de l'événement",
    whyThis: "Camille est une nouvelle connection (prospect) avec un rôle clé chez SocGen. Sa conférence à AI Paris est l'occasion idéale pour un premier échange en personne.",
    sources: [
      "https://ai-paris.com/speakers/camille-roux",
      "https://banque-magazine.fr/socgen-assistant-ia",
    ],
    conversationAngles: [
      "Quels sont les retours terrain sur SG Copilot auprès des conseillers ?",
      "Comment la Société Générale gère-t-elle la gouvernance des données pour ses projets IA ?",
    ],
  },

  // Nicolas Bernard / DataWave (c7)
  {
    contactId: "c7",
    messages: [
      {
        tone: "professional",
        body: "Nicolas,\n\nFélicitations pour la Série A de DataWave — 12M€ avec Partech et Bpifrance, c'est un tour de table solide ! Et le partenariat Shopify pour l'Europe est une belle accélération.\n\nJe me souviens de nos échanges à l'ECE sur les projets IA — c'est impressionnant de voir le chemin parcouru. Chez CGI, nous avons des clients retail et e-commerce qui pourraient bénéficier de votre solution.\n\nÇa te dirait d'explorer les synergies possibles autour d'un call ?\n\nCordialement,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Nicolas !\n\nForbes France, Série A, deal Shopify — tu es en feu ! Bravo, c'est vraiment mérité après tout le travail que tu as mis dans DataWave.\n\nJe pensais à toi parce que je bosse avec des clients retail côté CGI et je me dis qu'il y a peut-être des opportunités. En tout cas, j'adorerais qu'on se refasse un point — ça fait trop longtemps !\n\nOn cale un café ou un call cette semaine ?\n\nÀ très vite,\nPaul",
      },
    ],
    nba: "Partager l'article Forbes sur Nicolas dans un post LinkedIn en le félicitant publiquement",
    whyThis: "Nicolas vient de lever des fonds et forge des partenariats stratégiques. En tant qu'alumni, c'est le moment de réactiver la relation et d'explorer des synergies commerciales.",
    sources: [
      "https://maddyness.com/datawave-levee-2026",
      "https://forbes.fr/entrepreneurs-2026",
    ],
    conversationAngles: [
      "Comment DataWave prévoit d'attaquer le marché européen après le partenariat Shopify ?",
      "Quels sont les cas d'usage les plus demandés par les clients B2B ?",
    ],
  },

  // Julie Martin / Doctolib (c4)
  {
    contactId: "c4",
    messages: [
      {
        tone: "professional",
        body: "Julie,\n\nJ'ai lu l'article de HBR France sur le programme 'Care First' de Doctolib — c'est un modèle RH inspirant, bravo pour cette initiative.\n\nChez CGI, nous accompagnons de plus en plus nos clients sur les sujets de transformation RH et d'employee experience. Ton retour d'expérience sur l'implémentation de 'Care First' dans une organisation en hypercroissance (80M d'utilisateurs !) serait extrêmement précieux.\n\nSerais-tu disponible pour un échange de 20 minutes ?\n\nCordialement,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Julie !\n\nJ'ai vu le papier HBR sur 'Care First' — c'est génial, tu fais vraiment bouger les lignes côté RH chez Doctolib ! 80 millions d'utilisateurs et une culture d'entreprise qui tient, chapeau.\n\nÇa fait un moment qu'on ne s'est pas parlé et j'aimerais beaucoup entendre tes insights sur comment scaler une culture d'entreprise à cette vitesse.\n\nCafé virtuel bientôt ?\n\nBises,\nPaul",
      },
    ],
    nba: "Liker et commenter l'article HBR France sur le programme 'Care First' de Doctolib",
    whyThis: "Julie a été mise en avant pour son programme RH innovant. C'est un prétexte idéal pour reprendre contact après 9 mois de silence.",
    sources: [
      "https://hbrfrance.fr/doctolib-bien-etre-travail",
      "https://challenges.fr/doctolib-80m-utilisateurs",
    ],
    conversationAngles: [
      "Comment 'Care First' a-t-il impacté la rétention des talents chez Doctolib ?",
      "Quels outils technologiques soutiennent la politique RH à cette échelle ?",
    ],
  },

  // Maxime Girard / Qonto (c11)
  {
    contactId: "c11",
    messages: [
      {
        tone: "professional",
        body: "Maxime,\n\nFélicitations pour la rentabilité de Qonto — c'est un milestone majeur dans la fintech européenne ! Et le produit de crédit IA pour les TPE/PME est une vraie innovation.\n\nEn tant que CRO, tu dois être au cœur de la stratégie de monétisation. Chez CGI, nous accompagnons plusieurs acteurs fintech sur l'optimisation de leurs modèles revenue — je pense qu'un échange pourrait être mutuellement enrichissant.\n\nDispo pour un call cette semaine ?\n\nCordialement,\nPaul",
      },
      {
        tone: "friendly",
        body: "Salut Maxime !\n\nQonto rentable + IPO en vue — la machine est lancée ! Bravo à toute l'équipe, c'est impressionnant.\n\nLe produit de crédit IA en 5 minutes au lieu de 5 jours, c'est exactement le genre d'innovation qui change la donne. J'adorerais entendre comment vous avez itéré là-dessus.\n\nOn se prend un café pour rattraper le temps perdu ?\n\nÀ très vite,\nPaul",
      },
    ],
    nba: "Partager l'article Les Échos sur la rentabilité de Qonto avec un commentaire félicitant l'équipe",
    whyThis: "Qonto atteint la rentabilité et prépare son IPO. Maxime en tant que CRO est un contact stratégique — c'est le moment de raviver la relation alumni.",
    sources: [
      "https://lesechos.fr/qonto-rentabilite-ipo-2026",
      "https://journaldunet.com/qonto-credit-ia",
    ],
    conversationAngles: [
      "Comment Qonto a-t-elle atteint la rentabilité tout en maintenant sa croissance ?",
      "Quelle est la stratégie revenue pour préparer l'IPO ?",
    ],
  },
];
