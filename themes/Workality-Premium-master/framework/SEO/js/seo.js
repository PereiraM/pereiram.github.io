(function($) {
	$(function() {
		
		var titlelength = 69;
		var metalength = 140;
		
		$('div.seo-preview .inputs input[name=seo-title]').keyup(function() { 
				$('div.seo-preview .preview .title a').html($(this).val())
				var leftt = titlelength - $(this).val().length;
				$('div.seo-preview .inputs .titlecount').html('('+leftt+') characters left');
		})
		
		$('div.seo-preview .inputs textarea[name=seo-desc]').keyup(function() { 
				$('div.seo-preview .preview .meta').html($(this).val())
				
				var leftd = metalength - $(this).val().length;
				$('div.seo-preview .inputs .desccount').html('('+leftd+') characters left');
		})
		
	});
})(jQuery);