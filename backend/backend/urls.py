from django.contrib import admin
from django.urls import path
from app.views import *


#Mes routes, rien de folichon: url mène a une views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('inscription/', inscription), 
    path('connexion/', connexion ),
    path('user/', get_utilisateur),
    path( 'create/article/', create_article),
    path( 'all/article/', all_articles),
    path('logout/', deco),
    path('delete/<int:id>', delete_article),
]
