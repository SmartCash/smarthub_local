import React, { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import PasswordModal from './PasswordModal';
import WalletModal from './WalletModal';

const { ipcRenderer } = window.require('electron');

export default function ProtectedRoute({ children }) {
    const { wallets } = useContext(WalletContext);

    if (!ipcRenderer.sendSync('getWalletData')) {
        return <WalletModal isShowing={true} disableCloseButton={true} />;    
    }

    if (ipcRenderer.sendSync('getWalletData') && (!wallets || wallets?.length === 0)) {
        return <PasswordModal />;
    }

    return children;
}
