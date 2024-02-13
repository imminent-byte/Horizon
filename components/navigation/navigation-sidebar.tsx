import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation';

import db from '@/lib/db';

import NavigationAction from './navigation-action';

const NavigationSidebar = async () => {
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
    </div>
  )
}

export default NavigationSidebar