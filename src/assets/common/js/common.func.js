/*
 * 파일명:		common.func.js
 * 설  명 :		페이지내 공통 실행필요한 함수 include 
 * 작성자:		glim
 * 최초작성일:	2018/01/19
 * 최종수정일:	2018/02/08 (select 실행)
 * Comment
 * 초기실행시 공통으로 필요한 함수들
 * 공통으로 들어갈경우 추후 페이지내 수정이 너무 많아질 것 같아서 임시 실행 호출 파일 입니다.)
 * 각 페이지에서만 필요한 스크립트는 각 페이지내에 작성예정
*/
 
 
//$(window).on("load", function (e) {
$(document).ready( function(){
 
	// jquery datepicker 실행함수
	if ( $("[data-role=datepicker]").length > 0 ){
		$("[data-role=datepicker]").datepicker();
	}  
	
	//파일찾기 form 
	if ( $(".file-upload").length > 0 ){
		
		var fileTarget = $('.file-upload'); 
		$(fileTarget).each(function(){
			var a = $(this).find('.file-hidden');
			$(a).on('change', function(){ // 값이 변경되면 
				if(window.FileReader){ // modern browser 
					var filename = $(this)[0].files[0].name;
				}else { // old IE 
					var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
				} // 추출한 파일명 삽입 
				$(this).siblings('.file-name').val(filename); 
			});
			
		});
	}
	
	// select 실행 20180208
	if ( $('.ui-sel').length > 0 ){
		$('.ui-sel').each(function(){
			$(this).selectric();//초기화
		});	
	}
		
});

$(function() {
	
	
	
});
  

