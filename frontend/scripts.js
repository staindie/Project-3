!function(){function isScrolledIntoView(elem,offset){var $elem=$(elem),$window=$(window),docViewTop=$window.scrollTop(),docViewBottom=docViewTop+$window.height(),elemTop=$elem.offset().top,elemBottom=elemTop+$elem.height()-offset;return docViewBottom>=elemBottom&&elemTop>=docViewTop}var app=angular.module("myApp",["ngDialog"]);app.controller("MainController",["$scope","ngDialog",function($scope,ngDialog){this.tab=1,this.setTab=function(tabId){this.tab=tabId},this.isSet=function(tabId){return this.tab===tabId},$scope.products=[{name:"awesome photo 1",src:"images/img.jpg",category:"graphic",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 3",src:"images/img2.jpg",category:"web",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 4",src:"images/img3.jpg",category:"web",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 5",src:"images/img4.jpg",category:"photo",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 6",src:"images/img5.jpg",category:"photo",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 7",src:"images/img6.jpg",category:"photo",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 8",src:"images/img7.jpg",category:"graphic",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 9",src:"images/img.jpg",category:"graphic",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 3",src:"images/img2.jpg",category:"web",description:"Eum cu tantas legere complectitur, hinc utamu"},{name:"awesome photo 3",src:"images/img3.jpg",category:"web",description:"Eum cu tantas legere complectitur, hinc utamu"}],$scope.timelineData=[{data:"September 2014",title:"We Reach The Top",subtitle:"Kat is new brand",description:"Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu ne, at meliore explicari conceptam qui. Agam ceteros forensibus."},{data:"May 2014",title:"Close To The Stars",subtitle:"Big thing are happening",description:"Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu."},{data:"April 2012",title:"New Office",subtitle:"We are moving",description:"Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum."},{data:"March 2012",title:"Ket Is Live",subtitle:"Just started and feel so alive",description:"Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu ne, at meliore explicari conceptam qui. Agam ceteros forensibus vix eu, paulo ubique ex eam."}],$scope.counters=[{value:"3054",description:"completed projects",icon:"images/icon-projects.png"},{value:"7 234 873",description:"click presed",icon:"images/icon-click.png"},{value:"4670",description:"mails sended and received",icon:"images/icon-mails.png"},{value:"939",description:"jokes tolds",icon:"images/icon-jokes.png"}],$scope.filters={},$scope.sort=function(value){$scope.filters.category=value},$scope.clickToOpen=function(item){ngDialog.open({template:' <div class="popup_wrap"><img class="popup_img" src="'+item.src+'" alt=""/><span class="popup_name">'+item.name+"</span>",className:"ngdialog-theme-default",plain:!0,width:"60%"})}}]),angular.element(document).ready(function(){function changeMenu(){$(window).width()<768?(topNav.addClass("mobilenav"),topNav.css("display","none")):(topNav.removeClass("mobilenav"),topNav.css("display","block"))}var slickSettings={centerMode:!0,centerPadding:"150px",slidesToShow:3,responsive:[{breakpoint:768,settings:{arrows:!1,centerMode:!0,centerPadding:"40px",slidesToShow:1}},{breakpoint:480,settings:{arrows:!1,centerMode:!0,centerPadding:"40px",slidesToShow:1}}]},galleryClass=$(".center"),galleryFilters=$(".portfolio__tabs");galleryClass.slick(slickSettings),galleryFilters.find("div").click(function(){galleryClass.slick("unslick"),galleryClass.slick(slickSettings),galleryFilters.find("div").removeClass("portfolio__tabs_item--active"),$(this).addClass("portfolio__tabs_item--active")});var topNav=$("#nav-tabs");changeMenu(),$(window).resize(function(){changeMenu()}),topNav.find("a").click(function(){var scroll_el=$(this).attr("href");0!==$(scroll_el).length&&$("html, body").animate({scrollTop:$(scroll_el).offset().top},500)});var nav=$("#nav"),navpos=nav.offset();$(window).bind("scroll",function(){$(window).scrollTop()>navpos.top?nav.addClass("fixed"):nav.removeClass("fixed"),$.each(["#home","#services","#portf","#contacts"],function(key,val){if(isScrolledIntoView(val,300)){var nav_id="#"+$(val).attr("id");topNav.find("a").removeClass("header__nav_item--active"),$('a[href="'+nav_id+'"]').addClass("header__nav_item--active")}}),topNav.find("a").click(function(){topNav.find("a").removeClass("header__nav_item--active"),$(this).addClass("header__nav_item--active")}),$(".timeline__item").each(function(){isScrolledIntoView(this,0)?($(this).removeClass("hidden-elem"),$(this).addClass("visible-elem")):($(this).addClass("hidden-elem"),$(this).removeClass("visible-elem"))})})})}();