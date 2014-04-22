# Nir Team Demo Application

#Technologies:
 - Node JS
 - Express
 - passportJs
 - AngularJS
 - Bower
 - Grunt


## lets install webstorm

## Node modules installation :
 - run npm install
 - have a look at http://package.json.nodejitsu.com/ - basically , all the dependencies (dev + prod) will be installed.\
   usually the dev should contain testing frameworks , ui testing etc , while the production should be in the dependencies section (here its not well orginized)

## frameworks installation using bower :
 - first run : npm install -g bower
 - set http_proxy=http://web-proxy.isr.hp.com:8080
 - set https_proxy=http://web-proxy.isr.hp.com:8080
 - run bower install
 - this command will take all the dependencies listed in the bower.json and install them.
 - the files will be installed in a folder called bower_components. this can be changed in the file .bowerrc that has this configuration
 - no try something else:
    - bower search angular-ui - you will get a list of all the bower-ready angular-ui frameworks
    - bower install angular-ui --save
    - the action --save will actually write it in the bower.json dependencies file - you can also specify the version you want - look at http://bower.io/

## running grunt tasks:
 - run npm install -g grunt-cli
 - grunt basically is a JS task runner , it allows you to automate actions that you do repeatedly  - pretty much like maven
 - there a a-lot of examples on grunt tasks , almost everyting you can think of. here we will focus on :
    - scss compilation
    - css minification
    - js minification
  - but you can do a lot with this tool
  - now lets run in cmd - grunt build

## now lets connect to mobile-net network

## server side:

##authentication:

  ##what is OAuth:

     -we use OAuth2 to connect to facebook API. what is OAuth2? to answer that we need first to see what OAuth is?
       -  open standard for authorization (initials)
       -  OAuth provides a method for clients to access server resources on behalf of a resource owner (front end user) - meaning , i as an owner of my facebook
          page want to access my page
       -  It also provides the ability for end-users to authorize third-party access to their resources without sharing their credentials(such as: when you
          allow an app (also on your phone) to access you data from facebook or google)

  ## OAuth2:

    - OAuth 2.0 is the next evolution of the OAuth protocol and is not backwards compatible with OAuth 1.0
    - OAuth 2.0 focuses on client developer simplicity
    - providing specific authorization flows for web applications, desktop applications, mobile phones, and living room devices


 - we have several folders and files there:
    - server - contains all the server related files
    - auth - facebook connectivity + api node module
    - sever config - some configurations to the node server - to keep the server.js more orginized
        - please not that in the app.use function , some thigns should come before the other , usually when a module have this issue it will specify
        -server.js file - the actual node server
    -node_modules - generated by the npm install - no need to check-in version control the node_modules

## lests start working:

 - go over server.js - there are some comments that explain some of the declerations
 - add - facebook.connectToFacebook(app,express,passport); after the module initialization

 - now lets go to the client code:
    - this is an angularjs application - with an image carousel - taken from someones github...not mine...
    - as you can see the index.html in the root folder holds all the script dependencies of our application
    - the body declares the ng-view attribute as needed to start rendering
    - app.js file - lest go over it together:
        - routing
        - demo controller

 - lets add an http request to get the images and write its corresponding rest service in the backend

    ## add the code to app.js udner the DemoCtrl:

        $http({method: 'GET', url: '/getPic'}).
                          success(function(data, status, headers, config) {
                              // this callback will be called asynchronously
                              // when the response is available
                              //for this example we will user only the first album
                              var photos = data && data.data && data.data.data[0] && data.data.data[0].photos && data.data.data[0].photos.data;
                              for (var i=0; i < photos.length; i++) {
                                  $scope.slides2.push(addSlide(photos[i].source, photos[i].id));
                              }
                          }).
                          error(function(data, status, headers, config) {
                              alert('error!');
        });

    ##now lets add the corrensponding rest sevice in the backend
     - go to facebook.js file
     - add at the bottom the rest sevice:

            app.get('/getPic',
                        function (req, res) {
                            graph.get("/" + user.id + "/albums?fields=photos", {access_token: req.user.token}, function (err, response) {
                                res.send(JSON.stringify({data:response}));
                            });
                        }
            );

