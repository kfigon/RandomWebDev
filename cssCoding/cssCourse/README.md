# Zasoby:
* udemy: https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/
* ksiazka Refactoring UI, film tworcy: https://www.youtube.com/watch?v=7Z9rrryIOC4
* https://enjoycss.com/ - generator
* stockowe zdjecia: https://unsplash.com/
* kompresja zdjec: https://tinyjpg.com/
* palety kolorow: https://www.dtelepathy.com/blog/inspiration/beautiful-color-palettes-for-your-next-web-project
* galerie: 
    * http://www.csszengarden.com/
    * https://tympanus.net/codrops/
    * https://dribbble.com/
* https://learnlayout.com/ - layout!

# 1-basics
* https://developer.mozilla.org/en-US/docs/Web/CSS
* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference
* selectors, 
* combinators (adjecent `+` & general `~` sibling, child `>`, descendant ` `)
* classes

# 2-box model
* margin, padding
* margin-collapsing https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing
* box-sizing
* elementy blokowe i liniowe (inline)
* pseudo-classes/elements https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

# 3-more-classes-selectors-props-values
* https://caniuse.com/ - co moge uzywac na ktorej przegladarce

# 4 basic styling project
# 5-positioning
* https://css-tricks.com/almanac/properties/p/position/
* `static` - default document flow
* `relative` - just enables top/left/right/bottom/z-index, stays in doc flow. Moved relatively to it's parent (if static - html). Size not changed. `Overflow: hidden` - hides if element is moved outside parent.
* `absolute` - removed from document flow, positioned to parent or html. Size changed (removed from flow). Like fixed but relative to non-static ancestor.
* `fixed` - remove from flow, stick to viewport. Moving when scroll
* `sticky` - relative till scrolled down, then fixed. Relative + fixed
### links:
* https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
* https://developer.mozilla.org/en-US/docs/Web/CSS/position

# 6-background
* keep in mind you can stack backgrounds on top of another
* `vertical-align: middle`
* todo: learn SVGs https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS

# 7-sizes
* `px`, `cm`,`mm`
* `%`
* `em` - em. Refers to font size. Font relative font x em size = final pixels
* `rem` - root em. Refers to root font size (browser settings only)
* `vh`/`vm` - viewport height, width
    * `vmin`,`vmax` - viewport min/max
* `max-width`/`min-width`

### center elements - `margin: auto`

### Rules for positioning + %
* element + `position: fixed` - containing block is viewport
* element + `position: absolute` - containing block is ancestor with `position` != static. Content+padding of ancestor
* element + `static/relative` - containing block is ancestor which is a block level element. Content only of ancestor

# 8-js
* modal demo
# 9-responsive design - todo!
# 10-forms
# 11-flex
* http://flexboxfroggy.com/#pl
* http://www.flexboxdefense.com/
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/

## properties:
* parent props:
    * flex-direction, flex-wrap => flex-flow. Axis directions
    * justify-content - align over main axis
    * align-items - align over cross axis
    * align-content - align multiline rows
* childrens (flex items) properties:
    * align-self - override align items
    * order
    * flex-grow, flex-shrink, flex-basis =>flex
    
    
