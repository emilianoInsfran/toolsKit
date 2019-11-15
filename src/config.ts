export class Config {
  public static FIREBASE_CONFIG = {
    apiKey: "AIzaSyAxQ4ZN7Zh-6zX0WnZheGUeGYHSdtnY3oY",
    authDomain: "toolskit-2789c.firebaseapp.com",
    databaseURL: "https://toolskit-2789c.firebaseio.com",
    projectId: "toolskit-2789c",
    storageBucket: "toolskit-2789c.appspot.com",
    messagingSenderId: "648889677926",
    appId: "1:648889677926:web:1ae9736df336086abb55a7"
  };

  public  static ZONAS = ["El Jagüel", "Monte Grande", "Ezeiza", "Tristán Suárez", "La Unión", "Avellaneda"];
  public  static TIPOS_DOCUMENTO = [
    {id:1, descripcion:"DNI", longitud:8},
    {id:2, descripcion:"PASAPORTE"},
    {id:3, descripcion:"OTRO"}
  ];

  public  static TIPOS_TELEFONO = [
    {id:1, descripcion:"CELULAR", longitud:10},
    {id:2, descripcion:"FIJO", longitud:8}
  ];

  public static WEB_CLIENT_ID = '648889677926-5bqvt18lsep5epkha91sdi9tvq38e5go.apps.googleusercontent.com';
  public static heroku_backend_url = 'https://herramientas-backend.herokuapp.com/';
  //public static heroku_backend_url = 'http://localhost:9000/';
}