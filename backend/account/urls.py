from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/contact/', views.contact_message, name='contact-message'),
    path('api/admin-signup/', views.admin_signup_api, name='admin-signup'),
    path('api/admin-login/', views.admin_login_api, name='admin-login'),
    path('api/admin-dashboard/', views.admin_dashboard_api, name='admin-dashboard'),
    path('api/accounts/', views.AccountListCreateView.as_view(), name='account-list-create'),
    path('api/accounts/<int:pk>/', views.AccountRetrieveUpdateDestroyView.as_view(), name='account-detail'),
    path("api/my-messages/", views.MyContactMessagesView.as_view(), name="my-messages"),
    path("api/profile/", views.UserProfileAPIView.as_view(), name="user-profile"),
    path('api/change-password/', views.change_password, name='change_password'),
]
