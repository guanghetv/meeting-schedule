
import Home from '../pages/Home/index.jsx';
import LayoutPage from '../pages/LayoutPages/index.jsx';
import Login from '../pages/Login/index.jsx';
import Meet from '../pages/Meet/meet.jsx';

const createRoutes = [
    {
        path:'/',
        component: Login,
        exact: true
    },{
        path: '/index',
        component: LayoutPage,
        routes: [
            {
                path: '/index/home',
                component: Home
            },{
                path: '/index/meet/:id',
                component: Meet
            }
        ]
    }
]

export default createRoutes