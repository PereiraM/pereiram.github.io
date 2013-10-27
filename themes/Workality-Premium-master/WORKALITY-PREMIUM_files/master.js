(function($){
	
			
			// FORM POST
			function postCCForm(form) { 
				$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
					if(data==1) { 
						window.location='/thank-you';
					}
				})
			}
			
			
			var loading = 'Loading...';
			
			$(function(){
			
			
					
			//// FACEBOOK CONNECT
			$('a.facebookloginbutton').live('click',function(e){
						
						var w = $(this);
						e.preventDefault();
						
						FB.getLoginStatus(function(response){
							FB.login(function(response) {
								if (response.authResponse) {
									var clicked = w.data('pwcsrf');
									var invitecode = w.data('invite');
									var types = w.data('types');
									
									FB.api('/me', function(response) {  
										  if(!fbclicked) {
											  
											  var fbclicked = 1;
											  $('a.facebookloginbutton').next().show();
											   
											  $.post('/fbqueries',{action:'fblogin',pwcsrf:clicked, code:invitecode},function(data) { 
												   if(data.status==1) {
													if(types=='login' || data.types=='login') {
														window.location.reload();	
													}else{
														$.post('/app/modals/login.php',{show : 'signup-password' },function(data) {
															$('.join-first-part').hide();
															$('div.join-third').html(data).slideDown('normal',function() { 
																$.fancybox.reposition();
															});
														});
													}
												  }else if(data.status==3){
													 alert(data.msg);
													 window.location.reload(); 
												  }else{
													window.location.reload();    
												  }
											  },'json');
										  }
									});  
								}
							}, {scope: 'email'});
						});
				  return false;
			});
			
			
			/// FACEBOOK LINK
			$('a.facebooklinkbutton').live('click',function(e){
						
						var pwcsrf = $(this).data('pwcsrf');
						
						FB.getLoginStatus(function(response){
							FB.login(function(response) {
							 if (response.authResponse) {
								  FB.api('/me', function(response) {   
									  $.post('/ajaxquery/who',{action:'who-fbname',pwcsrf:pwcsrf,id:response.id,n:response.name,l:response.link},function(data) { 
										  if(data==0) {
											alert('Sorry! Your Facebook account only can be linked with one Playwho account.');  
										  }else{
											window.location.reload();
										  }
									  });
								  });   
								}
								}, {scope: 'email'});
						});
						
						e.preventDefault();
			});
			
			
			/// FACEBOOK REVOKE LINK
			$('a.facebookrevokelink').live('click',function(e){
				
				var pwcsrf = $(this).data('pwcsrf');
						
				if(confirm('Your account will be disconnected from Facebook. Do you want to proceed?')) {
					FB.api('/me/permissions', 'delete', function(response) {
						$.post('/ajaxquery/who',{action:'who-revoke',pwcsrf:pwcsrf},function() { 
							  window.location.reload();
						  });
					});
				}
				e.preventDefault();
			});
			
			
			
		
				
				//$('[data-rel=popover]').popover();
				
				var isVisible = false;
				var clickedAway = false;
				
				$('[data-rel=tooltip]').tooltip({
					placement:'bottom',
					html:true
				});
				
							
				$('[data-rel=popover]').popover({
						html: true,
						trigger: 'manual'
					}).click(function(e) {
						$(this).popover('show');
						clickedAway = false
						isVisible = true
						e.preventDefault()
					});
				
				$(document).click(function(e) {
				  if(isVisible & clickedAway)
				  {
					$('[data-rel=popover]').popover('hide')
					isVisible = clickedAway = false
				  }
				  else
				  {
					clickedAway = true
				  }
				});


				// TOPSCROLLMENU 
				$(window).scroll(function () {
					if ($(this).scrollTop() > 700) {
						$('.topsecondmenu').fadeIn();
					} else {
						$('.topsecondmenu').fadeOut();
					}
				});
				
				///	BACK TO TOP
				$(window).scroll(function() {
					if($(this).scrollTop() > 800) {
						if (!Modernizr.touch) {
							$('a.backtotop').fadeIn();
						}
					} else {
						if (!Modernizr.touch) {
						$('a.backtotop').fadeOut();
						}
					}
				});
				$('a.backtotop').live('click',function(e) { 
					$('html, body').animate({scrollTop:0}, 1000, "easeInOutExpo"); 
					e.preventDefault(); 
				});
				

				/// POPUP CODE
				function wOpener(windowHeight, windowWidth, windowName, windowUri) {
					  var centerWidth = ((window.screen.width - windowWidth) / 2) - 50;
					  var centerHeight = ((window.screen.height - windowHeight) / 2) + 50 ;
				
					  newWindow = window.open(windowUri, windowName, 'resizable=0,width=' + windowWidth +
						',height=' + windowHeight +
						',left=' + centerWidth +
						',top=' + centerHeight);
					  return newWindow.name;
				}
				
				
				// RUN FANCYBOX
				$(".fancybox").fancybox({
					fitToView: false,
					scrolling : 'no'
				});
				
				// WORKS ROLLOVER
				$('.themefeatures .left .img').hover(function() { 
					$('.magnify',this).fadeTo('normal', 0.3);
				},function() { 
					$('.magnify',this).fadeTo('normal', 0);
				})
				// MENU FOLLOWS - DOCS
				$('div.helpdocs .wrap').scrollToFixed({
					marginTop: 30,
					zIndex: 999
				});
				
				/// TABLE OF CONTENTS SCROLL
				$('.tableofcontents a, a.slideanchor').click(function(e) {
					$('html,body').animate({scrollTop: $($(this).attr('href')).offset().top-40},'slow','easeInOutExpo');
					e.preventDefault();
				});
			
				// MOBILE MENU
   				$(".mobilemenu").pageslide({ direction: "right", bordercolor:"#fff", bgcolor:"#f5f5f5" });
				
				
				// CHECKOUT FORM 
				$('form[name=checkoutform]').submit(function() { 
					$('span',this).show();
					$('button',this).remove();
				})
				
				// POST COUPON
				$('form[name=postcoupon]').submit(function(e) {
						$.post(jsvars.url+'/norwork/get_wp.php',$(this).serialize(),function(data) { 
							if(data==1) { 
								location.reload();
							}else{
								alert(data);
							}
						})
						e.preventDefault();
				});
				// ADD TO CART
				$('a.addtocart').live('click',function(e) {
						var nonce = $(this).attr('data-nonce');
						var id = $(this).attr('data-id');
						$.post(jsvars.url+'/norwork/get_wp.php',{cart_nonce:nonce,item_id:id},function(data) { 
							if(data) { 
								window.location=data;
							}
						})
						e.preventDefault();
				});
				
				// REMOVE FROM CART
				$('a.removefromcart').live('click',function(e) {
						var nonce = $(this).attr('data-nonce');
						var id = $(this).attr('data-id');
						$.post(jsvars.url+'/norwork/get_wp.php',{action:'removefromcart',cart_nonce:nonce,item_id:id},function(data) { 
							if(data) { 
								location.reload();
							}
						})
						e.preventDefault();
				});
				
				
				/// TESTIMONIAL
				$('form[name=formfeedback]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data.status==1) { 
								$(form).hide();
								$('textarea, input',form).val('');
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html(data.msg).slideDown();
								setTimeout('$(".showtestimonial").slideDown();$(".memberareaform").hide();$(".memberareaform form").show();$("div.form-msg").hide()',5000);
								/*
								if($('input[name=twitter]',form).is(':checked')) {
									wOpener(400, 650, 'TwitterShare', 'https://twitter.com/intent/tweet?text='+encodeURIComponent($('textarea[name=feedback]',form).val() + ' @northemes http://northeme.com'));
								}
								*/
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data.msg).slideDown();
							}
							$('button',form).html(btncontent);
						},'json')
							
					}
				});
				
				
				
				// FORM POST
				$('form[name=login-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						var path = $(form).data('path');
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								if(path=='cart') {
									window.location='/cart/?checkout=1';
								}else{
									location.reload();
								}
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
								$('button',form).html(btncontent);
							}
						})
							
					}
				});
				
				// FORM POST
				$('form[name=login-form-original]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						var path = $(form).data('path');
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								if(path=='cart') {
									window.location='/cart/?checkout=1';
								}else{
									location.reload();
								}
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
								$('button',form).html(btncontent);
							}
						})
							
					}
				});
				
						
				$('form[name=aff-login-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						var path = $(form).data('path');
						$('button',form).html(loading);
						
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								window.location='/affiliates';
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
								$('button',form).html(btncontent);
							}
						});
					
					}
				});
				
				
				// FORM POST
				var thisusernameok=1;
				var thisemailok=1;
				$('form[name=newaffiliate-form] input[name=username]').live('blur',function() {
						
						$.post(jsvars.url+'/norwork/get_wp.php',{checkuser:1,aff_register_nonce :$('input[name=aff_register_nonce]').val(), username : $('input[name=username]').val()},function(data1) {
							if(data1==1) {
								$('form[name=newaffiliate-form] div.username').hide();
								thisusernameok = 1;
							}else{
								$('form[name=newaffiliate-form] div.username').slideDown();
								thisusernameok = 0;
							}
						});	
				});
				
				
				// FORM POST
				$('form[name=newaffiliate-form] input[name=email]').live('blur',function() {
						$.post(jsvars.url+'/norwork/get_wp.php',{checkemail:1,aff_register_nonce :$('input[name=aff_register_nonce]').val(), email : $('input[name=email]').val()},function(data1) {
							if(data1==1) {
								$('form[name=newaffiliate-form] div.email').hide();
								thisemailok = 1;
							}else{
								$('form[name=newaffiliate-form] div.email').slideDown();
								thisemailok = 0;
							}
						});	
				});
				
				$('form[name=updateaffiliate-form] input[name=username]').live('blur',function() {
						
						$.post(jsvars.url+'/norwork/get_wp.php',{checkuser:1,aff_update_nonce :$('input[name=aff_update_nonce]').val(), username : $('input[name=username]').val()},function(data1) {
							if(data1==1) {
								$('form[name=updateaffiliate-form] div.username').hide();
								thisusernameok = 1;
							}else{
								$('form[name=updateaffiliate-form] div.username').slideDown();
								thisusernameok = 0;
							}
						});	
				});
				
				
				// FORM POST
				$('form[name=updateaffiliate-form] input[name=email]').live('blur',function() {
						$.post(jsvars.url+'/norwork/get_wp.php',{checkemail:1,aff_update_nonce :$('input[name=aff_update_nonce]').val(), email : $('input[name=email]').val()},function(data1) {
							if(data1==1) {
								$('form[name=updateaffiliate-form] div.email').hide();
								thisemailok = 1;
							}else{
								$('form[name=updateaffiliate-form] div.email').slideDown();
								thisemailok = 0;
							}
						});	
				});
				
				
				
				
				$('form[name=newaffiliate-form]').validate({
					submitHandler: function(form) {
						if(thisusernameok!=1) {
							alert('This username is in use, please choose another one');
							return false;	
						}
						if(thisemailok!=1) {
							alert('This email is in use, please choose another one');
							return false;	
						}
						if($('input[name=agreed]').is(':checked')) { 
							var btncontent = $('button',form).html();
							$('button',form).html('PLEASE WAIT');
							form.submit();
						}else{
							alert('You MUST accept the terms & conditions');
							return false;	
						}
					}
				});
				
				
				$('form[name=updateaffiliate-form]').validate({
					rules: {
						password_again: {
						  equalTo: "#password_master"
						}
			   	    },
					submitHandler: function(form) {
						if(thisusernameok!=1) {
							alert('This username is in use, please choose another one');
							return false;	
						}
						if(thisemailok!=1) {
							alert('This email is in use, please choose another one');
							return false;	
						}
						var btncontent = $('button',form).html();
						$('button',form).html('PLEASE WAIT');
						form.submit();
					}
				});
				
				
				// FORM REGISTER
				
				$('form[name=newlogin-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html('PLEASE WAIT');
						form.submit();
					}
				});
				
				$('form[name=newregister-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html('PLEASE WAIT');
						form.submit();
					}
				});
				
				$('form[name=register-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								window.location='/cart/?checkout=1';
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html('This email is already in use. <br>Please select another email.').slideDown();
								
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
				// FORGOT FORM POST
				$('form[name=forgot-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html(data).slideDown();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
					// FORGOT FORM POST
				$('form[name=forgot-form-original]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html(data).slideDown();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
				
				$('form[name=forgot-form2]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html(data).slideDown();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html(data).slideDown();
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				$('a.changenameemail').live('click',function() {
						$.post(jsvars.url+'/norwork/get_wp.php',{action:'changenameemail'},function(data) { 
							window.location='/cart/?checkout=2';
						})
						return false
				});
				
				
				
				// FORM DOWNLOAD
				$('form[name=download-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html('We sent the download link to your e-mail!').slideDown();								
								$(form).slideUp();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html('Something went wrong. Please try again.').slideDown();								
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
				// FORM EDIT INFO
				$('form[name=editinfo-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html('Your account info has been succesfully updated').slideDown();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html('Something went wrong, please try again.').slideDown();	
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
				// FORM CHANGE PASS
				$('form[name=editpass-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						var rpass = $('input[name=rpass]',form).val();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) { 
							if(data.status==1) { 
								var ek = '';
								if(rpass!="" && data.logged!=1) { 
									if(data.aff_pass==1) { 
										var ek=' <a href="/affiliates" style="color:#fff; font-weight:bold">Click here to LOGIN</a>';
									}else{
										var ek=' <a href="#loginform" class="fancybox" style="color:#fff; font-weight:bold">Click here to LOGIN</a>';
									}
								}
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html('Your password has been succesfully updated.'+ek).slideDown();
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html('Password and confirm password fields must be same').slideDown();	
							}
							$('button',form).html(btncontent);
						},'json')
							
					}
				});
				
				
				
				// FORM CONTACT
				$('form[name=contact-form]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						$.post(jsvars.url+'/norwork/get_wp.php',$(form).serialize(),function(data) {
							if(data==1) { 
								$(form).parent().find('div.form-msg').removeClass('msg-error').addClass('msg-success').html('Thank you for your message. We\'ll get back to you shortly').slideDown();	
								$('form[name=contact-form] input[type=text], form[name=contact-form] textarea').val('');
							}else{
								$(form).parent().find('div.form-msg').removeClass('msg-success').addClass('msg-error').html('Something went wrong. Please try again').slideDown();
							}
							$('button',form).html(btncontent);
						})
							
					}
				});
				
				
					
				// FORM CONTACT
				$('form[name=customization-forms]').validate({
					submitHandler: function(form) {
						var btncontent = $('button',form).html();
						$('button',form).html(loading);
						form.submit();
					}
				});
				
				
				
				/// FLEXSLIDER
				$('.flexslider').fitVids().flexslider({
					animation: "fade",
					slideshowSpeed: 12000,
					prevText: '<i class="icon-angle-left"></i>',
					nextText: '<i class="icon-angle-right"></i>'
				});
			
			
				/// NEWSLETTER
				$('form[name=subform1]').validate({
					submitHandler: function(form) {
						$('button',form).html('loading');
							$.ajax({
								url: '/northeme-content/themes/northeme/norwork/subscribe.php',
								type: 'POST',
								data: {
									email: $('form[name=subform1] input[name=EMAIL]').val()
								},
								success: function(data){
									$('span.result',form).html(data).css('display','block');
									$('button',form).html('SUBSCRIBE');
								},
								error: function() {
									$('span.result',form).html('Sorry, an error occurred.').css('display','block');
									$('button',form).html('SUBSCRIBE');
								}
							});
						setTimeout("$('span.result').slideUp()",5000);
						return false;
					}
				});
				
				
				/// TABS 
				$('.tabarea a').click(function (e) {
				  e.preventDefault();
				  $(this).tab('show');
				})
				
				/// LOGIN
				$('.loginforms .form-login a.forgot').live('click',function(e) { 
					$(this).parent().parent().hide()
					$(this).parent().parent().next().slideDown()
					e.preventDefault();
				})
				
				$('.loginforms .form-forgot a.login').live('click',function() { 
					$(this).parent().parent().hide()
					$(this).parent().parent().prev().slideDown()
				})
				
				
				$('.loginforms span.form-msg a').click(function(e) { 
					$(this).parent().slideUp();
					e.preventDefault();
				})
				
			});
			
})(jQuery);

