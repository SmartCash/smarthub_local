import React, { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import { WalletContext } from '../../context/WalletContext';
import { getOpReturnMessage, getTransactionHistory, isLockedTransaction } from '../../lib/sapi';
import loader from '../../assets/images/loader.svg';
import './Transactions.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { ReactComponent as IconCopy } from '../../assets/images/copy.svg';
const electron = window.require('electron');

function Transactions() {
    const { walletCurrent } = useContext(WalletContext);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    async function _getTransactionHistory() {
        setLoading(true);
        setError(null);
        setHistory([]);
        await getTransactionHistory(walletCurrent)
            .then((data) => setHistory(data))
            .catch(() => setError('There is no transactions for this wallet'))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        _getTransactionHistory();
        const timer = setTimeout(() => _getTransactionHistory(), 60000);
        return () => clearTimeout(timer);
    }, [walletCurrent]);

    return (
        <Page className="page-transactions">
            <button onClick={() => _getTransactionHistory()} className="refreshBtn">
                Refresh
            </button>
            {loading &&
            <p className="loading">
                                <img src={loader} alt={'loading...'} />
                            </p>
                            }
            {error && <p className="error">{error}</p>}
            {!error && history && (
                <Scrollbars renderThumbVertical={props => < div {...props} className="thumb-vertical"/>}>
                    {history?.map((tx, index) => {
                        tx.isLocked = isLockedTransaction(tx, walletCurrent) ? "Yes" : "No";
                        tx.message = getOpReturnMessage(tx);
                        return (
                            <div className="transaction" key={index}>
                                <div className="wrapper">
                                    <div>
                                        <p className="label">Direction</p>
                                        <p className="value">{tx.direction}</p>
                                    </div>
                                    <div>
                                        <p className="label">Is Locked?</p>
                                        <p className="value">{tx.isLocked}</p>
                                    </div>
                                    <div>
                                        <p className="label">Amount</p>
                                        <p className="value">{tx.amount}</p>
                                    </div>
                                    <div>
                                        <p className="label">Time</p>
                                        <p className="value">{new Date(tx.time * 1000).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="label">Transaction Id</p>
                                    <p className="value">{tx.txid}</p>
                                    <button
                                        className="link"
                                        title="Copy address to clipboard"
                                        onClick={() => electron.clipboard.writeText(tx.txid)}
                                    >
                                        Copy
                                    </button>
                                    <button
                                        className="link"
                                        onClick={() => electron.shell.openExternal(`https://insight.smartcash.cc/tx/${tx.txid}`)}
                                    >
                                        Open into Insight
                                    </button>
                                    <button
                                        className="link"
                                        onClick={() => electron.shell.openExternal(`http://explorer.smartcash.cc/tx/${tx.txid}`)}
                                    >
                                        Open into Sapi Explorer
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </Scrollbars>
            )}
        </Page>
    );
}
export default Transactions;
