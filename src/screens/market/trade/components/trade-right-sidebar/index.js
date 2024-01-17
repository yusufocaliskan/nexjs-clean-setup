import React from 'react';
import {MockPairArray, MockTradeArray} from './mockArray';
import {FavoriteIcon, FavoritedIcon, SortIcon} from '@/components/Icons/TradeIcons';
import './index.scss';

const RightSideBar = () => {
  return (
    <div className="right-bar-container">
      <div className="right-bar-top">
        <div className="widget">
          <div className="widget-top">
            <div className="widget-top-selected">All</div>
            <div className="widget-top-text">Cross</div>
            <div className="widget-top-text">Isolated</div>
          </div>
          <div className="widget-search">
            Search <div>icon</div>
          </div>
          <div className="widget-bottom">
            <div className="widget-bottom-header">
              <p className="widget-bottom-header-text-pair">
                Pair <SortIcon />
              </p>
              <p className="widget-bottom-header-text-price">
                Price <SortIcon />
              </p>
              <p className="widget-bottom-header-text-volume">
                Volume <SortIcon />
              </p>
            </div>
            {MockPairArray.map((item, index) => (
              <div key={index} className="widget-bottom-content">
                <div className="widget-bottom-content-div">
                  <div className="widget-bottom-content-pair">
                    {item.isFav ? <FavoritedIcon /> : <FavoriteIcon />}
                    <div className="widget-bottom-content-pair-div">
                      <p className="widget-bottom-content-pair-first">{item.pairFirst}</p>
                      <p className="widget-bottom-content-pair-second">/{item.pairSecond}</p>
                    </div>
                  </div>
                  <p className="widget-bottom-content-price-lose">{item.price}</p>
                  <p className="widget-bottom-content-volume">{item.volume} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-bar-bottom">
        <div className="widget">
          <div className="widget-bottom-top">
            <div className="widget-bottom-text-selected">Market Trades</div>
            <div className="widget-bottom-text">My Trades</div>
          </div>
          <div className="widget-bottom-bottom">
            <div className="widget-bottom-bottom-header">
              <p>Price</p>
              <p>Amount</p>
              <p>Time</p>
            </div>
            {MockTradeArray.map((item, index) => (
              <div key={index} className="widget-bottom-bottom-content">
                <div className="widget-bottom-bottom-content-div">
                  <p className="widget-bottom-bottom-content-price-lose">{item.price}</p>
                  <p className="widget-bottom-bottom-content-amount">{item.amount} </p>
                  <p className="widget-bottom-bottom-content-time">{item.time} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
