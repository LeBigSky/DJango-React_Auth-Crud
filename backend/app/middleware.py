
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken



class Blocage(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response
    
    def process_view(self, request, view_func, view_args, view_kwargs):
  
        if request.path.startswith('/create/article/'):
            auth = JWTAuthentication()
            try :
                user, token = auth.authenticate(request) #sans le ,token on aura une erreur: AttributeError: 'tuple' object has no attribute 'is_authenticated'
                                                         #Ce détails est expliqué dans la views en ligne 62                     
                if user and user.is_authenticated:
                    return None
            except InvalidToken:
                return JsonResponse({"status": "invalid", "message": "Token is invalid or expired"}, status=401)
