from django.conf.urls import patterns, include, url
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)

urlpatterns = router.urls


urlpatterns += patterns('',
    url(r'^', include('task.urls')),
)
