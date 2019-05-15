
define(function(require){
	var $ = require('jquery'),
   	_ = require('lodash'),
	monster = require('monster');

	var app = {
   		name: 'demo',

    		i18n: {
        		'en-US': { customCss: false }
   		 },

    		requests: {
       			 /* List of APIs */
   		},

    		subscribe: {
        		/* List of events */
   		},

    		load: function(callback){
        		var self = this;

        		self.initApp(function() {
            			callback && callback(self);
        		});
    		},

    		initApp: function(callback) {
        		var self = this;

        		monster.pub('auth.initApp', {
            			app: self,
            			callback: callback
        		});
    		},

    		render: function(container){
        		/* Function executer once the app initialized properly */
    		}
	};
});
