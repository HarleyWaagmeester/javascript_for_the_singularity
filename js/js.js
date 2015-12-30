// annuit coeptis
// js.js
// Provides:
// Html element creation using Parasitic Combination Inheritance.-mode"
// ..and..
// An infrastructure for moving divs'.

// This code has been developed to be loaded above the </body> tag, after any other code in the <body>
// element. If you load load it in the <header> element, it might misbehave. 

// The div named "app" which contains all of these objects,
// is created on the html page that loads this javascript file.
// But you could change that and create that div in this code.

document.getElementById("app").style.width = "100%";
document.getElementById("app").style.height = "100%";

//
// This creates an object with properties and methods, a div element is one of the properties.
function divObjProtoType_1(parent, id, content) {
    this.parent = parent;                     // The parent is used in the appendChild method.
    this.id = id;
    this.content = content;
    this.div = document.createElement("DIV"); // This might be better written as a method.
    this.div.id=id;
    var newDate = new Date();
    CREATION_DATE = newDate.toLocaleDateString();
    this.getCreationDate = function() {
	return CREATION_DATE;};
    console.log("divObjProtoType_1: " + this.id + " Created On: " + this.getCreationDate());
    return "apparently successful";}


// These are prototype methods that can be inherited with inheritPrototype(childObject, parentObject).

//divObjProtoType_1.prototype.create = function () {
//    this.div = document.createElement("DIV");
//}

divObjProtoType_1.prototype.setInnerHTML = function (content) {
    this.div.innerHTML = content;
    return content;
}
divObjProtoType_1.prototype.appendChild = function () {
    document.getElementById(this.parent).appendChild(this.div);
    //   return "appended " + this.div.id + "to " + this.parent;  
}
divObjProtoType_1.prototype.appendInnerHTML = function (content){
    this.div.innerHTML = this.div.innerHTML + content;
    return "appended to: " + this.div.id;
}
divObjProtoType_1.prototype.prependInnerHTML = function (content){
    this.div.innerHTML = content + this.div.innerHTML;
    return "appended to: " + this.div.id;
}
divObjProtoType_1.prototype.show = function () {
    this.div.style.display = "block";
    return "show";
}
divObjProtoType_1.prototype.hide = function () {
    this.div.style.display = "none";
}
divObjProtoType_1.prototype.backgroundImage = function (pic) {
    this.div.style.backgroundImage = "url(" + pic + ")";
}

//procedure et vitae
function inheritPrototype(childObject, parentObject) {
    var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
    childObject.prototype = copyOfParent;

}

// DIV2 ///////////////////
console.log (div2 = new divObjProtoType_1("app", "div2", Date()));
inheritPrototype(div2, divObjProtoType_1);
console.log (div2.baseclass = "div2");
console.log (div2.div.className = div2.baseclass + " z1");
console.log (div2.appendChild());
console.log (div2.setInnerHTML ("div2---<br>We are Vishnu. We are watching you."));
console.log (div2.div.style.zindex = 1);

// DIV3 //////////////////
console.log (div3 = new divObjProtoType_1("app", "div3", Date()));
inheritPrototype(div3, divObjProtoType_1);
console.log (div3.baseclass = "div3");
console.log (div3.div.className = div3.baseclass + " z1");
console.log (div3.appendChild());
console.log (div3.setInnerHTML ("div3---<br>We are Vishnu. We are watching you."));
console.log (div3.div.style.zindex = 1);

// DIV4  /////////////////
console.log (div4 = new divObjProtoType_1("app", "div4", Date()));
inheritPrototype(div4, divObjProtoType_1);
console.log (div4.baseclass = "div4");
console.log (div4.div.className = div4.baseclass + " z1");
console.log (div4.appendChild());
console.log (div4.setInnerHTML ("div4---<br>We are Vishnu We are watching you."));
console.log (div4.div.style.zindex = 1);

