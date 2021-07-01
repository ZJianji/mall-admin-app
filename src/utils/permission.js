const roleToRoute = {
    "coustomer": [{
        name: 'Product'
    },{
        name: 'ProductList'
    },{
        name: 'ProductAdd'
    },{
        name: 'ProductEdit'
    }],
    "admin": [{
        name: 'Product'
    },{
        name: 'ProductList'
    },{
        name: 'ProductAdd'
    },{
        name: 'Category',
    },{
        name: 'ProductEdit'
    }]
}

export default function getMenuRoute(role, routes) {
   
    const allowRoutesName = roleToRoute[role].map((item) => item.name);
    const resultRoutes = routes.filter((r) => {
        if(allowRoutesName.indexOf(r.name) !== -1) {
            const children = r.children;
            r.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1)
            return true;
        }
        return false;
    });
    return resultRoutes;
}