# SmoothScroll.js
A simple smooth scrolling using 100% vanilla JavaScript.

[Demo](https://rayc2045.github.io/SmoothScroll/)

## How to Use
<!-- <h1 align="center">
  <a href="https://cdnjs.com"><img src="https://raw.githubusercontent.com/cdnjs/brand/master/logo/standard/dark-512.png" width="175px" alt="< cdnjs >"></a>
</h1> -->
![Photo](https://raw.githubusercontent.com/rayc2045/SmoothScroll/main/intro.png)

## Example Codes
```html
<body>
  <div class="viewport">
    <div class="container">
      Your stuff here...
    </div>
  </div>

  <script src="SmoothScroll.min.js"></script>
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
