webpackJsonp([1,4],{

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vacation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Guest; });
var Vacation = (function () {
    function Vacation() {
        this.name = '';
        this.price = 0;
        this.totalDays = 0;
        this.newFlag = true;
    }
    return Vacation;
}());
var Guest = (function () {
    function Guest() {
        this.guestName = 'Enter guest name';
        this.guestDays = 0;
        this.amountOwed = 0;
        this.guestEmail = 'Enter guest email';
    }
    return Guest;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/classes.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VacationUpdateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VacationUpdateService = (function () {
    function VacationUpdateService() {
        // Observable string sources
        this.vacationUpdatedSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // Observable string streams
        this.vacationUpdated$ = this.vacationUpdatedSource.asObservable();
    }
    // Service message commands
    VacationUpdateService.prototype.updateVacation = function (vacation) {
        console.log("from update service", vacation);
        this.vacationUpdatedSource.next(vacation);
    };
    VacationUpdateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], VacationUpdateService);
    return VacationUpdateService;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/vacation-update.service.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_vacation_update_service__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_classes__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VacationListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VacationListComponent = (function () {
    function VacationListComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.vacations = []; //try Vacation[]
        this.isLoading = false;
        this.newvacation = new __WEBPACK_IMPORTED_MODULE_5__helpers_classes__["a" /* Vacation */];
    }
    VacationListComponent.prototype.ngOnInit = function () {
        /*
        this.authService.getVacations().subscribe(profile => {
          this.user = profile.user;
        },
        err => {
          console.log(err);
          return false;
        });
        */
        this.getVacations();
    };
    VacationListComponent.prototype.getVacations = function () {
        var _this = this;
        this.isLoading = true;
        this.authService.getVacations()
            .subscribe(function (vacations) {
            _this.vacations = vacations;
        });
        this.isLoading = false;
        this.selectedVacation = undefined;
    };
    VacationListComponent.prototype.select = function (vacation) {
        this.selectedVacation = vacation;
    };
    VacationListComponent.prototype.createVacation = function () {
        this.selectedVacation = this.newvacation;
        this.selectedVacation.name = "New Vacation";
    };
    VacationListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vacation-list',
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4__services_vacation_update_service__["a" /* VacationUpdateService */]],
            template: __webpack_require__(698),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], VacationListComponent);
    return VacationListComponent;
    var _a, _b;
}());
/*
{
  "name": "testvacation",
  "price": 24423,
  "guests": [{
    "name": "jeff",
    "days": 2,
    "amount": 0
    },
    {
    "name": "joe",
    "days": 3,
    "amount": 0
    },
    {
    "name": "jan",
    "days": 4,
    "amount": 0
    }]
}
*/ 
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/vacation-list.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/validate.service.js.map

/***/ }),

/***/ 392:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 392;


