pragma solidity 0.4.24;

import "./base/ownership/Ownable.sol";

/** @title Authorizable - Gives permission to multiple parties in order to execute transactions */
/** @author Originally adapted from 0x: Amir Bandeali - <amir@0xProject.com>, Will Warren - <will@0xProject.com> */

contract Authorizable is Ownable {

    mapping (address => bool) public authorized;
    address[] public authorities;

    event LogAuthorizedAddressAdded(address indexed target, address indexed caller);
    event LogAuthorizedAddressRemoved(address indexed target, address indexed caller);

    /**
     * MODIFIERS
    */
    modifier onlyAuthorized {
        require(authorized[msg.sender], "An unauthorised user called the function");
        _;
    }

    modifier targetAuthorized(address _target) {
        require(authorized[_target], "An unauthorised user called the function");
        _;
    }

    modifier targetNotAuthorized(address _target) {
        require(!authorized[_target], "An authorised user called the function");
        _;
    }

    /**
      * PUBLIC FUNCTIONS
    */
    /** @dev Authorizes an address.
      * @param _target Address to authorize.
    */
    function addAuthorizedAddress(address _target)
        public
        onlyOwner
        targetNotAuthorized(_target)
    {
        authorized[_target] = true;
        authorities.push(_target);

        emit LogAuthorizedAddressAdded(_target, msg.sender);
    }

    /** @dev Removes authorizion of an address.
      * @param _target Address to remove authorization from.
    */
    function removeAuthorizedAddress(address _target)
        public
        onlyOwner
        targetAuthorized(_target)
    {
        delete authorized[_target];
        for (uint256 i = 0; i < authorities.length; i++) {
            if (authorities[i] == _target) {
                authorities[i] = authorities[authorities.length - 1];
                authorities.length -= 1;
                break;
            }
        }

        emit LogAuthorizedAddressRemoved(_target, msg.sender);
    }

    /**
      * PUBLIC CONSTANT FUNCTIONS
    */
    /** @dev Gets all authorized addresses.
      * @return Array of authorized addresses.
    */
    function getAuthorizedAddresses()
        public
        view
        returns (address[])
    {
        return authorities;
    }

}
