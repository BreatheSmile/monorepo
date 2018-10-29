import React from 'react'; 
import { default as Images } from '../middleware/images';

import { MoonLoader } from 'react-spinners';

class Approve extends React.Component {
  constructor(props){
    super(props); 

  };

  render() {
    return (
      <div>
        <div className="small-card">
          <div className="hero-approve">
            <div className="metamask-graphic">
              <img src={Images.metamaskLarge}/>
            </div>
            <div className="approve-large-text">
              <h1>You'll need to approve Dai for your subscription via Metamask</h1>
            </div>
            <div className="approve-small-text">
              <p>Please approve the transaction in the Metamask window to continue the subscription process.</p>
            </div>
            <div className="approve-button">
              <div className="approve-container">
                <MoonLoader className='approve-spinner' color={'#9F98BF'} sizeUnit={"px"} size={20}/>
                <p>Awaiting Approval</p>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Approve;