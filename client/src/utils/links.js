import {IoBarChartSharp} from 'react-icons/io5'
import {MdQueryStats} from 'react-icons/md'
import {FaWpforms} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {RiAdminFill} from 'react-icons/ri'

const linksAdmin=[
   {
       id:1,
       text:'stats',
       path:'/',
       icon:<IoBarChartSharp/>
   },
   {
       id:4,
       text:'profile',
       path:'profile',
       icon:<ImProfile/>
   },
   {
       id:5,
       text:'admin',
       path:'admin',
       icon:<RiAdminFill/>
   },

]
const links=[
   {
       id:1,
       text:'stats',
       path:'/',
       icon:<IoBarChartSharp/>
   },
   {
       id:2,
       text:'all interviews',
       path:'all-interviews',
       icon:<MdQueryStats/>
   },
   {
       id:3,
       text:'add interview',
       path:'add-interview',
       icon:<FaWpforms/>
   },
   {
       id:4,
       text:'profile',
       path:'profile',
       icon:<ImProfile/>
   }
]

export {
    links,
    linksAdmin
}
