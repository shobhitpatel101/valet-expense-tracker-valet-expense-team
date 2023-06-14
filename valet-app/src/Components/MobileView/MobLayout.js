import React from 'react'
import MobAppBar from './MobAppBar';
function MobLayout({children}) {
  return (
    <div>
        <MobAppBar/>
        {children}
    </div>
  )
}

export default MobLayout