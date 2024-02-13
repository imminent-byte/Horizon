import NavigationSidebar from "@/components/navigation/navigation-sidebar"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex w-full h-[60px] z-30 fixed inset-x-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pt-[60px] h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout