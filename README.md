# React + Vite

# DJANGO - REACT 
## AUTHENTIFICATION - CREATION UNIQUEMENT SI ON EST CONNECTED

# RUN THE Back PROJECT => Crée un env a la racine, l'activer puis pip install -r requirements.txt
# RUN THE front PROJECT => dans le dossier frontend: npm i

# Ajouté dernièrement: Delete, username on all_article, envois d'un mail l'inscription
# a venir: Systeme de rôle basique, permissions & middelware, 

Dans cet exos corrigé, j'explique en détails les étapes en front et en back

Pour suivre cette correction dans l'ordre:

Commencer par le back =>

1) models = là ou je crée mes tables 
2) Serializer = va traduire mes données django au format json
3) View = ma logique de ce que j'envois sur mes routes
4) Url = l'adresse url des routes et leurs views respectives 

Ensuite le front =>

1) Le home
2) Create = s'incrire en tant que user
3) Login = se connecter
4) User = infos du user connecté
5) Create article = création article 
6) All Article = affiche tous les articles + bouton supprimer + nom du user qui a crée l'article

MAILING =>

1) Views => Incription (j'ai ajouté sendmail)
2) Settings => ajouter les données d'intégration de Mailtrap

MIDDLEWARE =>

1) Middleware =  fichier middleware avec ma logique de blocage
2) Settings = J'ajoute mon middleware dans le tableau des middlewares [](en dernier)
3) CreateArticle.jsx => Mon cacth error va recupérer la réponse du middleware si je ne suis pas connecté 
