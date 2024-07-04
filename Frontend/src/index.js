import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SidebarProvider } from './context/sidebar_context';
import { CartProvider } from './context/cart_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
   
      <CartProvider>
        <App />
      </CartProvider>
   
  </SidebarProvider>
);

