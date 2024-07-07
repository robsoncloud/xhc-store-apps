
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import Navigation from "./components/Navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons"
import { FilterIcon, ListOrderedIcon } from "lucide-react"
import { Input } from "./components/ui/input"
import TableApps from "./components/TableApps"
import Modal from "./components/Modal"

function App(): JSX.Element {

  const [apps, setApps] = useState<any>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    const fetchApps = async () => {

      try {
        const resp = await window.api.getApplications()
        setApps(resp.Applications)

      } catch (err) {
        setError("Error fetching data from server")
      } finally {
        setLoading(false)
      }
    }
    fetchApps()

    window.api.onPipeMessage((message) => {
      console.log(message)
    })

    window.api.onUpdateText((text) => {
      console.log(text)
    })


  }, [])

  if (loading) { return <div>Loading...</div> }
  if (error) { return <div>{error}</div> }
  return (

    <div className="h-screen w-screen bg-background flex flex-row relative">

      <Navigation />
      <main className="flex flex-col p-10 ml-20 w-full gap-5">

        <div className="flex">
          <h1 className="text-2xl font-medium">App Store</h1>
          <div className="relative ml-auto flex-1 md:grow-0">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search apps..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="overflow-hidden">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="installed">Installed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed" className="hidden sm:flex">
                Failed
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                    <FilterIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Installed</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Failed</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                    <ListOrderedIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Name</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Version</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Last Updated</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <DownloadIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
              <Button size="sm" className="h-7 gap-1 text-sm">
                <PlusIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Add App</span>
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="h-full ">
            <Card x-chunk="dashboard-06-chunk-0" className="w-full h-full overflow-x-auto" >
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Manage your installed applications.</CardDescription>
              </CardHeader>
              <CardContent>
                <TableApps apps={apps} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </main>
    </div>

  )
}

export default App


