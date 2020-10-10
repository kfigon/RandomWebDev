# Basic js modules system with TS
based on
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

run with live server (vs code extension will work)

# index.html
```
<script type="module" src="dist/app.js" defer></script>
```

# app.js
```
import { MyCanvas } from './Canvas.js';
```

# canvas.js
at the end:
```
export { MyCanvas };
```

# tsconfig.json
```  
"compilerOptions": {
    "target": "es6",
    "module": "es2015",
    "outDir": "./dist/", 
```