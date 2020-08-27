export class KeyValue {
    public Key: string;
    public Value: number;
}
export class KeyValueDefault {
    public Key: string;
    public Value: number;
    public MainID: number;
    public Is_Default: boolean;
}
export class KeyValueString {
    public Key: string;
    public Value: string;
}


export class ResponseModel<T>{
    status: boolean;
    success: boolean;
    message: string;
    token: string;
    data: T;
}
//Start Alerts
export class Alert {
    type: AlertType;
    message: string;
    alertId: string;
    keepAfterRouteChange: boolean;
    cssClass: string;
    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
//End Alerts

export class GridFilter {
    //constructor(
    public ColumnName: string;
    public DisplayText: string;
    public Value: any;
    public Condition: string;
    public Type: string; // string|date|int|decimal|bool
    public Is_Visible: boolean;
    public Width: number;
    public TextAlign: string;
    //) { }
}

export class Account_Model {
    UserID: number;
    NoGaurd: boolean;
}