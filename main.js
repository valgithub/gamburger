function init() {
	clickButtons();
}
var burgerCollection = [];
var template = tmp1;
var razmer=1;
var summ=0;
var summtop=0;
var rez=0;

function Hamburger() {
	var self = this;
	
	this.toppings = {
		bulka: {id: "bulka", price: 0.2, weight: 0.3},
		kotleta:{id:"kotleta", price: 1, weight: 0.2},
		syr: {id: "syr", price: 0.9, weight: 0.1},
		salat: {id: "salata", price: 0.5, weight: 0.12},
		luk: {id: "luk", price: 0.2, weight: 0.05},
		tomat: {id: "tomat", price: 0.7, weight: 0.08},
		ogurec: {id: "ogurec", price: 0.6, weight: 0.07},
		bekon: {id: "bekon", price: 1.2, weight: 0.150},
		sous: {id: "sous", price: 0.5, weight: 0.05}
	};

	this.element;
	this.price = 1.3;
	this.weight = 0.3; 
	this.podarok = 1;
	if(razmer==2){this.price = 2.6; this.weight = 0.5; this.podarok = 1; template=tmp2;} else template = tmp1;
	summ+=this.price;
	


	// var counter=getElementById("counter");
	// counter.innerHTML=summ;

	this.addtopping = function(topping) {
		this.weight += this.toppings[topping].weight;
		this.price += this.toppings[topping].price;
		summtop+=this.toppings[topping].price;;
		updateView();
	};

	function updateView() {

		var elementPrice = self.element.getElementsByClassName("price")[0];
		var elementWeight = self.element.getElementsByClassName("weight")[0];
		elementPrice.innerHTML = "Цена: " + self.price.toFixed(2);
		elementWeight.innerHTML = "Вес: " + self.weight.toFixed(2);
		rez=summ+summtop;
		var counter = document.getElementById("counter");
		counter.innerHTML = rez.toFixed(2);
		if(razmer==2){
		elementWeight.innerHTML = "Вес: " + self.weight.toFixed(2);
		} else elementWeight.innerHTML = "Вес: " + self.weight.toFixed(2);
	};
}

Hamburger.prototype.addToDOM = function(parent) {
	
	var self = this;
	var clone = template.content.cloneNode(true);
	var price = clone.querySelector(".price");
	var weight = clone.querySelector(".weight");
	var podarok = clone.querySelector(".podarok");
	parent.appendChild(clone);

	this.element = parent.lastElementChild;
	this.element.addEventListener("dragover", function(event) {
		allowDrop(event)
	}, false);

	this.element.addEventListener("drop", function(event) {
		drop(event)
	}, false);

	function drop(event) {
		event.preventDefault();
		self.addtopping(event.dataTransfer.getData("text"));
	}

	function allowDrop(event) {
		event.preventDefault();
	}
	
	price.innerHTML = "Цена: " + this.price.toFixed(2);
	weight.innerHTML = "Вес: " + this.weight.toFixed(2);
	if(razmer==2){
		weight.innerHTML = "Вес: " + this.weight.toFixed(2) ;
		podarok.innerHTML = "Подарок: Кола!";
	}

	rez=summ;
	var counter = document.getElementById("counter");
	counter.innerHTML = rez.toFixed(2);
}


function clickButtons() {
	addBurgerBtn.addEventListener("click", function() {
		addBurger();
	});
	addDoubleBurgerBtn.addEventListener("click", function() {
		addDoubleBurger();
	});
	addBuyBtn.addEventListener("click", function() {
		addBuy();
	});
	bulka.addEventListener('dragstart', bulkaDrag)
	kotleta.addEventListener('dragstart', kotletaDrag)
	syr.addEventListener('dragstart', syrDrag)
	salat.addEventListener('dragstart', salatDrag)
	luk.addEventListener('dragstart', lukDrag)
	tomat.addEventListener('dragstart', tomatDrag)
	ogurec.addEventListener('dragstart', ogurecDrag)
	bekon.addEventListener('dragstart', bekonDrag)
	sous.addEventListener('dragstart', sousDrag)
	
}

function bulkaDrag(event) {event.dataTransfer.setData("text", "bulka");}
function kotletaDrag(event) {event.dataTransfer.setData("text", "kotleta");}
function syrDrag(event) {event.dataTransfer.setData("text", "syr");}
function salatDrag(event) {event.dataTransfer.setData("text", "salat");}
function lukDrag(event) {event.dataTransfer.setData("text", "luk");}
function tomatDrag(event) {event.dataTransfer.setData("text", "tomat");}
function ogurecDrag(event) {event.dataTransfer.setData("text", "ogurec");}
function bekonDrag(event) {event.dataTransfer.setData("text", "bekon");}
function sousDrag(event) {event.dataTransfer.setData("text", "sous");}


function addBurger() {
	razmer=1;
	var newBurger = new Hamburger();
	newBurger.addToDOM(container);
	burgerCollection.push(newBurger);
}

function addDoubleBurger() {
	razmer=2;
	var newDoubleBurger = new Hamburger();
	newDoubleBurger.addToDOM(container);
	burgerCollection.push(newDoubleBurger);

}

function addBuy(){if(summ>0){
	alert("Оплатите счет в размере  "+ rez.toFixed(2) +"  условных единиц");
	window.open("https://webmoney.ua");
}
	else alert("Покупок не выбрано")
}

init();

