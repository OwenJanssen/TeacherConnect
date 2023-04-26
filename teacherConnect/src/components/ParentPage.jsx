import React from 'react';
import Title from './Title';

function ParentPage({ data }) {
    return <div className="parent-page">
        <Title/>
        {/* Add content specific to teacher page here */}
    </div>
}

export default ParentPage;
