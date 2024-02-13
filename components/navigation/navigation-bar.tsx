import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation';

import db from '@/lib/db';

import NavigationAction from './navigation-action';
import { NavigationItem } from './navigation-item';

import { Separator } from '../ui/separator';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { ModeToggle } from '../toggle-mode';
import { UserButton } from '@clerk/nextjs';

const NavigationBar = async () => {
    const profile = await currentProfile();
    if(!profile) {
        return redirect('/');
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

  return (
    <div className='space-x-4 flex items-center px-3 h-full w-full
     dark:text-dmtext dark:bg-dmsbg
        text-lmtext bg-lmsbg
    '>
        <NavigationAction/>
        <Separator
            className='w-[2px] h-10 rounded-md
                bg-lmeffects dark:bg-dmeffects'
        />
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-1 p-4">
        {servers.map((server) => (
          <div key={server.id} className="shrink-0">
            <div className="overflow-hidden rounded-md">
                <NavigationItem
                    id={server.id}
                    name={server.name}
                    imageUrl={server.imageUrl}
                />
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
        <div className='pb-2 mt-auto flex items-center gap-x-4'>
                <ModeToggle/>
                <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                        elements: {
                            avatarBox: "h-[45px] w-[45px]"
                        }
                    }}
                />
        </div>
    </div>
  )
}

export default NavigationBar