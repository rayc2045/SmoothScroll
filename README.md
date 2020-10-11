# smooth-scroll.js
A simple smooth scrolling using 100% vanilla JavaScript.

[Demo](https://rayc2045.github.io/SmoothScroll/)

## Usage
```html
<body>
  <div class="viewport">
    <div class="container">
      Your stuff here...
    </div>
  </div>

  <script src="smooth-scroll.min.js"></script>
  <script>
    document.querySelector('.viewport').style.position = 'fixed';

    new SmoothScroll({
      target: document.querySelector('.container'),
      scrollEase: 0.08,
      maxOffset: 500
    });
  </script>
</body>
```
