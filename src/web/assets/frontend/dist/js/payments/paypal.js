!function(){"use strict";const t=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return e||(e=Math.random().toString(36).substr(2,5)),`${t}.${e}`},e=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return window.FormieTranslations&&(t=window.FormieTranslations[t]||t),t.replace(/{([a-zA-Z0-9]+)}/g,((t,i)=>e[i]?e[i]:t))},i=function(t,e){t&&e&&("string"==typeof e&&(e=e.split(" ")),e.forEach((e=>{t.classList.add(e)})))},s=function(t,e){t&&e&&("string"==typeof e&&(e=e.split(" ")),e.forEach((e=>{t.classList.remove(e)})))},n=function(t,e){let i=t.querySelectorAll(`[name="${e}"]`);const s=t.querySelectorAll(`[name="${e}[]"]`);return s.length&&(i=s),i},r=function(t){return`fields[${t=t.replace("{field:","").replace("{","").replace("}","").replace("]","").split("[").join("][")}]`};class o{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.initialized=!1,this.$form=t.$form,this.form=this.$form.form,this.$field=t.$field,this.successClass=this.form.getClasses("success"),this.successMessageClass=this.form.getClasses("successMessage"),this.errorClass=this.form.getClasses("error"),this.errorMessageClass=this.form.getClasses("errorMessage"),this.isVisible=!1;const e=new IntersectionObserver((t=>{0==t[0].intersectionRatio?(this.isVisible=!1,this.initialized&&this.onHide()):(this.isVisible=!0,this.initialized&&this.onShow())}),{root:this.$form});setTimeout((()=>{e.observe(this.$field)}),500)}removeSuccess(){s(this.$field,this.successClass);const t=this.$field.querySelector(`.${this.successMessageClass}`);t&&t.remove()}addSuccess(t){i(this.$field,this.successClass);const e=this.$field.querySelector("[data-field-type] > div");if(!e)return console.error("Unable to find `[data-field-type] > div` to add success message.");const s=document.createElement("div");s.className=this.successMessageClass,s.textContent=t,e.appendChild(s)}removeError(){s(this.$field,this.errorClass);const t=this.$field.querySelector(`.${this.errorMessageClass}`);t&&t.remove()}addError(t){i(this.$field,this.errorClass);const e=this.$field.querySelector("[data-field-type] > div");if(!e)return console.error("Unable to find `[data-field-type] > div` to add error message.");const s=document.createElement("div");s.className=this.errorMessageClass,s.textContent=t,e.appendChild(s),this.submitHandler&&this.submitHandler.formSubmitError()}updateInputs(t,e){const i=this.$field.querySelector(`[name*="${t}"]`);i&&(i.value=e)}getBillingData(){if(!this.billingDetails)return{};const t={};if(this.billingDetails.billingName){const e=this.getFieldValue(this.billingDetails.billingName);e&&(t.name=e)}if(this.billingDetails.billingEmail){const e=this.getFieldValue(this.billingDetails.billingEmail);e&&(t.email=e)}if(this.billingDetails.billingAddress){t.address={};const e=this.getFieldValue(`${this.billingDetails.billingAddress}[address1]`),i=this.getFieldValue(`${this.billingDetails.billingAddress}[address2]`),s=this.getFieldValue(`${this.billingDetails.billingAddress}[address3]`),n=this.getFieldValue(`${this.billingDetails.billingAddress}[city]`),r=this.getFieldValue(`${this.billingDetails.billingAddress}[zip]`),o=this.getFieldValue(`${this.billingDetails.billingAddress}[state]`),l=this.getFieldValue(`${this.billingDetails.billingAddress}[country]`);e&&(t.address.line1=e),i&&(t.address.line2=i),s&&(t.address.line3=s),n&&(t.address.city=n),r&&(t.address.postal_code=r),o&&(t.address.state=o),l&&(t.address.country=l)}new CustomEvent("modifyBillingDetails",{bubbles:!0,detail:{provider:this,billing:t}});return{billing_details:t}}getFieldValue(t){return function(t,e){let i="";e=r(e);const s=n(t,e);return s&&s.forEach((t=>"checkbox"!==t.type&&"radio"!==t.type||t.checked?i=t.value:void 0)),i}(this.$form,t)}getFieldLabel(t){return function(t,e){let i="";e=r(e);const s=n(t,e);return s&&s.forEach((t=>{const e=t.closest("[data-field-type]");if(e){const t=e.querySelector("[data-field-label]");t&&(i=t.childNodes[0].textContent?.trim()??"")}})),i}(this.$form,t)}onShow(){}onHide(){}processResubmit(){this.form.config.Formie.refreshFormTokens(this.form),this.submitHandler.processSubmit(["payment"])}}window.FormiePaymentProvider=o;window.FormiePayPal=class extends o{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super(t),this.$form=t.$form,this.form=this.$form.form,this.$field=t.$field,this.$input=this.$field.querySelector("[data-fui-paypal-button]"),this.$input?(this.clientId=t.clientId,this.useSandbox=t.useSandbox,this.currency=t.currency,this.amountType=t.amountType,this.amountFixed=t.amountFixed,this.amountVariable=t.amountVariable,this.buttonLayout=t.buttonLayout,this.buttonColor=t.buttonColor,this.buttonShape=t.buttonShape,this.buttonLabel=t.buttonLabel,this.buttonTagline=t.buttonTagline,this.buttonWidth=t.buttonWidth,this.buttonHeight=t.buttonHeight,this.paypalScriptId="FORMIE_PAYPAL_SCRIPT",this.clientId?this.initialized=!0:console.error("Missing clientId for PayPal.")):console.error("Unable to find PayPal placeholder for [data-fui-paypal-button]")}onShow(){this.initField()}onHide(){this.onAfterSubmit(),this.$input.innerHTML="",this.form.removeEventListener(t("onAfterFormieSubmit","paypal"))}getScriptUrl(){const t=["intent=authorize"];t.push(`currency=${this.currency}`),t.push(`client-id=${this.clientId}`);const e=new CustomEvent("modifyQueryParams",{bubbles:!0,detail:{payPal:this,params:t}});return this.$field.dispatchEvent(e),`https://www.paypal.com/sdk/js?${t.join("&")}`}initField(){if(document.getElementById(this.paypalScriptId))(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e5;const i=Date.now(),s=function(n,r){window[t]?n(window[t]):e&&Date.now()-i>=e?r(new Error("timeout")):setTimeout(s.bind(this,n,r),30)};return new Promise(s)})("paypal").then((()=>{this.renderButton()}));else{const t=document.createElement("script");t.id=this.paypalScriptId,t.src=this.getScriptUrl(),t.async=!0,t.defer=!0,t.onload=()=>{this.renderButton()},document.body.appendChild(t)}this.form.addEventListener(this.$form,t("onAfterFormieSubmit","paypal"),this.onAfterSubmit.bind(this))}getStyleSettings(){const t={layout:this.buttonLayout,color:this.buttonColor,shape:this.buttonShape,label:this.buttonLabel,width:this.buttonWidth,height:this.buttonHeight};return"horizontal"===this.buttonLayout&&(t.tagline=this.buttonTagline),t}renderButton(){const t={env:this.useSandbox?"sandbox":"production",style:this.getStyleSettings(),createOrder:(t,e)=>{this.removeError();let i=0;return"fixed"===this.amountType?i=this.amountFixed:"dynamic"===this.amountType&&(i=this.getFieldValue(this.amountVariable)),e.order.create({intent:"AUTHORIZE",application_context:{user_action:"CONTINUE"},purchase_units:[{amount:{currency_code:this.currency,value:i}}]})},onCancel:(t,e)=>{},onError:t=>{this.addError(t)},onApprove:(t,i)=>{i.order.authorize().then((s=>{try{const n=s.purchase_units[0].payments.authorizations[0].id;this.updateInputs("paypalOrderId",t.orderID),this.updateInputs("paypalAuthId",n);const r=new CustomEvent("onApprove",{bubbles:!0,detail:{payPal:this,data:t,actions:i,authorization:s}});if(!this.$field.dispatchEvent(r))return;n?this.addSuccess(e("Payment authorized. Finalize the form to complete payment.")):this.addError(e("Missing Authorization ID for approval."))}catch(t){console.error(t),this.addError(e("Unable to authorize payment. Please try again."))}}))}},i=new CustomEvent("beforeInit",{bubbles:!0,detail:{payPal:this,options:t}});this.$field.dispatchEvent(i),paypal.Buttons(t).render(this.$input)}onAfterSubmit(t){this.updateInputs("paypalOrderId",""),this.updateInputs("paypalAuthId",""),this.removeSuccess(),this.removeError()}}}();