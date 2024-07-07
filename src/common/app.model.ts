export interface App {
    Name: string
    DisplayName: string
    Icon: string
    SearchPattern: string
    Versions: {
        [key: string]: {
            UnInstallArgs: string
            Version: string
            MD5Hash: string
            PostInstallation: boolean
            ProductCode: string
        }
    }
}