/**
 * 
 * @author jmartel
 */

/**
 * Prototype de l'objet FormValidator
 * 
 */
function FormValidator(form)
{
	this.form = form;
	this.validity;
	this.listSubmitCallback = new Array;
	console.log(this.listSubmitCallback);
	//console.log(this.form);
	
	if (typeof FormValidator.initialized == "undefined" )
	{
		FormValidator.prototype.validateAll = function()
		{
		    var erreur = [];
		    var radio = [];
			var required = false;	    
		    for(var i=0; i< this.form.elements.length ; i++)
		    {
		        element = this.form.elements[i];
		        console.log(typeof(element.getAttribute("required")));
		        console.log(element.getAttribute("data-required"));
		        if(element.getAttribute("data-required") == "required" || element.getAttribute("required") == "required" || element.getAttribute("required") ==="")
		        {
		        	required = true;
		        }
		        console.log("required " + required);
		        if(element.getAttribute("type") == "text")
		        {
				    console.log(element.getAttribute("required"));
				    if((element.getAttribute("required") === "" || element.getAttribute("required") === "required") && element.value == "")
					{
					    erreur.push(element);
					}
					else if(element.getAttribute("required") == "" && element.value == "")
					{
					 	console.log("non requis, mais vide");
					}
					else if(element.getAttribute("data-type") == 'alpha')
					{
					    if(!verifAlpha(element.value))
					    {
					        erreur.push(element);
					    }
					}
					else if(element.getAttribute("data-type") == 'date')
					{
					    //console.log("une date")
					    if(!verifDate(element.value))
					    {
					        erreur.push(element);
					    }
					}
					else if(element.getAttribute("data-type") == 'email')   // Si 
					    {
					        if(!verifCourriel(element.value))
					        {
					            erreur.push(element);
					        }
					    }
					}
					else if(element.getAttribute("type") == "email")
					{
					    if((element.getAttribute("required") === "" || element.getAttribute("required") === "required") && element.value == "")
					{
					    erreur.push(element);
					   // console.log("erreur");
					    }
					}
					else if(element.getAttribute("type") == "date")
					{
					    //console.log("test " +element.getAttribute("required"));
					if(element.getAttribute("required") == "required" && element.value == "")
					{
					    erreur.push(element);  
					    //console.log("requis mais vide");
					}
					else if(element.value != "")
		            {
		                if(!verifDate(element.value))
		                {
		                    erreur.push(element);
		                }
		            }
		        }
		    }
		    return erreur;
	
		};

		FormValidator.prototype.isValidity = function()
		{
			this.validity = true;
			if(!document.createElement( 'input' ).checkValidity)
			{
				this.validity = false;	
			}
			else if(this.form.getAttribute("novalidate") === "" || form.getAttribute("novalidate") == "novalidate")
			{
				this.validity = false;
			}
			return this.validity;
		};
		
		FormValidator.prototype.onSubmit = function(e)
		{
			var e = e || window.event;
			if(e.preventDefault)
			{
				e.preventDefault();
			}
			else
			{
				e.returnValue = false;
            	e.cancelBubble = true;
			}
			for(var i=0; i<this.listSubmitCallback.length; i++)
			{
				this.listSubmitCallback[i](e);
			}
			
			return false;
		};
		
		FormValidator.prototype.addSubmitCallback = function(callback) 
		{
			this.listSubmitCallback.push(callback);
			return this.listSubmitCallback.length-1;
		};
		
		
		this.isValidity();
		
		if(document.addEventListener)		// Si la méthode existe, donc tous sauf IE8 et moins
		{
			this.form.addEventListener("submit", this.onSubmit.bind(this), false);
		}
		else	// Si IE9 et moins
		{
			this.form.attachEvent("onsubmit", this.onSubmit.bind(this));
		}
		
		
		
	}
	FormValidator.initialized = true;
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}