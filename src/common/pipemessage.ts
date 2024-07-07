export enum ActionType {
    Unknown = 0,
    SendText = 1,
    ShowTrayIcon = 2,
    HideTrayIcon = 3,
    DisableButton = 4,
    FinishTask = 5
}

export interface PipeMessage {
    Id: string;
    Action: ActionType;
    Status?: boolean;
    Text: string;
}





