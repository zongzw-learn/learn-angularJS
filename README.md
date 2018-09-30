# Repo Introduction

This is the repo for demonstrating basic concepts/usage of angularJS, also as a summary of first impression to angularJS.

The repo depends on 2 other repos: 
* https://github.com/zongzw/nginx-80-443: used as a webserver to run angularjs based web application.
* https://github.com/zongzw/foxfox: this bluemix application has been deployed, so just use it.

# Deploy and Run
1. git clone the two repo to local

```
git clone https://github.com/zongzw/nginx-80-443
git clone https://github.com/zongzw/learn-angularJS
``` 
2. configure `/path/to/nginx-80-443/settings` and change webroot to `/path/to/learn-angularJS`
```
webroot=/path/to/learn-angularJS
```
3. run `/path/to/nginx-80-443/run-nginx.sh`

>Note that, 
* it depends on docker to run the script. 
* change other settings in `/path/to/nginx-80-443/settings` if needs: like `http_port`.

# Demostrating Points

## basics
Focus on the basic concepts and usages in angularJS.
* how to write the module, the controller, and apply them in html: **myApp myCtrl** 
* how to define a css style: **panel**
* how and where to place **script**
* the difference between **this** and **scope**
* how and when to trigger controller instantiate: **injector**
* how to define service with **service** recipe and **factory** recipe.
* 3 ways to inject dependencies: **inline array**, **$inject**, **implicit**.
* how to define a new **ng-style: signedHash**.
* basic ng directive usages: **ng-model, ng-app, ng-controller, ng-style**

## services
Focus on the kinds of common services.
* **$scope**: the bridge between DOM and controller.
* **$q**: the promise to make task executed in asynchronizing way.
* **$location**: helper to handler http location(url port path or so.).
* **$interval**: the timer.
* **$http**: the most common used service to do remote access.
* **$timeout**: the another timer.
* **Customized Service**: your own services.

## jasmine
**Jasmine** is a framework provided in angularJS world for UnitTest. While **karma** is a tool to automate the testing process. Lots of articles can be found online to describe the usages of them.
This repo just demonstrates
* how to **setup and run and report**. 
* usage of **module**, **inject**, **provide**, **$injector**, **$controller**.
* basic references to mock: **spyOn**, **expect.toXX**. 

> Note that: the **setup and run and report** depends on docker environment.
