$(document).ready(function(){
	openMenu();
	closeMenu();
})
function openMenu(){
	$("#btn-open").on('click', function(){
		$('html').addClass('menu-ativo');
	});
}
function closeMenu(){
	$("#btn-close").on('click', function(){
		$('html').removeClass('menu-ativo');
	})
}