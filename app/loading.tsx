import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-lmbg dark:bg-dmsbg2 h-full">
        <Loader2 className="animate-spin transition h-20 w-20 text-dmlinks"/>
    </div>
  )
}

export default Loading