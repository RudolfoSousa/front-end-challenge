$(document).ready(function(){
	openMenu();
	closeMenu();
	order();
	$.get("http://localhost/amaro-challenge/products", function(data){
		var itens = data.products;
		$("#total").text(data.products.length);
		for(var i = 0; i < itens.length; i++){
			var item = itens[i].style;
		}
		listaProdutos();
	}).fail(function(){
		alert("Req Ruim");
	})
});

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

function listaProdutos(){
	$.get("http://localhost/amaro-challenge/products", function(data){
		var itens = data.products;
		for(var i=0; i<itens.length;i++){
			var item = itens[i];			
			criaBox(item);
		}
		abreProduto();		
	})
}

function criaBox(item){
	var box = $("<div>").addClass('box');
	var imagem = $("<img>").attr('src', item.image);
	var name = $("<p>").addClass('box-name').text(item.name);
	var divFlexA = $("<div>").addClass('flex');
	var boxPrice = $("<p>").addClass('box-price').text("");
	var boxPriceSpan = $("<span>").text(item.regular_price);
	var boxParcer = $("<p>").addClass('box-parcer').text(item.installments);
	var divFlexB = $("<div>").addClass('flex');
	var onSaleBoxPrice = $("<p>").addClass('box-price').text("De ");
	var onSaleBoxPriceSale = $("<span>").text(item.regular_price);
	var onSaleBoxPriceSaleNew = $("<p>").addClass('box-sale').text("Por");
	var onSaleBoxPriceSaleNewSale = $("<span>").text(item.actual_price);
	var boxParcerB = $("<p>").addClass('box-parcer').text(item.installments);
	var parSize = $("<p>").addClass('size-par').text("Sizes");
	// var sizes = $("<div>").addClass('sizes');
	
	onSaleBoxPriceSaleNew.append(onSaleBoxPriceSaleNewSale);
	onSaleBoxPrice.append(onSaleBoxPriceSale);
	divFlexB.append(onSaleBoxPrice);
	divFlexB.append(onSaleBoxPriceSaleNew)
	divFlexB.append(boxParcerB);
	boxPrice.append(boxPriceSpan);

	divFlexA.append(boxPrice);
	divFlexA.append(boxParcer);

	box.append(imagem);
	box.append(name);
	box.append(divFlexA);
	box.append(divFlexB);
	box.append(parSize);

	if(item.discount_percentage.length>0){
		$(divFlexB).addClass('block');
		$(divFlexA).addClass('on-sale');
	}else{
		$(divFlexB).addClass('on-sale');
		$(divFlexA).addClass('block');
	}

	$("main").append(box);
}
function abreModal(){
	$("html").addClass('modal');
};
function fechaModal(){
	$("html").removeClass('modal');
	$("html").find(".individual").remove();
};
function order(){
	$("#btn-order").on('click',function(){
		var quantidade = $(this).parent().parent().parent().parent().find(".box .block");
		for(var i = 0; i<quantidade.length; i++){
			var item = quantidade[i];
			var elementos = item.childElementCount;
			if(elementos>2){
				$(quantidade).parent().fadeOut();
			}
			console.log(elementos);
		}
	})
}
function abreProduto(){
	$(".box-name").on('click', function(){
		var name = $(this).text();
		var imagem = $(this).parent().find('img').attr('src');
		var price = $(this).parent().find('.block').find(".box-price").text();
		var sale = $(this).parent().find('.block').find(".box-sale").text();
		var parcer = $(this).parent().find('.block').find(".box-parcer").text();
		var block = $("<div>").addClass("flex");

		var modal = $("<div>").addClass('individual');
		var btnClose = $("<button>").attr('id', 'modal-close');
		var icon = $("<i class=material-icons>close</i>");
		var img = $("<img>").attr('src', imagem);
		var name = $("<p>").text(name);
		var preco = $("<div>").addClass('preco');
		var btnBuy = $("<button>").attr('id', 'btnBuy');
		var btnIcon = $("<i class=material-icons>add_shopping_cart</i>")
		var boxPrice = $("<p>").text(price);
		var boxSale = $("<p>").text(sale);
		var boxParcer = $("<p>").text(parcer);

		block.append(boxPrice);
		block.append(boxSale);
		block.append(boxParcer);

		btnClose.append(icon);
		btnBuy.append(btnIcon);

		preco.append(block);
		modal.append(btnClose);
		modal.append(img);
		modal.append(name);
		modal.append(preco);
		modal.append(btnBuy);

		$("main").append(modal);
		abreModal();
		$(modal).find("#modal-close").click(fechaModal);
	});
}