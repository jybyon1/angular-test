/*
 * 파일명:		layer.popup.js
 * 설  명 :		레이어팝업공통
 * 작성자:		glim
 * 최초작성일:	2018/01/15
 * 최종수정일:	2018/01/23
*/



$(document).ready( function(){

	$( window ).resize(function() { resize_popup(); });
})

//공통팝업
function layer_open(el){
	var temp = $(el);
	var commonpop = temp.parents('.lpopup').eq(0);
	commonpop.show();

	var ap = temp.actionPopup();
	if(ap!=null) {
		if(ap.actionPopup!=null) ap.actionPopup.initHeight();
	}
	/* origin-height save */
	var tg =  temp.find('.pop_contents');
	if ( tg.attr('data-origin-height') == undefined ){//최초에 한번만
		tg.attr('data-origin-height',tg.outerHeight());
	}
	// 화면 중앙에 레이어띄움
	if (temp.outerHeight() < window.innerHeight ) {
		temp.offset({top : (window.innerHeight-temp.outerHeight())/2 + window.pageYOffset});
	}else{
		//팝업이 window 더클경우
		temp.css({top : 0});
	}

	if (temp.outerWidth() < window.innerWidth ) {
		temp.offset({left : (window.innerWidth-temp.outerWidth())/2});
	}else{
		temp.offset({left : 0});
	}
}

/* 팝업닫기 */
function layer_close(el){
	var temp = $(el);
	var modalpop = temp.parents('.lpopup').eq(0);
	var tg =  temp.parents('.lpopup').eq(0).find('.pop_contents');
	modalpop.hide(0);
}

function resize_popup (e){
	var els = $('.lpopup:visible');

	$(els).each(function(i) {
		var temp = $(this).find('.popup_layer');
		var tg =  temp.find('.pop_contents');
		var w_innerHeight = window.innerHeight;
		var tg_outerHeight = tg.outerHeight();
		var ori_height = tg.attr('data-origin-height');

		if ( w_innerHeight <= tg_outerHeight ){
			//팝업이 윈도우보다 크거나 같을때
			temp.css('top',0);
		}else{
			//팝업이 윈도우보다 작으면
			temp.offset({top : (window.innerHeight-temp.outerHeight())/2 + window.pageYOffset});
		}

		if (temp.outerWidth() < window.innerWidth ) {
			temp.offset({left : (window.innerWidth-temp.outerWidth())/2});
		}else{
			temp.offset({left : 0});
		}

	});
}


(function($) {


	$.fn.actionPopup = function() {

		if($(this).length==0) {
			return null;
		}
		if("undefined" == typeof $(this).data("actionPopup") || $(this).data("actionPopup") == null) {
		}else{
			return $(this).data();
		}

		var data = {
			element : $(this),
			popupHeader : null,
			popup_layer : null,
			popContainer : null,
			isMouseDown : false,
			mouseDownX : 0,
			mouseDownY : 0,
			offsetLeft : 0,
			offsetTop : 0,
			popupNsResizer : null,
			isResizerMouseDown : false,
			currentHeight : 0,
			originHeight : 0,
			initHeight : function() {
				if(this.popContainer !=null && this.originHeight>0) {
					this.popContainer.height(this.originHeight);
				}
			}
		};

		data.popupHeader = $(this).find("h1");
		data.popup_layer = $(this);
		data.popContainer = $(this).find(".popConWrap");
		data.popup_layer.css("max-height", "initial");
		data.popup_layer.css("overflow-y", "hidden");
		data.originHeight = $(this).find(".popConWrap").height();

		$(window).on("blur", function(e) {
			data.isMouseDown = false;
			data.isResizerMouseDown = false;
		});

		$(this).data("actionPopup", data);

		return data;
	};
})(jQuery);
