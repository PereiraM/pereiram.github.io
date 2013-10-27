jQuery(document).ready(function($) {
    var cols = {
    	loadVals: function()
    	{
    		var shortcode = $('#_col_shortcode').text(),
    			uShortcode = shortcode;
    		
    		// fill in the gaps eg {{param}}
    		$('.col-input').each(function() {
    			var input = $(this),
    				id = input.attr('id'),
    				id = id.replace('col_', ''),		// gets rid of the col_ prefix
    				re = new RegExp("{{"+id+"}}","g");
    				
    			uShortcode = uShortcode.replace(re, input.val());
    		});
    		
    		// adds the filled-in shortcode as hidden input
    		$('#_col_ushortcode').remove();
    		$('#col-sc-form-table').prepend('<div id="_col_ushortcode" class="hidden">' + uShortcode + '</div>');
    		
    		// updates preview
    		cols.updatePreview();
    	},
    	cLoadVals: function()
    	{
    		var shortcode = $('#_col_cshortcode').text(),
    			pShortcode = '';
    			shortcodes = '';
    		
    		// fill in the gaps eg {{param}}
    		$('.child-clone-row').each(function() {
    			var row = $(this),
    				rShortcode = shortcode;
    			
    			$('.col-cinput', this).each(function() {
    				var input = $(this),
    					id = input.attr('id'),
    					id = id.replace('col_', '')		// gets rid of the col_ prefix
    					re = new RegExp("{{"+id+"}}","g");
    					
    				rShortcode = rShortcode.replace(re, input.val());
    			});
    	
    			shortcodes = shortcodes + rShortcode + "\n";
    		});
    		
    		// adds the filled-in shortcode as hidden input
    		$('#_col_cshortcodes').remove();
    		$('.child-clone-rows').prepend('<div id="_col_cshortcodes" class="hidden">' + shortcodes + '</div>');
    		
    		// add to parent shortcode
    		this.loadVals();
    		pShortcode = $('#_col_ushortcode').text().replace('{{child_shortcode}}', shortcodes);
    		
    		// add updated parent shortcode
    		$('#_col_ushortcode').remove();
    		$('#col-sc-form-table').prepend('<div id="_col_ushortcode" class="hidden">' + pShortcode + '</div>');
    		
    		// updates preview
    		cols.updatePreview();
    	},
    	children: function()
    	{
    		// assign the cloning plugin
    		$('.child-clone-rows').appendo({
    			subSelect: '> div.child-clone-row:last-child',
    			allowDelete: false,
    			focusFirst: false
    		});
    		
    		// remove button
    		$('.child-clone-row-remove').live('click', function() {
    			var	btn = $(this),
    				row = btn.parent();
    			
    			if( $('.child-clone-row').size() > 1 )
    			{
    				row.remove();
    			}
    			else
    			{
    				alert('First element cannot be removed');
    			}
    			
    			return false;
    		});
    		
    		// assign jUI sortable
    		$( ".child-clone-rows" ).sortable({
				placeholder: "sortable-placeholder",
				items: '.child-clone-row'
				
			});
    	},
    	updatePreview: function()
    	{
    		if( $('#col-sc-preview').size() > 0 )
    		{
	    		var	shortcode = $('#_col_ushortcode').html(),
	    			iframe = $('#col-sc-preview'),
	    			iframeSrc = iframe.attr('src'),
	    			iframeSrc = iframeSrc.split('preview.php'),
	    			iframeSrc = iframeSrc[0] + 'preview.php';
    			
	    		// updates the src value
	    		iframe.attr( 'src', iframeSrc + '?sc=' + base64_encode( shortcode ) );
	    		
	    		// update the height
	    		$('#col-sc-preview').height( $('#col-popup').outerHeight()-42 );
    		}
    	},
    	resizeTB: function()
    	{
			var	ajaxCont = $('#TB_ajaxContent'),
				tbWindow = $('#TB_window'),
				colPopup = $('#col-popup'),
				no_preview = ($('#_col_preview').text() == 'false') ? true : false;
			
			if( no_preview )
			{
				ajaxCont.css({
					paddingTop: 0,
					paddingLeft: 0,
					height: (tbWindow.outerHeight()-47),
					overflow: 'scroll', // IMPORTANT
					width: 560
				});
				
				tbWindow.css({
					width: ajaxCont.outerWidth(),
					marginLeft: -(ajaxCont.outerWidth()/2)
				});
				
				$('#col-popup').addClass('no_preview');
			}
			else
			{
				ajaxCont.css({
					padding: 0,
					// height: (tbWindow.outerHeight()-47),
					height: colPopup.outerHeight()-15,
					overflow: 'hidden' // IMPORTANT
				});
				
				tbWindow.css({
					width: ajaxCont.outerWidth(),
					height: (ajaxCont.outerHeight() + 30),
					marginLeft: -(ajaxCont.outerWidth()/2),
					marginTop: -((ajaxCont.outerHeight() + 47)/2),
					top: '50%'
				});
			}
    	},
    	load: function()
    	{
    		var	cols = this,
    			popup = $('#col-popup'),
    			form = $('#col-sc-form', popup),
    			shortcode = $('#_col_shortcode', form).text(),
    			popupType = $('#_col_popup', form).text(),
    			uShortcode = '';
    		
    		// resize TB
    		cols.resizeTB();
    		$(window).resize(function() { cols.resizeTB() });
    		
    		// initialise
    		cols.loadVals();
    		cols.children();
    		cols.cLoadVals();
    		
    		// update on children value change
    		$('.col-cinput', form).live('change', function() {
    			cols.cLoadVals();
    		});
    		
    		// update on value change
    		$('.col-input', form).change(function() {
    			cols.loadVals();
    		});
    		
    		// when insert is clicked
    		$('.col-insert', form).click(function(e) { 
    			if(window.tinyMCE)
				{
					window.tinyMCE.execInstanceCommand($(this).data('rel'), 'mceInsertContent', false, $('#_col_ushortcode', form).html());
					tb_remove();
				}
				e.preventDefault();
				return false;
    		});
    	}
	}
    
    // run
    $('#col-popup').livequery( function() { cols.load(); } );
});