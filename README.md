# How to Work
esta libreria se creo para tener un lienzo mas limpio para programar. aún en desarrollo..

instance plugin
```js
  var gconnect = new GConnect(document.getElementById('login'), {
		  client_id: "CLIENT_ID.apps.googleusercontent.com"
	});
```

events
```js
gconnect.onReady();
gconnect.onInfoUser();
gconnect.onSignedIn();
```
event onReady:
```js
//este evento se lanza cuando se incializo y recupero informacion de G+
gconnect.onReady(function(){
  console.log('listo para usar google connect');
});
```

evento onInfoUser:
```js
//este evento se lanza cuando recupera informacion del usuario inmediatamente despues del callback de login
gconnect.onInfoUser(function(profile){
  //profile.getId()
	//profile.getName()
	//profile.getImageUrl()
	//profile.getEmail()
});
```

#aun en desarrollo
