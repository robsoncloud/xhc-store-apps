# PowerShell script to send complex objects to Electron app and receive responses

# Define the enum
Add-Type -TypeDefinition @"
    public enum ActionType
    {
        Unknown = 0,
        SendText = 1,
        ShowTrayIcon = 2,
        HideTrayIcon = 3,
        DisableButton = 4,
        FinishTask = 5
    }
"@

# Function to send a message and receive a response
function Send-PipeMessage {
    param (
        [string]$Id,
        [ActionType]$Action,
        [bool]$Status,
        [string]$Text
    )

    $message = @{
        Id = $Id
        Action = [int]$Action
        Status = $Status
        Text = $Text
    }

    $jsonMessage = ConvertTo-Json $message

    $pipe = New-Object System.IO.Pipes.NamedPipeClientStream(".", "MyElectronApp", [System.IO.Pipes.PipeDirection]::InOut)
    $pipe.Connect(5000)  # 5 second timeout

    $writer = New-Object System.IO.StreamWriter($pipe)
    $reader = New-Object System.IO.StreamReader($pipe)

    $writer.WriteLine($jsonMessage)
    $writer.Flush()

    $response = $reader.ReadLine()
    $pipe.Close()

    return ConvertFrom-Json $response
}

# Example usage
$response = Send-PipeMessage -Id "MSG001" -Action SendText -Text "Hello from PowerShell!"
Write-Host "Response: $($response.Message)"

$response = Send-PipeMessage -Id "MSG002" -Action DisableButton -Status $true -Text "Disabling button"
Write-Host "Response: $($response.Message)"

$response = Send-PipeMessage -Id "MSG003" -Action ShowTrayIcon -Text "Show the tray icon"
Write-Host "Response: $($response.Message)"