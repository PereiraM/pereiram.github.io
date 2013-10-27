(function($){
	
    var stripeResponseHandler = function(status, response) {
	  var $form = $('#payment-form');
	  
      if (response.error) {
        // Show the errors on the form
		$('form button').addClass('button-red');
				
        $form.find('.payment-errors').text(response.error.message).show();
        $form.find('button').prop('disabled', false);
		
		$('form .loaderimg').hide();
		$("html, body").scrollTop(300);
						
      } else {
        // token contains id, last4, and card type
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and re-submit
        $form.get(0).submit();
      }
    };
 	
	
		
	//// CREDIT CARD TYPE DETECTION
	
	function getCreditCardType(accountNumber) {
		  //start without knowing the credit card type
		  var result = "unknown";
		   $('div.cards span').addClass('off');
		  //first check for MasterCard
		  if (/^5[1-5]/.test(accountNumber))
		  {
			result = "mastercard";
			$('div.cards .mastercard').removeClass('off');
			$('form[name=masterform2] input[name=cctype]').val('MasterCard');
		  }
		
		  //then check for Visa
		  else if (/^4/.test(accountNumber))
		  {
			result = "visa";
			$('div.cards .visa').removeClass('off');
			$('form[name=masterform2] input[name=cctype]').val('Visa');
		  }
		
		  //then check for AmEx
		  else if (/^3[47]/.test(accountNumber))
		  {
			result = "amex";
			$('div.cards .amexs').removeClass('off');
			$('form[name=masterform2] input[name=cctype]').val('Amex');
		  }
		  
		//then check for Discover
		  else if (/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/.test(accountNumber))
		  {
			result = "discover";
			$('div.cards .discover').removeClass('off');
			$('form[name=masterform2] input[name=cctype]').val('Discover');
		  } 
		   
		//then check for Visa Electron
		  else if (/^(4026|417500|4508|4844|491(3|7))/.test(accountNumber))
		  {
			result = "visa_electron";
			$('div.cards .visa_electron').removeClass('off');
		  }
		  //return result;
	}				
	
	
	
	$(function() {
		
		$('#payment-form').submit(function(event) {
				var $form = $(this);
				
				$('form .loaderimg').show();
		 		$('form button').removeClass('button-red');
				
				// Disable the submit button to prevent repeated clicks
				$form.find('button').prop('disabled', true);
		
				// send the card details to Stripe
				Stripe.createToken({
					name: $('input[name=cc_fname]').val() + ' ' + $('input[name=cc_lname]').val(),
					number: $('input[name=cc_number]').val(),
					cvc: $('input[name=cc_cvv]').val(),
					exp_month: $('select[name=cc_month]').val(),
					exp_year: $('select[name=cc_year]').val()
				}, stripeResponseHandler);
				// Prevent the form from submitting with the default action
				return false;
			
		});
		
		
		$('input[name=cc_number]').live('keyup',function() { 
			getCreditCardType($(this).val());
		});
			
			
	
	});
	
	
})(jQuery);

