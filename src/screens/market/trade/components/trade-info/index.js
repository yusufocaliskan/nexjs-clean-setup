import React from 'react';
import './index.scss';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import {ChangeIcon, HighIcon, LowIcon, MockDolarIcon, VolumeIcon} from '@/components/Icons/TradeIcons';

const TradeInfo = () => {
  return (
    <div className="info-container">
      <div className="info-left">
        <div className="info-coin">
          <div className="info-coin-name">
            <div className="info-title">
              <p className="coin-title">BTC/USDT</p>
              <p className="coin-fold">10X</p>
            </div>
            <div className="info-title2">Bitcoin</div>
          </div>
          <div className="info-price">
            <p className="info-coin-price">36641.20</p>
            <p className="info-coin-symbol">
              <MockDolarIcon /> 36641.20
            </p>
          </div>
        </div>
        <div className="info-dropdown">
          <ArrowIcon />
        </div>
      </div>
      <div className="info-right">
        <div className="info-change">
          <div className="info-change-div">
            {' '}
            <div className="info-change-symbol">
              <ChangeIcon /> 24h change
            </div>
            <p className="info-change-ratio-plus">520.80 +1.25%</p>
          </div>
          <div className="info-change-divider" />
        </div>
        <div className="info-change">
          <div className="info-change-div">
            {' '}
            <div className="info-change-symbol">
              <HighIcon /> 24h high
            </div>
            <p className="info-change-ratio ">520.80 +1.25%</p>
          </div>
          <div className="info-change-divider" />
        </div>
        <div className="info-change">
          <div className="info-change-div">
            {' '}
            <div className="info-change-symbol">
              <LowIcon /> 24h low
            </div>
            <p className="info-change-ratio ">520.80 +1.25%</p>
          </div>
          <div className="info-change-divider" />
        </div>
        <div className="info-change-volume">
          <div className="info-change-div">
            {' '}
            <div className="info-change-symbol">
              <VolumeIcon /> 24h volume
            </div>
            <p className="info-change-ratio ">520.80 +1.25%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeInfo;
