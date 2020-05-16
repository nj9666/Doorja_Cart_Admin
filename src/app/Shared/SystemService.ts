import { Injectable, EventEmitter } from '@angular/core';
import { Alert, AlertType, KeyValue, Account_Model, KeyValueString, ResponseModel  } from '../Shared/CommonModel';
import { Router, NavigationStart } from '@angular/router';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Start Alert Service
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';
// import { containsElement } from '@angular/animations/browser/src/render/shared';
//End Alert Service

const BaseUrl = 'https://localhost:44336/api/ShopAPI/';
// const BaseUrl = 'http://api.chinamart.co.in:81/api/';

@Injectable()
export class SystemService {


    disp_timeline : any;
    HOST: string;
    //public AuthHub: SignalR.Hub.Proxy; 
    public App: AppHelper; rootUrl = window["Site_URL"];
    public CL: string = "";
    public Data: DataHelper;
    public MemberPortal_Common_Data: any;
    public NoticeModel: any;
    public SideManuShow: boolean=true;
    public Account: Account_Model;
    

    public _dataPromise: Deferred<boolean> = new Deferred<boolean>();
    public get HasAccountData(): Promise<boolean> {
        if(localStorage.getItem("UserDto")){
            if ((localStorage.getItem("UserDto")) && JSON.parse(localStorage.getItem("UserDto")).CustomerID > 0) {
                this._dataPromise.resolve(true);
             }
        }
        return this._dataPromise.promise;
    }

    //Start Alert Service
    public subject = new Subject<Alert>();
    public keepAfterRouteChange = false;
    //End Alert Service

    constructor(public router: Router,public location: Location, public http: HttpClient) {
        this.MemberPortal_Common_Data = {};
        this.Account = <Account_Model>{};
        this.App = new AppHelper();
        this.Data = new DataHelper(http, this.App);
        //if (this.App.getCookie("BearerToken")) {
        //    this.loadAccountDetail();
        //}
        //else {
        //    this._dataPromise.resolve(false);
        //}
        this.loadAccountDetail();
        //this.Get_XmlSetting();

        //Start Alert Service
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false; // only keep for a single route change
                } else {
                    this.clear();// clear alert messages
                }
            }
        });
        //End Alert Service
    }


    Moment(input?: Date | string): moment.Moment {
        if (input) { return moment(input); }
        else { return moment(); }
    }
    Moment_Format(input: Date | string, format: string): moment.Moment {
        return moment(input, format);
    }

    loadAccountDetail(): Promise<boolean> {
        //this._dataPromise.resolve(true);
        //return this._dataPromise.promise;
        //this.http.get<any>("/Home/Get_XmlSetting").subscribe((res) => {
        //    console.log(res);
        //    this.XmlSetting = res;
        //});
        window.setTimeout(() => {
            if (this.App.getCookie("ApiToken")) {
                let UserData = JSON.parse(localStorage.getItem("UserDto"));
                if(localStorage.getItem("UserDto")){
                    this.Account = UserData;
                }
                
                console.log(this.Account);
                this._dataPromise.resolve(true);
            }
            else {
                this._dataPromise.resolve(false);
            }
        }, 1);
        return this._dataPromise.promise;
    }


    redirectToLogin(returnUrl?: string) {
        this.router.navigate(['/login']);
    }
    goToDashboard() { this.router.navigate(['/']); }

    logOut() {
        //this.Data.startConnection();
        this.resetPromise();
        this.App.setCookie("ApiToken", "", 0);
        this.Account = <Account_Model>{ UserID: 0};
        this.Data.App.Clear_Local_Storage();
        this.redirectToLogin();
    }
    ClearToken() {
        this.App.setCookie("ApiToken", "", 0);
        this.Account = <Account_Model>{ UserID: 0};
        
    }

    resetPromise() {
        this._dataPromise = new Deferred<boolean>();
    }

    GoTo_ScrollTop(wind: Window) {
        try {
            wind.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (ex) { }
    }


    //Start Alert Service
    getAlert(alertId?: string): Observable<any> {
        return this.subject.asObservable().filter((x: Alert) => x && x.alertId === alertId);
    }
    success(message: string) { this.alert(new Alert({ message, type: AlertType.Success, cssClass: "alert-success" })); }
    error(message: string) { this.alert(new Alert({ message, type: AlertType.Error, cssClass: "alert-danger" })); }
    info(message: string) { this.alert(new Alert({ message, type: AlertType.Info, cssClass: "alert-info" })); }
    warn(message: string) { this.alert(new Alert({ message, type: AlertType.Warning, cssClass: "alert-warning" })); }
    // main alert method    
    alert(alert: Alert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
    }
    // clear alerts
    clear(alertId?: string) { this.subject.next(new Alert({ alertId })); }
    //End Alert Service


    InItMaterialCss() {
        //window["gapi"].
        
    }

}

