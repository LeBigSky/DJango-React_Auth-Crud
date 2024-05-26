from django.shortcuts import render # Je ne vais jamais faire de render sur une page html interne au projet, mais je pourrais
from django.http import JsonResponse # je pourrais envoyer des reponse en Json
from django.contrib.auth import authenticate, login, logout # sert a gérer les fonction built in de django: login, logout, auth
from django.contrib.auth.hashers import make_password # pour hacher un mdp (obligatoire avant de l e stocker dans la db)
from rest_framework.decorators import api_view, permission_classes # Je veux une vieuw api + je veux gérer des permission sur certaines vue
from rest_framework_simplejwt.authentication import JWTAuthentication # Je vais gérer les token de manière simplifiée
from rest_framework_simplejwt.tokens import RefreshToken # je veux le refresh token
import json # Je veux pouvoir interpréter des données recues en Json
from .models import *
from .serializers import *
from rest_framework import status #connaitre le status de l'erreur en cas d'erreur
from rest_framework.response import Response # Envois une répons HTTP (ici on utilise des réponse Http au lieu de render une page)
from rest_framework.permissions import IsAuthenticated # Je vais pouvoir vérifier si un user est connecté et avoir accès a ces données

# Create your views here.

@api_view(['POST'])
def inscription(request):
    # Je récupère les données envoyé en json depuis React (j'ai pas fais de serializer pour user donc je montre ici une autre technique)
    data = json.loads(request.body) # => les élément envoyé dans la requêtes post depuis le front, sont récupérer dans data
    username = data.get('username') # data.username, la données dont le clé = username
    password = data.get('password') # data.username, la données dont la clé = password

    #Je vais vérifier si le user existe déjà, ça serait bêta d'enregistrer 2 fois le même username...
    if User.objects.filter(username=username).exists():
        return JsonResponse({'status': 'y a une erreur', 'message': 'Ce User existe déjà'}) # => Si le username existe
    
    # sinon
    new_user= User(username=username, password=make_password(password)) 
    # je crée un nouveau user, je précise que le mdp est dans la fonction "make_password" qui va hacher mon mdp
    new_user.save() # je sauvegarde ces données
    return JsonResponse({'status': 'success', 'message': 'Le user a été crée, Bravo !!!'})


@api_view(['POST'])
def connexion(request):
    #idem que dans mon def inscription, comme j'ai pas de serializer, je vais décortiquer les données grace a Json.loads
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password) # ici au lieu de crée un user, j'utilise la fonction authenticate pour crée une instance du user connecté
    if user is not None:
    #si le user n'est pas égal a None (donc qu'il existe dans la db )    
        login(request, user)# j'utilise la fonction login
        refresh = RefreshToken.for_user(user)# génère un token de rafraichissement (on expliquera plus tard la différence entre token normal et refresh)
        access_token = str(refresh.access_token)# le principe du token access est qu'il est génèré a partir du refresh-token 
        # ensuite j'envois en réponseJson un message success et les tokens nécéssaire pour le header des requetes depuis le front
        return JsonResponse({'status': 'success', 'message': 'le user est connecté', 'access_token': access_token, 'refresh_token': str(refresh)})
    else:
        return JsonResponse({'status': 'error', 'message': "ptin smorch po lo"})
    
def get_utilisateur(request):
    #ici on veut afficher des données utilisateur

    try:
        auth= JWTAuthentication() # on va utiliser le system de JWtokens donc on l'appel dans une variable
        #JWTAuthentication est une classe fournie par Django REST Framework pour gérer l'authentification par jetons JWT (JSON Web Tokens).
        
        user, _ = auth.authenticate(request) # on authentifie un user en donnant
        #Cette méthode tente d'authentifier l'utilisateur en utilisant les informations de la requête (le jeton JWT dans ce cas).
        #Pourquoi , _ ?
        # user, _ : Cette ligne de code est une destructuration. La méthode authenticate renvoie deux valeurs : 
        #l'utilisateur authentifié (s'il y en a un) et les informations supplémentaires éventuellement retournées par l'authentification. 
        #Le symbole _ est souvent utilisé pour indiquer que cette deuxième valeur n'est pas utilisée ou n'est pas pertinente pour le reste du code.
        # engros, sans ça auth.autenticate(request) nous renverrai une réponse compliqué a intérprété car on récupère 2 éléments 
    except:
        return JsonResponse({'error': 'il y a une erreur dans la requette'})
    mon_user = {
        'username': user.username,
        'id': user.id
    } # je crée un objet mon user que je vais envoyé en réponse sur cette route, le front pourra avoir accès a username et id (j'aurais pu afficher plus d'élément si je voulais)
    return JsonResponse({'user': mon_user})

@api_view(['POST'])
def deco(request):
    #ici la fonction logout se charge de faire tout le travail de déconnexion
    # on renvois quand même un message pour que le front puisse avoir quelque chose a vérifier
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'Le user a bien été deco'})

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # cette fonction est vérifiée par une permission (il faut être identifier pour y avoir accès) => Oui ça nous simplifie grandement le travail
def create_article(request):
    user = request.user  # Je récupère le l'utilisateur authentifié depuis Django, en gros, Django peut savoir quel est le user qui fait la requête
    article_serializer = ArticleSerializer(data=request.data) 
    #Ici j'ai un serializer donc je peux crée un objet article directement avec les données recup en js depuis le front
    if article_serializer.is_valid(): # je check si les données envoyé sont valide (correspondent aux fields de mon serializer)
        article_serializer.save(user=user)  # Sauvegarder l'article avec l'utilisateur authentifié
        return Response(article_serializer.data, status=status.HTTP_201_CREATED) # je renvois une reponse: l'objet serialisé pour le front et un j'affiche une status
    else:
        return Response(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST) # sinon je relève les erreurs

@api_view(['GET'])
def all_articles(request):
    # je récup mes articles
    articles= Article.objects.all()
    # Je serialize mes article pour les envoyé en Json
    article_serializer= ArticleSerializer(articles, many=True)
    return Response(article_serializer.data)# j'envois mes articles 

@api_view(['DELETE'])
def delete_article(request, id):
    article = Article.objetcs.get(id=id)
    article.delete()
    return JsonResponse({'status': 'success', 'message': 'article supprimé'})