/*
 * 파일명:		front.ui.bs.js
 * 설  명 :		공통 자바스크립트
*/

var _gnb;
var _mnbSelectId = [];// = [1,2];/*활성화된 메뉴 0 부터 카운트됨*/

$(document).ready(function() {
	try {
		$.datepicker.setDefaults({
			closeText: '삭제',
			prevText: '이전',
			nextText: '다음',
			currentText: '오늘',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			weekHeader: 'Wk',
			dateFormat: 'yy-mm-dd',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true,
			yearRange: '1900:+5',
			yearSuffix: '',
			showOn: 'both',
			buttonImageOnly: false,
			showOtherMonths: true,
			changeMonth: true,
			changeYear: true,
			showButtonPanel: true,
			onClose: (dateText, inst) => {
				if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
					document.getElementById(inst.id).value = '';
					$('#' + inst.id).trigger('change');
				}
			}
			// beforeShow : function(){
			// 	if ( $(this).prop("disabled") == true ){return false;}
			// 	//disable add
			// 	$(this).siblings('.ui-datepicker-trigger').css("background-position","-16px 0");
			// },
			// onClose:function(){
			// 	$(this).siblings('.ui-datepicker-trigger').css("background-position","0 0");
			// }
		});
	}
	catch(exception){
		//catchStatements
	}

	//페이지로딩시 공통실행 메서드
	if ( $(".gnb").length > 0  ){//gnb 초기화
		_gnb = new GnbObj('.gnb');
		_gnb.name = '_gnb';
		_gnb.init();
	}

	$( window ).resize( function() { resize(); });
	resize();





	thChange();
	$(window).on('resize', function () {
		thChange();
	});


});

function thChange() {
	var td_obj = $('.table_scroll_area > table');
	td_obj.each(function(){
		var td_display = $(this).parents('.tab_content').css('display');

		if (td_display != 'none') {
			var td_w = $(this).width(),
				th_obj = $(this).parents('.table_wrap').children('.table_header'),
				th_w = th_obj.width();

			th_obj.css('width', td_w + 'px');
		}
	});
}


function resize (){

}


/*
 * date : 20180119
 * last : 20180119
 * name : tabsOnOff( 선택자, 상위 선택자, 보여지는 컨텐츠 선택자, 콜백함수 )
 * pram :  el (target) / container (parent) / tg (target ele selector)
 */
function tabsOnOff (el, container, callback) {
	/* console.log ('tabsOnOff'); */

	var tabitem = $(container).find(el).parent('.tab-item');
	var tg = $($(tabitem).find('.tab-link').attr("href"));//target container
	if ( $(tabitem).hasClass ("on") ){//클릭된타겟 활성화일경우 return
		return false;
	}

	//off
	var oldTabitem = $(container).find('.tab-item.on');
	// console.log ( "@@ ", oldTabitem, "~")
	if ( oldTabitem.length > 0 ){
		//기존 활성화탭 off
		$(oldTabitem).removeClass('on');
		$($(oldTabitem).find('.tab-link').attr("href")).hide();
		//	console.log ( $(oldTabitem).find('.tab-link').attr("href") )
	}

	//on
	tabitem.addClass('on');//tab active
	$(tg).show(0, function(){//tab show
		if ( callback != null && typeof callback === "function" ){
			callback.apply ( null, []);
		}
	});
	thChange();
}



/****************************************
 * util_menu sub
 *****************************************/




/****************************************
 * GNB
GNB 활성화 방법 (0 부터 카운트됨)
_mnbSelectId = [0,0]; << 해당 부분이 상단에 선언되어있을시 _gnb.mnbFocus(); 별도 호출하지않아도 작동
실행 초기화는 front.ui.js
 *****************************************/
function GnbObj (id){
	this.getElement = $(id);
	this.len = this.getElement.find("li").length;
	this.bdTimer = null;
}
GnbObj.prototype.init = function(){

	//console.log ( _mnbSelectId, this.name )
	$('>li',this.getElement).each(function(i) {
		$(this).attr("id","gnb_"+i);
		$(this).find('.gnb_sub_item').each(function(j) {
			$(this).attr("id","gnb_"+i+"_"+j);
		});

		//hover
		$(this).mouseover(function(e){
			var tgId = $(e.currentTarget).attr('id');
			//console.log ( tgId, this.getElement);

			$('> li',$(this).parent()).removeClass("active");

			$('#'+tgId).addClass("active");

		});

	});
	$(this.getElement).mouseover(this.delegate(this,this.bdStop));
	$(this.getElement).mouseleave(this.delegate(this, this.mouseLeave));
	//최초 메뉴 활성화 실행
	this.bdStop();
	this.bdTimer = setTimeout(this.name + ".mnbFocus()", 100);

}

GnbObj.prototype.mnbFocus = function(){
	if ( this.bdTimer == null ) { return false;}
	//console.log ("mnbFocus", _mnbSelectId)

	$('>li',this.getElement).removeClass("active");
	if (_mnbSelectId[0] != -1){
		$('#gnb_'+_mnbSelectId[0]).addClass("active");
	}
	if ( _mnbSelectId[1] != -1 ){
		$('#gnb_'+_mnbSelectId[0]+'_'+_mnbSelectId[1]).addClass("active");
	}
}

GnbObj.prototype.mouseLeave = function(e){
	/* console.log ( "@@@ mouseLeave ") */
	this.bdStop();
	this.bdTimer = setTimeout(this.name + ".mnbFocus()", 1000);
}
GnbObj.prototype.bdStop = function(){ clearTimeout(this.bdTimer); this.bdTimer=null; }
GnbObj.prototype.delegate = function(target,func){return function(e){return func.call(target,e);}}


/*
 * date : 20180220
 * last : 20180220
 * name : main 프로세스 변경 안내 slide
 * pram :  container (parent) / target (slide element target) / time (ms)
 */
function prevNextRollingBanner(container, target, time){
	var $container = $(container);
	var $target = $container.find(target);
	var $prev = $container.find('.controls .prev');
	var $next = $container.find('.controls .next');
	var $cntCurrent = $container.find('.controls .num-current');
	var $cntTotal = $container.find('.controls .num-total');
	var len = $target.children().length;
	var gap = $target.children().outerHeight();
	var _thisTimer;
	var _changeTime = time;
	var cnt = 0;

	$cntCurrent.text(cnt + 1);
	$cntTotal.text(len);

	$prev.bind('click',function(){
		cnt = (cnt-1+len)%len;
		$target.css('top', -(gap*cnt));
		$cntCurrent.text(cnt + 1);
		return false;
	});
	$next.bind('click',function(){
		cnt = (cnt+1+len)%len;
		$target.css('top', -(gap*cnt));
		$cntCurrent.text(cnt + 1);
		return false;
	});

	$container.bind('mouseenter',function(e){
		clearTimeout( _thisTimer );
		_thisTimer = null;
	}).bind('mouseleave',function(e){
		_thisTimer = setInterval(rollingTimerComplete, _changeTime);
	});

	function rollingTimerComplete (){
		cnt = (cnt+1+len)%len;
		$target.css('top', -(gap*cnt));
		$cntCurrent.text(cnt + 1);
		return false;

	}
	_thisTimer = setInterval(rollingTimerComplete, _changeTime);

}




