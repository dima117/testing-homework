import React, { FC, useCallback, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Delivery } from './pages/Delivery';
import { Contacts } from './pages/Contacts';
import { Helmet } from 'react-helmet';
import { Cart } from './pages/Cart';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';

const bem = cn('Application');

export const Application: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const cart = useSelector((s: ApplicationState) => s.cart);

    const toggle = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
    const hide = useCallback(() => {
        if (process.env.BUG_ID === '4') {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }, [setCollapsed]);

    const count = Object.keys(cart).length;
    const cartLabel = count ? `Cart (${count})` : 'Cart';
    const navbarClass = collapsed ? 'collapse navbar-collapse' : 'navbar-collapse';

    return (
        <div className={bem()}>
            <Helmet titleTemplate='%s — Kogtetochka store' />
            <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                <div className='container'>
                    <Link className={bem('Brand', ['navbar-brand'])} to='/'>
                        Kogtetochka store
                    </Link>
                    <button className={bem('Toggler', ['navbar-toggler'])} aria-label='Toggle navigation' onClick={toggle}>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className={bem('Menu', [navbarClass])}>
                        <div className='navbar-nav'>
                            <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/catalog' onClick={hide}>
                                Catalog
                            </NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/delivery' onClick={hide}>
                                Delivery
                            </NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/contacts' onClick={hide}>
                                Contacts
                            </NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/cart' onClick={hide}>
                                {cartLabel}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='container pt-4'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/catalog/:id' element={<Product />} />
                    <Route path='/delivery' element={<Delivery />} />
                    <Route path='/contacts' element={<Contacts />} />
                    <Route path='/cart' element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
};
