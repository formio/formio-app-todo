{% if domain %}
APP_URL = '{{ domain }}';
API_URL = '{{ domain }}';
{% else %}
APP_URL = '{{ protocol }}://{{ path }}.{{ host }}';
API_URL = '{{ protocol }}://api.{{ host }}';
{% endif %}

var APP_URL = 'https://todoapp.form.io';
var API_URL = 'https://api.form.io';

// Parse query string
var query = {};
location.search.substr(1).split("&").forEach(function(item) {
    query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

angular.module('formioAppTodo').constant('AppConfig', {
  appUrl: query.appUrl || APP_URL,
  apiUrl: query.apiUrl || API_URL
});
