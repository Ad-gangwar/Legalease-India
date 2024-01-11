import React from 'react'

const formatDate=(date, config)=>{
    const defaultOptns={day: 'numeric', month: 'short', year: 'numeric'}
    const optns=config ? config : defaultOptns

    return new Date(date).toLocaleDateString('en-US', optns);
}

export default formatDate;