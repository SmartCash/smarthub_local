import React, { useEffect, useState } from 'react';
import { getSmartRewardsRoi, getSmartNodeRoi } from '../lib/sapi';
import style from './SmartNodeRewardsRoi.module.css';

export default function SmartNodeRewardsRoi() {
    const [nodeRoi, setNodeRoi] = useState();
    const [rewardsRoi, setRewardsRoi] = useState();

    useEffect(() => {
        const getROIs = async () => {
            setNodeRoi(await getSmartNodeRoi());
            setRewardsRoi(await getSmartRewardsRoi());
        };
        getROIs();
    }, []);

    if (rewardsRoi && nodeRoi) {
        return (
            <div className={style['wrapper']}>
                <div className={style['wrapperColumn']}>
                    <h2>SmartRewards</h2>
                    <p>
                        SmartRewards Yearly Yield % 4 week with compounding (1 thousand or more){' '}
                        <span className={style['text-primary']}>
                            {rewardsRoi['SmartRewards Yearly Yield % 4 week with compounding']}%
                        </span>
                    </p>
                    <p>
                        SuperRewards Yearly Yield % 4 week with compounding (1 million or more){' '}
                        <span className={style['text-primary']}>
                            {rewardsRoi['SuperRewards Yearly Yield % 4 week with compounding']}%
                        </span>
                    </p>
                </div>
                <div className={style['wrapperColumn']}>
                    <h2>SmartNodes</h2>
                    <p>
                        SmartNode Collateral <span className={style['text-primary']}>{nodeRoi['SmartNode Collateral']}</span>
                    </p>
                    <p>
                        Yearly Rewards <span className={style['text-primary']}>{nodeRoi['Yearly Rewards']}</span>
                    </p>
                    <p>
                        Yearly Yield <span className={style['text-primary']}>{nodeRoi['Yearly Yield %']}%</span>
                    </p>
                </div>
            </div>
        );
    }

    return '';
}
