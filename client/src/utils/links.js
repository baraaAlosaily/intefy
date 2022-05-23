import {IoBarChartSharp} from 'react-icons/io5'
import {MdQueryStats} from 'react-icons/md'
import {FaWpforms} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {RiAdminFill} from 'react-icons/ri'

const linksAdmin=[
   {
       id:1,
       text:'admin',
       path:'/',
       icon:<RiAdminFill/>
   },
   {
       id:2,
       text:'stats',
       path:'stats',
       icon:<IoBarChartSharp/>
   },
   {
       id:3,
       text:'profile',
       path:'profile',
       icon:<ImProfile/>
   }

]
const links=[
   {
       id:1,
       text:'all interviews',
       path:'/',
       icon:<MdQueryStats/>
   },
   {
       id:2,
       text:'add interview',
       path:'add-interview',
       icon:<FaWpforms/>
   },
   {
       id:3,
       text:'profile',
       path:'profile',
       icon:<ImProfile/>
   }
]

export {
    links,
    linksAdmin
}
