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
				apiRoot: '173.255.192.67/',
				url: 'api/{X-Auth-token}',
				verb: 'POST'
			},
			'checkbox.getValue': {
				apiRoot: '173.255.192.67/',
				url: 'api/{X-Auth-Token}',
				verb: 'GET'
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
			var check = self.isChecked;

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
					data: {
						user: monster.app.auth.currentUser,
						check: self.getCheckboxValue();
					}
				}));
			parent
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
				self.setCheckbox;
    			});
		},

		isChecked: function(){
			var self = this;

			monster.request({
				resource: 'checkbox.getValue',
				data: {
					X-Auth-Token: monster.util.getAuthToken;
				},
				success: function(response) {
					if (response.data["data"]["button_checked"] === "unchecked"){
						return false;
					} else {
						return true;
					}
				},
				error: function(response) {
					monster.ui.alert('There was an error connecting to the api');
				}
			});	
		},

		getCheckboxValue: function(){
			return check;
		},

		setCheckbox: function(){
			var self = this;

			monster.request({
				resource: 'checkbox.setValue',
				data: {
					X-Auth-Token: monster.util.getAuthToken;
				},
				success: function(response) {
					if (response.data["data"]["button_checked"] === "unchecked"){
						check = false;
					} else {
						check = true;
					}
				},
				error: function(response){
					monster.ui.alert('There was an error connecting to the api');
				},
			});
		}
	};
	return app;
});
