/**
 * Plugin de jQuery para estilização de Inputs do tipo Radio e Checkbox.
 * @author André Gumieri, baseado no script de Luis Wouters
 * @version 1.0.3
 */


(function($) {
	$.fn.checkAndRadio = function() {
		this.each(function(i) {
			var type = $(this).attr("type");
			if(type=="checkbox" || type=="radio") {
				var id = $(this).attr("id");
				var checked = $(this).attr("checked");
				if(id == "" || id==undefined) {
					id="checkAndRadio-"+i;
					$(this).attr("id", id);
				}
				
				if(checked=="" || checked==undefined) {
					checked = "false";
				} else if (checked=="true" || checked==true || checked=="checked") {
					checked = "true";
				}
				
				$(this).addClass("checkAndRadio-input");
				$(this).before('<span data-check-and-radio-relative-id="' + id + '" class="checkAndRadio-span checkAndRadio-relative-id-' + id + ' checkAndRadio-'+type+' checkAndRadio-'+type+'-' + checked + '"></span>');
				$(this).hide();
			}
		});

		$(".checkAndRadio-input[type=\"radio\"]").change(function(e) {
			//console.log("radio-change");
			var inputId = $(this).attr("id");
			var inputName = $(this).attr("name");
			checkAndRadioJustChanged = inputId;
			
			if( $(this).is(":checked") ) {
				$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-radio-false");
				$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-radio-true");
				
				$(".checkAndRadio-input[name=\"" + inputName + "\"]").each(function() {
					var inputInactiveId = $(this).attr("id");
					if( inputInactiveId != inputId ) {
						$(".checkAndRadio-relative-id-" + inputInactiveId).removeClass("checkAndRadio-radio-true");
						$(".checkAndRadio-relative-id-" + inputInactiveId).addClass("checkAndRadio-radio-false");
					}
				});
			}
		});


		
		$(".checkAndRadio-input[type=\"checkbox\"]").change(function(e) {
			var inputId = $(this).attr("id");
			var newState = $(this).attr("checked");
			if(newState==true || newState=="checked") {
				$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-checkbox-false");
				$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-checkbox-true");
			} else {
				$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-checkbox-true");
				$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-checkbox-false");			
			}
		});
		
		$(".checkAndRadio-checkbox").click(function(e) {
			var inputId = $(this).attr("data-check-and-radio-relative-id");
			if($(this).hasClass("checkAndRadio-checkbox-true")) {
				$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-checkbox-true");
				$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-checkbox-false");
				$("#"+inputId).attr("checked", false);
			} else {
				$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-checkbox-false");
				$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-checkbox-true");			
				$("#"+inputId).attr("checked", true);
			}
			$("#"+inputId).change();
			if($(this).parents("label").length>0) {
				return false;
			}
		});
		
		$(".checkAndRadio-radio").click(function() {
			var relativeId = "#"+$(this).attr("data-check-and-radio-relative-id");
			if( $(this).hasClass("checkAndRadio-radio-false") ) {
				//$(this).html("check");
				$(relativeId).attr("checked",true);
				var inputName = $(relativeId).attr("name");
				$(".checkAndRadio-input[name=\"" + inputName + "\"]").each(function() {
					var inputId = $(this).attr("id");
					if( inputId != relativeId.substr(1) ) {
						$(".checkAndRadio-relative-id-" + inputId).removeClass("checkAndRadio-radio-true");
						$(".checkAndRadio-relative-id-" + inputId).addClass("checkAndRadio-radio-false");
					}
				});
				$(this).addClass("checkAndRadio-radio-true");
				$(this).removeClass("checkAndRadio-radio-false");
			}
			$(relativeId).change();
			if($(this).parents("label").length>0) {
				return false;
			}
		});
	}
})(jQuery)