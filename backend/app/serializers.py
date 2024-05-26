from rest_framework import serializers
from .models import *

# Le serializer a pour mission de traduire les objet python généré par django dans mes view en objet Json
# Il est pas impératif d'utiliser un serializer pour cela mais ça peut nous faire gagné beaucoup de temps
# l'idée c'est que le serializer permet de données des objects de table et il va tout traduire en json
# on a plus qu'a envoyé les data du serializer sur nos routes dans la view et le front recevra les données en Json 

# Ici j'ai fait un serialiazer pour mes articles. Je précise que le field user est en read-only.
# cela signifie que ma colonne foreignkey "user_Id" dans ma table article ne pourra être remplis par une donnée issu du json
# je vais gérer le remplissage de la colonne user_id directement dans ma view, parce que c'est une valeur qu'on ne choisit pas.
# la fk c'est l'id du user qu'on veut renseigner, donc autant le faire dans la view
# Lorsqu'on créera un produit, dans la view on dira que la colonne user_id et = a l'object du model user qui correspond a l'id du user connecté... 
 

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'titre', 'text', 'date', 'user']
        read_only_fields = ['user']

# J'ai finalement ajouté un serializer User, pour donner une méthode alternative.
# donc je vais crée une view qui envois tous mes user
# le but est de permettre de fetch chaque article et de fetch également chaque user. 
# Ensuite avec une comparaison, je pourrais afficher le nom du user correspondant a l'article 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        
