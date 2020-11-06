import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HttpsRedirect from './components/RedirectToHttps';
import { WalletProvider } from './context/WalletContext';
import Send from './pages/send/Send';
import Receive from './pages/receive/Receive';
import Transactions from './pages/transactions/Transactions';
import Dashboard from './pages/dashboard/dashboard';
import RewardsActivate from './pages/rewards/activate';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <HttpsRedirect>
            <WalletProvider>
                <ProtectedRoute>
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route exact path="/send">
                                <Send/>
                            </Route>
                            <Route exact path="/receive">
                                <Receive/>
                            </Route>
                            <Route exact path="/transactions">
                                <Transactions/>
                            </Route>
                            <Route exact path="/rewards">
                                <RewardsActivate />
                            </Route>
                        </Switch>
                    </Router>
                </ProtectedRoute>
            </WalletProvider>
        </HttpsRedirect>
    );
}

export default App;