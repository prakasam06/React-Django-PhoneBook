from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[
    path('get_contacts', get_or_create_contacts,name='get_contacts'),
    path('edit_contact/<int:id>',edit_contact,name='edit_contact'),
    path('delete_contact/<int:id>',delete_contact,name='delete_contact'),
    path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)