// INFODIV  //////////////
console.log (infodiv = new divObjProtoType_1("app", "infodiv", Date()));
inheritPrototype(infodiv, divObjProtoType_1);
console.log (infodiv.div.className = "infodiv");
console.log (infodiv.appendChild());
console.log (infodiv.setInnerHTML ("infodiv---<br>We are Vishnu. We are watching you."));
console.log (infodiv.div.style.zindex = 1);

// SYSTEM_DIVISION_1 ///////////
console.log (system_division_1 = new divObjProtoType_1("app", "system_division_1", Date()));
inheritPrototype(system_division_1, divObjProtoType_1);
console.log (system_division_1.div.className = "system_division_1");
console.log (system_division_1.appendChild());
console.log (system_division_1.setInnerHTML ("system_division_1---<br>We are Vishnu. We are watching you."));
console.log (system_division_1.div.style.zindex = 1);

//
// build the infrastructure for moving divs
//

// Stateful occurrences within the infrastructure.
var isdwn = 0;
var inmove = 0;
var ox = 0;
var oy = 0;
var previous_focus_id = "div3";
var isdwn_zoom = 0;
var selected_div_id = 0;

// A nice logging function for the current state of the infrastructure.
// Requires:
// a divObjectProtype_1 with an inherited prototype '.prependInnerHTML' to write with,
// and the object to log the info about,
// and a descriptive name for the event.
function logEventToInfoDiv(div_obj, obj, event_name) {
    div_obj.prependInnerHTML("<br><img src=images/emblem-important.png> "
			     + event_name
			     + " code-<br>"

			     + "<span style='color:red'>id: "
			     + obj.id
			     + "</span><br>"

			     + "<span style='color:blue'>computed zIndex: "
			     + getComputedStyle(obj.div).getPropertyValue("z-index")
			     + "</span><br>"

//			     + "<span style='color:blue'>obj.div.style.zindex: "
//			     + obj.div.style.zindex
//			     + "</span><br>"

			     + "<span style='color:blue'>new previous_focus_id: "
			     + previous_focus_id
			     + "</span><br>")};



// This creates a moveable div element from an object.
// The object must be created with divObjProtoType_1(parent, id, content),
// and inheritPrototype(childObject, parentObject).

