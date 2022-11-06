import React from 'react';
import {createRoot} from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                    <ReactQueryDevtools/>
                </Provider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);

