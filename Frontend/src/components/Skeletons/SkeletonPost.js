import React from 'react'
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement'

const  SkeletonPost =({theme}) =>  {

  const themeClass = theme || "light" ; 
  return (
   
    <div className={`skeleton-wrapper ${themeClass} `}>

        <div className="skeleton-post">
            <SkeletonElement type="thumbnail"/>
            <SkeletonElement type="Title"/>
            <SkeletonElement type="text"/>
            <SkeletonElement type="text"/>
            <SkeletonElement type="text"/>
        </div>
        <Shimmer/>
    </div>
    
  )
}

export default SkeletonPost