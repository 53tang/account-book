import React from "react";

import Ionicon from "react-ionicons";

import propTypes from "prop-types";

import { LIST_VIEW, CHART_VIEW } from "../utility";

/**
 * 列表和图标选择TAB
 */
const generateLinkClass = (current, view) => {
  return (current === view) ? 'nav-link active' :'nav-link';
}

const ViewTab = ({ activeTab , onTabChange }) => {
  return (
    <ul className="nav nav-tabs nav-fill my-4">
      <li className="nav-item">
        <a 
          href="#" 
          className={generateLinkClass(activeTab, LIST_VIEW)}
          onClick={(event) => {event.preventDefault(); onTabChange(LIST_VIEW)}}
          >
          <Ionicon 
            className="rounded-circle mr-2"
            fontSize="25px"
            color={'#007bff'}
            icon='ios-paper'
          />
          列表模式
        </a>
      </li>
      <li className="nav-item">
        <a 
          href="#" 
          className={generateLinkClass(activeTab, CHART_VIEW)}
          onClick={(event) => {event.preventDefault(); onTabChange(CHART_VIEW)}}
          >
          <Ionicon 
            className="rounded-circle mr-2"
            fontSize="25px"
            color={'#007bff'}
            icon='ios-pie'
          />
          图标模式
        </a>
      </li>
    </ul>
  )
}

ViewTab.propTypes = {
  activeTab: propTypes.string.isRequired, 
  onTabChange: propTypes.func.isRequired,
}

export default ViewTab;