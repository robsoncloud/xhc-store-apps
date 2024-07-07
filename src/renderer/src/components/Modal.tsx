import { createPortal } from "react-dom"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { App } from "src/common/app.model"
import { useEffect } from "react"


type ModalProps = {
    app?: App
    clickClose: () => void
    clickInstall: () => void
}



const Modal = ({ app, clickInstall, clickClose }: ModalProps) => {


    const handleClose = (e) => {
        e.stopPropagation()
        clickClose()
    }

    const handleModalClose = (e) => {
        if (e.target.id === "modal")
            clickClose()
    }

    const handleInstall = (e) => {
        clickInstall()
    }


    useEffect(() => {

        window.api.onUpdateText((text) => {
            console.log(text, "modal")
        })

    }, [])

    return createPortal(
        < >
            <div id="modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 backdrop-blur-sm" onClick={handleModalClose} >
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-neutral-200 max-w-[450px] space-y-4 shadow-neutral-700">
                    <div className="space-y-1.5 ">
                        <div className=" border-b-[1px] border-neutral-700 pb-2 flex gap-2 items-baseline">
                            <h1 className="text-2xl font-medium ">{app?.DisplayName}</h1>
                            <span className="text-neutral-500 text-sm">v1.0</span>
                        </div>
                        <p className="text-[13px] text-neutral-500">A powerful productivity tool to help you get more done.</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-neutral-500">
                            Acme App is a comprehensive productivity suite that helps you streamline your workflow and achieve more.
                            With powerful features like task management, document collaboration, and real-time communication, Acme App
                            is designed to boost your team's efficiency and productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                        <p className="text-sm font-medium">Status:</p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            {/* <p>Downloading (50%)</p> */}
                            <p className="text-neutral-500 text-sm ">Ready to install</p>
                        </div>
                    </div>
                    <Progress value={0} className='[&>*]:bg-neutral-600' max={100} />
                    <Button className="w-full bg-neutral-300 text-neutral-700 hover:bg-neutral-700 hover:text-neutral-200" onClick={handleInstall}>Install</Button>
                </div>
            </div>

        </>, document.getElementById("modal")!
    )
}

export default Modal