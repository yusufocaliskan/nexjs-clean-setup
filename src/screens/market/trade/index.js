import DashboardLayout from '@/layouts/dashboard';
import './index.scss';
import TradeInfo from './components/trade-info';
import RightSideBar from './components/trade-right-sidebar';

const Trade = () => {
  return (
    <DashboardLayout withoutFooter>
      <div className="trade-container">
          <TradeInfo />
          <RightSideBar/>
      </div>
    </DashboardLayout>
  );
};

export default Trade;