//ADVISORY: The getComputedStyle of the zindex remains at auto,
//      no change can be effected.
function createMovableDivObject (obj) {
    obj.div.addEventListener(
	"mousedown",
	function (e) {
	    e.stopPropagation();
	    e.preventDefault();
	    if (isdwn === 0) {
		
		selected_obj = obj;
		isdwn = 1;
		inmove = 0;
		ox = e.clientX - parseInt (getComputedStyle(obj.div).getPropertyValue("left"));
		oy = e.clientY - parseInt (getComputedStyle(obj.div).getPropertyValue("top"));
		//		console.log("ox "+ox+", oy"+oy);
		document.getElementById (previous_focus_id).zIndex = 1;
		previous_focus_id = obj.id;
		obj.div.className = obj.baseclass + " z2";
		//		setComputedStyle(obj.div).setPropertyValue("zindex"," 2");
		// ex scientia vera		 
		logEventToInfoDiv(infodiv, obj, "mouseDOWN");
		console.log("<<<<<<< informati amici >>>>>>");
		console.log(obj.id +  " mouseDOWN");
		console.log("previous_focus_id: " + previous_focus_id);
		console.log(obj.id + " zIndex: " + obj.div.style.zindex);
	    }});

    obj.div.addEventListener(
	"mouseup",
	function (e) {
	    e.stopPropagation();
	    e.preventDefault();
	    isdwn = 0;
	    selected_obj = 0;
	    document.getElementById (previous_focus_id).zIndex = 1;
	    previous_focus_id = obj.id;
	    obj.div.className = obj.baseclass + " z1";
	    // ex scientia vera		 
	    logEventToInfoDiv(infodiv,obj,"mouseUP");
	    console.log("<<<<<<< informati amici >>>>>>");
	    console.log(obj.id +  " mouseUP");
	    console.log("previous_focus_id: " + previous_focus_id);
	    console.log(obj.id + " zIndex: " + obj.div.style.zindex);
	})

    obj.div.addEventListener(
	"mouseover",
	function (e) {
	    if (isdwn === 0) {
		e.stopPropagation();
		e.preventDefault();
		//	    document.getElementById (previous_focus_id).zIndex = 1;
		//	    previous_focus_id = obj.id;
		//obj.zIndex = 2;
		// ex scientia vera		 
		logEventToInfoDiv(infodiv,obj,"mouseOVER");
		console.log("<<<<<<< informati amici >>>>>>");
		console.log(obj.id +  " mouseOVER");
		console.log("previous_focus_id: " + previous_focus_id);
		console.log(obj.id + " zIndex: " + obj.div.style.zindex);
	    }})

    obj.div.addEventListener(
	"mouseout",
	function (e) {
	    if (isdwn === 0) {
		e.stopPropagation();
		e.preventDefault();
		//	    document.getElementById (previous_focus_id).zIndex = 1;
		//	    previous_focus_id = obj.id;
		//obj.zIndex = 2;
		// ex scientia vera		 
		logEventToInfoDiv(infodiv,obj,"mouseOUT");
		console.log("<<<<<<< informati amici >>>>>>");
		console.log(obj.id +  " mouseOUT");
		console.log("previous_focus_id: " + previous_focus_id);
		console.log(obj.id + " zIndex: " + obj.div.style.zindex);
	    }})

    obj.div.addEventListener(
	"mousemove",
	function (e) {

	    if (isdwn === 1) {
		if (obj === selected_obj) {
		    e.stopPropagation();
		    e.preventDefault();
		    console.log ("------------------in  mousemove------------------");
		    console.log("in move");
		    var x = e.clientX - ox;
		    var y = e.clientY - oy;
		    var nx = x.toString()  + "px";
		    var ny = y.toString()  + "px";
		    obj.div.style.top = ny;
		    obj.div.style.left = nx;
		    console.log("here: "+nx+" , "+ny);
		    console.log(obj.id + " zIndex: " + obj.div.style.zindex);
		}
		
	    }
	})
};

createMovableDivObject (div2);  
createMovableDivObject (div3);
createMovableDivObject (div4);


// expand and compand a contained div to the size of the container, auto zooms font size
// takes arguments of the element id and the the containing element id

// function expandoListenerMouseDown   (obj obj_exo) {

//     obj.div.addEventListener (
// 	"mousedown"
//         function (e) { 
//                         (let [temp_div (.createElement js/document "DIV")]
//                           (set!(.-className temp_div) (str (.-id obj_exo.div) "_properties_default_properties"))
//                           (set!(.-id temp_div) "temp_div_id" )
//                           (.preventDefault e)
//                           (println (str "=====in " (.-id obj.div) " mousedown====="))
//                           (let [toggle (atom 0)]
//                             (when (= @isdwn_zoom false)
//                               (println (str "=====in " (.-id obj.div) " mousedown zoom setting compression====="))
//                               (swap! toggle inc)  

// //           ;;;;;;;;;;;;;;;;;;;; first attempt at an expanding window ;;;;;;;;;;;;;;;;;;;;;;;
// //           ;;;;;;;;;;;;;;;;;;;_______________________________________;;;;;;;;;;;;;;;;;;;;;;;
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "30%")
//                               (set!(.-style.height obj_exo.div) "30%")
//                                                        ) 20)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "50%")
//                               (set!(.-style.height obj_exo.div) "50%")
//                                                        ) 30)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "75%")
//                               (set!(.-style.height obj_exo.div) "75%")
//                                                        ) 40)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "85%")
//                               (set!(.-style.height obj_exo.div) "85%")
//                                                        ) 60)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "100%")
//                               (set!(.-style.height obj_exo.div) "100%")
//                               ) 100)
// 			    }        
// //           ;;;;;;;;;;;;;;;;;;;; first attempt at companding a window ;;;;;;;;;;;;;;;;;;;;;;; ZYH43UECJMLNPM6G5DJ5

