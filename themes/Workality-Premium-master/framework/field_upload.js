
//// TINYMCE RENDERER
function renderTiny() {
	var i=1;
	jQuery('#works-images-fields textarea.mceEditor').each(function(e)
	{
		var id = jQuery(this).attr('id');

		if (!id)
		{
			id = 'customEditor-' + i++;
			jQuery(this).attr('id',id);
		}

		tinyMCE.execCommand('mceAddControl', false, id);
		 
	});
}


//// ONLOAD	
jQuery(document).ready(function(){
	var divs = 1;
	var thisisgallery = 0;

	jQuery('.get-datepicker').datepicker({
		showButtonPanel: true
	});
	
	
	jQuery('#md-sortable-media').sortable({
	    start: function(e, ui){
			jQuery(this).find('textarea.mceEditor').each(function(){
				tinyMCE.execCommand( 'mceRemoveControl', false, jQuery(this).attr('id') );
			});
		},
		stop: function(e,ui) {
			jQuery(this).find('textarea.mceEditor').each(function(){
				renderTiny();
				//jQuery(this).sortable("refresh");
			});
			
		}
	});
			
				
		
	/// BLOG
	var fields = jQuery('#post-video-fields, #post-image-fields, #post-link-fields, #post-quote-fields, #post-gallery-fields, #page-type');
	fields.hide();
	var currentsel = jQuery("input[name=post_format]:radio:checked").val();
	jQuery('#post-'+currentsel+'-fields').show();
	
	var currentselpage = jQuery("select[name=page_template]").val();
	if(currentselpage == 'template-works.php') {
		jQuery('#page-type').show();
	}
	
	jQuery('input[name=post_format]').change(function() { 
		fields.hide();
		var selectd = jQuery("input[name=post_format]:radio:checked").val();
		jQuery('#post-'+selectd+'-fields').show();
	});
	
	jQuery('select[name=page_template]').change(function() { 
		if(jQuery(this).val() == 'template-works.php') {
			jQuery('#page-type').show();
		}else{
			jQuery('#page-type').hide();
		}
	});
	
				
	/*
	 *
	 * UPLOAD VIDEOS
	 *
	 */
	jQuery('a.add-more-videos').live('click',function() { 
		divs++;
		var ids = 'new-md-field-'+divs;
		var cont = '<div id="vdiv'+ids+'" class="imgarr"><span class="imgside"> \
					<input type="hidden" id="'+ids+'" name="work-media[]" value="videoembed" /> \
					<img width="120" class="screenshot" src="'+wpurl.siteurl+'youtube.png" /></span><span> \
					<strong>Video Embed Code</strong><br class="clear" ><small>IMPORTANT : If you\'re using Gallery as your Composition Type, Vimeo or Youtube URL MUST be used instead of embed code. <br>E.g. http://www.youtube.com/watch?v=GCZrz8siv4Q</small><br class="clear" ><textarea id="v'+ids+'" cols="60" rows="3" class="work-caption" name="work-media-video[]"></textarea> \
					<a href="javascript:void(0);" class="admin-upload-remove button-secondary" rel-id="vdiv'+ids+'">Remove</a> \
					</span><br class="clear"></div>';
		jQuery('#md-sortable-media').prepend(cont);
	});
	
	
		
	/*
	 *
	 * ADD TEXT
	 *
	 */
	renderTiny();
		
		
	jQuery('a.add-more-text').live('click',function() { 
		divs++;
		var ids = 'new-md-field-'+divs;
		var cont = '<div id="textdiv'+ids+'" class="imgarr"><span class="imgside"> \
					<input type="hidden" id="'+ids+'" name="work-media[]" value="textarea" /> \
					<textarea id="tinymceids-'+ids+'" cols="60" style="width:600px;height:300px;" class="work-text mceEditor" name="work-media-text[]"></textarea> \
					<a href="javascript:void(0);" class="admin-upload-remove button-secondary" rel-id="textdiv'+ids+'">Remove</a> \
					</span><br class="clear"></div>';
		jQuery('#md-sortable-media').prepend(cont);
		tinyMCE.execCommand('mceAddControl', false, 'tinymceids-'+ids);
	});
		
				
	/*
	 *
	 * UPLOAD IMAGES
	 *
	*/
	
	
	var tgm_media_frame;
	
	
	function addto_Composition(imgurl) { 
			divs++;
			var ids = 'new-md-field-'+divs;
			var cont = '<div id="d'+ids+'" class="imgarr" style="display:none">\
						<span class="imgside"><input type="hidden" id="'+ids+'" name="work-media[]" value="'+imgurl+'" /> \
						<div class="imgwindow"><img width="120" class="screenshot" id="sc-'+ids+'" src="'+imgurl+'" /></div></span><span> \
						<strong class="bloghide">Caption</strong><br class="clear" ><textarea id="v'+ids+'" cols="60" rows="3" class="work-caption bloghide" name="work-media-caption[]"></textarea> \
						<br class="clear"><small><strong>URL</strong> (Optional. If present, image will be wrapped with this URL)</small><br class="clear" > \
						<input type="text" style="width:200px;" placeholder="E.g. http://www.northeme.com" id="work-media-link-'+ids+'" name="work-media-link[]" value="" /> \
						<select name="work-media-link-target[]" class="urlselector"> \
						<option value="_blank">Open in New Window</option><option value="_self" >Open in Same Window</option></select> \
						<a href="javascript:void(0);" class="admin-upload-remove button-secondary" rel-id="d'+ids+'">Remove</a><br class="clear">\
						<label class="radio bloghide"><input type="radio" name="work-media-photoalignment['+(divs-1)+']" checked="checked" value="landscape"> Landscape</label> \
						<label class="radio bloghide"><input type="radio" name="work-media-photoalignment['+(divs-1)+']" value="portrait"> Portrait</label> \
						</span><br class="clear"></div>';
			jQuery('#md-sortable-media').prepend(cont);
			jQuery('#d'+ids).fadeIn('slow');
			
	}
	
	
	jQuery('.nhp-opts-upload').click(function() {
		
		  if ( tgm_media_frame ) {
			tgm_media_frame.open();
			return;
		  }
		
		  tgm_media_frame = wp.media.frames.tgm_media_frame = wp.media({
			multiple: true,
			library: {
			  type: 'image'
			},
		  });
		
		  tgm_media_frame.on('select', function(){
			var selection = tgm_media_frame.state().get('selection');
			selection.map( function( attachment ) {
				attachment = attachment.toJSON();
				addto_Composition(attachment.url);
			});
		  });
		
		  tgm_media_frame.open();
       
	});
	
	
	
	/*
	jQuery('.nhp-opts-upload').click(function() {
	 thisisgallery = 1;
	 post_id = jQuery('#post_ID').val();
	 tb_show('', 'media-upload.php?post_id='+post_id+'&amp;type=image&amp;TB_iframe=true');
	 return false;
	});
	
	window.original_send_to_editor = window.send_to_editor;
	
	window.send_to_editor = function(html) {
		if(thisisgallery) {
			imgurl = jQuery('img',html).attr('src');
			divs++;
			var ids = 'new-md-field-'+divs;
			var cont = '<div id="d'+ids+'" class="imgarr" style="display:none">\
						<span class="imgside"><input type="hidden" id="'+ids+'" name="work-media[]" value="'+imgurl+'" /> \
						<div class="imgwindow"><img width="120" class="screenshot" id="sc-'+ids+'" src="'+imgurl+'" /></div></span><span> \
						<strong>Caption</strong><br class="clear" ><textarea id="v'+ids+'" cols="60"  style="height:50px;" class="work-caption" name="work-media-caption[]"></textarea> \
						<br class="clear"><small><strong>URL</strong> (Optional. If present, image will be wrapped with this URL)</small><br class="clear" > \
						<input type="text" style="width:200px;" placeholder="E.g. http://www.northeme.com" id="work-media-link-'+ids+'" name="work-media-link[]" value="" /> \
						<select name="work-media-link-target[]" class="urlselector"> \
						<option value="_blank">Open in New Window</option><option value="_self" >Open in Same Window</option></select> \
						<a href="javascript:void(0);" class="admin-upload-remove button-secondary" rel-id="d'+ids+'">Remove</a><br class="clear">\
						<label class="radio bloghide"><input type="radio" name="work-media-photoalignment['+(divs-1)+']" checked="checked" value="landscape"> Landscape</label> \
						<label class="radio bloghide"><input type="radio" name="work-media-photoalignment['+(divs-1)+']" value="portrait"> Portrait</label> \
						</span><br class="clear"></div>';
			jQuery('#md-sortable-media').append(cont);
			jQuery('#d'+ids).fadeIn('slow');
			
			thisisgallery = 0;
			tb_remove();
		}else{
			window.original_send_to_editor(html);
		}
	}
	
	*/

	jQuery('.admin-upload-remove').live('click',function(){
		jQuery(this).parent().parent().fadeOut('slow',function() {
		jQuery(this).remove();
		});
	});



	
					
	/*
	 *
	 * COLOR PICKER
	 *
	 */
	 
		
	jQuery('.colorSelector').each(function(){
			var Othis = this; //cache a copy of the this variable for use inside nested function
				
			jQuery(this).ColorPicker({
					color: '#ff0000',
					onShow: function (colpkr) {
						jQuery(colpkr).fadeIn(500);
						return false;
					},
					onHide: function (colpkr) {
						jQuery(colpkr).fadeOut(500);
						return false;
					},
					onChange: function (hsb, hex, rgb) {
						jQuery(Othis).children('div').css('backgroundColor', '#' + hex);
						jQuery(Othis).next('input').attr('value','#' + hex);
						
					}
			});
				  
	}); //end color picker
	
	
});