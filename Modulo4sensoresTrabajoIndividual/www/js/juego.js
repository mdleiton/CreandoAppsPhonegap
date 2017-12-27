var app={
  inicio: function(){
    dificultad = 0;
    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;
    circuito=0;
    enemigos=0;
    fuerza=0;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    
    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#33fff6';
      game.load.image('bola', 'assets/bb8.png');
      game.load.image('objetivo', 'assets/objetivo.png');
      game.load.image('horizontal', 'assets/horizontal.png');
      game.load.image('vertical', 'assets/vertical.png');
      game.load.image('v', 'assets/verticalp.png');    
      game.load.image('mal', 'assets/error.jpg');
      game.load.image('fuerza', 'assets/fuerza.png');
      game.load.audio('soundtrack', 'assets/sw.mp3'); 
    }

    function create() {
      titulo = game.add.text(50, 0,"Star wars", { fontSize: '50px', fill: 'red' });   
      texto = game.add.text(0, 40,"Fuerza:", { fontSize: '40px', fill: 'red' }); 
      scoreText = game.add.text(150, 40,puntuacion, { fontSize: '45px', fill: '#757676' });
      Travesias = game.add.text(0, 420,"Contador laberinto completo:", { fontSize: '23px', fill: '#757676' });
      circuitotext = game.add.text(280, 420,circuito, { fontSize: '25px', fill: '#757676' });
      enemigostext = game.add.text(0, 440,"Enemigos :", { fontSize: '20px', fill: '#757676' });
      enemigoscount = game.add.text(100, 440,enemigos, { fontSize: '20px', fill: '#757676' });
      fuerzatext = game.add.text(0, 470,"Fuerza :", { fontSize: '20px', fill: '#757676' });
      fuerzacount = game.add.text(100, 470,fuerza, { fontSize: '20px', fill: '#757676' });
      
      //bordes externos
      h1 = game.add.sprite(57, 150, 'horizontal');
      h2 = game.add.sprite(128, 150, 'horizontal');
      h3 = game.add.sprite(216, 150, 'horizontal');
      h4 = game.add.sprite(7, 378, 'horizontal');
      h5 = game.add.sprite(96, 378, 'horizontal');
      h6 = game.add.sprite(184, 378, 'horizontal');      
      v1 = game.add.sprite(0, 150, 'vertical');
      v2 = game.add.sprite(0, 228, 'vertical');
      v3 = game.add.sprite(0, 300, 'vertical');
      v4 = game.add.sprite(300, 150, 'vertical');
      v5 = game.add.sprite(300, 228, 'vertical');
      v6 = game.add.sprite(300, 300, 'vertical');
      //laterales
      v7 = game.add.sprite(57, 150, 'vertical');
      v8 = game.add.sprite(57, 228, 'vertical');
      v9 = game.add.sprite(57, 250, 'vertical');
      v10 = game.add.sprite(114, 200, 'vertical');
      v11 = game.add.sprite(114, 228, 'vertical');
      v12 = game.add.sprite(114, 300, 'vertical');
      h7 = game.add.sprite(114, 200, 'horizontal');
      h8 = game.add.sprite(165, 200, 'horizontal');      
      h9 = game.add.sprite(180, 257, 'horizontal');
      h10 = game.add.sprite(218, 257, 'horizontal');      
      v13 = game.add.sprite(173, 257, 'v');
      v14 = game.add.sprite(230, 305, 'v');
      //bonus
      bonus1 = game.add.sprite(60, 158, 'fuerza');
      bonus2 = game.add.sprite(120, 205, 'fuerza');
      //enemigos
      mal1 = game.add.sprite(275, 315, 'mal');
      mal2 = game.add.sprite(215, 305, 'mal');
      mal3 = game.add.sprite(53, 320, 'mal');
      mal4 = game.add.sprite(245, 190, 'mal');
      

      objetivo = game.add.sprite(275, 373, 'objetivo');
      bola = game.add.sprite(13, 138, 'bola');
      soundtrack = game.add.audio('soundtrack');

      game.physics.arcade.enable(bola);
      game.physics.arcade.enable([h1,h2,h3,h4,h5,h6,h7,h8,h9]);
      game.physics.arcade.enable(objetivo);
      game.physics.arcade.enable([v1,v2,v3,v4,v5,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14]);
      game.physics.arcade.enable([mal1,mal2,mal3,mal4]);
      game.physics.arcade.enable([bonus1,bonus2]);
      
      bola.body.collideWorldBounds = true;
      bola.body.onWorldBounds = new Phaser.Signal();
      game.sound.setDecodedCallback(soundtrack, start, this);

    }

    function start() {
       soundtrack.play();
    }

    function update(){
      var factorDificultad = (200 + (dificultad * 100));
      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));
      
      game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola,[mal1,mal2,mal3,mal4] , app.decrementaEnemigo, null, this);
      game.physics.arcade.overlap(bola,[bonus1,bonus2] , app.incrementaFuerza, null, this);
      game.physics.arcade.overlap(bola,[h1,h2,h3,h4,h5,h6,h7,h8,h9] , app.decrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola,[v1,v2,v3,v4,v5,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14] , app.decrementaPuntuacion, null, this);
    
    }

    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);

  },

  decrementaEnemigo: function(bola,mal){
    puntuacion = puntuacion-100;
    scoreText.text = puntuacion;
    mal.body.x=120+(enemigos*25);
    mal.body.y=440;
    enemigos=enemigos+1;
    enemigoscount.text=enemigos;

  },
  incrementaFuerza: function(bola,fuerzapto){
    puntuacion = puntuacion+2000;
    scoreText.text = puntuacion;
    fuerzapto.body.x=120+(fuerza*25);
    fuerzapto.body.y=468;
    fuerza=fuerza+1;
    fuerzacount.text=fuerza;

  },
  decrementaPuntuacion: function(){
    puntuacion = puntuacion-1;
    scoreText.text = puntuacion;
  },

  incrementaPuntuacion: function(){
    puntuacion = puntuacion+1000;
    circuito=circuito+1;
    scoreText.text = puntuacion;
    circuitotext.text=circuito;
    if (objetivo.body.x==13){
      objetivo.body.x = 275;
      objetivo.body.y = 373;
    }else{
      objetivo.body.x = 13;
      objetivo.body.y = 138;
    }

    dificultad = dificultad + 1;
    //reubicacion de obstaculos
      mal1.body.x = 275;
      mal2.body.x = 215;
      mal3.body.x = 53;
      mal4.body.x = 245;
      mal1.body.y = 315;
      mal2.body.y = 305;
      mal3.body.y = 320;
      mal4.body.y = 190;
      enemigos=0;
      enemigoscount.text=enemigos;
      //reubicar bonus
      bonus1.body.x = 60;
      bonus1.body.y = 158;
      bonus2.body.x = 120;
      bonus2.body.y = 205;
      fuerza=0;
      fuerzacount.text=fuerza;
  },

  vigilaSensores: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(app.recomienza, 1000);
    }
  },

  recomienza: function(){
    document.location.reload(true);
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    velocidadY = datosAceleracion.y ;
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
}, false)
}

