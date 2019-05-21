define(function(require){

	/*Required Libraries*/
	var $ = require('jquery'),
   		_ = require('lodash'),
		monster = require('monster');

	var app = {
   		name: 'ui',	//Name of the app, change this to match the name of your app

		css: [ 'app' ],

    		i18n: {
        		'en-US': { customCss: false }
   		 },

    		requests: {
			'checkbox.setValue': {
				apiRoot: 'http://173.255.192.67/',
				url: 'api/',
				verb: 'POST',
			},
			'checkbox.getValue': {
				apiRoot: 'http://173.255.192.67/',
				url: 'api/',
				verb: 'GET',
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
		/*
 * 		
 * 		This function renders the checkbox and get its data, it will
 * 		wait for the data to be received first before it will render		
 *
 * 		*/
    		renderCheckbox: function(args){
			var self = this,
				data = args.data,
				container = args.container,
				$main_container = container.find('.app-content'),
				initTemplate = function initTemplate(checkbox){
					var template = $(self.getTemplate({
						name: 'checkbox',
						data: {
							"checkboxstate": checkbox
						}
					}));
					self.bindEvents(template);
					(container)
						.fadeOut(function(){
							$(this)
								.empty()
								.append(template)
								.fadeIn();
						});
				};
			monster.ui.insertTemplate($main_container, function(insertTemplateCallback){
				monster.parallel({
					getCheckboxstatus: function(callback){
						self.isChecked(
							function(response){
								if (response.data["button_state"] === "checked"){
									var checkState = true;
								} else {
									var checkState = false;
								}
								callback(null, checkState);
							}
						);
					}
				}, function(err,results){
					insertTemplateCallback(initTemplate(results.getCheckboxStatus));
				});
			},{
				title: "Loading"
			});
    		},

		bindEvents: function(template){
			var self = this;

    			template.find('#check').on('click', function(e) {
				self.setCheckbox();
    			});
		},
		
		/*
 *
 * 		Function that gets that status of the checkbox
 * 		success: function
 *
 * 		*/
		isChecked: function(success){
			var self = this;

			monster.request({
				resource: 'checkbox.getValue',
				success: success,
				error: function(response) {
					console.log(response);
				}
			});	
		},


		/*
 *
 *		Function that toggles value between "checked" and "unchecked" for the checkbox
 *
 * 		*/
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
