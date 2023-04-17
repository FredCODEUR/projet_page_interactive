// Notation moderne  début programme jQuery $(function(){});
// Utilisation version complète $(document).ready(function(){});
// Par convention variable contenant du jQuery commence par $

$(document).ready(function(){

    // var x, y, z; Notation possible déclaration variable
    var $mainMenuItems = $("#main-menu ul").children("li"), 
    totalMainMenuItems = $mainMenuItems.length, 
    openedIndex = 2,
    
    init = function(){
        bindEvents();
        if(valiIndex(openedIndex)){
            animateItem($mainMenuItems.eq(openedIndex), true, 700);
        }
    },

    bindEvents = function(){
        //Enfants de li qui ont la classe .images
        $mainMenuItems.children(".images").click(function(){

            //this élément sur lequel je viens de cliquer
            var newIndex = $(this).parent().index();
            checkAndAnimateItem(newIndex);
        });

        // Survole de button, entrée ou sortie, ajout ou suppression 
        // de la class créée dans le CSS hovered 
        $(".button").hover(function(){
            $(this).addClass("hovered");
        },
        function(){
            $(this).removeClass("hovered");
        });

        $(".button").click(function(){
            var newIndex = $(this).index();
            checkAndAnimateItem(newIndex);
        });
    },

    valiIndex = function(indexToCheck){
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
    },

    animateItem = function($item, toOpen, speed){
        var $colorImage = $item.find(".color"),

        // Si toOpen est vrai alors = {width: "420px"} si faux alors = {width: "140px"}
        itemParam = toOpen ? {width: "420px"}:{width: "140px"},
        colorImageParam = toOpen ? {left: "0px"}:{left:"140px"};
        $colorImage.animate(colorImageParam,speed);
        $item.animate(itemParam, speed);
    },
    
    checkAndAnimateItem = function(indexToCheckAndAnimate){
        if(openedIndex === indexToCheckAndAnimate){
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false,250);
            openedIndex = -1;
        }
        else{
            if(valiIndex(indexToCheckAndAnimate)){
                animateItem($mainMenuItems.eq(openedIndex), false,250);
                openedIndex = indexToCheckAndAnimate;
                animateItem($mainMenuItems.eq(openedIndex), true,250);
            }
        }
    };

    var playable = function(){
        $("#display-position button").click(function(){
            var buttonDirection = $(this).index();
            rollPosition = $("#main-menu ul li").position().left;
            if(buttonDirection == 0 ){
                newMenuPosition = 0;
                $("#main-menu ul li").animate({left: newMenuPosition}, 250);
             console.log(rollPosition);   
            }

            if(buttonDirection == 1 && rollPosition >= -500){
                newMenuPosition -= 140;
                $("#main-menu ul li").animate({left: newMenuPosition}, 250);
             console.log(rollPosition);   
            }
        });
    };
    var newMenuPosition = 0;
    var rollPosition = 0;
    playable();
    init();    
});