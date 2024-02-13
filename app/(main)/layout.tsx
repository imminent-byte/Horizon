import NavigationBar from "@/components/navigation/navigation-bar"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex w-full h-[60px] z-30 fixed inset-x-0">
                <NavigationBar/>
            </div>
            <main className="md:pt-[60px] h-full">
                {children}
            </main>
        </div>
    )
}

export default MainLayout