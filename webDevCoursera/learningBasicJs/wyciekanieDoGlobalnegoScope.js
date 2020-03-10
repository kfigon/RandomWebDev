// cudo zeby nie funkcje i zmienne nie 
// wyciekaly do globalnego namespace
(function(){

    function asd() {
        console.log('ziwrz');
    }

    asd();
})();