pragma solidity 0.4.24;

import "./Authorizable.sol";
import "./EightExToken.sol";
import "./base/math/SafeMath.sol";

/** @title Stake Contract - Processors stake tokens to claim transactions */
/** @author Kerman Kohli - <kerman@8xprotocol.com> */

contract StakeContract is Authorizable {

    using SafeMath for uint;

    struct Stake {
        uint lockedUp;
        uint total;
    }

    struct TokenStake {
        uint lockedUp;
        uint total;
        uint highestAmount;
        address highestAddress;
    }

    mapping (address => mapping (address => Stake)) public userStakes;
    mapping (address => TokenStake) tokenStakes;

    EightExToken public tokenContract;

    event Locked(address indexed staker, address indexed tokenAddress, uint indexed amount);
    event Unlocked(address indexed staker, address indexed tokenAddress, uint indexed amount);
    event Slashed(address indexed staker, address indexed tokenAddress, uint indexed amount);
    event Transferred(address indexed staker, address indexed tokenAddress, uint indexed amount, address destination);
    event ToppedUp(address indexed staker, address indexed tokenAddress, uint indexed amount);
    event Withdrew(address indexed staker, address indexed tokenAddress, uint indexed amount);

    /**
      * PUBLIC FUNCTIONS
    */
    constructor(address _tokenAddress) public {
        tokenContract = EightExToken(_tokenAddress);
    }

    /** @dev When the processor claims a transaction their tokens are staked.
      * @param _staker is the processors who is staking thier tokens.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how much they would like to stake;
    */
    function lockTokens(address _staker, address _tokenAddress, uint _amount)
        public
        onlyAuthorized
    {
        require(getAvailableStake(_staker, _tokenAddress) >= _amount);
        userStakes[_staker][_tokenAddress].lockedUp += _amount;
        tokenStakes[_tokenAddress].lockedUp += _amount;

        emit Locked(_staker, _tokenAddress, _amount);
    }

    /** @dev When a processor executes a transaction their tokens are unstaked.
      * @param _staker is the processors who is staking thier tokens.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how much they would like to unstake;
    */
    function unlockTokens(address _staker, address _tokenAddress, uint _amount)
        public
        onlyAuthorized
    {
        // Ensure that they can't unstake more than they actually have
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount);
        userStakes[_staker][_tokenAddress].lockedUp -= _amount;
        tokenStakes[_tokenAddress].lockedUp -= _amount;

        emit Unlocked(_staker, _tokenAddress, _amount);
    }

    /** @dev When the processor doesn't execute a transaction they claimed
      * their tokens are slashed.
      * @param _staker is the processors who's tokens need to be slashed.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how many tokens need to be slashed.
    */
    function slashTokens(address _staker, address _tokenAddress, uint _amount)
        public
        onlyAuthorized
    {
        // Make sure that an authorized address can't slash more tokens than
        // they actually have locked up.
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount);

        // Reduce the total amount first
        userStakes[_staker][_tokenAddress].total -= _amount;
        userStakes[_staker][_tokenAddress].lockedUp -= _amount;
        tokenStakes[_tokenAddress].total -= _amount;
        tokenStakes[_tokenAddress].lockedUp -= _amount;

        emit Slashed(_staker, _tokenAddress, _amount);
    }

    /** @dev When someone catches out another user for not processing
      * their tokens are transferred to them.
      * @param _staker is the processors who's tokens need to be slashed.
      * @param _tokenAddress token for which to stake for.
      * @param _amount is how many tokens need to be slashed.
      * @param _destination is the person to transfer the stake to.
    */
    function transferStake(address _staker, address _tokenAddress, uint _amount, address _destination)
        public
        onlyAuthorized
    {
        // Make sure that an authorized address can't slash more tokens than
        // they actually have locked up.
        require(userStakes[_staker][_tokenAddress].lockedUp >= _amount);

        // Reduce the total amount first
        userStakes[_staker][_tokenAddress].total -= _amount;
        userStakes[_staker][_tokenAddress].lockedUp -= _amount;

        // Transfer the stake
        userStakes[_destination][_tokenAddress].total += _amount;
        tokenStakes[_tokenAddress].lockedUp -= _amount; // Total is constant, only locked up decreases.

        emit Transferred(_staker, _tokenAddress, _amount, _destination);
    }

    /** @dev Check how many tokens the processor has in total at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to stake for.
    */
    function getTotalStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint total)
    {
        return userStakes[_staker][_tokenAddress].total;
    }

    /** @dev Check how many tokens the processor has available at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to stake for.
    */
    function getAvailableStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint available)
    {
        return (userStakes[_staker][_tokenAddress].total - userStakes[_staker][_tokenAddress].lockedUp);
    }

    /** @dev Check how many tokens the processor has locked at this moment.
      * @param _staker is the processor address.
      * @param _tokenAddress token for which to stake for.
    */
    function getLockedStake(address _staker, address _tokenAddress)
        public
        view
        returns (uint locked)
    {
        return userStakes[_staker][_tokenAddress].lockedUp;
    }

    /** @dev Check how many staked tokens the currency has in total at this moment.
      * @param _tokenAddress token for which to stake for.
    */
    function getTotalTokenStake(address _tokenAddress)
        public
        view
        returns (uint total)
    {
        return tokenStakes[_tokenAddress].total;
    }

    /** @dev Check how many tokens the currency has available at this moment.
      * @param _tokenAddress token for which to stake for.
    */
    function getAvailableTokenStake(address _tokenAddress)
        public
        view
        returns (uint available)
    {
        return (tokenStakes[_tokenAddress].total - tokenStakes[_tokenAddress].lockedUp);
    }

    /** @dev Check how many tokens the currency has locked at this moment.
      * @param _tokenAddress token for which to stake for.
    */
    function getLockedTokenStake(address _tokenAddress)
        public
        view
        returns (uint locked)
    {
        return tokenStakes[_tokenAddress].lockedUp;
    }

    /** @dev Get the highest amount of stake
      * @param _tokenAddress token address to check highest stake for.
    */
    function getHighestTokenStake(address _tokenAddress)
        public
        view
        returns (uint, address)
    {
        // @ TODO: Implementation
    }

    /** @dev Top up your stake once you've given approval to transfer funds.
      * @param _amount is how much you would like to withdraw.
      * @param _tokenAddress token for which to stake for.
    */
    function topUpStake(uint _amount, address _tokenAddress)
        public
        returns (bool success)
    {
        if (tokenContract.transferFrom(msg.sender, address(this), _amount)) {
            userStakes[msg.sender][_tokenAddress].total += _amount;
            tokenStakes[_tokenAddress].total += _amount;
            return true;
        } else {
            return false;
        }

        emit ToppedUp(msg.sender, _tokenAddress, _amount);
    }

    /** @dev Withdraw your stake from the stake contract.
      * @param _amount is how much you would like to withdraw.
      * @param _tokenAddress token for which to stake for.
    */
    function withdrawStake(uint _amount, address _tokenAddress)
        public
    {
        // Check that they're not taking out more than they actually have.
        require(getAvailableStake(msg.sender, _tokenAddress) >= _amount);

        userStakes[msg.sender][_tokenAddress].total -= _amount;
        tokenStakes[_tokenAddress].total -= _amount;
        tokenContract.transfer(msg.sender, _amount);

        emit Withdrew(msg.sender, _tokenAddress, _amount);
    }

}