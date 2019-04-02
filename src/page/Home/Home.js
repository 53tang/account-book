import "./Home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Ionicon from 'react-ionicons';
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import withContext from "../../WithContext";
import PropTypes from 'prop-types';
import PieChart from '../../components/PieChart'
import PriceList from "../../components/PriceList";
import TotalPrice from "../../components/TotalPrice";
import CreateBtn from "../../components/CreateBtn";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import { Tabs, Tab } from "../../components/Tabs";
import Loader from '../../components/Loader';
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME } from "../../utility";


const tabsText = [LIST_VIEW, CHART_VIEW];

const generateChartDataByCategory = (items, type = TYPE_OUTCOME) => {
  let categoryMap = {}
  items.filter(item => item.category.type === type).forEach((item) => {
    if (categoryMap[item.cid]) {
      categoryMap[item.cid].value += (item.price * 1)
      categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id]
    } else {
      categoryMap[item.cid] = {
        category: item.category,
        value: item.price * 1,
        items: [item.id]
      }
    }
  })
  return Object.keys(categoryMap).map(mapKey => ({ ...categoryMap[mapKey], name: categoryMap[mapKey].category.name }))
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: tabsText[0]
    };
  }

  componentDidMount() {
    this.props.actions.getInitalData()
  }

  changeView = (index) => {
    this.setState({
      tabView: tabsText[index]
    })
  };

  changgeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  };

  modifyItem = (e,item) => {
    e.preventDefault();
    this.props.history.push(`/edit/${item.id}`);
  };

  createItem = () => {
    this.props.history.push("/create");
  };

  deleteItem = (e,item) => {
    e.preventDefault();
    this.props.actions.deleteItem(item)
  };

  render() {
    const { data } = this.props
    const { items, categories, currentDate, isLoading } = data
    const { tabView } = this.state
    const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    let [totalIncome, totalOutcome] = [0, 0];
    
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });

    const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
    const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)

    return (
      <div className="home">
        <header className="App-header">
          <h4 className="justify-content-center mb-5 mt-3">Keep 记账</h4>
          <div className="row row-header">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changgeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          { isLoading &&
              <Loader />
          }
          { !isLoading &&
          <Fragment>
            <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
              <Tab>
                <Ionicon
                  className="rounded-circle mr-2"
                  fontSize="25px"
                  color="#00BFFF"
                  icon="ios-paper"
                />
                列表模式
              </Tab>
              <Tab>
                <Ionicon
                  className="rounded-circle mr-2"
                  fontSize="25px"
                  color="#00BFFF"
                  icon="ios-pie"
                />
                图表模式
              </Tab>
            </Tabs>
            <CreateBtn onClick={this.createItem} />
            { tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
              <PriceList
                items={itemsWithCategory}
                onModifyItem={this.modifyItem}
                onDeleteItem={this.deleteItem}
              />
            }
            { tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
              <div className="alert alert-light text-center no-record">
                您还没有任何记账记录
              </div>
            }
            { tabView === CHART_VIEW &&
              <Fragment>
                <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
              </Fragment>
            }
          </Fragment>
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
}

export default withRouter(withContext(Home));