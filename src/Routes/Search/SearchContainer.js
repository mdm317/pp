import React, { useState,useEffect  } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQuerys";
import SearchPresenter from "./SearchPresenter";

const SearchContainer =  ({location, match, history})=>{
    const term = location.search.split("=")[1];
    const {data,loading} = useQuery(SEARCH,{
        skip: term === undefined,
        variables:{term:term}
    });

    return (
        <SearchPresenter 
        data= {data}
        loading={loading}
        />
    );
}
export default withRouter(SearchContainer);