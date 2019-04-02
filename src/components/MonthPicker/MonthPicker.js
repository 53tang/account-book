import "./MonthPicker.scss";
import React from "react";
import propTypes from "prop-types";
import { padLeft, range } from "../../utility";

class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedYear: this.props.year
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false)
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }
    this.setState({
      show: false,
    })
  }

  // 下拉菜单开关
  toggleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      show: !this.state.show
    });
  }

  // 修改年份
  changeSelectedYear = (event, year) => {
    event.preventDefault();
    this.setState({
      selectedYear: year
    });
  }

  // 修改月份
  changeSelectedMonth = (event, month) => {
    event.preventDefault();
    this.setState({
      show: false
    })
    this.props.onChange(this.state.selectedYear, month);
  }

  render() {
    const { year, month } = this.props;
    const { show, selectedYear } = this.state;
    const monthRange = range(12, 1);
    const yearRange = range(9, year - 4);

    return (
      <div className="dropdown month-picker" ref={(element) => {this.node = element}}>
        <h5>选择月份</h5>
        <button
          className="btn btn-lg btn-secondary dropdown-toggle mb-3"
          onClick={this.toggleDropdown}
        >
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {show && (
          <div className="dropdown-menu" style={{ display: "block" }}>
            <div className="row">
              <div className="col border-right years-range">
                {yearRange.map((yearNum, index) => {
                  return (
                    <a
                      key={index}
                      onClick={(event) => {this.changeSelectedYear(event, yearNum)}}
                      className={yearNum === selectedYear ? "dropdown-item active" : "dropdown-item"}
                    >
                      {yearNum} 年
                    </a>
                  )
                })}
              </div>
              <div className="col months-range">
                {monthRange.map((monthNum, index) => {
                  return (
                    <a
                      onClick={(event) => {this.changeSelectedMonth(event, monthNum)}}
                      key={index}
                      className={monthNum === month ? "dropdown-item active" : "dropdown-item"}
                    >
                      {padLeft(monthNum)} 月
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

MonthPicker.propTypes = {
  year: propTypes.number.isRequired,
  month: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
};

export default MonthPicker;
