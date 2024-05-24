from django.db import models
from django.contrib.auth.models import AbstractUser



# MODEL USER
# Ici mon user est un abstract user, c'est a dire que toute le logique lié a l'authentification en django pourra se passer sur cette table là
# Par ailleurs, abstract user va me permettre de récupérer toutes les colonnes nécéssaire pour gérer correctement un systeme de connexion
# Ne serait ce que pour gérér les instance "user connecté" par exemple... 
# Pass => Signifie simplement que je n'ajoute rien de plus, donc on va avoir une table généré comme une vrai table user Django, dans colonne supplémentaire
# Je pourrais y ajouter des colonne si je voulais (...)
class User(AbstractUser):
    pass


# MODEL Article
# Dans ce model je crée une table basique, il y a une foreign key pour que je puisse identifier a qui appartiens l'article posté
# Si plus tard je veux gérer les gestion CRUD des artilce en focntion du rôle, je pourrais le faire dans ce même exos, grace a la foreign key

class Article(models.Model):
    titre = models.CharField(max_length=50)
    text = models.TextField()
    date = models.DateField(auto_now=False, auto_now_add=False)
    user= models.ForeignKey(User, related_name=("article"), on_delete=models.CASCADE)
    def __str__(self):
        return self.titre