from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from preparation.views import home
urlpatterns = [
    path("", home),
    path("admin/", admin.site.urls),
    path("api/", include("preparation.urls")),  # Include preparation API routes
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
