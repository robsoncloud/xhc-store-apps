import { motion, useAnimationControls, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

import {
    ChartBarIcon,
    ChartPieIcon,
    DocumentCheckIcon,
    Square2StackIcon,
    UsersIcon,
    WrenchScrewdriverIcon
} from "@heroicons/react/24/outline"



const containerVariants = {
    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
}

const svgVariants = {
    close: {
        rotate: 360,
    },
    open: {
        rotate: 180,
    },
}

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<string | null>(null)

    const containerControls = useAnimationControls()
    const svgControls = useAnimationControls()

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open")
            svgControls.start("open")
        } else {
            containerControls.start("close")
            svgControls.start("close")
        }
    }, [isOpen])

    const handleOpenClose = () => {
        setIsOpen(!isOpen)
        setSelectedProject(null)
    }

    return (
        <>
            <motion.nav
                variants={containerVariants}
                animate={containerControls}
                initial="close"
                className="bg-neutral-900 flex flex-col justify-between z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
            >

                <div className="space-y-16">
                    <div className="flex flex-row w-full justify-between place-items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-700 rounded-full" >
                           
                        </div>
                        <span className="text-md text-neutral-400 font-medium" hidden={!isOpen}>App Catalog</span>
                        
                        <button
                            className="p-2 rounded-full flex"
                            onClick={() => handleOpenClose()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-7 h-7 stroke-neutral-200"
                            >
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    variants={svgVariants}
                                    animate={svgControls}
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut",
                                    }}
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <NavigationLink name="Dashboard">
                            <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                        </NavigationLink>
                        <NavigationLink name="Projects">
                            <Square2StackIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                        </NavigationLink>
                        <NavigationLink name="Tasks">
                            <DocumentCheckIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                        </NavigationLink>
                        <NavigationLink name="Reporting">
                            <ChartPieIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                        </NavigationLink>
                        <NavigationLink name="Users">
                            <UsersIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                        </NavigationLink>

                    </div>
                </div>
                <NavigationLink name="Settings">
                    <WrenchScrewdriverIcon className="stroke-inherit stroke-[0.75] min-w-6 w-6" />
                </NavigationLink>
            </motion.nav>


            <AnimatePresence>

            </AnimatePresence>
        </>
    )
}

export default Navigation


interface Props {
    children: React.ReactNode
    name: string
}

const NavigationLink = ({ children, name }: Props) => {
    return (
        <a
            href="#"
            className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
        >
            {children}
            <p className="text-inherit  overflow-hidden whitespace-nowrap tracking-wide">
                {name}
            </p>
        </a>
    )
}
