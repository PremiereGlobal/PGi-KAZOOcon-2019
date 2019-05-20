define(function(require){
	var $ = require('jquery'),
   		_ = require('lodash'),
		monster = require('monster');

	var app = {
   		name: 'ui',

		css: [ 'app' ],

    		i18n: {
        		'en-US': { customCss: false }
   		 },

    		requests: {
			'checkbox.setValue': {
				apiRoot: 'http://173.255.192.67/',
				url: 'api/',
				verb: 'POST',
				headers: {
					"X-Auth-Token": monster.util.getAuthToken()
				}
			},
			'checkbox.getValue': {
				apiRoot: 'http://173.255.192.67/',
				url: 'api/',
				verb: 'GET',
				headers: {
					"X-Auth-Token": monster.util.getAuthToken()
				}
			}
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
			var self = this;

			monster.ui.generateAppLayout(self,{
				menus: [
					{
						tabs: [
							{
								callback: self.renderCheckbox
							}
						]
					}
				]
			});
		},

    		renderCheckbox: function(pArgs){
			var self = this,
				args = pArgs || {},
				parent = args.container || $('.app-content'),
				template = $(self.getTemplate({
					name: 'checkbox',
				}));
			self.bindEvents(template);			

			(parent)
				.fadeOut(function(){
					$(this)
						.empty()
						.append(template)
						.fadeIn();
				});
    		},

		bindEvents: function(template){
			var self = this;

    			template.find('#check').on('click', function(e) {
				self.isChecked();
    			});
		},

		isChecked: function(){
			var self = this;

			monster.request({
				resource: 'checkbox.getValue',
				success: function(response) {
					console.log(response);
				},
				error: function(response) {
					console.log(response);
				}
			});	
		},

		setCheckbox: function(){
			var self = this;

			monster.request({
				resource: 'checkbox.setValue',
				success: function(response) {
					console.log(response);
				},
				error: function(response){
					console.log(response);
				},
			});
		}
	};
	return app;
});
