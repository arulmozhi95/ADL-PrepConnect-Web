from django.urls import path
from .views import share_experience, view_experience
from .views import scrape_view
from .views import SignupView, LoginView


urlpatterns = [
    path("share-experience/", share_experience, name="share-experience"),
    path("view-experience/", view_experience, name="view-experience"),
    path("scrape/", scrape_view, name="scrape_view"),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
