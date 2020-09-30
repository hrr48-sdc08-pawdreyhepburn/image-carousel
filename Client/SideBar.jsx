import React from 'react';
import SideBarEntry from './sideBarEntry.jsx';

const SideBar = (props) => (
<div >
   {props.imageList.map(image =>
      <SideBarEntry
        image={image}
        changeMainImage={props.changeMainImage}
      />
    )}
</div>

)

export default SideBar;