(function ()
{
	// create colShortcodes plugin
	tinymce.create("tinymce.plugins.colShortcodes",
	{
		init: function ( ed, url )
		{
			ed.addCommand("colPopup", function ( a, params )
			{
				var popup = params.identifier;
				// load thickbox
				tb_show("Shortcodes", url + "/popup.php?popup=" + popup + "&id="+params.id+"&width=" + 800);
			});
		},
		createControl: function ( btn, e )
		{
			if ( btn == "col_button" )
			{	
				var a = this;
					
				// adds the tinymce button
				btn = e.createMenuButton("col_button",
				{
					title: "Insert Shortcode",
					image: drthemeurl + "/framework/tinymce/icon.png",
					icons: false
				});
				
				// adds the dropdown to the button
				btn.onRenderMenu.add(function (c, b)
				{	
					a.addWithPopup( b, "Buttons", "button", c.id );
					a.addWithPopup( b, "Alerts", "alert", c.id  );
					a.addWithPopup( b, "Tabs", "tabs" , c.id );
					a.addWithPopup( b, "Icons", "icons", c.id  );
					a.addWithPopup( b, "Slider", "slider", c.id  );
					a.addWithPopup( b, "Gallery", "gallery", c.id  );
					a.addWithPopup( b, "Columns", "columns", c.id  );
					a.addWithPopup( b, "Google Map", "gmap", c.id  );
					a.addWithPopup( b, "Contact Form", "contactform", c.id  );
				});
				
				return btn;
			}
			
			return null;
		},
		addWithPopup: function ( ed, title, id, idm) {
			ed.add({
				title: title,
				onclick: function () {
					tinyMCE.activeEditor.execCommand("colPopup", false, {
						title: title,
						identifier: id,
						id : idm
					})
				}
			})
		},
		addImmediate: function ( ed, title, sc) {
			ed.add({
				title: title,
				onclick: function () {
					tinyMCE.activeEditor.execCommand( "mceInsertContent", false, sc )
				}
			})
		},
		getInfo: function () {
			return {
				longname: 'Col Shortcodes'
			}
		}
	});
	
	// add colShortcodes plugin
	tinymce.PluginManager.add("colShortcodes", tinymce.plugins.colShortcodes);
})();