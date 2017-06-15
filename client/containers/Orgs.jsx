import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {getOrgsByItem} from '../actions/joinItemToOrgs'


const renderOrgClass = (joinItemToOrgs, key) => (

  <div className='itemClass-box 3 columns' key={key}>
    <Link to={`/categories/${joinItemToOrgs.category_id}/${joinItemToOrgs.itemClass_id}/${joinItemToOrgs.org_id}`}>
      <img src={`${joinItemToOrgs.org_img}`}/>
      <h4 className="itemClass-name">{joinItemToOrgs.org_name}</h4>
    </Link>
    <p className="itemClass-info">{joinItemToOrgs.org_info}</p>
    <p className="itemClass-info">{joinItemToOrgs.org_url}</p>
    <p className="itemClass-info">{joinItemToOrgs.org_address}</p>
    <p className="itemClass-info">{joinItemToOrgs.org_location}</p>
  </div>
)

class OrgClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joinItemToOrgs: props.joinItemToOrgs
    }
  }
  componentDidMount() {
    this.props.dispatch(getOrgsByItem())
  }

  componentWillReceiveProps(nextProps) {
    console.log({nextProps});
    this.setState({joinItemToOrgs: nextProps.joinItemToOrgs})
  }
  render() {
    const dispatch = this.props.dispatch
    console.log("orgs", this.state.joinItemToOrgs, this.props);
    return (
      <div className='itemClass-container container'>
        <div>
          <h4 className="itemClass-list-header">Organisations</h4>
        </div>
        <div>
          {this.state.joinItemToOrgs.map((orgs, key) => renderOrgClass(orgs, key))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, otherProps) => {
  const orgs = state.joinItemToOrgs.filter((org) => {
    return org.itemClass_id == otherProps.match.params.itemClass_id
  })
  console.log({orgs});
  console.log(otherProps);
  return {joinItemToOrgs: orgs}
}

export default connect(mapStateToProps)(OrgClass)