// //          ;;;;;;;;;;;;;;;;;;;;_______________________________________;;;;;;;;;;;;;;;;;;;;;;;

// //                              ;;                              (set!(.-style.width obj_exo.div) "100%")
// // ;;                             (set!(.-style.height obj_exo.div) "100%")
//                               (set!(.-style.top obj_exo.div) "0px")
//                               (set!(.-style.left obj_exo.div) "0px")
//                               (set!(.-style.zIndex obj_exo.div) "10")
//                               (set!(.-style.fontSize obj.div) "70%")
//                               (set! (.-innerHTML infodiv)
//                                     (str "<img src=images2/emblem-important.png> mouse_"obj.div"_ZOOMDOWN-expand code-<br>"
//                                          "<span style='color:red'>id: "(.-id obj.div)"</span><br>"
//                                          "<span style='color:blue'>zIndex: "(.-style.zIndex obj.div)"</span><br>"(str obj_exo.div "_properties")
//                                          (.-innerHTML infodiv)))
//                               )
//                             (when (= @isdwn_zoom true)
//                               (println (str "=====in " (.-id obj.div) " mousedown zoom setting expansion====="))
//                               (swap! toggle dec)  
//                               (.setTimeout js/window (fn[]
// //           ;;;;;;;;;;;;;;;;;;;_______________________________________;;;;;;;;;;;;;;;;;;;;;;;
//                               (set!(.-style.width obj_exo.div) "85%")
//                               (set!(.-style.height obj_exo.div) "85%")
//                                                        ) 20)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "75%")
//                               (set!(.-style.height obj_exo.div) "75%")
//                                                        ) 30)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "50%")
//                               (set!(.-style.height obj_exo.div) "50%")
//                                                        ) 40)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "30%")
//                               (set!(.-style.height obj_exo.div) "30%")
//                                                        ) 60)
//                               (.setTimeout js/window (fn[]
//                               (set!(.-style.width obj_exo.div) "25%")
//                               (set!(.-style.height obj_exo.div) "25%")
//                                                        ) 100)
// 			     //           ;;;;;;;;;;;;;;;;;;;_______________________________________;;;;;;;;;;;;;;;;;;;;;;;
//                              //(set!(.-style.width obj_exo.div) "25%")
// //;;                              (set!(.-style.height obj_exo.div) "25%")
//                               (set!(.-style.zIndex obj_exo.div) "1")
//                               (set!(.-style.fontSize obj.div) "10%")
//                               (set!(.-style.left obj_exo.div) (.-style.left temp_div))
//                               (set!(.-style.top obj_exo.div) (.-style.top temp_div))
// //;;                              (set!(.-style.left obj_exo.div) "20px")
// //  ;;                            (set!(.-style.top obj_exo.div) "200px")
//                               (println (str "style.top of " (.-id temp_div) " is " (.-style.top temp_div)))
//                               (println ".-className of " (.-id temp_div) " is "(.-className temp_div))
//                               (set! (.-innerHTML infodiv)
//                                     (str "<img src=images2/emblem-important.png> mouse_"obj.div"_ZOOMDOWN-shrink code-<br>"
//                                          "<span style='color:red'>id: "(.-id obj.div)"</span><br>"
//                                          "<span style='color:blue'>zIndex: "(.-style.zIndex obj.div)"</span><br>"
//                                          (.-innerHTML infodiv)))
//                               )
//                             (if (= 1 @toggle)
//                               (reset! isdwn_zoom true))
//                             (if (= -1 @toggle)
//                               (reset! isdwn_zoom false))
//                             (set!(.-style.height obj.div) "100%")
//                             (set!(.-style.width obj.div) "100%")
//                           )))))
// };
