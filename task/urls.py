from django.conf.urls import patterns, url
from task import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.generic import TemplateView



urlpatterns = patterns('',
    url(r'^tasks$', views.TaskList.as_view()),
    url(r'^tasks/(?P<pk>[0-9]+)$', views.TaskDetail.as_view()),
    url(r'^todo/$', TemplateView.as_view(template_name='task/index.html')),
)

urlpatterns = format_suffix_patterns(urlpatterns)