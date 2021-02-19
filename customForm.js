'use strict';
// require('./polyfill.min.js');
// import './polyfill.min.js';
(function(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
		require('./polyfill.min.js');
    if (global.document) {
      module.exports = factory(global);
    }
    else {
      throw new Error('CUSTOM FORM requires a browser to run.');
    }
  }
  else if (typeof define === 'function' && define.amd) {
    define('CustomForm', [], factory(global));
  }
  else {
    factory(global);
  }
})(typeof window !== 'undefined' ? window : this, (window) => {

	function CustomForm(element, options) {
		this.element = element;
		this.defaults = {};

		this.init = function(){
			
			this.defaults = {...this.defaults, ...options};

			if(this.element.tagName == "INPUT"){
				switch (this.element.type) {
					case "checkbox": {
						this.CustomCheckBox();
						break;
					}
					case "radio": {
						this.CustomRadioBox();
						break;
					}
					case "file": {
						this.CustomFile();
					}
				}
			} else if( this.element.tagName == "SELECT" ){
				this.CustomSelect();
			}
		}

		this.init();
	}

	CustomForm.prototype.CustomFile = function(){
		var self = this;
		this.element.hidden = true;

		var wrapper = document.createElement('div');
		wrapper.classList.add("custom-input-file-wrap");
		this.element.parentNode.insertBefore(wrapper, this.element);
		wrapper.appendChild(this.element);
		
		var customInputFile = document.createElement("div");
		customInputFile.classList.add("custom-input-file");
		customInputFile.innerHTML = 'UPLOAD';

		var customInputSignature = document.createElement('div');
		customInputSignature.classList.add("custom-input-signature");

		this.element.after(customInputFile);
		this.element.after(customInputSignature);

		customInputFile.addEventListener('click', function(){
			self.element.click();
		})

		this.element.addEventListener('change', function(){
			var value = this.value;
			customInputSignature.innerHTML = value;
		})

	}

	CustomForm.prototype.CustomRadioBox = function(){
		var self = this;
		this.element.hidden = true;

		var pseudoel = document.createElement("div");
		pseudoel.classList.add("custom-radio");
		if(this.element.checked){
			pseudoel.classList.add("custom-radio-ch");
		} else {
			pseudoel.classList.add("custom-radio-radio_unch");
		}

		this.element.after(pseudoel);

		this.element.nextElementSibling.addEventListener('click', function(){
			if(!self.element.checked){
				if(self.element.hasAttribute('name')){
					var radioName = self.element.getAttribute('name');
					/* remove all checked */
					document.querySelectorAll('input[type="radio"][name=' + radioName +']').forEach(function(item){
						item.nextElementSibling.classList.add("custom-radio-unch");
						item.nextElementSibling.classList.remove("custom-radio-ch");
					})
				}

				self.element.checked = true;
				this.classList.add("custom-radio-ch");
				this.classList.remove("custom-radio-unch");
			}
		});
	}

	CustomForm.prototype.CustomCheckBox = function(){
		var self = this;
		this.element.hidden = true;

		var pseudoel = document.createElement("div");
		pseudoel.classList.add("custom-checkbox");
		if(this.element.checked){
			pseudoel.classList.add("custom-checkbox-ch");
		} else {
			pseudoel.classList.add("custom-checkbox-unch");
		}

		this.element.after(pseudoel);

		this.element.nextElementSibling.addEventListener('click', function(){
			this.classList.toggle('custom-checkbox-unch');
			this.classList.toggle('custom-checkbox-ch');

			if(self.element.getAttribute('checked') == 'checked'){
				self.element.removeAttribute('checked');
			} else {
				self.element.addAttribute('checked');
			}
		});
	}

	CustomForm.prototype.CustomSelect = function(){
		var self = this;
		var children = this.element.querySelectorAll('option');
		this.element.hidden = true;

		var wrapper = document.createElement('div');
		wrapper.classList.add("custom-select");
		this.element.parentNode.insertBefore(wrapper, this.element);
		wrapper.appendChild(this.element);

		var pseudoel = document.createElement("div");
		pseudoel.classList.add("styled-select");
		pseudoel.setAttribute("contentEditable", true);

		var arr = document.createElement("div");
		arr.classList.add("arr");
		pseudoel.append(arr);

		this.element.after(pseudoel);

		var styledSelect = this.element.nextElementSibling;
		styledSelect.style.caretColor = 'transparent';

		var text = "";
		if(this.element.querySelectorAll('option:checked').length > 0){
			text = this.element.querySelector('option:checked').innerHTML;
		} else {
			text = this.element.querySelector('option').innerHTML;
		}

		var styledSelectInput = document.createElement("div");
		styledSelectInput.classList.add("styled-select-input");
		styledSelectInput.innerHTML = text;

		var styledSelectBtn = document.createElement("div");
		styledSelectBtn.classList.add("styled-select-btn");

		styledSelect.append(styledSelectInput);
		styledSelect.append(styledSelectBtn);

		var list = document.createElement("ul");
		list.classList.add("options");
		var listItems = [];
		for (var i = 0; i < children.length; i++) {
			var ch_text = children[i].innerHTML;
			var ch_value = children[i].value;

			var listItem = document.createElement("li");
			listItem.setAttribute('rel', ch_value);
			listItem.innerHTML = ch_text;
			listItems.push(listItem);

			list.append(listItem);
		}
		
		styledSelect.after(list);

		styledSelect.addEventListener('click', function(e){
			var is_active = styledSelect.classList.contains('active');

			document.querySelectorAll('.custom-select .styled-select.active').forEach(function(item){
				item.classList.remove('active');
			});

			document.querySelectorAll('.custom-select .options.active').forEach(function(item){
				item.classList.remove('active');
			});

			if(!is_active){
				styledSelect.classList.add('active');
				list.classList.add('active');
			}

			e.stopPropagation();
		});

		listItems.forEach(function(item){
			item.addEventListener('click', function(e){
				var rel = this.getAttribute('rel');
				var text = this.innerHTML;
				if( rel == 'custom' ) return false;
				styledSelect.classList.remove('active');
				styledSelectInput.innerHTML = text;
				self.element.value = rel;
				list.classList.remove('active');

				e.stopPropagation();
			})
		})

		document.addEventListener('click', function(){
			styledSelect.classList.remove('active');
			list.classList.remove('active');
		})

	}

	// jQuery Plugin
  if (typeof window.jQuery !== 'undefined') {
    const $ = window.jQuery;
    const namespace = 'CustomForm';

    $.fn.extend({
      CustomForm: function(args) {
        // check if selected element exist
        if (!this.length) return this;

        return this.each(function() {
          let instance = $.data(this, namespace);

          if (instance) {
            // already created, just update
            instance.update(args);
          }
          else {
            // create new instance
            instance = new CustomForm(this, args);
            $.data(this, namespace, instance);
          }
        });
      }
    });
  }

	// browser global
	window.CustomForm = window.CustomForm || CustomForm;
	// return CustomForm;
	return CustomForm;
});
