# Custom-form
> Javascript custom select, checkbox, radiobox, input['file']

### Installation
* [Download the latest release](https://github.com/Ajjya/Custom-form/archive/master.zip)
* Clone the repository: git clone [Clone](https://github.com/Ajjya/Custom-form.git)

In the <head> tag add:
```html
	<link href="path-to-library/style.min.css" rel="stylesheet">
```

Before your closing <body> tag add:
```html
  <script type="text/javascript" src="path-to-library/customForm.js"></script>
```
Or by npm/yarn
```html
  yarn add ajjya-custom-form
  OR
  npm install ajjya-custom-form
```

Then you can import:
```
  import CustomForm from 'ajjya-custom-form';
```

And add css file:
```
  @import 'node_modules/ajjya-custom-form/style.min.css';
```

Or scss file
```
  @import 'node_modules/ajjya-custom-form/customForm';
```

###Usage
Then you can use library in next way:
```
  document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[type="radio"]');
    checkboxes.forEach((item) => {
      new CustomForm(item);
    });
  });
```

You can see full code in example folder.