/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(510);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/main.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isDep = true; //change to false if developing locally
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        console.log("browser...", user);
        var ep = this.prepEndpoint('users/register');
        //return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/authenticate');
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/profile');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    AuthService.prototype.hasData = function (guests) {
        if (guests == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    ///////////////vacation service functions 
    AuthService.prototype.addVacation = function (vacation) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        vacation.newFlag = false;
        console.log(vacation);
        var ep = this.prepEndpoint('users/vacations');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(ep, vacation, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('yay'); });
    };
    AuthService.prototype.getVacations = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateVacation = function (vacation) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations/edit');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put(ep, vacation, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('yay'); });
    };
    AuthService.prototype.deleteVacation = function (vacation) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations/delete');
        headers.append('Authorization', this.authToken);
        console.log("deleting this vacation", vacation);
        headers.append('Content-Type', 'application/json');
        return this.http.put(ep, vacation, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('yay'); });
    };
    ///////////////guest service functions
    AuthService.prototype.addGuest = function (guest) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations/guests');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post(ep, guest, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getGuests = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations/guests');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateGuests = function (guest) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteGuest = function (guest) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        var ep = this.prepEndpoint('users/vacations');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.prepEndpoint = function (ep) {
        if (this.isDep) {
            return ep;
        }
        else {
            //return 'http://localhost:8080/'+ep;
            return 'http://localhost:3000/' + ep;
        }
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/auth.service.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(690),
            styles: [__webpack_require__(680)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/app.component.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_vacation_list_vacation_list_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_vacation_vacation_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_validate_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_result_result_component__ = __webpack_require__(517);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'vacations', component: __WEBPACK_IMPORTED_MODULE_12__components_vacation_list_vacation_list_component__["a" /* VacationListComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_vacation_list_vacation_list_component__["a" /* VacationListComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_vacation_vacation_component__["a" /* VacationComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_vacation_vacation_component__["a" /* VacationComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_result_result_component__["a" /* ResultComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__["FlashMessagesModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_14__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/app.module.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(691),
            styles: [__webpack_require__(681)]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/dashboard.component.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(692),
            styles: [__webpack_require__(682)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/home.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            username: this.username,
            password: this.password
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged in', {
                    cssClass: 'alert-success',
                    timeout: 5000 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, {
                    cssClass: 'alert-danger',
                    timeout: 5000 });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(693),
            styles: [__webpack_require__(683)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/login.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', {
            cssClass: 'alert-success',
            timeout: 3000
        });
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(694),
            styles: [__webpack_require__(684)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/navbar.component.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(695),
            styles: [__webpack_require__(685)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/profile.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(696),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/register.component.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_pdf_service__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_classes__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResultComponent = (function () {
    function ResultComponent(pdfService, authService, updateService) {
        this.pdfService = pdfService;
        this.authService = authService;
        this.updateService = updateService;
    }
    ResultComponent.prototype.ngOnInit = function () {
    };
    ResultComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
        this.vacation = changes.vacation.currentValue;
    };
    //download pdf of result onto local machine
    //must first generate pdf of result data
    ResultComponent.prototype.downloadPdf = function () {
    };
    //generate pdf of result data
    //collect email addresses for each guest, place in array
    //connect service to send email (mailchimp?)
    //create template for email (hello, your friend xxxxxx has sent you a price breakdown for your upcoming vacation)
    ResultComponent.prototype.sendPdf = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__helpers_classes__["a" /* Vacation */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__helpers_classes__["a" /* Vacation */]) === 'function' && _a) || Object)
    ], ResultComponent.prototype, "vacation", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], ResultComponent.prototype, "guests", void 0);
    ResultComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-result',
            providers: [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */], __WEBPACK_IMPORTED_MODULE_2__services_pdf_service__["a" /* PdfService */],],
            template: __webpack_require__(697),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_pdf_service__["a" /* PdfService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_pdf_service__["a" /* PdfService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */]) === 'function' && _d) || Object])
    ], ResultComponent);
    return ResultComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/result.component.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vacation_list_vacation_list_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_classes__ = __webpack_require__(221);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VacationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var VacationComponent = (function () {
    function VacationComponent(fb, authService, updateService, cdr, zone, ApplicationRef, vlist) {
        this.fb = fb;
        this.authService = authService;
        this.updateService = updateService;
        this.cdr = cdr;
        this.zone = zone;
        this.ApplicationRef = ApplicationRef;
        this.vlist = vlist;
        this.savedGuests = [];
        this.createForm();
    }
    VacationComponent.prototype.createForm = function () {
        this.vacationForm = this.fb.group({
            name: '',
            price: 0,
            guests: this.fb.array([])
        });
    };
    VacationComponent.prototype.ngOnChanges = function () {
        this.vacationForm.reset({
            name: this.vacation.name,
            price: this.vacation.price,
            totalDays: this.vacation.totalDays
        });
        //this.cdr.detectChanges();
        this.setGuests(this.vacation.guests);
    };
    Object.defineProperty(VacationComponent.prototype, "guests", {
        // getGuestsFromServer() {
        //   this.authService.getGuests()
        //     .subscribe(
        //       savedGuests => {
        //         this.savedGuests = savedGuests
        //         console.log(this.savedGuests)
        //     }) 
        // }
        get: function () {
            return this.vacationForm.get('guests');
        },
        enumerable: true,
        configurable: true
    });
    ;
    VacationComponent.prototype.setGuests = function (guests) {
        var _this = this;
        if (guests == undefined) {
            var guestFGs = null;
            var guestFormArray = null;
        }
        else {
            var guestFGs = guests.map(function (guest) { return _this.fb.group(guest); });
            var guestFormArray = this.fb.array(guestFGs);
            this.vacationForm.setControl('guests', guestFormArray);
        }
    };
    VacationComponent.prototype.addGuest = function () {
        this.guests.push(this.fb.group(new __WEBPACK_IMPORTED_MODULE_5__helpers_classes__["b" /* Guest */]()));
    };
    //submitting changes/edits to old vacation
    VacationComponent.prototype.onSubmit = function () {
        this.vacation = this.prepareSaveVacation();
        //calculate total days by all guests in vacation
        //assign to this.vacation
        var days = 0;
        for (var i = 0; i < this.vacation.guests.length; i++) {
            days += this.vacation.guests[i].guestDays;
        }
        this.vacation.totalDays = days;
        this.vacation.guests = this.calculateTotal(this.vacation, this.vacation.guests);
        if (this.vacation.newFlag) {
            //this.vacation.guests = this.calculateTotal(this.vacation, this.vacation.guests);
            this.authService.addVacation(this.vacation);
        }
        else {
            this.authService.updateVacation(this.vacation);
        }
        //this.ApplicationRef.tick(); 
        //this.refreshVacation(this.vacation);
        this.ngOnChanges();
    };
    VacationComponent.prototype.prepareSaveVacation = function () {
        var formModel = this.vacationForm.value;
        // deep copy of form model guests
        var guestsDeepCopy = formModel.guests.map(function (guest) { return Object.assign({}, guest); });
        // return new `Vacation` object containing a combination of original vacation value(s)
        // and deep copies of changed form model values
        var saveVacation = {
            name: formModel.name,
            price: formModel.price,
            totalDays: this.vacation.totalDays,
            guests: guestsDeepCopy,
            newFlag: this.vacation.newFlag
        };
        saveVacation._id = this.vacation._id;
        return saveVacation;
    };
    VacationComponent.prototype.deleteGuest = function (index) {
        this.guests.removeAt(index);
    };
    VacationComponent.prototype.revert = function () {
        this.ngOnChanges();
    };
    VacationComponent.prototype.delete = function () {
        this.authService.deleteVacation(this.vacation);
        console.log("deleting existing vacation");
    };
    VacationComponent.prototype.calculateTotal = function (vacation, guests) {
        var allGuests = vacation.guests;
        var price = vacation.price;
        var vacationDays = vacation.totalDays;
        var costPerDay;
        var guestTotal;
        costPerDay = price / vacationDays;
        for (var _i = 0, allGuests_1 = allGuests; _i < allGuests_1.length; _i++) {
            var gg = allGuests_1[_i];
            if (vacationDays == 0)
                return guests;
            gg.amountOwed = gg.guestDays * costPerDay;
        }
        return guests;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__helpers_classes__["a" /* Vacation */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__helpers_classes__["a" /* Vacation */]) === 'function' && _a) || Object)
    ], VacationComponent.prototype, "vacation", void 0);
    VacationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vacation',
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */]],
            template: __webpack_require__(699),
            styles: [__webpack_require__(689)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_vacation_update_service__["a" /* VacationUpdateService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ApplicationRef"]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__vacation_list_vacation_list_component__["a" /* VacationListComponent */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__vacation_list_vacation_list_component__["a" /* VacationListComponent */]) === 'function' && _h) || Object])
    ], VacationComponent);
    return VacationComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/vacation.component.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/auth.guard.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PdfService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PdfService = (function () {
    function PdfService() {
    }
    PdfService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], PdfService);
    return PdfService;
}());
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/pdf.service.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Zack/Documents/GitHub/mean-app/angular-src/src/environment.js.map

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "#all {\r\n\r\n}"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = "#all{\r\n\tfont-family: \"source_sans_pro\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\r\n}\r\n\r\n#lead {\r\n\tbackground-color: #e7e7e7;\t\r\n}\r\n\r\n#cols {\r\n\ttext-align: center;\r\n}\r\n\r\n.row #left{\r\n\tcolor: white;\r\n\tbackground-color: #337ab7;\r\n}\r\n\r\n.row #mid{\r\n\tbackground-color: #e7e7e7;\r\n}\r\n\r\n.row #right{\r\n\tcolor: white;\r\n\tbackground-color: #337ab7;\r\n}"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = "#mainbar {\r\n    font-family: \"source_sans_pro\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;\t\r\n    background-color: #337ab7;\r\n    border-color: #2e6da4;\r\n}\r\n\r\n#navbar a:active{\r\n\tcolor: ;\r\n\tbackground-color: # ;\r\n}\r\n\r\n#navbar a:hover{\r\n\tbackground-color: # ;\r\n}\r\n\r\n#navbar .active{\r\n\tcolor: ;\r\n\tbackground-color: #;\r\n}\r\n\r\n\r\n.nav-pills>li.active>a, .nav-pills>li.active>a:hover, .nav-pills>li.active>a:focus{\r\n\tbackground-color: # ;\r\n\t}\r\n\r\n#hamburger{\r\n\tcolor: white;\r\n    background-color: white;\r\n    border-color: white;\r\n}\r\n\r\n#login{\r\n\tcolor: white;\r\n}\r\n\r\n#register{\r\n\tcolor: white;\r\n}\r\n\r\n#home{\r\n\tcolor: white;\r\n}\r\n\r\n#profile{\r\n\tcolor: white;\r\n}\r\n\r\n#vacations{\r\n\tcolor: white;\r\n}\r\n\r\n#dash{\r\n\tcolor: white;\r\n}\r\n\r\n#logout{\r\n\tcolor: white;\r\n}\r\n\r\n#brand{\r\n\tcolor: white;\r\n}"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = "#main{\r\n\r\n}\r\n\r\n#guesttemp{\r\n\tborder-bottom: dashed;\r\n\tborder-width: 1px;\t\r\n}\r\n\r\n#pdf{\r\n\tborder: none;\r\n\tmargin: 10px;\r\n}\r\n\r\n#bottomborder{\r\n\tborder-bottom: dashed;\r\n\tborder-width: 1px;\t\r\n}"

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = "#rightside {\r\n\ttext-align: center;\r\n\tmargin-right: ;\r\n}\r\n\r\n#list{\r\n\ttext-align: center;\r\n\tbackground-color: ;\r\n}\r\n\r\n\r\n\r\n.row{\r\n\ttext-align: ;\r\n}\r\n\r\n.list-group-item {\r\n\tmargin: 1px;\r\n\ttext-align: center;\r\n}\r\n\r\n.list-group-item :active{\r\ndisplay:block;\r\n}\r\n\r\n#atag{\r\n\tdisplay:block;\r\n}"

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = "#delete {\r\n\tfloat: right;\r\n}\r\n\r\n#eachguest {\r\n\tborder-bottom: dashed;\r\n\tborder-width: 1px;\r\n}\r\n\r\n#result{\r\n\ttext-align: center;\r\n\tbackground-color: #e7e7e7;\r\n}"

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "<div id=\"all\">\n\t<app-navbar></app-navbar>\n\t<div class=\"container\" id=\"main\">\n\t  <flash-messages></flash-messages>\n\t  <router-outlet></router-outlet>\n\t</div>\n</div>"

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Dashboard</h2>\n<p>Under construction</p>\n"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div id=\"all\">\n  <div class=\"jumbotron text-center\" id=\"lead\">\n    <h1>Group Vacation Calculator</h1>\n    <p class=\"leadtext\">Welcome to our custom vacation calculator. This service provides a cost breakdown to each guest on the vacation proportional to the days they will attend the vacation. </p>\n    <div>\n      <a class=\"btn btn-primary\" [routerLink]=\"['/register']\">Register</a> <a class=\"btn btn-default\" [routerLink]=\"['/login']\">Login</a>\n    </div>\n  </div>\n\n  <div class=\"row\" id=\"cols\">\n    <div class=\"col-md-4\" id=\"left\">\n      <h3>End conflicts among guests</h3>\n      <p>Eliminate the challenges of determining who owes what amount when traveling on a multi-day, multi-guest vacation</p>\n    </div>\n    <div class=\"col-md-4\" id=\"mid\">\n      <h3>Send them a cost breakdown</h3>\n      <p>Our printable pdf service can also be sent to your guest's email addresses, showing exactly who owes what and why</p>\n    </div>\n    <div class=\"col-md-4\" id=\"right\">\n      <h3>Connect with Airbnb/Venmo </h3>\n      <p>To be added in the future</p>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Login</h2>\n<form (submit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"username\" name=\"username\">\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n</form>\n"

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\" id=\"mainbar\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" id=\"hamburger\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" id=\"brand\" href=\"#\">Vacation Calculator</a>\n        </div>\n\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n        <!--\n          <ul class=\"nav navbar-nav navbar-left\">\n            <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"home\" [routerLink]=\"['/']\">Home</a></li>\n          </ul>\n        -->\n\n          <ul class=\"nav navbar-nav navbar-right\">\n            <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"dash\" [routerLink]=\"['/dashboard']\">Dashboard</a></li>\n            <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"profile\" [routerLink]=\"['/profile']\">Profile</a></li>\n            <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"vacations\" [routerLink]=\"['/vacations']\">Vacations</a></li>\n\n            <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"login\" [routerLink]=\"['/login']\">Login</a></li>\n            <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a id=\"register\" [routerLink]=\"['/register']\">Register</a></li>\n            <li *ngIf=\"authService.loggedIn()\"><a id=\"logout\" (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\n            <!--\n            <li class=\"dropdown\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n            <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">FAQ 1</a></li>\n            <li><a href=\"#\">FAQ 2</a></li>\n            <li><a href=\"#\">FAQ 3</a></li>\n            <li role=\"separator\" class=\"divider\"></li>\n            </ul>\n            </li>\n            -->          \n          </ul>\n        </div><!--/.nav-collapse -->\n\n      </div>\n    </nav>\n"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <h2 class=\"page-header\">{{user.name}}</h2>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\">Username: {{user.username}}</li>\n    <li class=\"list-group-item\">Email: {{user.email}}</li>\n  </ul>\n\n  <p>Under construction </p>\n</div>\n"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Register</h2>\n<form (submit)=\"onRegisterSubmit()\">\n  <div class=\"form-group\">\n    <label>Name</label>\n    <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\n  </div>\n  <div class=\"form-group\">\n    <label>Email</label>\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" >\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n</form>\n"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" *ngIf=\"!vacation.newFlag\">\r\n  <div id=\"bottomborder\">\r\n          <h2>Pricing Breakdown</h2>\r\n  </div>\r\n  <div id=\"hasdata\">\r\n    <div *ngFor=\"let guest of guests; let i=index\" [attr.data-index]=\"i\" id=\"guesttemp\">\r\n      <!-- The repeated guest template -->\r\n      <h4>Guest #{{i + 1}}</h4>\r\n      <div id=\"output\">\r\n      \t\t<label>Name: {{guest.guestName}}\r\n\r\n            </label>\r\n           <br><br>\r\n            <label>Vacation Price: {{vacation.price}}\r\n\r\n            </label>\r\n            <br><br>\r\n            <label>Amount owed: {{guest.amountOwed}}\r\n\r\n            </label>\r\n            <!-- output of math-->\r\n      </div>\r\n    </div>\r\n\r\n  <div id=\"pdf\">\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"download()\">\r\n      <span class=\"glyphicon glyphicon-print\"></span> Download PDF\r\n    </button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"sendAll()\">\r\n      <span class=\"glyphicon glyphicon-envelope\"></span> Email PDF to guests\r\n    </button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<h3 *ngIf=\"isLoading\"><i>Loading vacations ... </i></h3>\r\n\r\n<nav>\r\n  <button (click)=\"getVacations()\" class=\"btn btn-secondary\">Refresh</button>\r\n  <button (click)=\"createVacation()\" class=\"btn btn-primary\">Create</button>\r\n</nav>\r\n\r\n<div class=\"row\">\r\n\t<div class=\"col-sm-4\" id=\"list\">\r\n\t<h2 *ngIf=\"!isLoading\">Select a vacation:</h2>\r\n\t\t<div class=\"list-group\">\r\n\t\t  <a *ngFor=\"let vacation of vacations\" (click)=\"select(vacation)\" id=\"atag\">\r\n\t\t\t<div class=\"list-group-item active\">\r\n\t\t\t{{vacation.name}}\r\n\t\t\t</div>\t\t\r\n\t\t  </a>\r\n\t\t</div> \r\n\t</div>\r\n\t<div class=\"col-sm-8\" id=\"rightside\" *ngIf=\"selectedVacation\">\r\n\t  <app-vacation [vacation]=\"selectedVacation\"></app-vacation>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">  \r\n  <div class=\"col-sm-6\" id=\"detail\">\r\n    <h2>Vacation Detail</h2>\r\n    <h3>Editing: {{vacation.name}}</h3>\r\n      <form [formGroup]=\"vacationForm\" (ngSubmit)=\"onSubmit()\" novalidate>\r\n        <div style=\"margin-bottom: 1em\">\r\n          <button type=\"submit\"\r\n                  [disabled]=\"vacationForm.pristine\" class=\"btn btn-success\">Submit</button>\r\n          <button type=\"reset\" (click)=\"revert()\"\r\n                  [disabled]=\"vacationForm.pristine\" class=\"btn btn-warning\">Revert</button>\r\n          <button type=\"delete\" (click)=\"delete()\"\r\n                   class=\"btn btn-danger\">Delete Vacation</button>\r\n        </div>\r\n        <!-- Vacation Detail Controls -->\r\n        <div class=\"form-group\" id=\"nameandprice\">\r\n            <label>Name of vacation:\r\n              <input class=\"form-control\" formControlName=\"name\" required>\r\n            </label>\r\n            <br><br>\r\n            <label>Price of vacation:\r\n              <input class=\"form-control\" formControlName=\"price\" required>\r\n            </label>\r\n        </div>\r\n\r\n        <div formArrayName=\"guests\" class=\"well well-lg\">\r\n          <div *ngFor=\"let guest of guests.controls; let i=index\" [formGroupName]=\"i\" >\r\n            <!-- The repeated guest template -->\r\n            <h4>Guest #{{i + 1}}</h4>\r\n            <div id=\"output\">\r\n                  <!-- output of math-->\r\n            </div>\r\n              <div class=\"form-group\" id=\"eachguest\">\r\n                <button id=\"delete\" (click)=\"deleteGuest(i)\" class=\"btn btn-danger\">Delete Guest</button>\r\n                  <label>Name:\r\n                    <input class=\"form-control\" formControlName=\"guestName\" required>\r\n                  </label>\r\n                  <br><br>\r\n                  <label>Total days:\r\n                    <input class=\"form-control\" type=\"number\" formControlName=\"guestDays\" required>\r\n                  </label>\r\n                  <br><br>\r\n                  <label>Email Address:\r\n                    <input class=\"form-control\" formControlName=\"guestEmail\" required>\r\n                  </label>\r\n              </div>\r\n            </div>\r\n\r\n            <br>\r\n            <!-- End of the repeated address template -->\r\n         \r\n          <button (click)=\"addGuest()\" type=\"button\">Add another guest</button>\r\n          <button type=\"submit\"\r\n                  [disabled]=\"vacationForm.pristine\" class=\"btn btn-success\">Submit</button>\r\n        </div>\r\n      </form>\r\n  </div>\r\n\r\n  <div class=\"col-sm-6\" id=\"result\" *ngIf=\"vacation && (!vacation.isNew)\">\r\n    <app-result [vacation]=\"vacation\" [guests]=\"vacation.guests\"></app-result>\r\n  </div>\r\n</div>\r\n  <!--\r\n  <p>vacationForm value: {{ vacationForm.value | json}}</p>\r\n  <h4>Name change log</h4>\r\n  <div *ngFor=\"let name of nameChangeLog\">{{name}}</div>\r\n  -->"

/***/ }),

/***/ 722:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(393);


/***/ })

},[722]);
//# sourceMappingURL=main.bundle.map