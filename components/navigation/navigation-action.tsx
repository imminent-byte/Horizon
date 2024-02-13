'use client'

import { Plus } from "lucide-react"

import { ActionTooltip } from "../action-tooltip"

const NavigationAction = () => {
  return (
    <div>
        <ActionTooltip
            side="right"
            align="center"
            label="Create a DOMAIN"
        >
            <button className="group flex items-center">
                <div className="
                    flex mx-3 h-[45px] w-[45px] rounded-[16px] group-hover:rounded-[24px] transition-all overflow-hidden items-center justify-center 
                    dark:bg-dmbg dark:group-hover:bg-dmlinks
                    bg-lmbg group-hover:bg-lmlinks
                ">
                    <Plus
                        className="group-hover:text-lmeffects text-lmlinks
                        dark:group-hover:text-dmeffects  dark:text-dmlinks
                        transition group-hover:rotate-180 duration-500"
                        size={25}
                    />
                </div>
            </button>
        </ActionTooltip>
    </div>
  )
}

export default NavigationAction