class DataHelper {
    // public connection: SignalR;
    // public AppHub: SignalR.Hub.Proxy;
    public defered = new Deferred<boolean>();
    public objDefered: any = {};

    constructor(public http: HttpClient, public App: AppHelper) {
    }

    ExecuteAction<T>(...args: any[]): Promise<T> {
        let action: string = args[0].action;
        let deffred = new Deferred<T>();
        this.objDefered[action.toLowerCase()] = deffred;


        let timeout = new Promise<T>((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject();
            }, 10000000)
        });

        return Promise.race([deffred.promise, timeout]).then((dt) => { return dt; }).catch(() => { return null; });
        //return deffred.promise;
    }


    ExecuteAPI_Get<T>(action: string): Promise<ResponseModel<T>> {
        // console.log(localStorage.getItem("ApiToken"));
        let url = BaseUrl + action;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("ApiToken") == null ? "" : localStorage.getItem("ApiToken")
            })
        };
        return this.http.get<ResponseModel<T>>(url,httpOptions).toPromise<ResponseModel<T>>();
    }

    ExecuteAPIWithLoader_Get<T>(action: string): Promise<ResponseModel<T>> {
        this.App.ShowLoader = true;
        let promise = this.ExecuteAPI_Get<T>(action);
        promise.then(() => { this.App.ShowLoader = false; }).catch(() => { this.App.ShowLoader = false; });
        return promise;
    }

    ExecuteAPI<T>(action: string, postData: any): Promise<ResponseModel<T>> {
        let url = BaseUrl + action;
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("ApiToken") == null ? "" : localStorage.getItem("ApiToken")
            })
        };
        return this.http.post<ResponseModel<T>>(url, postData, httpOptions).toPromise<ResponseModel<T>>();
    }

    ExecuteAPIWithLoader<T>(action: string, postData: any): Promise<ResponseModel<T>> {
        this.App.ShowLoader = true;
        let promise = this.ExecuteAPI<T>(action, postData);
        promise.then(() => { this.App.ShowLoader = false; }).catch(() => { this.App.ShowLoader = false; });
        return promise;
    }
}

export class Deferred<T> {
    promise: Promise<T>;
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

class AppHelper {
    public ShowLoader: boolean=true; public ShowFullLoader: boolean;
    public RefreshData: EventEmitter<any> = new EventEmitter();
    public changeAnimation: EventEmitter<any> = new EventEmitter();
    public sortChange: EventEmitter<any> = new EventEmitter();
    public searchFilter: EventEmitter<any> = new EventEmitter();
    public refreshGrid: EventEmitter<any> = new EventEmitter();
    public normalRefreshGrid: EventEmitter<any> = new EventEmitter();
    public clearandRefreshGrid: EventEmitter<any> = new EventEmitter();
    public showhideColumnFilter: EventEmitter<any> = new EventEmitter();

    public _appData: any = {};

    GetData<T>(key: string): T {
        return (<T>this._appData[key]);
    }

    SetData(key: string, data: any) {
        this._appData[key] = data;
    }

    setCookie(cname, cvalue, date: Date | number, isSession?) {
        let d = new Date();
        if (date instanceof Date) {
            d = <Date>date;
        } else {
            d.setTime(d.getTime() + (<number>date * 24 * 60 * 60 * 1000));
        }
        if (!isSession) {
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        } else {
            document.cookie = cname + "=" + cvalue + ";path=/";
        }
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    checkSetting() {
        this.setCookie("ApiToken", "", 0);
    }

    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
    getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    Clear_Local_Storage() {
        window.localStorage.clear();
    }
}