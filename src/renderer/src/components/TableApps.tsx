

import { MoreVerticalIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { Button } from "./ui/button"
import Modal from "./Modal"
import { useState } from "react"
import { App } from "src/common/app.model"


interface TableAppsProps {
    apps: App[]
}

const TableApps = ({ apps }: TableAppsProps) => {
    const [openModal, toggleModal] = useState(false)
    const [selectedApp, setSelectedApp] = useState<App | undefined>(undefined)

    function renderModal() {
        if(!openModal) return null

        return <Modal clickClose={() => {toggleModal(false) }} clickInstall={() => {toggleModal(false) }} app={selectedApp} />
    }
    return (<>
        {renderModal()}
        <Table className="relative ">
            <TableHeader className="sticky top-0">
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Version</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <div className="font-medium">Microsoft Office</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">Productivity Suite</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">16.54.1</TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                            Installed
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreVerticalIcon className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Update</DropdownMenuItem>
                                <DropdownMenuItem>Uninstall</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                {apps && apps.map(app => (
                    <TableRow key={app.Name}>
                        <TableCell>
                            <div className="font-medium">{app.DisplayName ? app.DisplayName : app.Name}</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">Image Editing</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{app.Versions[0].Version}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                                {app.Versions[0].PostInstallation ? "Installed" : "Available"}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">2023-07-01</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreVerticalIcon className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <span className="cursor-pointer" onClick={() => {toggleModal(true); setSelectedApp(app) }}>Install</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Update</DropdownMenuItem>
                                    <DropdownMenuItem>Uninstall</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    </>
    )
}

export default TableApps