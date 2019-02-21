# class: Element

Wrapper for element. Methods in this class are wrapped in [Proxymise](https://github.com/kozhevnikov/proxymise). It allows chaining without need for additional `await` before each method and property for cleaner and simpler code. You just need to type `await` once at the beginning. See examples below.

**Constructor**

| Param  | Type                | Description  | Returns |
| ------| ------------------- | ------------ | ------ |
| `element` | `ElementHandle` | Puppeteer ElementHandle object. | itself - Element |

## Methods

#### waitFor(selectorOrFunctionOrTimeout, options = {}, ...args) ⇒ Promise<Element>

| Param                         | Type                     | Description                                                  |
| ----------------------------- | ------------------------ | ------------------------------------------------------------ |
| `selectorOrFunctionOrTimeout` | `string|number|Function` | A selector, timeout or predicate to wait for.<br />Allows CSS selectors and XPaths to use as selector. |
| `options={}`                  | `Object`                 | Allows optional waiting parameters:<br /><code>**visible**</code>: <boolean> - wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.<br /><code>**hidden**</code>: <boolean> - wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.<br /><code>**timeout**</code>: <number> - time to wait for in milliseconds. |
| `...args`                     | `Serializable|JSHandle`  | Arguments to pass to function if argument `options` is a function. |

**Returns**

| Type               | Description                                |
| ------------------ | ------------------------------------------ |
| `Promise<Element>` | Promise which resolves to element wrapper. |

**Throws exceptions** - in case if the selector is **not found** in the element.

| Type           | Example description                                          |
| -------------- | ------------------------------------------------------------ |
| `TimeoutError` | `waiting for selector './/*[contains(@class, "something")]' failed: timeout 40000ms exceeded` |

This method behaves differently with respect to the type of the first parameter.

- If <code>selectorOrFunctionOrTimeout</code> is a string, then the first argument is treated as a CSS selector or XPath.
- If <code>selectorOrFunctionOrTimeout</code> is a function, then the first argument is treated as a predicate to wait for.
- If <code>selectorOrFunctionOrTimeout</code> is a number, then the first argument is treated as a timeout in milliseconds.

**Examples:**

```javascript
// how to wait for selector with CSS selector '.class_1'
await element.waitFor('.class_1');
// how to wait for selector with XPath '//*[@class="class_of_title"]'
await element.waitFor('//*[@class="class_of_title"');

// how to wait for 1 second (in ms)
await element.waitFor(1000);

// how to wait for predicate function
await element.waitFor(() => !!document.querySelector('.foo'));
```

---

#### $\$(selector) ⇒ Promise<Element>

| Param      | Type     | Description              |
| ---------- | -------- | ------------------------ |
| `selector` | `string` | Selector of web element. |

**Returns**

| Type                      | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `Promise<Array<Element>>` | Promise which returns list of element wrappers. |

>  **NOTE**	If no element matches the selector, the return value resolves to `[]`.

Get elements by selector.

This method returns list of elements found by selector.


```javascript
// how to get all the images with CSS selector '.class_of_image'
const imageSelector = '.class_of_image';
const images = await element.waitFor(imageSelector).$$(imageSelector);
images.length > 1 === true; // true

// how to get all the titles with XPath '//*[@class="class_of_title"]'
const titleSelector = '//*[contains(@class,"class_of_title")]';
const titles = await element.waitFor(titleSelector).$$(titleSelector);
if(title.length) console.debug('Founded!');

```

---

#### $(selector) ⇒ Promise<Element>

| Param      | Type     | Description              |
| ---------- | -------- | ------------------------ |
| `selector` | `string` | Selector of web element. |

**Returns**

| Type               | Description                            |
| ------------------ | -------------------------------------- |
| `Promise<Element>` | Promise which returns element wrapper. |

>  **NOTE**	If no element matches the selector, the return value resolves to `null`.

Get element by selector.

This method returns an element wrapper with found element inside.

```javascript
// how to get an element with CSS selector '.class_1'
const el = await element.$('class_1');

// how to get an element with XPath '//*[@class='class_2']'
const el = await element.$('//*[@class="class_2"]');
```

---

#### attributes() ⇒ Promise<Object>

**Returns**

| Type              | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| `Promise<Object>` | Promise which returns object with attribute names in keys and attribute values in values. |

Get element attributes.

This method returns object with attribute names in keys and attribute values in values.

```javascript
// how to get attributes of element
const attributes = await element.$('//*[@class="item"]').attributes();
console.log(attributes); 
// { 'class': 'item',
//	 'src': 'https://www.example.com/media/image.jpg',
//   'alt': 'Product'    
// }
```

---

#### getProperty(property) ⇒ Promise<any>

| Param      | Type     | Description       |
| ---------- | -------- | ----------------- |
| `property` | `string` | Name of property. |

**Returns**

| Type           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `Promise<any>` | Promise which returns value of property. May be any type of data. |

Get property value.

```javascript
// how to get property value
const value = await element.$('//*[@class="radioButton"]').getProperty('name');
console.log(value);
// option1
```

---

#### isVisible() ⇒ Promise<boolean>

**Returns**

| Type               | Description                                    |
| ------------------ | ---------------------------------------------- |
| `Promise<boolean>` | True if element is visible, otherwise - False. |

Is element visible.

This method returns `true` if element is presented in DOM and is visible, i.e. don't have `display: none` or `visibility: hidden` CSS properties. Otherwise returns `false`.

```javascript
// how to check if element visible or not
const visibility = await element.$('.main_header').isVisible();
visibility === true; // true
```

---

#### screenshot(options) ⇒ Promise<[Buffer|String]>

| Param     | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `options` | `Object` | Options object which might have the properties, described [here](https://github.com/GoogleChrome/puppeteer/blob/v1.12.2/docs/api.md#pagescreenshotoptions). |

**Returns**

| Type                       | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `Promise<[Buffer|String]>` | Promise which resolves to buffer or a base64 string (depending on the value of `encoding`) with captured screenshot. |

Proxy for [`elementHandle.screenshot()`](https://github.com/GoogleChrome/puppeteer/blob/v1.12.2/docs/api.md#elementhandlescreenshotoptions).

This method scrolls element into view if needed, and then take a screenshot of the element. 

> **NOTE**	If the element is detached from DOM, the method throws an error.

---

#### hover() ⇒ Promise<Element>

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

Hover element.

This method scrolls element into view if needed, and then hover over the center of the element. 

> **NOTE**	If the element is detached from DOM, the method throws an error.

```javascript
// how to hover the element
const el = await element.$('.pay_button');
await el.hover();
```

---

#### click() ⇒ Promise<Element>

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

Click on element.

This method scrolls element into view if needed, and then click in the center of the element. 

> **NOTE**	If the element is detached from DOM, the method throws an error.

```javascript
// how to click on the element
const el = await element.$('.pay_button');
await el.click();
```

---

#### type(value, {clear = false} = {}) ⇒ Promise<Element>

| Param              | Type      | Description                                                  |
| ------------------ | --------- | ------------------------------------------------------------ |
| `value`            | `string`  | A text to type into an element.                              |
| `{clear=false}={}` | `boolean` | Additional parameter, used in case if you need to clear element before typing text. |

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

Type text in element.

This method focuses the element and then type `value` in the element.

```javascript
// how to type text in the element  
const el = await element.$('.state');
await el.type('Alabama');

// how to type text in the element with clear before  
const el = await element.$('//*[@class="street_address"]');
await el.type('1056 Broadway', {clear: true});
```

---

#### press(key[, options]) ⇒ Promise<Element>

| Param     | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `key`     | `string` | Name of key to press, such as `ArrowLeft`.                   |
| `options` | `Object` | Additional options:<br />`text`: <string> - If specified, generates an input event with this text.<br />`delay`: <number> - Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0. |

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

Focuses the element, and then press the `key`

> **NOTE**	Modifier keys DO effect `element.press()`. Holding down `Shift` will type the text in upper case.

---

#### clear() ⇒ Promise<Element>

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

This method clear field.

```javascript
// how to clear field
await element.$('.field_name').clear();
```

---

#### selectBy(field, values) ⇒ Promise<Element>

| Param     | Type                   | Description                                                  |
| --------- | ---------------------- | ------------------------------------------------------------ |
| `field`   | `string`               | Name of option field for select. It may be: Index, label, text, value. |
| `values`  | `string|Array<string>` | Value or values (if support multiple select) for select.     |
| `options` | `Object`               | Optional waiting parameters. For options describe - see [here](https://github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#framewaitforselectorselector-options). |

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

<p>Select option from <select> web element.</select></p>

<blockquote> <p>**NOTE**	If `options` parameter is `null` than method doesn't wait for element appearing on page. </p></blockquote>

```javascript
// select without wait
await element.select('text', 'select', 'USA');
await element.select('value', 'select', '1');
await element.select('index', 'select',  0);

// select with wait
await element.select('text', 'select', 'USA', {});
await element.select('value', 'select', 'text', {});
await element.select('index', 'select', 0, {visible: true, timeout: 5000});
```

---

#### selectByValue(value) ⇒ Promise<Element>

| Param   | Type     | Description                      |
| ------- | -------- | -------------------------------- |
| `value` | `string` | Name of option field for select. |

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |
Select option from <select> web element by value.
This method behaves the same like the `selectBy(field, values)` method, but with `value` in `field` parameter.

```javascript
// how to select a value in <select> element
await element.selectByValue('New Zealand');
await element.selectByValue(100);
```
---
#### selectByLabel(value) ⇒ Promise<Element>

| Param   | Type     | Description                      |
| ------- | -------- | -------------------------------- |
| `value` | `string` | Name of option field for select. |

**Returns**

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `Promise<Element>` | Promise which returns element itself. |

Select option from <select> web element by label.

This method behaves the same like the `selectBy(field, values)` method, but with `label` in `field` parameter.

```javascript
// how to select a value in <select> element
await element.selectByLabel('New Zealand');
await element.selectByLabel(100);
```

------

#### text() ⇒ Promise<string>

**Returns**

| Type              | Description                                   |
| ----------------- | --------------------------------------------- |
| `Promise<string>` | Promise, which returns inner text of element. |

This method returns inner text of selected element.

```javascript
// how to get inner text of element
const name = await element.$('//*[@class="user_name"]').text();
```

------

#### number() ⇒ Promise<number>

**Returns** 

| Type              | Description                                         |
| ----------------- | --------------------------------------------------- |
| `Promise<Number>` | Promise, which returns inner text parsed to number. |

This method receives text from element parsed to number.

```javascript
// how to get product price as number
const price = await element.$('//*[@class="product_price"]').number();
```

------

#### boundingBox() ⇒ Promise<Object>

**Returns**

| Type               | Properties      | Description                               |
| ------------------ | --------------- | ----------------------------------------- |
| `Promise<?Object>` | x <number>      | the x coordinate of the element in pixels |
|                    | y <number>      | the y coordinate of the element in pixels |
|                    | width <number>  | the width of the element in pixels        |
|                    | height <number> | the height of the element in pixels       |

Proxy for [elementHandle.boundingBox()](https://github.com/GoogleChrome/puppeteer/blob/v1.12.2/docs/api.md#elementhandleboundingbox).

This method returns the bounding box of the element. 

> **NOTE**	If there is no element either element is not visible, methods returns `null`.

```javascript
// how to get proper size of image
const getImageBB = () => {
    const image = await element.$('.image_wrapper');
    return await image.boundingBox();
}
```

------

#### frame() ⇒ Promise<Frame>

**Returns**

| Type             | Description                   |
| ---------------- | ----------------------------- |
| `Promise<Frame>` | Promise which returns iframe. |

This method returns frame associated with **execution context**.  

> **Read more about frame [here](http://htmlbook.ru/html/iframe).**

```javascript
//how to get iframe
const iframe = await element.$('.image_wrapper').frame();
```

------

#### evaluate(pageFunction, ...args) ⇒ Promise<Any>

| Param          | Type                | Description                                 |
| -------------- | ------------------- | ------------------------------------------- |
| `pageFunction` | `string | Function` | Function to be evaluated in browser context |
| `...args`      | `array`             | Arguments to pass to `pageFunction`         |

This method evaluates the given function in the context of the web page.

- If the function passed to the `page.evaluate` returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), then `page.evaluate` would wait for the promise to resolve and return its value.
- If the function passed to the `page.evaluate` returns a non-[Serializable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description) value, then `page.evaluate` resolves to `undefined`.

```javascript
// example: evaluating function in web page context:
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7);
console.log(result); // prints "56"
```
```javascript
// example: passing a string instead of function:
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```
------
#### uploadFile(...filePaths)

| Param          | Type        | Description                                                  |
| :------------- | :---------- | ------------------------------------------------------------ |
| `...filePaths` | `...string` | Sets the value of the file input these paths. If some of the `filePaths` are relative paths, then they are resolved relative to current working directory. |

This method expects `elementHandle` to point to an input element.

```javascript
// how to upload an image
await page.$('.upload_btn').uploadFile(path);
```